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
