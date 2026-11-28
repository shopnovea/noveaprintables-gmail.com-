import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printables | NOVÉA ODELIS",
  description: "Enjoy ten free printable coloring pages and activities for kids and adults. Download instantly with no payment or registration required.",
};

const freebies = [
  { name: "Butterfly Garden", slug: "butterfly-garden" },
  { name: "Christmas Magic", slug: "christmas-magic" },
  { name: "Cozy Winter Cottage", slug: "cozy-winter-cottage" },
  { name: "Woodland Fox", slug: "woodland-fox" },
];

const activities = [
  "Free Activity 01",
  "Free Activity 02",
  "Free Activity 03",
  "Free Activity 04",
  "Free Activity 05",
  "Free Activity 06",
].map((name, index) => ({
  name,
  slug: `activity_free_activities_${String(index + 1).padStart(2, "0")}`,
}));

const sections = [
  {
    title: "🎨 Free Coloring Pages",
    items: freebies.map(({ name, slug }) => ({
      name,
      slug,
      preview: `/freebies/previews/${slug}_preview.jpg`,
      pdf: `/freebies/downloads/${slug}.pdf`,
    })),
  },
  {
    title: "🧩 Free Activities",
    items: activities.map(({ name, slug }) => ({
      name,
      slug,
      preview: `/activities/${slug}_preview.jpg`,
      pdf: `/activities/${slug}.pdf`,
    })),
  },
];

export default function FreePrintablesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#FFF7ED", color: "#492D35", fontFamily: "Arial, sans-serif", padding: "32px 5% 80px", textAlign: "center" }}>
      <a href="/" style={{ color: "#652C46" }}>← BACK TO SHOP</a>

      <header style={{ maxWidth: 760, margin: "32px auto", padding: "24px 16px", background: "#A0BBD3", borderRadius: 16 }}>
        <p style={{ letterSpacing: 3, fontSize: 13, color: "#652C46" }}>NOVÉA ODELIS PRINTABLES</p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(30px, 5vw, 44px)", fontWeight: "normal", color: "#652C46", margin: "16px 0" }}>Free Printables</h1>
        <p style={{ lineHeight: 1.6 }}>A little creativity, on us. Choose a complimentary coloring page or activity, download, print and enjoy!</p>
        <p style={{ fontSize: 14 }}>No payment or registration required.</p>
      </header>

      {sections.map(section => (
        <section key={section.title} aria-label={section.title} style={{ maxWidth: 1100, margin: "40px auto" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: "normal", color: "#652C46" }}>
            {section.title}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 20 }}>
            {section.items.map(({ name, slug, preview, pdf }) => (
              <article key={slug} style={{ display: "flex", flexDirection: "column", padding: 16, border: "1px solid #D9C7A4", borderRadius: 14, background: "#F5EDE3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt={`${name} preview`} loading="lazy" style={{ width: "100%", aspectRatio: "8.5 / 11", objectFit: "contain", background: "white" }} />
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#652C46", margin: "16px 0 8px" }}>{name}</h3>
                <p style={{ fontWeight: "bold", color: "#652C46", margin: "0 0 14px" }}>FREE · US Letter PDF</p>
                <a href={pdf} download={`${slug}.pdf`} aria-label={`Download ${name} free PDF`} style={{ marginTop: "auto", display: "block", padding: "13px 10px", background: "#652C46", color: "#FFF7ED", borderRadius: 8, textDecoration: "none", fontWeight: "bold" }}>↓ Download PDF</a>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section style={{ margin: "40px auto 0", maxWidth: 700, lineHeight: 1.6 }}>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#652C46" }}>Ready for more creativity?</h2>
        <p>Explore our coloring pages and Activity Center to create your own mix-and-match bundle.</p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <a href="/coloring-pages" style={{ padding: "14px 22px", background: "#A0BBD3", borderRadius: 8, color: "#492D35", textDecoration: "none", fontWeight: "bold" }}>Explore Coloring Pages →</a>
          <a href="/activity-center" style={{ padding: "14px 22px", background: "#C4ACD3", borderRadius: 8, color: "#492D35", textDecoration: "none", fontWeight: "bold" }}>Explore Activity Center →</a>
        </div>
      </section>

      <section style={{ background: "#EADBC8", borderRadius: 16, padding: 20, maxWidth: 700, margin: "32px auto", lineHeight: 1.7 }}>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#652C46" }}>♡ Made with Love</h2>
        <p>All free printables are for personal use. Please do not resell, redistribute or upload the digital files elsewhere.</p>
        <p>Thank you for supporting NOVÉA ODELIS PRINTABLES!</p>
      </section>
    </main>
  );
}
