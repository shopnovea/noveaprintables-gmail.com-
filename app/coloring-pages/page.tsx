
"use client";

import { useState } from "react";

export default function ColoringPages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Unable to start checkout");
      }

      const data = await response.json();

      if (!data.url) {
        throw new Error("Checkout URL is missing");
      }

      window.location.assign(data.url);
    } catch (err) {
      console.error("Checkout error:", err);

      setError(
        "Checkout is temporarily unavailable. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff7f2",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#39313d",
      }}
    >
      <a
        href="/"
        style={{
          color: "#b26796",
          textDecoration: "none",
        }}
      >
        ← BACK TO SHOP
      </a>

      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "42px",
          marginTop: "35px",
        }}
      >
        Ocean Friends 🐢
      </h1>

      <p>Sea Turtle Coloring Page</p>

      <p>1 Printable Page</p>

      <img
        src="/ocean-friends-preview.png"
        alt="Watermarked Ocean Friends turtle coloring page"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "450px",
          height: "auto",
          margin: "30px auto",
          borderRadius: "12px",
        }}
      />

      <h2
        style={{
          fontSize: "32px",
          marginTop: "25px",
          color: "#b26796",
        }}
      >
        $2.99
      </h2>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        style={{
          backgroundColor: "#b26796",
          color: "white",
          padding: "14px 30px",
          border: "none",
          borderRadius: "10px",
          fontSize: "17px",
          cursor: loading ? "wait" : "pointer",
          marginTop: "15px",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
          ? "Opening checkout..."
          : "Buy Now — $2.99"}
      </button>

      {error && (
        <p
          role="alert"
          style={{
            color: "#b42318",
            marginTop: "15px",
          }}
        >
          {error}
        </p>
      )}

      <p
        style={{
          marginTop: "30px",
          fontSize: "16px",
        }}
      >
        A cute sea turtle coloring page for kids and adults.
      </p>

      <p
        style={{
          color: "#98778f",
          marginTop: "15px",
        }}
      >
        Instant PDF download after purchase.
      </p>
    </main>
  );
}
