
const products = [
  {
    name: "All Collections",
    category: "All Collections",
    price: "",
    emoji: "🎨",
    color: "#EACB83",
    href: "/coloring-pages",
  },
  {
    name: "Ocean Friends",
    category: "Animal Coloring",
    price: "",
    emoji: "🐢",
    color: "#BBD09A",
    href: "/animal-coloring",
  },
  {
    name: "Cozy Little Moments",
    category: "Cozy Coloring",
    price: "",
    emoji: "🏡",
    color: "#EDBC91",
    href: "/cozy-coloring",
  },
  {
    name: "Holiday",
    category: "Holiday Coloring",
    price: "",
    emoji: "🎄",
    color: "#E4AD88",
    href: "/holiday-coloring",
  },
  {
    name: "Flowers & Butterflies",
    category: "Nature Coloring",
    price: "",
    emoji: "🦋",
    color: "#ADD4C6",
    href: "/nature-coloring",
  },
  {
    name: "Free Printables",
    category: "Free Printables",
    price: "",
    emoji: "🎁",
    color: "#C1D2E5",
    href: "/free-printables",
  },
];

const bundles = [
  {
    name: "Mini Bundle",
    pages: 2,
    price: "$1.49",
    color: "#EDBC91",
  },
  {
    name: "Little Bundle",
    pages: 5,
    price: "$2.99",
    color: "#EACB83",
  },
  {
    name: "Happy Bundle",
    pages: 10,
    price: "$4.99",
    color: "#BBD09A",
  },
  {
    name: "Mega Bundle",
    pages: 20,
    price: "$7.99",
    color: "#C1D2E5",
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
        <a href="#home" className="logo">NOVÉA ODELIS<span className="logo-subtitle">PRINTABLES</span></a>
        <p className="brand-tagline">A little creativity, delivered instantly.</p>

        <nav aria-label="Main navigation">
          <a href="#home">HOME</a>
          <a href="/coloring-pages">COLORING PAGES</a>
          <a href="/free-printables">FREE PRINTABLES</a>
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
              <a href={product.href} className="product-link" aria-label={`View ${product.category}`}>
                <div className="product-art" style={{ backgroundColor: product.color }}>
                  <span className="product-emoji" aria-hidden="true">{product.emoji}</span>
                  <span className="collection-label">{product.category}</span>
                </div>
              </a>
            </article>
          ))}
        </div>

        <section aria-labelledby="mix-match-heading" style={{ backgroundColor: "#EADBC8", borderRadius: "16px", padding: "24px 20px", margin: "35px auto 0", textAlign: "center", color: "#492D35", lineHeight: 1.7 }}>
          <h2 id="mix-match-heading" style={{ fontSize: "1.5rem", color: "#652C46", margin: "0 0 12px" }}>♡ Mix &amp; Match Your Favorites!</h2>
          <p style={{ fontSize: "1.125rem", margin: "0 0 8px" }}>Explore all our coloring collections and create a bundle that's uniquely yours.</p>
          <p style={{ fontSize: "1.125rem", margin: 0 }}>Switch between collections anytime — your selected pictures stay in your basket!</p>
        </section>

        {/* BUILD YOUR OWN BUNDLE */}

        <section className="bundle-section">
          <span className="eyebrow">
            YOUR PAGES, YOUR WAY
          </span>

          <h2>
            Build Your <em>Own Bundle.</em>
          </h2>

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
        <span className="eyebrow">A NOTE FROM NOVÉA ODELIS</span>

        <h2>
          Little details.<br />
          <em>Lovely days.</em>
        </h2>

        <p>
          At NOVÉA ODELIS, we believe a little creativity can
          brighten any day. Our printable coloring pages
          are made to inspire imagination, relaxation,
          and happy moments.
        </p>

        <span className="about-heart">♡</span>
      </section>

      <footer>
        <a href="#home" className="logo">NOVÉA ODELIS<span className="logo-subtitle">PRINTABLES</span></a>
        <p>Made with love, color & a little creativity. ♡</p>
        <div className="footer-policies" role="navigation" aria-label="Website policies">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/refund-policy">Refund Policy</a>
        </div>
        <p className="footer-questions"><strong>QUESTIONS</strong><br />
          <a href="mailto:noveaprintables@gmail.com">noveaprintables@gmail.com</a>
        </p>
        <span>© 2026 NOVÉA ODELIS PRINTABLES. ALL RIGHTS RESERVED.</span>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          color: #492D35;
          background: #FFF7ED;
          font-family: Arial, sans-serif;
        }

        a { text-decoration: none; color: inherit; }

        .announcement {
          text-align: center;
          padding: 11px;
          background: #EADBC8;
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
          background: #FFF7ED;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: clamp(1.25rem, 3vw, 2rem);
          letter-spacing: 2px;
          max-width: 100%;
          overflow-wrap: anywhere;
          font-weight: bold;
        }

        .logo-subtitle { display: block; font-family: Arial, sans-serif; font-size: .875rem; letter-spacing: .25em; text-align: center; }

        nav {
          display: flex;
          gap: 25px;
          flex-wrap: wrap;
          font-size: 1rem;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .cart, .primary-button {
          background: #492D35;
          color: #FFF7ED;
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
          background: #652C46;
          transform: translateY(-2px);
        }

        .hero {
          background: #FFF7ED;
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
          color: #652C46;
          font-weight: bold;
        }

        h1 {
          font-family: Georgia, serif;
          font-size: clamp(2.5rem, 5vw + 1rem, 4.2rem);
          line-height: 1.12;
          font-weight: normal;
          margin: 22px 0;
        }

        h1 em, h2 em { color: #652C46; }

        .hero p, .section-heading p, .about p {
          color: #492D35;
          line-height: 1.9;
          font-size: 1.125rem;
          max-width: 430px;
          margin-bottom: 30px;
        }

        .hero-note {
          margin-top: 23px;
          font-size: 0.875rem;
          letter-spacing: 1px;
          color: #652C46;
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
          background: #EADBC8;
          color: #652C46;
          font-size: 6.25rem;
          display: grid;
          place-items: center;
        }

        .paper {
          position: absolute;
          background: #FFF7ED;
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
          background: #F5EDE3;
        }

        .paper span {
          font-size: 0.875rem;
          letter-spacing: 2px;
          color: #652C46;
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
          background: #F5EDE3;
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
          grid-template-columns: repeat(3, minmax(0, 1fr));
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

        .collection-label {
          position: absolute;
          bottom: 15px;
          left: 8px;
          right: 8px;
          text-align: center;
          font-family: Georgia, serif;
          font-size: clamp(1.25rem, 2vw, 1.75rem);
          font-weight: 600;
          line-height: 1.3;
          color: #492D35;
        }
        .product-art .product-emoji { margin-bottom: 2rem; }

        .product-emoji { font-size: 4.5rem; }

        .preview-label {
          position: absolute;
          bottom: 15px;
          font-size: 0.875rem;
          letter-spacing: 2px;
          color: #492D35;
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
          color: #652C46;
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
          color: #652C46;
          font-weight: bold;
        }

        /* BUNDLE SECTION */

        .bundle-section {
          text-align: center;
          background: #FFF7ED;
          padding: 65px 25px;
          border-radius: 16px;
          margin-top: 75px;
        }

        .bundle-section h2 {
          margin: 14px 0;
        }

        .bundle-section > p {
          color: #492D35;
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
          color: #652C46;
          font-size: 1.75rem;
          margin: 12px 0;
        }

        .bundle-card p {
          font-size: 0.875rem;
          color: #492D35;
        }

        .coming-soon {
          display: inline-block;
          margin-top: 8px;
          padding: 6px 10px;
          border-radius: 20px;
          background: #FFF7ED;
          color: #652C46;
          font-size: 0.875rem;
          letter-spacing: 1px;
          font-weight: bold;
        }

        .bundle-note {
          font-size: 0.875rem !important;
          color: #652C46 !important;
          margin: 22px auto 0 !important;
        }

        .about {
          background: #F5EDE3;
          text-align: center;
          padding: 75px 20px;
        }

        .about p { margin: 20px auto; }

        .about-heart {
          font-size: 2.1875rem;
          color: #652C46;
        }

        footer {
          text-align: center;
          padding: 45px 20px;
        }

        footer p {
          font-family: Georgia, serif;
          color: #492D35;
        }

        .footer-policies { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 24px; margin: 24px auto 16px; }
        .footer-policies a, .footer-questions a { color: #652C46; text-decoration: underline; text-underline-offset: .2em; display: inline-flex; align-items: center; min-height: 44px; overflow-wrap: anywhere; }
        .footer-questions { margin: 16px auto 24px; color: #652C46; }

        footer span {
          font-size: 0.875rem;
          letter-spacing: 1px;
          color: #492D35;
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
        a:focus-visible, button:focus-visible { outline: 3px solid #652C46; outline-offset: 4px; }
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
        main .benefits, main .benefits span { font-size: 1rem !important; font-weight: 600; color: #492D35; letter-spacing: .04em; }
        main .eyebrow { font-size: 1rem !important; color: #652C46 !important; }
        main .section-heading p, main .hero p, main .about p, main .bundle-section > p { font-size: 1.125rem !important; line-height: 1.7; color: #492D35 !important; }
        main .product-info h3, main .bundle-card h3 { font-size: 1.5rem !important; line-height: 1.35; }
        main .category, main .preview-label { font-size: .875rem !important; color: #492D35 !important; letter-spacing: .04em; }
        main .view-link { font-size: 1rem !important; color: #652C46 !important; text-decoration: underline; text-underline-offset: .2em; }
        main .bundle-card p, main .bundle-note, main .coming-soon, main footer p, main footer span { font-size: 1rem !important; line-height: 1.6; }
        main h1 em, main h2 em { color: #652C46 !important; }
        main .preview-label { text-align: center; max-width: 95%; }
        main .paper p { font-size: .875rem !important; }
        @media (max-width: 600px) { main .product-grid, main .bundle-grid { grid-template-columns: 1fr; } main .benefits { display: grid; grid-template-columns: 1fr; text-align: center; } }
        /* Compact bundle cards, without changing prices or navigation. */
        main .bundle-section { padding: 32px 16px; }
        main .bundle-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); max-width: 760px; gap: 12px; margin: 20px auto; }
        main .bundle-card { padding: 12px 8px; }
        main .bundle-card h3 { font-size: 1.125rem !important; margin: 0 0 4px; }
        main .bundle-card strong { font-size: 1.5rem; margin: 4px 0; }
        main .bundle-card p { margin: 4px 0 0; }
        @media (max-width: 850px) {
          main .bundle-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 420px; gap: 10px; }
        }
      
        /* NOVÉA ODELIS homepage branding */
        body { background: #FFF7ED; }
        .announcement { background: #EADBC8; color: #652C46; }
        .header { flex-direction: column; justify-content: center; gap: 12px; padding: 30px 5% 20px; background: #FFF7ED; border-bottom: 1px solid #DCC9B3; }
        .header .logo { color: #652C46; font-size: clamp(1.65rem, 5vw, 3.5rem); letter-spacing: .045em; text-align: center; line-height: 1.2; }
        .header .logo-subtitle { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 10px; font-size: clamp(.75rem, 2vw, 1rem); letter-spacing: .25em; }
        .header .logo-subtitle::before, .header .logo-subtitle::after { content: ''; height: 1px; width: clamp(20px, 7vw, 85px); background: #652C46; }
        .brand-tagline { font-family: Georgia, serif; font-style: italic; color: #652C46; text-align: center; margin: 0 0 8px; font-size: 1.1rem; }
        .header nav { justify-content: center; gap: 10px; width: 100%; order: 3; }
        .header nav a { background: #EADBC8; color: #652C46; border-radius: 30px; padding: 10px 18px; text-align: center; min-height: 44px; font-size: .875rem; }
        .header nav a:hover { background: #DECBB3; }
        .hero { background: #FFF7ED; }
        main h1, main h2, footer .logo { color: #652C46; }
        .primary-button { background: #652C46; }
        .benefits { background: #EADBC8; }
        .bundle-section { background: #EADBC8; }
        .about { background: #F2E8DA; }
        footer { background: #FFF7ED; }
        @media (max-width: 480px) { .header { padding: 24px 12px 16px; } .header nav { gap: 8px; } .header nav a { padding: 10px 12px; } }
      `}</style>
    </main>
  );
}
