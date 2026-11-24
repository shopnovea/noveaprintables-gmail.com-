"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type PurchasedPicture = {
  id: string;
  name: string;
};

function clearPurchasedBasket(
  sessionId: string,
  pictures: PurchasedPicture[]
) {
  try {
    const completedKey = `novea-completed-${sessionId}`;

    if (sessionStorage.getItem(completedKey)) {
      return;
    }

    const saved = JSON.parse(
      sessionStorage.getItem("novea-basket-v1") || "null"
    );

    const purchasedIds = new Set(
      pictures.map((picture) => picture.id)
    );

    if (
      saved &&
      Array.isArray(saved.selected) &&
      saved.bundleSize === pictures.length &&
      saved.selected.length === pictures.length &&
      new Set(saved.selected).size === pictures.length &&
      saved.selected.every(
        (id: string) => purchasedIds.has(id)
      )
    ) {
      sessionStorage.removeItem("novea-basket-v1");
    }

    sessionStorage.setItem(completedKey, "true");

  } catch {
    // Downloads remain available if browser storage is unavailable.
  }
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [pictures, setPictures] = useState<PurchasedPicture[]>([]);
  const [collection, setCollection] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        const response = await fetch(
          `/api/purchase?session_id=${encodeURIComponent(sessionId!)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Purchase verification failed");
        }

        const data = await response.json();

        if (
          !Array.isArray(data.pictures) ||
          ![2, 5, 10, 20].includes(data.pictures.length) ||
          data.pictures.length !== data.bundle_size ||
          !data.pictures.every(
            (picture: PurchasedPicture) =>
              picture &&
              typeof picture.id === "string" &&
              typeof picture.name === "string"
          )
        ) {
          throw new Error("Invalid purchase details");
        }

        if (controller.signal.aborted) return;

        setPictures(data.pictures);
        setCollection(data.collection);

        clearPurchasedBasket(sessionId!, data.pictures);

      } catch (err) {
        if (controller.signal.aborted) return;

        console.error(err);

        setError(
          "We couldn't load your downloads. Please try refreshing this page."
        );

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
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
    mixed: "Mix & Match",
  };

  const collectionName =
    collectionNames[collection] ?? "";

  return (
    <main className="success-page">

      <h1>
        Thank You! <span aria-hidden="true">💗</span>
      </h1>

      <p>
        Thank you for supporting NOVÉA Printables!
      </p>

      <div role="status" aria-live="polite">
        {loading && (
          <p>Checking your purchase...</p>
        )}

        {!loading && !error && pictures.length > 0 && (
          <p className="verified">
            ✓ Your purchase is confirmed!
          </p>
        )}
      </div>

      {error && (
        <div role="alert" className="error">
          <p>{error}</p>

          <button
            type="button"
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && pictures.length > 0 && (
        <section aria-labelledby="download-heading">

          <h2 id="download-heading">
            Your {pictures.length} {collectionName} Coloring Pages
          </h2>

          <p>
            Your printable PDFs are ready to download individually.
          </p>

          <div className="downloads">

            {pictures.map((picture) => (
              <a
                key={picture.id}
                className="download-button"
                href={`/api/download?session_id=${encodeURIComponent(
                  sessionId!
                )}&picture=${encodeURIComponent(picture.id)}`}
              >
                Download {picture.name} PDF
              </a>
            ))}

          </div>

          <p className="download-note">
            Save each PDF to your device so you can print
            it whenever you like.
          </p>

          <p className="download-note">
            You can bookmark this page privately to return
            to your downloads later.
          </p>

        </section>
      )}

      <div className="back-section">
        <a href="/" className="back-button">
          ← Back to Shop
        </a>
      </div>

      <footer>
        Made with love, color &amp; a little creativity. ♡
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .success-page {
          min-height: 100vh;
          background-color: #fff7f2;
          text-align: center;
          padding: 60px 20px;
          font-family: Arial, sans-serif;
          color: #39313d;
          font-size: 1.125rem;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        h1 {
          font-family: Georgia, serif;
          font-size: clamp(2.25rem, 5vw, 3rem);
          font-weight: normal;
          line-height: 1.3;
          margin: 0 0 20px;
        }

        h2 {
          font-family: Georgia, serif;
          color: #8b3f70;
          font-size: clamp(1.625rem, 4vw, 2rem);
          font-weight: normal;
          line-height: 1.4;
          margin: 30px 0 15px;
        }

        p {
          font-size: 1.125rem;
          line-height: 1.7;
          max-width: 650px;
          margin: 15px auto;
        }

        .verified {
          color: #286344;
          font-weight: 600;
          margin-top: 25px;
        }

        .downloads {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-top: 30px;
        }

        .download-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 460px;
          min-height: 54px;
          padding: 16px 22px;
          background-color: #8b3f70;
          color: #ffffff;
          border-radius: 25px;
          text-decoration: none;
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 1.5;
          transition: background-color 0.2s;
        }

        .download-button:hover {
          background-color: #71315a;
        }

        a:focus-visible,
        button:focus-visible {
          outline: 3px solid #39313d;
          outline-offset: 5px;
        }

        .download-note {
          color: #594e5c;
          font-size: 1rem;
          margin-top: 25px;
        }

        .back-section {
          margin-top: 40px;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 12px 24px;
          border: 2px solid #8b3f70;
          border-radius: 25px;
          color: #8b3f70;
          background-color: #f9e3eb;
          font-size: 1.125rem;
          font-weight: 600;
          text-decoration: none;
        }

        .back-button:hover {
          background-color: #f1cddd;
        }

        .error {
          color: #b42318;
          margin: 25px auto;
          max-width: 600px;
        }

        .retry-button {
          min-height: 48px;
          padding: 12px 24px;
          background-color: #8b3f70;
          color: white;
          border: none;
          border-radius: 25px;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }

        footer {
          margin-top: 50px;
          padding: 20px 10px;
          color: #594e5c;
          font-size: 1rem;
          line-height: 1.7;
          font-family: Georgia, serif;
        }

        @media (max-width: 600px) {
          .success-page {
            padding: 40px 16px;
          }

          .download-button {
            padding: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .download-button {
            transition: none;
          }
        }
      `}</style>

    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <p
          role="status"
          style={{
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            fontSize: "1.125rem",
            padding: "40px 20px",
          }}
        >
          Loading your downloads...
        </p>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
