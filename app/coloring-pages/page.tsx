
"use client";

import { useState } from "react";

const pictures = [
  { id: "turtle", name: "Sea Turtle", image: "/ocean-friends-turtle-preview.png" },
  { id: "cute-octopus", name: "Cute Octopus", image: "/ocean-friends-cute-octopus-preview.png" },
  { id: "dolphin", name: "Dolphin", image: "/ocean-friends-dolphin-preview.png" },
  { id: "happy-crab", name: "Happy Crab", image: "/ocean-friends-happy-crab-preview.png" },
  { id: "seashell-friends", name: "Seashell Friends", image: "/ocean-friends-seashell-friends-preview.png" },
  { id: "shark", name: "Shark", image: "/ocean-friends-shark-preview.png" },
  { id: "smiling-jellyfish", name: "Smiling Jellyfish", image: "/ocean-friends-smiling-jellyfish-preview.png" },
  { id: "starfish", name: "Starfish", image: "/ocean-friends-starfish-preview.png" },
  { id: "tropical-fish", name: "Tropical Fish", image: "/ocean-friends-tropical-fish-preview.png" },
  { id: "whale", name: "Whale", image: "/ocean-friends-whale-preview.png" },
];

export default function ColoringPages() {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function togglePicture(id: string) {
    setError("");

    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 5) {
        return current;
      }

      return [...current, id];
    });
  }

  async function handleCheckout() {
    if (selected.length !== 5) {
      setError("Please choose exactly 5 pictures.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedPictures: selected,
        }),
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
      setError("Checkout is temporarily unavailable.");
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

      <h2 style={{ color: "#b26796" }}>
        Pick Any 5 Coloring Pages — $2.99
      </h2>

      <p>
        Choose your 5 favorite Ocean Friends pictures.
        Each purchase includes 5 printable PDF pages.
      </p>

      <p
        aria-live="polite"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "25px",
        }}
      >
        {selected.length} of 5 selected
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
        {pictures.map((picture) => {
          const isSelected = selected.includes(picture.id);
          const isDisabled =
            loading || (selected.length === 5 && !isSelected);

          return (
            <button
              key={picture.id}
              type="button"
              onClick={() => togglePicture(picture.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "14px",
                border: isSelected
                  ? "3px solid #b26796"
                  : "3px solid transparent",
                boxShadow: "0 3px 12px #00000012",
                cursor: isDisabled ? "default" : "pointer",
                opacity: isDisabled ? 0.55 : 1,
                color: "#39313d",
                fontFamily: "inherit",
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

              <span
                style={{
                  display: "block",
                  marginTop: "15px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {picture.name}
              </span>

              <span
                style={{
                  display: "block",
                  marginTop: "8px",
                  color: isSelected ? "#9a3f78" : "#777",
                }}
              >
                {isSelected ? "✓ Selected" : "Select picture"}
              </span>
            </button>
          );
        })}
      </div>

      <section
        style={{
          backgroundColor: "white",
          maxWidth: "600px",
          margin: "40px auto",
          padding: "30px 20px",
          borderRadius: "16px",
        }}
      >
        <h2 style={{ color: "#b26796" }}>
          Your 5-Page Bundle — $2.99
        </h2>

        <p>
          {selected.length === 5
            ? "Your five pictures are selected!"
            : `Choose ${5 - selected.length} more picture(s).`}
        </p>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading || selected.length !== 5}
          style={{
            backgroundColor: "#b26796",
            color: "white",
            padding: "14px 30px",
            border: "none",
            borderRadius: "10px",
            fontSize: "17px",
            cursor:
              loading || selected.length !== 5
                ? "not-allowed"
                : "pointer",
            opacity:
              loading || selected.length !== 5 ? 0.5 : 1,
          }}
        >
          {loading
            ? "Opening checkout..."
            : "Buy My 5 Pictures — $2.99"}
        </button>

        {error && (
          <p role="alert" style={{ color: "#b42318" }}>
            {error}
          </p>
        )}
      </section>
    </main>
  );
}
