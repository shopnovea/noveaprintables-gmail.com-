import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Coloring Pages | NOVÉA ODELIS",
  description: "Enjoy four free printable coloring pages for kids and adults. Download your favorite PDF instantly, with no payment or registration required.",
};

const freebies = [
  { name: "Butterfly Garden", slug: "butterfly-garden" },
  { name: "Christmas Magic", slug: "christmas-magic" },
  { name: "Cozy Winter Cottage", slug: "cozy-winter-cottage" },
  { name: "Woodland Fox", slug: "woodland-fox" },
];

export default function FreePrintablesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#fffdfb", color: "#39313d", fontFamily: "Arial, sans-serif", padding: "32px 5% 80px", textAlign: "center" }}>
      <a href="/" style={{ color: "#794367" }}>← BACK TO SHOP</a>
      <header style={{ maxWidth: 760, margin: "32px auto", padding: "24px 16px", background: "#f8eaf0", borderRadius: 16 }}>
        <p style={{ letterSpacing: 3, fontSize: 13, color: "#794367" }}>NOVÉA ODELIS PRINTABLES</p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: "normal", color: "#67485c", margin: "16px 0" }}>Free Printable Coloring Pages</h1>
        <p style={{ lineHeight: 1.6 }}>A little creativity, on us. Choose a complimentary coloring page, download, print and enjoy!</p>
        <p style={{ fontSize: 14 }}>No payment or registration required.</p>
      </header>
      <section aria-label="Free coloring pages" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 20, maxWidth: 1100, margin: "32px auto" }}>
        {freebies.map(({ name, slug }) => (
          <article key={slug} style={{ display: "flex", flexDirection: "column", padding: 16, border: "1px solid #e8d5df", borderRadius: 14, background: "white" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/freebies/previews/${slug}_preview.jpg`} alt={`${name} coloring page preview`} loading="lazy" style={{ width: "100%", aspectRatio: "8.5 / 11", objectFit: "contain", background: "white" }} />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#67485c", margin: "16px 0 8px" }}>{name}</h2>
            <p style={{ fontWeight: "bold", color: "#794367", margin: "0 0 14px" }}>FREE · US Letter PDF</p>
            <a href={`/freebies/downloads/${slug}.pdf`} download={`${slug}.pdf`} aria-label={`Download ${name} free PDF`} style={{ marginTop: "auto", display: "block", padding: "13px 10px", background: "#794367", color: "white", borderRadius: 8, textDecoration: "none", fontWeight: "bold" }}>↓ Download PDF</a>
          </article>
        ))}
      </section>
      <section style={{ margin: "40px auto 0", maxWidth: 700, lineHeight: 1.6 }}>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#67485c" }}>Ready for more creativity?</h2>
        <p>Discover our full collection of printable coloring pages and create your own mix-and-match bundle.</p>
        <a href="/coloring-pages" style={{ display: "inline-block", padding: "14px 22px", border: "1px solid #794367", borderRadius: 8, color: "#794367", textDecoration: "none", fontWeight: "bold" }}>Explore All Collections →</a>
      </section>
    </main>
  );
}
