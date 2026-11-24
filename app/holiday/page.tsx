"use client";

export default function HolidayPage() {
  const collections = [
    {
      name: "Christmas",
      category: "CHRISTMAS COLORING",
      emoji: "🎄",
      color: "#F8E8C8",
      description: "Magical Christmas coloring pages filled with festive little moments.",
      href: "/holiday/christmas",
    },
    {
      name: "Thanksgiving",
      category: "THANKSGIVING COLORING",
      emoji: "🦃",
      color: "#F5E2D2",
      description: "Cozy autumn scenes, pumpkins, turkeys and thankful hearts.",
      href: "/coloring-pages?collection=thanksgiving",
    },
  ];

  return (
    <main className="holiday-page">
      <header className="header">
        <a href="/" className="logo" aria-label="NOVÉA Printables Home">NOVĒA</a>
        <a href="/">← BACK TO HOME</a>
      </header>
      <section className="intro">
        <span className="eyebrow">SEASONAL COLORING COLLECTIONS</span>
        <h1>Celebrate the <em>little moments.</em></h1>
        <p>Festive printable coloring pages for every season and special occasion.</p>
      </section>
      <section className="collections" aria-label="Holiday coloring collections">
        {collections.map((collection) => (
          <a href={collection.href} className="collection" key={collection.name}>
            <div className="collection-art" style={{ backgroundColor: collection.color }} aria-hidden="true">
              <span className="emoji">{collection.emoji}</span>
              <span className="preview">NOVĒA COLORING</span>
            </div>
            <span className="category">{collection.category}</span>
            <h2>{collection.name}</h2>
            <p>{collection.description}</p>
            <span className="view">VIEW COLLECTION →</span>
          </a>
        ))}
      </section>
      <footer>Made with love, color & a little creativity. ♡</footer>
      <style jsx>{`
        * { box-sizing: border-box; }
        .holiday-page {
          min-height: 100vh;
          background: #fffdfb;
          color: #39313d;
          font-family: Arial, sans-serif;
          font-size: 1rem;
          line-height: 1.6;
        }
        a { color: inherit; text-decoration: none; }
        a:focus-visible {
          outline: 3px solid #783e65;
          outline-offset: 6px;
          border-radius: 5px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
          padding: 25px 8%;
          background: white;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .header a { display: inline-flex; align-items: center; min-height: 44px; }
        .logo { font-family: Georgia, serif; font-size: 2.5rem; letter-spacing: 5px; font-weight: bold; }
        .intro { text-align: center; padding: 65px 20px 45px; }
        .eyebrow, .category { color: #783e65; font-size: 1rem; font-weight: 600; letter-spacing: 1.5px; }
        h1 { font-family: Georgia, serif; font-size: clamp(2.125rem, 5vw, 3rem); font-weight: normal; line-height: 1.25; margin: 18px 0; }
        h1 em { color: #9a4678; }
        .intro p, .collection p { color: #594e5c; line-height: 1.8; font-size: 1.125rem; }
        .collections { max-width: 1150px; margin: 0 auto; padding: 20px 30px 80px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
        .collection { display: block; min-width: 0; overflow-wrap: anywhere; }
        .collection-art { height: 270px; display: grid; place-items: center; position: relative; border-radius: 8px; transition: transform .2s; }
        .collection:hover .collection-art { transform: translateY(-3px); }
        .emoji { font-size: 76px; }
        .preview { position: absolute; bottom: 16px; font-size: 0.875rem; font-weight: 500; letter-spacing: 1.5px; color: #594e5c; text-align: center; padding: 0 10px; }
        .category { display: block; margin-top: 22px; font-size: 1rem; }
        h2 { font-family: Georgia, serif; font-weight: normal; font-size: 1.75rem; line-height: 1.3; margin: 9px 0; }
        .collection p { font-size: 1.125rem; }
        .view { display: inline-block; color: #8b3f70; font-size: 1rem; letter-spacing: 0.8px; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; padding: 8px 0; }
        .collection:hover .view { color: #593047; }
        footer { text-align: center; padding: 35px 15px; color: #594e5c; font-family: Georgia, serif; font-size: 1rem; line-height: 1.7; }
        @media (max-width: 600px) {
          .collections { grid-template-columns: 1fr; padding: 20px 7% 60px; gap: 40px; }
          .collection-art { height: 220px; }
          .header { padding: 20px 7%; }
          .logo { font-size: 2rem; }
          .intro { padding: 45px 20px 30px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .collection-art { transition: none; }
          .collection:hover .collection-art { transform: none; }
        }
      `}</style>
    </main>
  );
}
