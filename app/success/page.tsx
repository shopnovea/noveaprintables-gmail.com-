
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type PurchasedPicture = {
  id: string;
  name: string;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [pictures, setPictures] = useState<PurchasedPicture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No checkout session was found.");
      return;
    }

    async function loadPurchase() {
      try {
        const response = await fetch(
          `/api/purchase?session_id=${encodeURIComponent(sessionId!)}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Purchase verification failed");
        }

        const data = await response.json();

        if (!Array.isArray(data.pictures) || data.pictures.length !== 5) {
          throw new Error("Invalid purchase details");
        }

        setPictures(data.pictures);
      } catch (err) {
        console.error(err);
        setError(
          "We couldn't load your downloads. Please try refreshing this page."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPurchase();
  }, [sessionId]);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff7f2",
        textAlign: "center",
        padding: "70px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#39313d",
      }}
    >
      <h1>Thank You! 🐢💗</h1>

      <p>Thank you for supporting NOVÉA Printables!</p>

      {loading && <p>Checking your purchase...</p>}

      {error && (
        <p role="alert" style={{ color: "#b42318" }}>
          {error}
        </p>
      )}

      {!loading && !error && pictures.length === 5 && (
        <>
          <h2 style={{ color: "#b26796", marginTop: "30px" }}>
            Your 5 Ocean Friends Coloring Pages
          </h2>

          <p>
            Your printable PDFs are ready to download individually.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            {pictures.map((picture) => (
              <a
                key={picture.id}
                href={`/api/download?session_id=${encodeURIComponent(
                  sessionId!
                )}&picture=${encodeURIComponent(picture.id)}`}
                style={{
                  display: "inline-block",
                  width: "100%",
                  maxWidth: "330px",
                  padding: "15px 20px",
                  backgroundColor: "#b26796",
                  color: "white",
                  borderRadius: "25px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  boxSizing: "border-box",
                }}
              >
                Download {picture.name} PDF
              </a>
            ))}
          </div>

          <p style={{ marginTop: "30px", fontSize: "14px" }}>
            Save each PDF to your device so you can print it whenever you like.
          </p>
        </>
      )}

      <p style={{ marginTop: "40px" }}>
        <a href="/" style={{ color: "#b26796" }}>
          ← Back to Shop
        </a>
      </p>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading your downloads...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
