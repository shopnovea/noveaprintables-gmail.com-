
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

const christmasPictures = [
  {
    "name": "Cheerful Elf and Christmas Tree Coloring Page",
    "image": "/Cheerful Elf and Christmas Tree Coloring Page-preview.png"
  },
  {
    "name": "Festive Christmas Mantel Coloring Page",
    "image": "/Festive Christmas Mantel Coloring Page-preview.png"
  },
  {
    "name": "Festive Christmas Wreath Coloring Page",
    "image": "/Festive Christmas Wreath Coloring Page-preview.png"
  },
  {
    "name": "Festive Fireplace Gifts and Stockings",
    "image": "/Festive Fireplace Gifts and Stockings-preview.png"
  },
  {
    "name": "Festive Fireplace Stocking Scene",
    "image": "/Festive Fireplace Stocking Scene-preview.png"
  },
  {
    "name": "Festive Penguin with Gifts and Snowflakes",
    "image": "/Festive Penguin with Gifts and Snowflakes-preview.png"
  },
  {
    "name": "Festive Puppy Christmas Coloring Page",
    "image": "/Festive Puppy Christmas Coloring Page-preview.png"
  },
  {
    "name": "Festive Reindeer Coloring Scene",
    "image": "/Festive Reindeer Coloring Scene-preview.png"
  },
  {
    "name": "Gingerbread House Candy Wonderland",
    "image": "/Gingerbread House Candy Wonderland-preview.png"
  },
  {
    "name": "Polar Bear Christmas Coloring Page",
    "image": "/Polar Bear Christmas Coloring Page-preview.png"
  },
  {
    "name": "Polar Bear’s Snowy Gift Surprise",
    "image": "/Polar Bear’s Snowy Gift Surprise-preview.png"
  },
  {
    "name": "Santa’s Snowy Christmas Gift Scene",
    "image": "/Santa’s Snowy Christmas Gift Scene-preview.png"
  },
  {
    "name": "Snowman Decorating a Christmas Tree",
    "image": "/Snowman Decorating a Christmas Tree-preview.png"
  }
];

const bundles = [
  { count: 2, price: 149, label: "Mini Bundle", color: "#F9E3EB" },
  { count: 5, price: 299, label: "Little Bundle", color: "#F8E8C8" },
  { count: 10, price: 499, label: "Happy Bundle", color: "#E8E2F7" },
  { count: 20, price: 799, label: "Mega Bundle", color: "#DDF3F6", unavailable: true },
];

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ColoringPages() {
  const [bundleSize, setBundleSize] = useState(2);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bundle = bundles.find((item) => item.count === bundleSize)!;
  const remaining = bundleSize - selected.length;

  function chooseBundle(count: number) {
    setBundleSize(count);
    setSelected([]);
    setError("");
  }

  function togglePicture(id: string) {
    setError("");

    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= bundleSize) {
        return current;
      }

      return [...current, id];
    });
  }

  async function handleCheckout() {
    if (selected.length !== bundleSize) {
      setError(`Please choose exactly ${bundleSize} pictures.`);
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout");
      }

      if (!data.url) {
        throw new Error("Checkout URL is missing");
      }

      window.location.assign(data.url);
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Checkout is temporarily unavailable."
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
          letterSpacing: "1px",
          fontSize: "12px",
        }}
      >
        ← BACK TO SHOP
      </a>

      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(32px, 5vw, 44px)",
          marginTop: "35px",
          fontWeight: "normal",
        }}
      >
        Ocean Friends 🐢
      </h1>

      <h2 style={{ color: "#b26796", fontWeight: "normal" }}>
        Pick Your Favorite Pages
      </h2>

      <p style={{ color: "#786d79", lineHeight: 1.7 }}>
        Choose your bundle, then pick your favorite printable
        coloring pages.
      </p>

      <section
        style={{
          maxWidth: "1000px",
          margin: "35px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "15px",
        }}
      >
        {bundles.map((item) => {
          const active = bundleSize === item.count;
          const unavailable = Boolean(item.unavailable);

          return (
            <button
              key={item.count}
              type="button"
              disabled={unavailable || loading}
              onClick={() => chooseBundle(item.count)}
              style={{
                background: item.color,
                border: active ? "3px solid #b26796" : "3px solid transparent",
                borderRadius: "14px",
                padding: "20px 12px",
                cursor: unavailable ? "not-allowed" : "pointer",
                opacity: unavailable ? 0.65 : 1,
                color: "#39313d",
                fontFamily: "inherit",
              }}
            >
              <strong style={{ display: "block", fontSize: "16px" }}>
                {item.label}
              </strong>

              <span
                style={{
                  display: "block",
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#b26796",
                  margin: "8px 0",
                }}
              >
                {money(item.price)}
              </span>

              <span style={{ fontSize: "13px" }}>
                {item.count} coloring pages
              </span>

              {unavailable && (
                <span style={{ display: "block", marginTop: "8px", fontSize: "11px" }}>
                  COMING SOON
                </span>
              )}

              {active && (
                <span style={{ display: "block", marginTop: "8px", fontSize: "11px" }}>
                  ✓ SELECTED
                </span>
              )}
            </button>
          );
        })}
      </section>

      <h2 style={{ color: "#b26796", fontWeight: "normal" }}>
        Choose Your Coloring Pages
      </h2>

      <p style={{ color: "#786d79" }}>
        Select {bundleSize} different pictures for your {bundle.label}.
      </p>

      <p
        aria-live="polite"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "25px",
        }}
      >
        {selected.length} of {bundleSize} selected
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "22px",
          maxWidth: "1100px",
          margin: "35px auto",
        }}
      >
        {pictures.map((picture) => {
          const isSelected = selected.includes(picture.id);
          const isDisabled =
            loading || (selected.length >= bundleSize && !isSelected);

          return (
            <button
              key={picture.id}
              type="button"
              onClick={() => togglePicture(picture.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              style={{
                backgroundColor: "white",
                padding: "12px",
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
                  fontSize: "17px",
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
          boxShadow: "0 3px 15px #0000000c",
        }}
      >
        <h2 style={{ color: "#b26796", fontWeight: "normal" }}>
          Your {bundle.label}
        </h2>

        <div style={{ fontSize: "30px", fontWeight: "bold" }}>
          {money(bundle.price)}
        </div>

        <p>
          {selected.length === bundleSize
            ? `Your ${bundleSize} pictures are ready!`
            : `Choose ${remaining} more picture(s).`}
        </p>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading || selected.length !== bundleSize}
          style={{
            backgroundColor: "#b26796",
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: "25px",
            fontSize: "16px",
            cursor:
              loading || selected.length !== bundleSize
                ? "not-allowed"
                : "pointer",
            opacity:
              loading || selected.length !== bundleSize ? 0.5 : 1,
          }}
        >
          {loading
            ? "Opening checkout..."
            : `Buy ${bundleSize} Pages — ${money(bundle.price)}`}
        </button>

        {error && (
          <p role="alert" style={{ color: "#b42318", marginTop: "18px" }}>
            {error}
          </p>
        )}
      </section>

      <section style={{ maxWidth: "1100px", margin: "60px auto" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "36px", fontWeight: "normal" }}>
          Christmas Collection 🎄
        </h2>
        <p style={{ color: "#b26796", fontWeight: "bold" }}>COMING SOON</p>
        <p style={{ color: "#786d79" }}>Explore our festive coloring pages. Available to purchase soon!</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "22px", margin: "35px auto" }}>
          {christmasPictures.map((picture) => (
            <article key={picture.image} style={{ backgroundColor: "white", padding: "12px", borderRadius: "14px", boxShadow: "0 3px 12px #00000012" }}>
              <img src={encodeURI(picture.image)} alt={`${picture.name} preview`} loading="lazy" style={{ display: "block", width: "100%", height: "auto", borderRadius: "8px" }} />
              <p style={{ fontSize: "17px", fontWeight: "bold" }}>{picture.name}</p>
            </article>
          ))}
        </div>
      </section>

      <p style={{ color: "#98778f", fontSize: "12px" }}>
        ♡ Printable PDFs · Instant downloads · Made with love
      </p>
    </main>
  );
}
