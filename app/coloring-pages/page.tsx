
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
  {"id": "christmas_01_tree_with_garland", "name": "Tree With Garland", "image": "/christmas_01_tree_with_garland_preview.jpg"},
  {"id": "christmas_02_tree_with_bow", "name": "Tree With Bow", "image": "/christmas_02_tree_with_bow_preview.jpg"},
  {"id": "christmas_03_ornament_wreath", "name": "Ornament Wreath", "image": "/christmas_03_ornament_wreath_preview.jpg"},
  {"id": "christmas_04_holiday_fireplace", "name": "Holiday Fireplace", "image": "/christmas_04_holiday_fireplace_preview.jpg"},
  {"id": "christmas_05_classic_tree", "name": "Classic Tree", "image": "/christmas_05_classic_tree_preview.jpg"},
  {"id": "christmas_06_evergreen_wreath", "name": "Evergreen Wreath", "image": "/christmas_06_evergreen_wreath_preview.jpg"},
  {"id": "christmas_07_snowflake_ornament", "name": "Snowflake Ornament", "image": "/christmas_07_snowflake_ornament_preview.jpg"},
  {"id": "christmas_08_christmas_sleigh", "name": "Christmas Sleigh", "image": "/christmas_08_christmas_sleigh_preview.jpg"},
  {"id": "christmas_09_christmas_bells", "name": "Christmas Bells", "image": "/christmas_09_christmas_bells_preview.jpg"},
  {"id": "christmas_10_snowy_cottage", "name": "Snowy Cottage", "image": "/christmas_10_snowy_cottage_preview.jpg"},
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
  {"id": "thanksgiving_01_harvest_cornucopia", "name": "Harvest Cornucopia", "image": "/thanksgiving_01_harvest_cornucopia_preview.jpg"},
  {"id": "thanksgiving_02_thanksgiving_dinner", "name": "Thanksgiving Dinner", "image": "/thanksgiving_02_thanksgiving_dinner_preview.jpg"},
  {"id": "thanksgiving_03_harvest_basket", "name": "Harvest Basket", "image": "/thanksgiving_03_harvest_basket_preview.jpg"},
  {"id": "thanksgiving_04_fruit_cornucopia", "name": "Fruit Cornucopia", "image": "/thanksgiving_04_fruit_cornucopia_preview.jpg"},
  {"id": "thanksgiving_05_pumpkin_and_wheat", "name": "Pumpkin And Wheat", "image": "/thanksgiving_05_pumpkin_and_wheat_preview.jpg"},
  {"id": "thanksgiving_06_wild_turkey", "name": "Wild Turkey", "image": "/thanksgiving_06_wild_turkey_preview.jpg"},
  {"id": "thanksgiving_07_apple_cornucopia", "name": "Apple Cornucopia", "image": "/thanksgiving_07_apple_cornucopia_preview.jpg"},
  {"id": "thanksgiving_08_pumpkin_pie", "name": "Pumpkin Pie", "image": "/thanksgiving_08_pumpkin_pie_preview.jpg"},
  {"id": "thanksgiving_09_sunflower_vase", "name": "Sunflower Vase", "image": "/thanksgiving_09_sunflower_vase_preview.jpg"},
  {"id": "thanksgiving_10_apple_basket", "name": "Apple Basket", "image": "/thanksgiving_10_apple_basket_preview.jpg"},
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

const farmPictures = [
  {
    "id": "farm_01_cow",
    "name": "Cow",
    "image": "/farm_01_cow_preview.jpg"
  },
  {
    "id": "farm_02_horse",
    "name": "Horse",
    "image": "/farm_02_horse_preview.jpg"
  },
  {
    "id": "farm_03_sheep",
    "name": "Sheep",
    "image": "/farm_03_sheep_preview.jpg"
  },
  {
    "id": "farm_04_goat",
    "name": "Goat",
    "image": "/farm_04_goat_preview.jpg"
  },
  {
    "id": "farm_05_pig",
    "name": "Pig",
    "image": "/farm_05_pig_preview.jpg"
  },
  {
    "id": "farm_06_rabbit",
    "name": "Rabbit",
    "image": "/farm_06_rabbit_preview.jpg"
  },
  {
    "id": "farm_07_duck",
    "name": "Duck",
    "image": "/farm_07_duck_preview.jpg"
  },
  {
    "id": "farm_08_rooster",
    "name": "Rooster",
    "image": "/farm_08_rooster_preview.jpg"
  },
  {
    "id": "farm_09_hen",
    "name": "Hen",
    "image": "/farm_09_hen_preview.jpg"
  },
  {
    "id": "farm_10_goose",
    "name": "Goose",
    "image": "/farm_10_goose_preview.jpg"
  },
  {
    "id": "farm_11_donkey",
    "name": "Donkey",
    "image": "/farm_11_donkey_preview.jpg"
  },
  {
    "id": "farm_12_llama",
    "name": "Llama",
    "image": "/farm_12_llama_preview.jpg"
  },
  {
    "id": "farm_13_alpaca",
    "name": "Alpaca",
    "image": "/farm_13_alpaca_preview.jpg"
  },
  {
    "id": "farm_14_turkey",
    "name": "Turkey",
    "image": "/farm_14_turkey_preview.jpg"
  },
  {
    "id": "farm_15_calf",
    "name": "Calf",
    "image": "/farm_15_calf_preview.jpg"
  },
  {
    "id": "farm_16_foal",
    "name": "Foal",
    "image": "/farm_16_foal_preview.jpg"
  },
  {
    "id": "farm_17_lamb",
    "name": "Lamb",
    "image": "/farm_17_lamb_preview.jpg"
  },
  {
    "id": "farm_18_chick",
    "name": "Chick",
    "image": "/farm_18_chick_preview.jpg"
  },
  {
    "id": "farm_19_cat",
    "name": "Cat",
    "image": "/farm_19_cat_preview.jpg"
  },
  {
    "id": "farm_20_dog",
    "name": "Dog",
    "image": "/farm_20_dog_preview.jpg"
  }
];

const woodlandPictures = [
  {
    "id": "woodland_01_baby_deer",
    "name": "Baby Deer",
    "image": "/woodland_01_baby_deer_preview.jpg"
  },
  {
    "id": "woodland_02_bunny_rabbit",
    "name": "Bunny Rabbit",
    "image": "/woodland_02_bunny_rabbit_preview.jpg"
  },
  {
    "id": "woodland_03_little_fox",
    "name": "Little Fox",
    "image": "/woodland_03_little_fox_preview.jpg"
  },
  {
    "id": "woodland_04_hedgehog",
    "name": "Hedgehog",
    "image": "/woodland_04_hedgehog_preview.jpg"
  },
  {
    "id": "woodland_05_squirrel",
    "name": "Squirrel",
    "image": "/woodland_05_squirrel_preview.jpg"
  },
  {
    "id": "woodland_06_owl",
    "name": "Owl",
    "image": "/woodland_06_owl_preview.jpg"
  },
  {
    "id": "woodland_07_raccoon",
    "name": "Raccoon",
    "image": "/woodland_07_raccoon_preview.jpg"
  },
  {
    "id": "woodland_08_bear_cub",
    "name": "Bear Cub",
    "image": "/woodland_08_bear_cub_preview.jpg"
  },
  {
    "id": "woodland_09_beaver",
    "name": "Beaver",
    "image": "/woodland_09_beaver_preview.jpg"
  },
  {
    "id": "woodland_10_chipmunk",
    "name": "Chipmunk",
    "image": "/woodland_10_chipmunk_preview.jpg"
  },
  {
    "id": "woodland_11_badger",
    "name": "Badger",
    "image": "/woodland_11_badger_preview.jpg"
  },
  {
    "id": "woodland_12_skunk",
    "name": "Skunk",
    "image": "/woodland_12_skunk_preview.jpg"
  },
  {
    "id": "woodland_13_woodpecker",
    "name": "Woodpecker",
    "image": "/woodland_13_woodpecker_preview.jpg"
  },
  {
    "id": "woodland_14_moose",
    "name": "Moose",
    "image": "/woodland_14_moose_preview.jpg"
  },
  {
    "id": "woodland_15_wolf_pup",
    "name": "Wolf Pup",
    "image": "/woodland_15_wolf_pup_preview.jpg"
  },
  {
    "id": "woodland_16_bobcat",
    "name": "Bobcat",
    "image": "/woodland_16_bobcat_preview.jpg"
  },
  {
    "id": "woodland_17_otter",
    "name": "Otter",
    "image": "/woodland_17_otter_preview.jpg"
  },
  {
    "id": "woodland_18_forest_turtle",
    "name": "Forest Turtle",
    "image": "/woodland_18_forest_turtle_preview.jpg"
  },
  {
    "id": "woodland_19_frog",
    "name": "Frog",
    "image": "/woodland_19_frog_preview.jpg"
  },
  {
    "id": "woodland_20_butterfly",
    "name": "Butterfly",
    "image": "/woodland_20_butterfly_preview.jpg"
  }
];

type Collection = "animals" | "holiday" | "all" | "ocean" | "christmas" | "thanksgiving" | "cozy" | "flowers" | "farm" | "woodland";
const allPictures = [...christmasPictures, ...cozyPictures, ...flowersPictures, ...farmPictures, ...pictures, ...thanksgivingPictures, ...woodlandPictures];
const collectionOptions: { id: Collection; label: string; title: string }[] = [
  { id: "all", label: "All Collections", title: "All Collections" },
  { id: "animals", label: "Animal Coloring", title: "Animal Coloring 🐾" },
  { id: "christmas", label: "Christmas", title: "Christmas Collection 🎄" },
  { id: "cozy", label: "Cozy Little Moments", title: "Cozy Little Moments ☕" },
  { id: "farm", label: "Farm Friends", title: "Farm Friends 🐮" },
  { id: "flowers", label: "Flowers & Butterflies", title: "Flowers & Butterflies 🦋" },
  { id: "holiday", label: "Holiday Collections", title: "Holiday Collections 🎄" },
  { id: "ocean", label: "Ocean Friends", title: "Ocean Friends 🐢" },
  { id: "thanksgiving", label: "Thanksgiving", title: "Thanksgiving Collection 🍂" },
  { id: "woodland", label: "Woodland Friends", title: "Woodland Friends 🦌" },
];

const bundles = [
  { count: 2, price: 149, label: "Mini Bundle", color: "#DDA078" },
  { count: 5, price: 299, label: "Little Bundle", color: "#83A69A" },
  { count: 10, price: 499, label: "Happy Bundle", color: "#A0BBD3" },
  { count: 20, price: 799, label: "Mega Bundle", color: "#C4ACD3" },
];

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ColoringPages() {
  const [collection, setCollection] = useState<Collection>("all");
  const [chooser, setChooser] = useState(true);
  const [preferredSize, setPreferredSize] = useState(2);
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("collection");
    const requestedSize = Number(params.get("bundle"));
    const validSize = [2, 5, 10, 20].includes(requestedSize);
    if (validSize) setPreferredSize(requestedSize);
    setChooser(!collectionOptions.some(option => option.id === requested));
    if (requested === "christmas" || requested === "thanksgiving") {
      setCollection(requested);
    } else if (requested === "animals" || requested === "farm" || requested === "cozy" || requested === "flowers" || requested === "ocean" || requested === "holiday" || requested === "woodland") {
      setCollection(requested);
    }
    try {
      const saved = JSON.parse(sessionStorage.getItem("novea-basket-v1") || "null");
      if (saved && [2, 5, 10, 20].includes(saved.bundleSize) && Array.isArray(saved.selected)) {
        const activityCollections = ["brain_games", "creative_activities", "little_learners", "puzzles_and_mazes", "seasonal_fun", "word_fun"];
        const activityIds = activityCollections.flatMap(key => Array.from({ length: 20 }, (_, i) => `activity_${key}_${String(i + 1).padStart(2, "0")}`));
        const allowed = new Set([...allPictures.map(p => p.id), ...activityIds]);
        const ids = saved.selected.filter((id: unknown): id is string => typeof id === "string" && allowed.has(id));
        setPreferredSize(validSize ? requestedSize : ([2, 5, 10, 20].includes(saved.preferredSize) ? saved.preferredSize : saved.bundleSize));
        setSelected(Array.from(new Set<string>(ids)).slice(0, 20));
      }
    } catch { /* Storage may be unavailable. */ }
    setReady(true);
  }, []);


  const bundleSize = bundles.find(item => item.count >= Math.max(preferredSize, selected.length))!.count;

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem("novea-basket-v1", JSON.stringify({ bundleSize, preferredSize, selected }));
    } catch { /* Shopping still works without storage. */ }
  }, [ready, bundleSize, preferredSize, selected]);

  const bundle = bundles.find((item) => item.count === bundleSize)!;
  const remaining = bundleSize - selected.length;

  function chooseBundle(count: number) {
    if (count < selected.length) {
      setNotice(`Remove pictures from your basket before choosing a ${count}-page bundle.`);
      return;
    }
    setPreferredSize(count);
    setNotice("");
    setError("");
  }

  function togglePicture(id: string) {
    if (loading) return;
    setError("");
    const next = selected.includes(id) ? selected.filter(item => item !== id) : selected.length < 20 ? [...selected, id] : selected;
    const nextBundle = bundles.find(item => item.count >= Math.max(preferredSize, next.length))!;
    setNotice(nextBundle.count > bundleSize ? `Upgraded to ${nextBundle.label} — ${money(nextBundle.price)}.` : nextBundle.count < bundleSize ? `Changed to ${nextBundle.label} — ${money(nextBundle.price)}.` : "");
    setSelected(next);
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
        backgroundColor: "#FFF7ED",
        padding: "16px 12px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#492D35",
        fontSize: "1.125rem",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: "normal", margin: "12px 0" }}>Build a Bundle</h1>
      <section className="bundle-picker" aria-label="Choose your bundle">
        {bundles.map(item => (
          <button key={item.count} type="button" disabled={loading} aria-pressed={bundleSize === item.count} onClick={() => chooseBundle(item.count)} style={{ background: bundleSize === item.count ? "#652C46" : item.color, color: bundleSize === item.count ? "#FFF7ED" : "#492D35" }}>
            <strong>{item.label.replace(" Bundle", "")}</strong>
            <span>{item.count} pages</span>
            <strong>{money(item.price)}</strong>
          </button>
        ))}
      </section>
      <div className="shopping-bar">
        <div className="basket-status" aria-live="polite" aria-atomic="true">
          <strong>{selected.length} of {bundleSize} selected</strong>
          <span>{bundle.label} · {money(bundle.price)}</span>
          <span>{remaining === 0 ? (bundleSize === 20 ? "Maximum reached" : "Ready to buy or keep adding") : `Choose ${remaining} more`}</span>
        </div>
        <button type="button" disabled={loading} onClick={() => { window.location.assign("/#shop"); }}>← Back to Shop</button>
        <button type="button" disabled={!selected.length || loading} onClick={() => document.getElementById("basket")?.scrollIntoView({ block: "start" })}>Basket</button>
        {notice && <span className="bundle-notice" role="status">{notice}</span>}
      </div>
      <p style={{ fontSize: "0.95rem", margin: "12px 0" }}>Mix &amp; match any collection. Your selections stay in your basket.</p>
      {chooser ? (
        <section aria-label="Choose a collection" className="collection-chooser">
          <h2>Choose a collection</h2>
          <div className="collection-grid">
            {[
              { id: "ocean", label: "Ocean Friends", color: "#A0BBD3", count: pictures.length },
              { id: "farm", label: "Farm Friends", color: "#DDA078", count: farmPictures.length },
              { id: "woodland", label: "Woodland Friends", color: "#83A69A", count: woodlandPictures.length },
              { id: "christmas", label: "Christmas", color: "#83A69A", count: christmasPictures.length },
              { id: "thanksgiving", label: "Thanksgiving", color: "#E4AD88", count: thanksgivingPictures.length },
              { id: "cozy", label: "Cozy Little Moments", color: "#EDBC91", count: cozyPictures.length },
              { id: "flowers", label: "Flowers & Butterflies", color: "#ADD4C6", count: flowersPictures.length },
              { id: "all", label: "All Collections", color: "#D6B894", count: allPictures.length },
            ].map(item => <button key={item.id} type="button" disabled={loading} style={{ background: item.color }} onClick={() => { setCollection(item.id as Collection); setChooser(false); setError(""); }}><strong>{item.label}</strong><span>{item.count} pages</span></button>)}
          </div>
        </section>
      ) : <>
      <h2 style={{ color: "#652C46", fontWeight: "normal", fontFamily: "Georgia, serif", fontSize: "1.5rem" }}>{collectionOptions.find(option => option.id === collection)?.title}</h2>
      {collection === "holiday" || collection === "animals" ? (
        <section aria-label={collection === "animals" ? "Choose an animal collection" : "Choose a holiday"} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "22px", maxWidth: "850px", margin: "35px auto" }}>
          {(collection === "animals" ? [
            { id: "ocean", title: "Ocean Friends", emoji: "🐢", count: pictures.length, color: "#EADBC8" },
            { id: "farm", title: "Farm Friends", emoji: "🐮", count: farmPictures.length, color: "#F5EDE3" },
            { id: "woodland", title: "Woodland Friends", emoji: "🦌", count: woodlandPictures.length, color: "#F5EDE3" },
          ] : [
            { id: "christmas", title: "Christmas", emoji: "🎄", count: christmasPictures.length, color: "#EADBC8" },
            { id: "thanksgiving", title: "Thanksgiving", emoji: "🍂", count: thanksgivingPictures.length, color: "#F5EDE3" },
          ]).map(holiday => (
            <a key={holiday.id} href={`/coloring-pages?collection=${holiday.id}`} onClick={event => { if (loading) event.preventDefault(); }} style={{ display: "block", backgroundColor: holiday.color, color: "#492D35", border: "1px solid #652C46", borderRadius: "16px", padding: "28px 20px", textDecoration: "none" }}>
              <span aria-hidden="true" style={{ display: "block", fontSize: "2.5rem" }}>{holiday.emoji}</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#652C46", margin: "12px 0" }}>{holiday.title}</h3>
              <span>{holiday.count} coloring pages</span>
              <span style={{ display: "block", color: "#652C46", textDecoration: "underline", marginTop: "12px" }}>Explore collection</span>
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
        {(collection === "all" ? allPictures : collection === "ocean" ? pictures : collection === "christmas" ? christmasPictures : collection === "thanksgiving" ? thanksgivingPictures : collection === "cozy" ? cozyPictures : collection === "farm" ? farmPictures : collection === "woodland" ? woodlandPictures : flowersPictures).slice().sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" })).map((picture) => {
          const isSelected = selected.includes(picture.id);
          const isDisabled =
            loading || (selected.length >= 20 && !isSelected);

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
                color: "#492D35",
                fontFamily: "inherit",
              }}
            >
              <span style={{ display: "block", backgroundColor: "transparent", padding: "0", borderRadius: "0", outline: isSelected ? "3px solid #652C46" : "none", outlineOffset: "3px" }}>
              <img
                src={encodeURI(picture.image)}
                loading="lazy"
                alt={`${picture.name} coloring page preview`}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  borderRadius: "0",
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
                  color: isSelected ? "#652C46" : "#492D35",
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

      </>}

      {selected.length > 0 && (
      <section id="basket"
        style={{
          scrollMarginTop: "155px",
          backgroundColor: "#F5EDE3",
          maxWidth: "600px",
          margin: "40px auto",
          padding: "30px 20px",
          borderRadius: "16px",
          boxShadow: "0 3px 15px #652C460C",
        }}
      >
        <h2 style={{ color: "#652C46", fontWeight: "normal" }}>
          Your {bundle.label}
        </h2>

        <p>Your basket — {selected.length} of {bundleSize} pages</p>
        <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
          {selected.map(id => {
            const picture = allPictures.find(p => p.id === id);
            return <li key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "8px 0" }}>
              <span style={{ overflowWrap: "anywhere", minWidth: 0 }}>{picture?.name ?? id.replace(/^activity_/, "").replace(/_/g, " ")}</span>
              <button className="basket-action" type="button" aria-label={`Remove ${picture?.name ?? id.replace(/^activity_/, "").replace(/_/g, " ")}`} disabled={loading} onClick={() => togglePicture(id)}>Remove</button>
            </li>;
          })}
        </ul>
        <button className="basket-action" type="button" disabled={loading} onClick={() => { setSelected([]); setError(""); setNotice(""); }}>Clear basket</button>
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
            backgroundColor: "#652C46",
            color: "#FFF7ED",
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
      <section aria-labelledby="personal-use-heading" style={{ backgroundColor: "#EADBC8", color: "#492D35", borderRadius: "16px", padding: "20px", maxWidth: "650px", margin: "30px auto", lineHeight: 1.7 }}>
        <h2 id="personal-use-heading" style={{ color: "#652C46", fontSize: "1.5rem", margin: "0 0 12px" }}>♡ Made with Love, for Personal Use</h2>
        <p style={{ margin: "0 0 12px" }}>Your purchased coloring pages may be printed as often as you like for personal use. Please do not share, redistribute, resell or upload the digital files elsewhere.</p>
        <p style={{ margin: 0 }}>Thank you for supporting NOVÉA ODELIS PRINTABLES!</p>
      </section>

      <p style={{ color: "#492D35", fontSize: "1rem" }}>
        ♡ Printable PDFs · Instant downloads · Made with love
      </p>
      <style jsx>{`
        .coloring-accessible { overflow-wrap: anywhere; }
        .bundle-picker { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 5px; max-width: 520px; margin: 8px auto 12px; }
        .bundle-picker button { min-width: 0; border: 0; border-radius: 8px; padding: 6px 2px; font-size: .85rem; cursor: pointer; }
        .bundle-picker span, .bundle-picker strong, .collection-grid span, .collection-grid strong { display: block; }
        .shopping-bar { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px; padding: 6px; background: #652C46; color: #FFF7ED; border-radius: 10px; max-width: 720px; margin: 0 auto; font-size: .9rem; }
        .shopping-bar button { background: #FFF7ED; color: #652C46; border: 0; border-radius: 8px; padding: 4px 10px; cursor: pointer; }
        .basket-status { display: flex; flex-direction: column; line-height: 1.25; text-align: left; flex: 1 1 120px; }
        .basket-status span { font-size: .78rem; }
        .bundle-notice { flex-basis: 100%; font-size: .8rem; line-height: 1.3; }
        .shopping-bar button:disabled { opacity: .5; }
        .collection-chooser { max-width: 700px; margin: 16px auto; }
        .collection-chooser h2 { font-family: Georgia, serif; color: #652C46; font-size: 1.5rem; font-weight: normal; }
        .collection-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .collection-grid button { color: #492D35; border: 0; border-radius: 10px; padding: 10px 6px; font-size: .95rem; cursor: pointer; }
        .collection-grid span { font-size: .85rem; }

        .coloring-accessible button { font-family: inherit; line-height: 1.5; min-height: 44px; max-width: 100%; }
        .coloring-accessible a { display: inline-block; padding-block: 10px; }
        .coloring-accessible button:focus-visible,
        .coloring-accessible a:focus-visible { outline: 3px solid #492D35; outline-offset: 4px; }
        .basket-action { background: #EADBC8; color: #652C46; border: 1px solid #652C46; border-radius: 24px; padding: 9px 16px; font-size: 1rem; font-weight: 600; cursor: pointer; flex-shrink: 0; }
        .basket-action:hover:not(:disabled) { background: #D5BEA3; }
        .basket-action:disabled { cursor: not-allowed; }
        @media (max-width: 420px) { .coloring-accessible li { flex-wrap: wrap; } }
      `}</style>
    </main>
  );
}
