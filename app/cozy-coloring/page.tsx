const collections = [
  { name: "Cozy Little Moments", emoji: "🏡", count: 9, color: "#F9E3EB", href: "/coloring-pages?collection=cozy" },
];

export default function CozyColoring() {
  return (
    <main style={{ minHeight: "100vh", background: "#fffdfb", color: "#39313d", fontFamily: "Arial, sans-serif", padding: "32px 7% 70px", textAlign: "center" }}>
      <a href="/" style={{ color: "#794367", textDecoration: "underline" }}>← BACK TO SHOP</a>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 44px)", fontWeight: "normal", margin: "40px 0 12px" }}>Cozy Coloring</h1>
      <p style={{ fontSize: "1.125rem", color: "#514653" }}>Choose your favorite cozy collection.</p>
      <section aria-label="Cozy Coloring collections" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "22px", maxWidth: "420px", margin: "36px auto" }}>
        {collections.map(item => (
          <a key={item.name} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "235px", padding: "24px", borderRadius: "12px", background: item.color, color: "#39313d", textDecoration: "none" }}>
            <span aria-hidden="true" style={{ fontSize: "4.5rem" }}>{item.emoji}</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", margin: "16px 0 6px" }}>{item.name}</h2>
            <span>{item.count} coloring pages</span>
          </a>
        ))}
      </section>
      <a href="/coloring-pages" style={{ color: "#794367", textDecoration: "underline" }}>View all collections</a>
    </main>
  );
}
