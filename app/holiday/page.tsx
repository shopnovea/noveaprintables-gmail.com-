
export default function HolidayPage() {
  const collections = [
    {
      name: "Christmas",
      category: "CHRISTMAS COLORING",
      emoji: "🎄",
      color: "#F8E8C8",
      description:
        "Magical Christmas coloring pages filled with festive little moments.",
      href: "/holiday/christmas",
    },
    {
      name: "Thanksgiving",
      category: "THANKSGIVING COLORING",
      emoji: "🦃",
      color: "#F5E2D2",
      description:
        "Cozy autumn scenes, pumpkins, turkeys and thankful hearts.",
      href: "/holiday/thanksgiving",
    },
  ];

  return (
    <main className="holiday-page">
      <header className="header">
        <a href="/" className="logo">NOVĒA</a>
        <a href="/">← BACK TO HOME</a>
      </header>

      <section className="intro">
        <span className="eyebrow">
          SEASONAL COLORING COLLECTIONS
        </span>
        <h1>
          Celebrate the <em>little moments.</em>
        </h1>
        <p>
          Festive printable coloring pages for every
          season and special occasion.
        </p>
      </section>

      <section className="collections">
        {collections.map((collection) => (
          <a
            href={collection.href}
            className="collection"
            key={collection.name}
          >
            <div
              className="collection-art"
              style={{ backgroundColor: collection.color }}
            >
              <span className="emoji">{collection.emoji}</span>
              <span className="preview">
                NOVĒA COLORING
              </span>
            </div>

            <span className="category">
              {collection.category}
            </span>

            <h2>{collection.name}</h2>

            <p>{collection.description}</p>

            <span className="view">
              VIEW COLLECTION →
            </span>
          </a>
        ))}
      </section>

      <footer>
        Made with love, color & a little creativity. ♡
      </footer>

      <style jsx>{`
        * { box-sizing: border-box; }

        .holiday-page {
          min-height: 100vh;
          background: #fffdfb;
          color: #39313d;
          font-family: Arial, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 8%;
          background: white;
          font-size: 10px;
          letter-spacing: 1px;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: 30px;
          letter-spacing: 5px;
          font-weight: bold;
        }

        .intro {
          text-align: center;
          padding: 65px 20px 45px;
        }

        .eyebrow, .category {
          color: #a17b9b;
          font-size: 10px;
          letter-spacing: 2px;
        }

        h1 {
          font-family: Georgia, serif;
          font-size: clamp(34px, 5vw, 48px);
          font-weight: normal;
          margin: 18px 0;
        }

        h1 em { color: #c16c9c; }

        .intro p, .collection p {
          color: #786d79;
          line-height: 1.8;
          font-size: 14px;
        }

        .collections {
          max-width: 1150px;
          margin: 0 auto;
          padding: 20px 30px 80px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
        }

        .collection { display: block; }

        .collection-art {
          height: 270px;
          display: grid;
          place-items: center;
          position: relative;
          border-radius: 8px;
          transition: transform .2s;
        }

        .collection:hover .collection-art {
          transform: translateY(-3px);
        }

        .emoji { font-size: 76px; }

        .preview {
          position: absolute;
          bottom: 16px;
          font-size: 8px;
          letter-spacing: 2px;
          color: #756c78;
        }

        .category {
          display: block;
          margin-top: 22px;
          font-size: 9px;
        }

        h2 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: 23px;
          margin: 9px 0;
        }

        .collection p { font-size: 13px; }

        .view {
          color: #b26796;
          font-size: 10px;
          letter-spacing: 1px;
          font-weight: bold;
        }

        footer {
          text-align: center;
          padding: 35px 15px;
          color: #887c8c;
          font-family: Georgia, serif;
        }

        @media (max-width: 600px) {
          .collections {
            grid-template-columns: 1fr;
            padding: 20px 7% 60px;
          }

          .collection-art { height: 220px; }
        }
      `}</style>
    </main>
  );
}
