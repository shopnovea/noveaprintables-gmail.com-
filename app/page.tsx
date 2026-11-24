
const products = [
  {
    name: "Ocean Friends",
    category: "KIDS' COLORING PAGES",
    price: "",
    emoji: "🐢",
    color: "#DDF3F6",
    href: "/coloring-pages",
  },
  {
    name: "Cozy Little Moments",
    category: "COZY COLORING",
    price: "",
    emoji: "🏡",
    color: "#F9E3EB",
    href: "/coloring-pages?collection=cozy",
  },
  {
    name: "Flowers & Butterflies",
    category: "NATURE COLORING",
    price: "",
    emoji: "🦋",
    color: "#E8E2F7",
    href: "/coloring-pages?collection=flowers",
  },
  {
    name: "Holiday",
    category: "HOLIDAY COLORING",
    price: "",
    emoji: "🎄",
    color: "#F8E8C8",
    href: "/holiday",
  },
];

const bundles = [
  {
    name: "Mini Bundle",
    pages: 2,
    price: "$1.49",
    color: "#F9E3EB",
  },
  {
    name: "Little Bundle",
    pages: 5,
    price: "$2.99",
    color: "#F8E8C8",
  },
  {
    name: "Happy Bundle",
    pages: 10,
    price: "$4.99",
    color: "#E8E2F7",
  },
  {
    name: "Mega Bundle",
    pages: 20,
    price: "$7.99",
    color: "#DDF3F6",
    comingSoon: false,
  },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        A LITTLE COLOR GOES A LONG WAY ✨
      </div>

      <header className="header">
        <a href="#home" className="logo">NOVĒA</a>

        <nav aria-label="Main navigation">
          <a href="#home">HOME</a>
          <a href="/coloring-pages">COLORING PAGES</a>
          <a href="#about">ABOUT</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div>
          <span className="eyebrow">
            PRINTABLE COLORING PAGES FOR EVERYONE
          </span>

          <h1>
            Color your world<br />
            with <em>happiness.</em>
          </h1>

          <p>
            Cute, creative printable coloring pages for kids
            and adults. Find your favorites, print at home,
            and let your imagination shine.
          </p>

          <a href="#shop" className="primary-button">
            EXPLORE THE SHOP →
          </a>

          <div className="hero-note">
            ♡ DIGITAL PRINTABLES · PRINT AT HOME
          </div>
        </div>

        <div className="hero-art">
          <div className="art-circle">✿</div>

          <div className="paper">
            <span>YOUR CREATIVE MOMENT</span>
            <strong>
              Color<br />your joy.
            </strong>
            <p>✓ Pick a page</p>
            <p>✓ Grab your colors</p>
            <p>✓ Make it yours</p>
          </div>

          <div className="paper paper-two">
            <span>HAPPY LITTLE MOMENTS</span>
            <strong>
              Create<br />magic. ♡
            </strong>
          </div>

          <div className="sparkle">✦</div>
        </div>
      </section>

      <section className="benefits">
        <span>♡ DIGITAL DOWNLOADS</span>
        <span>✿ MADE WITH LOVE</span>
        <span>✧ PRINT ANYTIME</span>
        <span>♡ EASY TO COLOR</span>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <span className="eyebrow">
            PRINT, COLOR & SMILE
          </span>

          <h2>
            Find your <em>happy place.</em>
          </h2>

          <p>
            Adorable printable coloring pages for kids
            and adults. Choose a collection and explore!
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product" key={product.name}>
              {product.href ? (
                <a
                  href={product.href}
                  className="product-link"
                  aria-label={`View ${product.name}`}
                >
                  <div
                    className="product-art"
                    style={{ backgroundColor: product.color }}
                  >
                    <span className="product-emoji">
                      {product.emoji}
                    </span>
                    <span className="preview-label">
                      NOVĒA COLORING
                    </span>
                  </div>

                  <div className="product-info">
                    <div>
                      <span className="category">
                        {product.category}
                      </span>
                      <h3>{product.name}</h3>
                    </div>
                    {product.price && (
                      <strong>{product.price}</strong>
                    )}
                  </div>

                  <span className="view-link">
                    VIEW COLORING PAGE →
                  </span>
                </a>
              ) : (
                <>
                  <div
                    className="product-art"
                    style={{ backgroundColor: product.color }}
                  >
                    <span className="product-emoji">
                      {product.emoji}
                    </span>
                    <span className="preview-label">
                      NOVĒA COLORING
                    </span>
                  </div>

                  <div className="product-info">
                    <div>
                      <span className="category">
                        {product.category}
                      </span>
                      <h3>{product.name}</h3>
                    </div>
                    {product.price && (
                      <strong>{product.price}</strong>
                    )}
                  </div>
                </>
              )}
            </article>
          ))}
        </div>

        {/* BUILD YOUR OWN BUNDLE */}

        <section className="bundle-section">
          <span className="eyebrow">
            YOUR PAGES, YOUR WAY
          </span>

          <h2>
            Build Your <em>Own Bundle.</em>
          </h2>

          <p>
            Pick your favorite printable coloring pages
            and create a bundle that's all yours.
            Mix and match your favorites!
          </p>

          <div className="bundle-grid">
            {bundles.map((bundle) => (
              <div
                className="bundle-card"
                style={{ backgroundColor: bundle.color }}
                key={bundle.pages}
              >
                <h3>{bundle.name}</h3>

                <strong>{bundle.price}</strong>

                <p>{bundle.pages} printable pages</p>

                {bundle.comingSoon && (
                  <span className="coming-soon">
                    COMING SOON
                  </span>
                )}
              </div>
            ))}
          </div>

          <a href="/coloring-pages" className="primary-button">
            BUILD MY BUNDLE →
          </a>

          <p className="bundle-note">
            Choose your pages and enjoy a little creativity.
            More collections coming soon! ♡
          </p>
        </section>
      </section>

      <section className="about" id="about">
        <span className="eyebrow">A NOTE FROM NOVĒA</span>

        <h2>
          Little details.<br />
          <em>Lovely days.</em>
        </h2>

        <p>
          At NOVĒA, we believe a little creativity can
          brighten any day. Our printable coloring pages
          are made to inspire imagination, relaxation,
          and happy moments.
        </p>

        <span className="about-heart">♡</span>
      </section>

      <footer>
        <a href="#home" className="logo">NOVĒA</a>
        <p>Made with love, color & a little creativity. ♡</p>
        <span>© 2026 NOVĒA. ALL RIGHTS RESERVED.</span>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          color: #39313d;
          background: #fffdfb;
          font-family: Arial, sans-serif;
        }

        a { text-decoration: none; color: inherit; }

        .announcement {
          text-align: center;
          padding: 11px;
          background: #e9dafa;
          font-size: 0.875rem;
          letter-spacing: 2px;
        }

        .header {
          min-height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 7%;
          gap: 20px;
          background: white;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: 2.5rem;
          letter-spacing: 5px;
          font-weight: bold;
        }

        nav {
          display: flex;
          gap: 25px;
          flex-wrap: wrap;
          font-size: 1rem;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .cart, .primary-button {
          background: #39313d;
          color: white;
          padding: 14px 20px;
          border-radius: 30px;
          font-size: 1rem;
          letter-spacing: 1px;
          display: inline-block;
        }

        .primary-button {
          transition: background 0.2s, transform 0.2s;
        }

        .primary-button:hover {
          background: #794367;
          transform: translateY(-2px);
        }

        .hero {
          background: #fff0f2;
          padding: 75px 9%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 45px;
          min-height: 510px;
        }

        .eyebrow {
          font-size: 1rem;
          letter-spacing: 2px;
          color: #794367;
          font-weight: bold;
        }

        h1 {
          font-family: Georgia, serif;
          font-size: clamp(2.5rem, 5vw + 1rem, 4.2rem);
          line-height: 1.12;
          font-weight: normal;
          margin: 22px 0;
        }

        h1 em, h2 em { color: #794367; }

        .hero p, .section-heading p, .about p {
          color: #514653;
          line-height: 1.9;
          font-size: 1.125rem;
          max-width: 430px;
          margin-bottom: 30px;
        }

        .hero-note {
          margin-top: 23px;
          font-size: 0.875rem;
          letter-spacing: 1px;
          color: #794367;
        }

        .hero-art {
          position: relative;
          height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .art-circle {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: #e4d9f6;
          color: #a18acb;
          font-size: 6.25rem;
          display: grid;
          place-items: center;
        }

        .paper {
          position: absolute;
          background: white;
          box-shadow: 0 15px 40px #8b718322;
          padding: 25px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          width: 205px;
          transform: rotate(-8deg);
          left: 13%;
          top: 35px;
        }

        .paper-two {
          width: 145px;
          height: 185px;
          transform: rotate(10deg);
          left: auto;
          right: 4%;
          top: auto;
          bottom: 25px;
          background: #fff8dc;
        }

        .paper span {
          font-size: 0.875rem;
          letter-spacing: 2px;
          color: #794367;
        }

        .paper strong {
          font-family: Georgia, serif;
          font-size: 1.5rem;
          line-height: 1.2;
        }

        .paper p { font-size: 1rem; margin: 0; }

        .sparkle {
          position: absolute;
          right: 15%;
          top: 20px;
          color: #d99d49;
          font-size: 2.8125rem;
        }

        .benefits {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 20px;
          padding: 25px 5%;
          background: #f5f0fa;
          font-size: 1.125rem;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .shop-section { padding: 85px 8%; }

        .section-heading {
          text-align: center;
          margin-bottom: 42px;
        }

        h2 {
          font-family: Georgia, serif;
          font-size: 2.625rem;
          font-weight: normal;
          margin: 14px 0;
        }

        .section-heading p { margin: auto; }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
        }

        .product-art {
          height: 235px;
          display: grid;
          place-items: center;
          position: relative;
          border-radius: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-emoji { font-size: 4.5rem; }

        .preview-label {
          position: absolute;
          bottom: 15px;
          font-size: 0.875rem;
          letter-spacing: 2px;
          color: #514653;
        }

        .product-info {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          align-items: center;
          padding: 15px 0 5px;
        }

        .category {
          font-size: 0.875rem;
          letter-spacing: 1.5px;
          color: #794367;
        }

        .product-info h3 {
          font-family: Georgia, serif;
          font-size: 1.25rem;
          font-weight: normal;
          margin: 7px 0;
        }

        .product-info strong { font-size: 1rem; }

        .product-link { display: block; }

        .product-link:hover .product-art {
          box-shadow: 0 8px 24px #8b718333;
          transform: translateY(-3px);
        }

        .view-link {
          display: inline-block;
          margin-top: 8px;
          font-size: 1rem;
          letter-spacing: 1px;
          color: #794367;
          font-weight: bold;
        }

        /* BUNDLE SECTION */

        .bundle-section {
          text-align: center;
          background: #fff0f2;
          padding: 65px 25px;
          border-radius: 16px;
          margin-top: 75px;
        }

        .bundle-section h2 {
          margin: 14px 0;
        }

        .bundle-section > p {
          color: #514653;
          line-height: 1.8;
          margin: 15px auto 30px;
          max-width: 500px;
          font-size: 1.125rem;
        }

        .bundle-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          max-width: 950px;
          margin: 30px auto;
        }

        .bundle-card {
          border-radius: 12px;
          padding: 22px 10px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .bundle-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px #8b718322;
        }

        .bundle-card h3 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: 1.25rem;
        }

        .bundle-card strong {
          display: block;
          color: #794367;
          font-size: 1.75rem;
          margin: 12px 0;
        }

        .bundle-card p {
          font-size: 0.875rem;
          color: #514653;
        }

        .coming-soon {
          display: inline-block;
          margin-top: 8px;
          padding: 6px 10px;
          border-radius: 20px;
          background: #ffffffaa;
          color: #794367;
          font-size: 0.875rem;
          letter-spacing: 1px;
          font-weight: bold;
        }

        .bundle-note {
          font-size: 0.875rem !important;
          color: #794367 !important;
          margin: 22px auto 0 !important;
        }

        .about {
          background: #e4f1e8;
          text-align: center;
          padding: 75px 20px;
        }

        .about p { margin: 20px auto; }

        .about-heart {
          font-size: 2.1875rem;
          color: #794367;
        }

        footer {
          text-align: center;
          padding: 45px 20px;
        }

        footer p {
          font-family: Georgia, serif;
          color: #514653;
        }

        footer span {
          font-size: 0.875rem;
          letter-spacing: 1px;
          color: #514653;
        }

        @media (max-width: 850px) {
          .header { flex-wrap: wrap; }

          nav {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .bundle-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 55px 7%;
          }

          .hero-art { height: 300px; }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }

          .product-art { height: 175px; }
          .product-info { flex-wrap: wrap; }
          h2 { font-size: 2.125rem; }

          .bundle-section {
            padding: 45px 15px;
          }
        }

        @media (max-width: 420px) {
          .product-grid { grid-template-columns: 1fr; }

          .bundle-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .bundle-card {
            padding: 16px 8px;
          }

          .bundle-card h3 {
            font-size: 1.125rem;
          }

          .bundle-card strong {
            font-size: 1.5rem;
          }
        }
        body { line-height: 1.6; }
        .announcement, .hero-note, .category, .preview-label, footer span { font-size: .875rem; letter-spacing: .05em; }
        nav, .benefits, .primary-button, .view-link { font-size: 1rem; }
        nav a { padding: .5rem 0; }
        a:focus-visible, button:focus-visible { outline: 3px solid #55304e; outline-offset: 4px; }
        .paper { width: 15rem; }
        .paper-two { width: 11rem; height: auto; }
        .paper span, .paper p { font-size: .875rem; letter-spacing: .03em; }
        .hero > div, .product, .bundle-card { min-width: 0; overflow-wrap: anywhere; }
        .product-art { min-height: 11rem; }
        @media (max-width: 850px) { .hero { grid-template-columns: 1fr; } }
        @media (max-width: 480px) {
          .hero-art { height: auto; display: flex; flex-wrap: wrap; gap: 1rem; }
          .paper, .paper-two { position: relative; inset: auto; transform: none; width: 100%; }
          .art-circle, .sparkle { display: none; }
          .bundle-grid { grid-template-columns: 1fr; }
          .header { justify-content: center; }
          nav { gap: 1rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { transition: none !important; animation: none !important; }
        }

        /* Readable typography, including sections affected by global styles. */
        main .benefits, main .benefits span { font-size: 1rem !important; font-weight: 600; color: #39313d; letter-spacing: .04em; }
        main .eyebrow { font-size: 1rem !important; color: #794367 !important; }
        main .section-heading p, main .hero p, main .about p, main .bundle-section > p { font-size: 1.125rem !important; line-height: 1.7; color: #514653 !important; }
        main .product-info h3, main .bundle-card h3 { font-size: 1.5rem !important; line-height: 1.35; }
        main .category, main .preview-label { font-size: .875rem !important; color: #514653 !important; letter-spacing: .04em; }
        main .view-link { font-size: 1rem !important; color: #794367 !important; text-decoration: underline; text-underline-offset: .2em; }
        main .bundle-card p, main .bundle-note, main .coming-soon, main footer p, main footer span { font-size: 1rem !important; line-height: 1.6; }
        main h1 em, main h2 em { color: #794367 !important; }
        main .preview-label { text-align: center; max-width: 95%; }
        main .paper p { font-size: .875rem !important; }
        @media (max-width: 600px) { main .product-grid, main .bundle-grid { grid-template-columns: 1fr; } main .benefits { display: grid; grid-template-columns: 1fr; text-align: center; } }
      `}</style>
    </main>
  );
}
