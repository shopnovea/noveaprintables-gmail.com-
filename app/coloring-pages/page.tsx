
"use client";

import { useState } from "react";

const pictures = [
  {
    name: "Sea Turtle",
    image: "/ocean-friends-turtle-preview.png",
  },
  {
    name: "Cute Octopus",
    image: "/ocean-friends-cute-octopus-preview.png",
  },
  {
    name: "Dolphin",
    image: "/ocean-friends-dolphin-preview.png",
  },
  {
    name: "Happy Crab",
    image: "/ocean-friends-happy-crab-preview.png",
  },
  {
    name: "Seashell Friends",
    image: "/ocean-friends-seashell-friends-preview.png",
  },
  {
    name: "Shark",
    image: "/ocean-friends-shark-preview.png",
  },
  {
    name: "Smiling Jellyfish",
    image: "/ocean-friends-smiling-jellyfish-preview.png",
  },
  {
    name: "Starfish",
    image: "/ocean-friends-starfish-preview.png",
  },
  {
    name: "Tropical Fish",
    image: "/ocean-friends-tropical-fish-preview.png",
  },
  {
    name: "Whale",
    image: "/ocean-friends-whale-preview.png",
  },
];

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

      <p
        style={{
          fontSize: "18px",
          marginTop: "15px",
        }}
      >
        Explore our adorable ocean-themed coloring pages!
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
          maxWidth: "1100px",
          margin: "35px auto",
        }}
      >
        {pictures.map((picture) => (
          <div
            key={picture.image}
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "14px",
              boxShadow: "0 3px 12px #00000012",
            }}
          >
            <img
              src={picture.image}
              alt={`${picture.name} coloring page preview`}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />

            <h3
              style={{
                marginTop: "15px",
                fontSize: "18px",
              }}
            >
              {picture.name}
            </h3>
          </div>
        ))}
      </div>

      <section
        style={{
          backgroundColor: "white",
          maxWidth: "600px",
          margin: "40px auto",
          padding: "30px 20px",
          borderRadius: "16px",
          boxShadow: "0 3px 12px #00000012",
        }}
      >
        <h2
          style={{
            color: "#b26796",
            fontSize: "30px",
          }}
        >
          Sea Turtle Printable — $2.99
        </h2>

        <p
          style={{
            marginTop: "15px",
            lineHeight: "1.6",
          }}
        >
          Purchase includes one printable sea turtle
          coloring page PDF. Other pictures are
          previews only and are not included
          in this purchase.
        </p>

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
            : "Buy Sea Turtle — $2.99"}
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
            color: "#98778f",
            marginTop: "25px",
          }}
        >
          Instant PDF download after purchase.
        </p>
      </section>
    </main>
  );
}
