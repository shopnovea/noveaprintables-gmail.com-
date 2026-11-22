
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

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

      <p>
        Thank you for supporting NOVĒA Printables!
      </p>

      {sessionId ? (
        <>
          <p>
            Your Ocean Friends coloring page is ready.
          </p>

          <a
            href={`/api/download?session_id=${encodeURIComponent(sessionId)}`}
            style={{
              display: "inline-block",
              marginTop: "25px",
              padding: "15px 30px",
              backgroundColor: "#b26796",
              color: "white",
              borderRadius: "25px",
              textDecoration: "none",
            }}
          >
            Download Your Coloring Page
          </a>
        </>
      ) : (
        <p>
          No checkout session was found.
        </p>
      )}

      <p style={{ marginTop: "35px" }}>
        <a href="/">← Back to Shop</a>
      </p>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
