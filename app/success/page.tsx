"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type PurchasedPicture = { id: string; name: string };

function clearPurchasedBasket(sessionId: string, pictures: PurchasedPicture[]) {
  try {
    const completedKey = `novea-completed-${sessionId}`;
    if (sessionStorage.getItem(completedKey)) return;
    const saved = JSON.parse(sessionStorage.getItem("novea-basket-v1") || "null");
    const purchasedIds = new Set(pictures.map(picture => picture.id));
    if (saved && Array.isArray(saved.selected) && saved.bundleSize === pictures.length &&
        saved.selected.length === pictures.length && new Set(saved.selected).size === pictures.length &&
        saved.selected.every((id: string) => purchasedIds.has(id))) {
      sessionStorage.removeItem("novea-basket-v1");
    }
    sessionStorage.setItem(completedKey, "true");
  } catch {
    // Downloads remain available if browser storage is unavailable.
  }
}

// Standard uncompressed ZIP, with CRC-32; PDFs are already compressed.
function makeZip(files: { name: string; bytes: Uint8Array }[]) {
  const parts: BlobPart[] = [];
  const central: BlobPart[] = [];
  let offset = 0, centralSize = 0;
  const table = Array.from({ length: 256 }, (_, n) => {
    for (let k = 0; k < 8; k++) n = (n >>> 1) ^ ((n & 1) ? 0xedb88320 : 0);
    return n >>> 0;
  });
  for (const file of files) {
    const name = new TextEncoder().encode(file.name);
    const bytes = file.bytes;
    let crc = 0xffffffff;
    for (const byte of bytes) crc = (crc >>> 8) ^ table[(crc ^ byte) & 255];
    crc = (crc ^ 0xffffffff) >>> 0;
    const local = new Uint8Array(30 + name.length);
    const l = new DataView(local.buffer);
    l.setUint32(0, 0x04034b50, true); l.setUint16(4, 20, true);
    l.setUint16(6, 0x800, true); l.setUint16(12, 33, true);
    l.setUint32(14, crc, true); l.setUint32(18, bytes.length, true); l.setUint32(22, bytes.length, true);
    l.setUint16(26, name.length, true); local.set(name, 30);
    const entry = new Uint8Array(46 + name.length);
    const c = new DataView(entry.buffer);
    c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true);
    c.setUint16(8, 0x800, true); c.setUint16(14, 33, true);
    c.setUint32(16, crc, true); c.setUint32(20, bytes.length, true); c.setUint32(24, bytes.length, true);
    c.setUint16(28, name.length, true); c.setUint32(42, offset, true); entry.set(name, 46);
    parts.push(local.buffer, new Uint8Array(bytes).buffer); central.push(entry.buffer);
    offset += local.length + bytes.length; centralSize += entry.length;
  }
  const end = new Uint8Array(22); const e = new DataView(end.buffer);
  e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true);
  e.setUint32(12, centralSize, true); e.setUint32(16, offset, true);
  return new Blob([...parts, ...central, end.buffer], { type: "application/zip" });
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [pictures, setPictures] = useState<PurchasedPicture[]>([]);
  const [collection, setCollection] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [zipBusy, setZipBusy] = useState(false);
  const [zipProgress, setZipProgress] = useState("");
  const [zipError, setZipError] = useState("");

  async function downloadAll() {
    if (!sessionId || zipBusy || !pictures.length) return;
    setZipBusy(true); setZipError(""); setZipProgress("Verifying your downloads...");
    try {
      const response = await fetch(`/api/download?session_id=${encodeURIComponent(sessionId)}&all=1`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to authorize downloads");
      const data = await response.json();
      if (!Array.isArray(data.files) || data.files.length !== pictures.length) throw new Error("Incomplete download list");
      const files: { name: string; bytes: Uint8Array }[] = [];
      const names = new Set<string>();
      let totalBytes = 0;
      for (const file of data.files) {
        if (typeof file.name !== "string" || !/^[a-z0-9_-]+\.pdf$/.test(file.name) || names.has(file.name) || typeof file.url !== "string" || new URL(file.url).protocol !== "https:") throw new Error("Invalid file details");
        setZipProgress(`Preparing page ${files.length + 1} of ${pictures.length}...`);
        const pdf = await fetch(file.url, { credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer" });
        if (!pdf.ok) throw new Error("PDF download failed");
        const bytes = new Uint8Array(await pdf.arrayBuffer());
        if (new TextDecoder().decode(bytes.subarray(0, 5)) !== "%PDF-") throw new Error("Invalid PDF");
        totalBytes += bytes.length;
        if (totalBytes > 250 * 1024 * 1024) throw new Error("Bundle too large");
        names.add(file.name); files.push({ name: file.name, bytes });
      }
      setZipProgress("Creating your ZIP file...");
      const url = URL.createObjectURL(makeZip(files));
      const link = document.createElement("a");
      link.href = url; link.download = "NOVEA-Coloring-Pages.zip";
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      setZipProgress("Your ZIP download has started. Check your Downloads folder.");
    } catch (err) {
      console.error("ZIP preparation failed:", err instanceof Error ? err.message : "Unknown error");
      setZipProgress(""); setZipError("We couldn't prepare your ZIP file. Please try again or download your PDFs individually below.");
    } finally { setZipBusy(false); }
  }


  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No checkout session was found.");
      return;
    }
    const controller = new AbortController();
    async function loadPurchase() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/purchase?session_id=${encodeURIComponent(sessionId!)}`, {
          cache: "no-store", signal: controller.signal,
        });
        if (!response.ok) throw new Error("Purchase verification failed");
        const data = await response.json();
        if (!Array.isArray(data.pictures) || ![2, 5, 10, 20].includes(data.pictures.length) ||
            data.pictures.length !== data.bundle_size || !data.pictures.every(
              (picture: PurchasedPicture) => picture && typeof picture.id === "string" && typeof picture.name === "string"
            )) throw new Error("Invalid purchase details");
        if (controller.signal.aborted) return;
        setPictures(data.pictures);
        setCollection(data.collection);
        clearPurchasedBasket(sessionId!, data.pictures);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error(err);
        setError("We couldn't load your downloads. Please try refreshing this page.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadPurchase();
    return () => controller.abort();
  }, [sessionId]);

  const collectionNames: Record<string, string> = {
    ocean: "Ocean Friends",
    christmas: "Christmas",
    thanksgiving: "Thanksgiving",
    cozy: "Cozy Little Moments",
    flowers: "Flowers & Butterflies",
    farm: "Farm Friends",
    woodland: "Woodland Friends",
    mixed: "Mix & Match",
  };
  const collectionName = collectionNames[collection] ?? "";

  return (
    <main className="success-page">
      <h1>Thank You! <span aria-hidden="true">♡</span></h1>
      <p>Thank you for supporting NOVÉA ODELIS PRINTABLES!</p>
      <div role="status" aria-live="polite">
        {loading && <div className="instruction-box"><p><strong>Preparing your coloring pages...</strong></p><p>We are verifying your purchase and getting your printable PDFs ready. This may take a few moments. Please keep this page open. ♡</p></div>}
        {!loading && !error && pictures.length > 0 && <p className="verified">✓ Your purchase is confirmed!</p>}
      </div>
      {error && <div role="alert" className="error">
        <p>{error}</p>
        <button type="button" className="retry-button" onClick={() => window.location.reload()}>Try Again</button>
      </div>}
      {!loading && !error && pictures.length > 0 && (
        <section aria-labelledby="download-heading">
          <h2 id="download-heading">Your {pictures.length} {collectionName} Coloring Pages</h2>
          <div className="instruction-box"><p><strong>Your printable PDFs are ready!</strong></p><p>Choose Download All Pages to save one ZIP file, or download PDFs individually. Each individual download opens in a new browser tab. Save or print your PDF, then close only the PDF tab to return to this page. Please keep this purchase confirmation tab open until you have saved all your pages.</p></div>
          <div className="zip-section">
            <button type="button" className="download-button zip-button" disabled={zipBusy} onClick={downloadAll}>{zipBusy ? "Preparing your ZIP..." : "Download All Pages (ZIP)"}</button>
            <p>Save all your purchased PDFs in one convenient file.</p>
            <p role="status" aria-live="polite">{zipProgress}</p>
            {zipError && <p role="alert" className="error">{zipError}</p>}
          </div>
          <h2>Or download individually</h2>
          <div className="downloads">
            {pictures.map(picture => (
              <a key={picture.id} className="download-button" target="_blank" rel="noopener noreferrer" href={`/api/download?session_id=${encodeURIComponent(sessionId!)}&picture=${encodeURIComponent(picture.id)}`}>
                Download {picture.name} PDF (opens in a new tab)
              </a>
            ))}
          </div>
          <p className="download-note">Save each PDF to your device so you can print it whenever you like.</p>
          <p className="download-note">You can bookmark this page privately to return to your downloads later.</p>
          <section aria-labelledby="personal-use-heading" style={{ backgroundColor: "#EADBC8", color: "#492D35", borderRadius: "16px", padding: "20px", maxWidth: "650px", margin: "30px auto", lineHeight: 1.7 }}>
            <h2 id="personal-use-heading" style={{ color: "#652C46", fontSize: "1.5rem", margin: "0 0 12px" }}>♡ Made with Love, for Personal Use</h2>
            <p style={{ margin: "0 0 12px" }}>Your purchased coloring pages may be printed as often as you like for personal use. Please do not share, redistribute, resell or upload the digital files elsewhere.</p>
            <p style={{ margin: 0 }}>Thank you for supporting NOVÉA ODELIS PRINTABLES!</p>
          </section>
        </section>
      )}
      <div className="back-section"><a href="/" className="back-button">← Back to Shop</a></div>
      <footer>Made with love, color &amp; a little creativity. ♡</footer>
      <style jsx>{`
        * { box-sizing: border-box; }
        .success-page { min-height: 100vh; background-color: #FFF7ED; text-align: center; padding: 60px 20px; font-family: Arial, sans-serif; color: #492D35; font-size: 1.125rem; line-height: 1.7; overflow-wrap: anywhere; }
        h1 { color: #652C46; font-family: Georgia, serif; font-size: clamp(2.25rem, 5vw, 3rem); font-weight: normal; line-height: 1.3; margin: 0 0 20px; }
        h2 { font-family: Georgia, serif; color: #652C46; font-size: clamp(1.625rem, 4vw, 2rem); font-weight: normal; line-height: 1.4; margin: 30px 0 15px; }
        p { font-size: 1.125rem; line-height: 1.7; max-width: 650px; margin: 15px auto; }
        .verified { color: #29452C; background: #A9BE83; border-radius: 12px; padding: 12px 20px; font-weight: 600; margin-top: 25px; }
        .instruction-box { background: #A0BBD3; border-radius: 16px; padding: 12px 20px; max-width: 650px; margin: 24px auto; color: #492D35; }
        .downloads { display: flex; flex-direction: column; align-items: center; gap: 16px; margin-top: 30px; }
        .download-button { display: flex; justify-content: center; align-items: center; width: 100%; max-width: 460px; min-height: 54px; padding: 16px 22px; background-color: #652C46; color: #FFF7ED; border-radius: 25px; text-decoration: none; font-size: 1.125rem; font-weight: 600; line-height: 1.5; transition: background-color 0.2s; }
        .download-button:hover { background-color: #492D35; }
        a:focus-visible, button:focus-visible { outline: 3px solid #492D35; outline-offset: 5px; }
        .zip-section { margin: 30px auto; }
        .zip-button { margin: auto; border: none; font-family: inherit; cursor: pointer; }
        .zip-button:disabled { opacity: .7; cursor: wait; }
        .download-button:hover { background-color: #492D35; }
        a:focus-visible, button:focus-visible { outline: 3px solid #492D35; outline-offset: 5px; }
        .download-note { color: #492D35; font-size: 1rem; margin-top: 25px; }
        .back-section { margin-top: 40px; }
        .back-button { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 12px 24px; border: 2px solid #652C46; border-radius: 25px; color: #652C46; background-color: #EADBC8; font-size: 1.125rem; font-weight: 600; text-decoration: none; }
        .back-button:hover { background-color: #D9C7A4; }
        .error { color: #b42318; margin: 25px auto; max-width: 600px; }
        .retry-button { min-height: 48px; padding: 12px 24px; background-color: #652C46; color: #FFF7ED; border: none; border-radius: 25px; font-family: inherit; font-size: 1rem; font-weight: 600; cursor: pointer; }
        footer { margin-top: 50px; padding: 20px 10px; color: #492D35; font-size: 1rem; line-height: 1.7; font-family: Georgia, serif; }
        @media (max-width: 600px) { .success-page { padding: 40px 16px; } .download-button { padding: 16px; } }
        @media (prefers-reduced-motion: reduce) { .download-button { transition: none; } }
      `}</style>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p role="status" style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: "1.125rem", padding: "40px 20px" }}>Preparing your coloring pages... Please keep this page open.</p>}>
      <SuccessContent />
    </Suspense>
  );
}
