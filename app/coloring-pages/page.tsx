
"use client";

import { useEffect, useState } from "react";

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
    "id": "christmas-cheerful-elf-and-christmas-tree-coloring-page",
    "name": "Cheerful Elf and Christmas Tree Coloring Page",
    "image": "/Cheerful Elf and Christmas Tree Coloring Page-preview.png"
  },
  {
    "id": "christmas-festive-christmas-mantel-coloring-page",
    "name": "Festive Christmas Mantel Coloring Page",
    "image": "/Festive Christmas Mantel Coloring Page-preview.png"
  },
  {
    "id": "christmas-festive-christmas-wreath-coloring-page",
    "name": "Festive Christmas Wreath Coloring Page",
    "image": "/Festive Christmas Wreath Coloring Page-preview.png"
  },
  {
    "id": "christmas-festive-fireplace-gifts-and-stockings",
    "name": "Festive Fireplace Gifts and Stockings",
    "image": "/Festive Fireplace Gifts and Stockings-preview.png"
  },
  {
    "id": "christmas-festive-fireplace-stocking-scene",
    "name": "Festive Fireplace Stocking Scene",
    "image": "/Festive Fireplace Stocking Scene-preview.png"
  },
  {
    "id": "christmas-festive-penguin-with-gifts-and-snowflakes",
    "name": "Festive Penguin with Gifts and Snowflakes",
    "image": "/Festive Penguin with Gifts and Snowflakes-preview.png"
  },
  {
    "id": "christmas-festive-puppy-christmas-coloring-page",
    "name": "Festive Puppy Christmas Coloring Page",
    "image": "/Festive Puppy Christmas Coloring Page-preview.png"
  },
  {
    "id": "christmas-festive-reindeer-coloring-scene",
    "name": "Festive Reindeer Coloring Scene",
    "image": "/Festive Reindeer Coloring Scene-preview.png"
  },
  {
    "id": "christmas-gingerbread-house-candy-wonderland",
    "name": "Gingerbread House Candy Wonderland",
    "image": "/Gingerbread House Candy Wonderland-preview.png"
  },
  {
    "id": "christmas-polar-bear-christmas-coloring-page",
    "name": "Polar Bear Christmas Coloring Page",
    "image": "/Polar Bear Christmas Coloring Page-preview.png"
  },
  {
    "id": "christmas-polar-bears-snowy-gift-surprise",
    "name": "Polar Bear’s Snowy Gift Surprise",
    "image": "/Polar Bear’s Snowy Gift Surprise-preview.png"
  },
  {
    "id": "christmas-santas-snowy-christmas-gift-scene",
    "name": "Santa’s Snowy Christmas Gift Scene",
    "image": "/Santa’s Snowy Christmas Gift Scene-preview.png"
  },
  {
    "id": "christmas-snowman-decorating-a-christmas-tree",
    "name": "Snowman Decorating a Christmas Tree",
    "image": "/Snowman Decorating a Christmas Tree-preview.png"
  }
];

const thanksgivingPictures = [
  { id: "thanksgiving-dinner-table", name: "Thanksgiving Dinner Table", image: "/thanksgiving-dinner-table-preview.png" },
  { id: "thanksgiving-family-thanksgiving-dinner", name: "Family Thanksgiving Dinner", image: "/thanksgiving-family-thanksgiving-dinner-preview.png" },
  { id: "thanksgiving-feast", name: "Thanksgiving Feast", image: "/thanksgiving-feast-preview.png" },
  { id: "thanksgiving-harvest-boy", name: "Harvest Boy", image: "/thanksgiving-harvest-boy-preview.png" },
  { id: "thanksgiving-pilgrim-children", name: "Pilgrim Children", image: "/thanksgiving-pilgrim-children-preview.png" },
  { id: "thanksgiving-turkey-and-cornucopia", name: "Turkey and Cornucopia", image: "/thanksgiving-turkey-and-cornucopia-preview.png" },
  { id: "thanksgiving-turkey-family", name: "Turkey Family", image: "/thanksgiving-turkey-family-preview.png" },
];

const cozyPictures = [
  {"id": "cozy-cat-reading-nook", "name": "Cozy Cat Reading Nook", "image": "/cozy-cat-reading-nook-preview.png"},
  {"id": "cozy-cat-window-seat-retreat", "name": "Cozy Cat Window Seat Retreat", "image": "/cozy-cat-window-seat-retreat-preview.png"},
  {"id": "cozy-cottage-kitchen-baking-scene", "name": "Cozy Cottage Kitchen Baking Scene", "image": "/cozy-cottage-kitchen-baking-scene-preview.png"},
  {"id": "cozy-crafting-nook-still-life", "name": "Cozy Crafting Nook Still Life", "image": "/cozy-crafting-nook-still-life-preview.png"},
  {"id": "cozy-fireplace-reading-nook", "name": "Cozy Fireplace Reading Nook", "image": "/cozy-fireplace-reading-nook-preview.png"},
  {"id": "cozy-heart-themed-kitchen-baking-scene", "name": "Cozy Heart Themed Kitchen Baking Scene", "image": "/cozy-heart-themed-kitchen-baking-scene-preview.png"},
  {"id": "cozy-heartfelt-baking-kitchen", "name": "Cozy Heartfelt Baking Kitchen", "image": "/cozy-heartfelt-baking-kitchen-preview.png"},
  {"id": "cozy-rainy-window-nook", "name": "Cozy Rainy Window Nook", "image": "/cozy-rainy-window-nook-preview.png"},
  {"id": "cozy-reading-nook-with-cat", "name": "Cozy Reading Nook with Cat", "image": "/cozy-reading-nook-with-cat-preview.png"},
];

const flowersPictures = [
  {"id": "flowers-ornate-butterfly-in-a-blooming-garden", "name": "Ornate Butterfly in a Blooming Garden", "image": "/flowers-ornate-butterfly-in-a-blooming-garden-preview.png"},
  {"id": "flowers-ornate-butterfly-over-floral-bouquet", "name": "Ornate Butterfly Over Floral Bouquet", "image": "/flowers-ornate-butterfly-over-floral-bouquet-preview.png"},
  {"id": "flowers-tropical-garden-with-butterflies", "name": "Tropical Garden with Butterflies", "image": "/flowers-tropical-garden-with-butterflies-preview.png"},
  {"id": "flowers-botanical-bouquet-with-butterfly-and-bow", "name": "Botanical Bouquet with Butterfly and Bow", "image": "/flowers-botanical-bouquet-with-butterfly-and-bow-preview.png"},
  {"id": "flowers-botanical-bouquet-with-butterfly", "name": "Botanical Bouquet with Butterfly", "image": "/flowers-botanical-bouquet-with-butterfly-preview.png"},
  {"id": "flowers-botanical-hibiscus-and-butterfly-garden", "name": "Botanical Hibiscus and Butterfly Garden", "image": "/flowers-botanical-hibiscus-and-butterfly-garden-preview.png"},
  {"id": "flowers-botanical-lily-bouquet-with-butterfly", "name": "Botanical Lily Bouquet with Butterfly", "image": "/flowers-botanical-lily-bouquet-with-butterfly-preview.png"},
  {"id": "flowers-butterfly-among-garden-blooms", "name": "Butterfly Among Garden Blooms", "image": "/flowers-butterfly-among-garden-blooms-preview.png"},
  {"id": "flowers-butterfly-on-a-hibiscus-garden", "name": "Butterfly on a Hibiscus Garden", "image": "/flowers-butterfly-on-a-hibiscus-garden-preview.png"},
  {"id": "flowers-daisy-garden-with-ornate-butterfly", "name": "Daisy Garden with Ornate Butterfly", "image": "/flowers-daisy-garden-with-ornate-butterfly-preview.png"},
  {"id": "flowers-detailed-floral-bouquet-in-mason-jar", "name": "Detailed Floral Bouquet in Mason Jar", "image": "/flowers-detailed-floral-bouquet-in-mason-jar-preview.png"},
  {"id": "flowers-floral-mason-jar-coloring-page", "name": "Floral Mason Jar Coloring Page", "image": "/flowers-floral-mason-jar-coloring-page-preview.png"},
  {"id": "flowers-hibiscus-bouquet-with-butterfly", "name": "Hibiscus Bouquet with Butterfly", "image": "/flowers-hibiscus-bouquet-with-butterfly-preview.png"},
  {"id": "flowers-hibiscus-garden-with-butterfly", "name": "Hibiscus Garden with Butterfly", "image": "/flowers-hibiscus-garden-with-butterfly-preview.png"},
  {"id": "flowers-intricate-botanical-blooms-and-butterflies", "name": "Intricate Botanical Blooms and Butterflies", "image": "/flowers-intricate-botanical-blooms-and-butterflies-preview.png"},
  {"id": "flowers-intricate-floral-bouquet-with-butterfly", "name": "Intricate Floral Bouquet with Butterfly", "image": "/flowers-intricate-floral-bouquet-with-butterfly-preview.png"},
];

type Collection = "holiday" | "all" | "ocean" | "christmas" | "thanksgiving" | "cozy" | "flowers";
const allPictures = [...christmasPictures, ...cozyPictures, ...flowersPictures, ...pictures, ...thanksgivingPictures];
const collectionOptions: { id: Collection; label: string; title: string }[] = [
  { id: "all", label: "All Collections", title: "All Collections" },
  { id: "christmas", label: "Christmas", title: "Christmas Collection 🎄" },
  { id: "cozy", label: "Cozy Little Moments", title: "Cozy Little Moments ☕" },
  { id: "flowers", label: "Flowers & Butterflies", title: "Flowers & Butterflies 🦋" },
  { id: "holiday", label: "Holiday Collections", title: "Holiday Collections 🎄" },
  { id: "ocean", label: "Ocean Friends", title: "Ocean Friends 🐢" },
  { id: "thanksgiving", label: "Thanksgiving", title: "Thanksgiving Collection 🍂" },
];

const bundles = [
  { count: 2, price: 149, label: "Mini Bundle", color: "#F9E3EB" },
  { count: 5, price: 299, label: "Little Bundle", color: "#F8E8C8" },
  { count: 10, price: 499, label: "Happy Bundle", color: "#E8E2F7" },
  { count: 20, price: 799, label: "Mega Bundle", color: "#DDF3F6" },
];

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ColoringPages() {
  const [collection, setCollection] = useState<Collection>("all");
  const [bundleSize, setBundleSize] = useState(2);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [holidayEntry, setHolidayEntry] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("collection");
    if (requested === "christmas" || requested === "thanksgiving") {
      setCollection(requested);
      setHolidayEntry(false);
    } else if (requested === "cozy" || requested === "flowers" || requested === "ocean" || requested === "holiday") {
      setCollection(requested);
    }
    try {
      const saved = JSON.parse(sessionStorage.getItem("novea-basket-v1") || "null");
      if (saved && [2, 5, 10, 20].includes(saved.bundleSize) && Array.isArray(saved.selected)) {
        const allowed = new Set(allPictures.map(p => p.id));
        const ids = saved.selected.filter((id: unknown): id is string => typeof id === "string" && allowed.has(id));
        setBundleSize(saved.bundleSize);
        setSelected(Array.from(new Set<string>(ids)).slice(0, saved.bundleSize));
      }
    } catch { /* Storage may be unavailable. */ }
    setReady(true);
  }, []);


  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem("novea-basket-v1", JSON.stringify({ bundleSize, selected }));
    } catch { /* Shopping still works without storage. */ }
  }, [ready, bundleSize, selected]);

  const bundle = bundles.find((item) => item.count === bundleSize)!;
  const remaining = bundleSize - selected.length;

  function chooseBundle(count: number) {
    setBundleSize(count);
    setSelected(current => current.slice(0, count));
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
          collection,
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

  if (!ready) return null;

  return (
    <main className="coloring-accessible"
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff7f2",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#39313d",
        fontSize: "1.125rem",
        lineHeight: 1.6,
      }}
    >
      <a
        href={holidayEntry ? "/holiday" : "/"}
        style={{
          color: "#8b3f70",
          textDecoration: "underline",
          letterSpacing: "1px",
          fontSize: "1rem",
        }}
      >
        {holidayEntry ? "← BACK TO HOLIDAY" : "← BACK TO SHOP"}
      </a>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 44px)", fontWeight: "normal", marginTop: "35px" }}>NOVÉA Coloring Pages</h1>
      <h2
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(32px, 5vw, 44px)",
          marginTop: "35px",
          fontWeight: "normal",
        }}
      >
        {collectionOptions.find(option => option.id === collection)?.title}
      </h2>

      <section aria-labelledby="mix-match-heading" style={{ backgroundColor: "#E8E2F7", color: "#39313d", borderRadius: "16px", padding: "20px", maxWidth: "850px", margin: "24px auto", lineHeight: 1.6 }}>
        <h2 id="mix-match-heading" style={{ color: "#794367", fontSize: "1.5rem", margin: "0 0 10px" }}>♡ Explore, Switch &amp; Mix!</h2>
        <p style={{ margin: "0 0 8px", fontSize: "1.125rem" }}>Choose pictures from any collection to build your perfect bundle.</p>
        <p style={{ margin: 0, fontSize: "1.125rem" }}>Switch between collections as often as you like — your selected pictures stay in your basket until you&apos;re ready to check out!</p>
      </section>
      <nav aria-label="Coloring page collections" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", margin: "20px auto" }}>
        {collectionOptions.map(option => (
          <a key={option.id}
            href={option.id === "all" ? "/coloring-pages" : `/coloring-pages?collection=${option.id}`}
            aria-current={collection === option.id ? "page" : undefined}
            onClick={(event) => { if (loading) event.preventDefault(); }}
            style={{ display: "inline-block", color: collection === option.id ? "white" : "#8b3f70", backgroundColor: collection === option.id ? "#8b3f70" : "#f9e3eb", padding: "12px 20px", border: "1px solid #8b3f70", borderRadius: "20px", fontWeight: 600, textDecoration: "none" }}>
            {option.label}
          </a>
        ))}
      </nav>
      <h2 style={{ color: "#8b3f70", fontWeight: "normal" }}>
        Pick Your Favorite Pages
      </h2>

      <p style={{ color: "#594e5c", lineHeight: 1.7 }}>
        Choose your bundle, then pick your favorite printable
        coloring pages.
      </p>

      <section
        style={{
          maxWidth: "1000px",
          margin: "35px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
          gap: "15px",
        }}
      >
        {bundles.map((item) => {
          const active = bundleSize === item.count;
          const unavailable = false;

          return (
            <button
              key={item.count}
              type="button"
              disabled={unavailable || loading}
              aria-pressed={active}
              onClick={() => chooseBundle(item.count)}
              style={{
                background: item.color,
                border: active ? "3px solid #8b3f70" : "3px solid transparent",
                borderRadius: "14px",
                padding: "20px 12px",
                cursor: unavailable ? "not-allowed" : "pointer",
                opacity: unavailable ? 0.65 : 1,
                color: "#39313d",
                fontFamily: "inherit",
              }}
            >
              <strong style={{ display: "block", fontSize: "1.25rem" }}>
                {item.label}
              </strong>

              <span
                style={{
                  display: "block",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#8b3f70",
                  margin: "8px 0",
                }}
              >
                {money(item.price)}
              </span>

              <span style={{ fontSize: "1rem" }}>
                {item.count} coloring pages
              </span>

              {unavailable && (
                <span style={{ display: "block", marginTop: "8px", fontSize: "1rem" }}>
                  COMING SOON
                </span>
              )}

              {active && (
                <span style={{ display: "block", marginTop: "8px", fontSize: "1rem" }}>
                  ✓ SELECTED
                </span>
              )}
            </button>
          );
        })}
      </section>

      <h2 style={{ color: "#8b3f70", fontWeight: "normal" }}>
        Choose Your Coloring Pages
      </h2>

      <p style={{ color: "#594e5c" }}>
        {collection === "holiday" ? "Choose a holiday below to explore its coloring pages." : `Select ${bundleSize} different pictures for your ${bundle.label}.`}
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

      {collection === "holiday" ? (
        <section aria-label="Choose a holiday" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "22px", maxWidth: "850px", margin: "35px auto" }}>
          {[
            { id: "christmas", title: "Christmas", emoji: "🎄", count: christmasPictures.length, color: "#F9E3EB" },
            { id: "thanksgiving", title: "Thanksgiving", emoji: "🍂", count: thanksgivingPictures.length, color: "#F8E8C8" },
          ].map(holiday => (
            <a key={holiday.id} href={`/coloring-pages?collection=${holiday.id}`} onClick={event => { if (loading) event.preventDefault(); }} style={{ display: "block", backgroundColor: holiday.color, color: "#39313d", border: "1px solid #8b3f70", borderRadius: "16px", padding: "28px 20px", textDecoration: "none" }}>
              <span aria-hidden="true" style={{ display: "block", fontSize: "2.5rem" }}>{holiday.emoji}</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#8b3f70", margin: "12px 0" }}>{holiday.title}</h3>
              <span>{holiday.count} coloring pages</span>
              <span style={{ display: "block", color: "#8b3f70", textDecoration: "underline", marginTop: "12px" }}>Explore collection</span>
            </a>
          ))}
        </section>
      ) : (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
          gap: "22px",
          maxWidth: "1100px",
          margin: "35px auto",
        }}
      >
        {(collection === "all" ? allPictures : collection === "ocean" ? pictures : collection === "christmas" ? christmasPictures : collection === "thanksgiving" ? thanksgivingPictures : collection === "cozy" ? cozyPictures : flowersPictures).map((picture) => {
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
                backgroundColor: "transparent",
                padding: "0",
                borderRadius: "14px",
                border: "none",
                alignSelf: "start",
                cursor: isDisabled ? "default" : "pointer",
                opacity: 1,
                color: "#39313d",
                fontFamily: "inherit",
              }}
            >
              <span style={{ display: "block", backgroundColor: "white", padding: "12px", borderRadius: "14px", border: isSelected ? "3px solid #8b3f70" : "3px solid transparent", boxShadow: "0 3px 12px #00000012" }}>
              <img
                src={encodeURI(picture.image)}
                alt={`${picture.name} coloring page preview`}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
              </span>

              <span
                style={{
                  display: "block",
                  marginTop: "15px",
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                }}
              >
                {picture.name}
              </span>

              <span
                style={{
                  display: "block",
                  marginTop: "8px",
                  color: isSelected ? "#8b3f70" : "#594e5c",
                  fontSize: "1rem",
                }}
              >
                {isSelected ? "✓ Selected" : isDisabled ? "Unavailable" : "Select picture"}
              </span>
            </button>
          );
        })}
      </div>
      )}

      {selected.length > 0 && (
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
        <h2 style={{ color: "#8b3f70", fontWeight: "normal" }}>
          Your {bundle.label}
        </h2>

        <p>Your basket — {selected.length} of {bundleSize} pages</p>
        <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
          {selected.map(id => {
            const picture = allPictures.find(p => p.id === id);
            return <li key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "8px 0" }}>
              <span style={{ overflowWrap: "anywhere", minWidth: 0 }}>{picture?.name ?? id}</span>
              <button className="basket-action" type="button" aria-label={`Remove ${picture?.name ?? id}`} disabled={loading} onClick={() => togglePicture(id)}>Remove</button>
            </li>;
          })}
        </ul>
        <button className="basket-action" type="button" disabled={loading} onClick={() => { setSelected([]); setError(""); }}>Clear basket</button>
        <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "15px" }}>
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
            backgroundColor: "#8b3f70",
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: "25px",
            fontSize: "1.125rem",
            fontWeight: 600,
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

      )}
      <section aria-labelledby="personal-use-heading" style={{ backgroundColor: "#F9E3EB", color: "#39313d", borderRadius: "16px", padding: "20px", maxWidth: "650px", margin: "30px auto", lineHeight: 1.7 }}>
        <h2 id="personal-use-heading" style={{ color: "#794367", fontSize: "1.5rem", margin: "0 0 12px" }}>♡ Made with Love, for Personal Use</h2>
        <p style={{ margin: "0 0 12px" }}>Your purchased coloring pages may be printed as often as you like for personal use. Please do not share, redistribute, resell or upload the digital files elsewhere.</p>
        <p style={{ margin: 0 }}>Thank you for supporting NOVÉA Printables!</p>
      </section>

      <p style={{ color: "#594e5c", fontSize: "1rem" }}>
        ♡ Printable PDFs · Instant downloads · Made with love
      </p>
      <style jsx>{`
        .coloring-accessible { overflow-wrap: anywhere; }
        .coloring-accessible button { font-family: inherit; line-height: 1.5; min-height: 44px; max-width: 100%; }
        .coloring-accessible a { display: inline-block; padding-block: 10px; }
        .coloring-accessible button:focus-visible,
        .coloring-accessible a:focus-visible { outline: 3px solid #39313d; outline-offset: 4px; }
        .basket-action { background: #f9e3eb; color: #783e65; border: 1px solid #8b3f70; border-radius: 24px; padding: 9px 16px; font-size: 1rem; font-weight: 600; cursor: pointer; flex-shrink: 0; }
        .basket-action:hover:not(:disabled) { background: #efd0df; }
        .basket-action:disabled { cursor: not-allowed; }
        @media (max-width: 420px) { .coloring-accessible li { flex-wrap: wrap; } }
      `}</style>
    </main>
  );
}

