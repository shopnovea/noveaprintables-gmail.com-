const products = [
  { name: "The Daily Planner", category: "PLANNERS", price: "$5.00", emoji: "🌸", color: "#F9DCE5" },
  { name: "Budget Planner", category: "FINANCE", price: "$6.00", emoji: "💸", color: "#D8EBDD" },
  { name: "Weekly Reset", category: "ORGANIZATION", price: "$4.00", emoji: "✨", color: "#E5DDF8" },
  { name: "Pretty Wall Prints", category: "WALL ART", price: "$7.00", emoji: "🦋", color: "#FBE8CB" },
  { name: "Ocean Friends", category: "KIDS' COLORING PAGES", price: "", emoji: "🐢", color: "#DDF3F6" },
  { name: "Cozy Little Moments", category: "COZY COLORING", price: "", emoji: "🏡", color: "#F9E3EB" },
  { name: "Flowers & Butterflies", category: "NATURE COLORING", price: "", emoji: "🌷", color: "#E8E2F7" },
];


const coloringCollections = [
  { name: "Ocean Friends", category: "KIDS' COLORING PAGES", emoji: "🐢", color: "#DDF3F2", description: "Smiling sea creatures and underwater adventures." },
  { name: "Cozy Little Moments", category: "COZY COLORING", emoji: "🏡", color: "#F9E7DD", description: "Sweet, relaxing scenes with plenty of room to color." },
  { name: "Flowers & Butterflies", category: "NATURE COLORING", emoji: "🦋", color: "#EEE4F8", description: "Happy blooms and fluttering friends." },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">A LITTLE COLOR GOES A LONG WAY ✨</div>

      <header className="header">
        <a href="#home" className="logo">NOVĒA</a>
        <nav aria-label="Main navigation">
          <a href="#home">HOME</a>
          <a href="#shop">SHOP</a>
<a href="/coloring-pages">COLORING PAGES</a>    
          <a href="#about">ABOUT</a>
        </nav>
        <a className="cart" href="#shop">SHOP NOW ↗</a>
      </header>

      <section className="hero" id="home">
        <div>
          <span className="eyebrow">DIGITAL GOODIES FOR EVERYDAY LIFE</span>
      <h1>Color your world<br />with <em>happiness.</em></h1>
          <p>Colorful printables, thoughtful planners, and little things designed to make life easier and a whole lot prettier.</p>
          <a href="#shop" className="primary-button">EXPLORE THE SHOP →</a>
          <div className="hero-note">♡ INSTANT DOWNLOADS · PRINT AT HOME</div>
        </div>
        <div className="hero-art">
          <div className="art-circle">✿</div>
          <div className="paper">
            <span>YOUR DAY</span>
            <strong>Make it<br />wonderful.</strong>
            <p>✓ Morning routine</p>
            <p>✓ Little goals</p>
            <p>✓ Time for you</p>
          </div>
          <div className="paper paper-two">
            <span>GOOD THINGS AHEAD</span>
            <strong>Dream<br />big. ♡</strong>
          </div>
          <div className="sparkle">✦</div>
        </div>
      </section>

      <section className="benefits">
        <span>♡ INSTANT DOWNLOADS</span>
        <span>✿ MADE WITH LOVE</span>
        <span>✧ PRINT ANYTIME</span>
        <span>♡ EASY TO USE</span>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <span className="eyebrow">A LITTLE SOMETHING FOR YOU</span>
          <h2>Find your <em>happy place.</em></h2>
          <p>Pretty, practical printables made for your everyday.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product" key={product.name}>
              <div className="product-art" style={{ backgroundColor: product.color }}>
                <span className="product-emoji">{product.emoji}</span>
                <span className="preview-label">NOVĒA DIGITAL</span>
              </div>
              <div className="product-info">
                <div>
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                </div>
               {product.price && <strong>{product.price}</strong>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <span className="eyebrow">A NOTE FROM NOVĒA</span>
        <h2>Little details.<br /><em>Lovely days.</em></h2>
        <p>We believe getting organized, being creative, and making time for yourself should feel beautiful. That's why we're creating printables to bring a little more joy to your everyday.</p>
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
        body { margin: 0; color: #39313d; background: #fffdfb; font-family: Arial, sans-serif; }
        a { text-decoration: none; color: inherit; }
        .announcement { text-align: center; padding: 11px; background: #e9dafa; font-size: 10px; letter-spacing: 2px; }
        .header { min-height: 82px; display: flex; align-items: center; justify-content: space-between; padding: 18px 7%; gap: 20px; background: white; }
        .logo { font-family: Georgia, serif; font-size: 32px; letter-spacing: 5px; font-weight: bold; }
        nav { display: flex; gap: 25px; flex-wrap: wrap; font-size: 11px; letter-spacing: 1px; }
        .cart, .primary-button { background: #39313d; color: white; padding: 14px 20px; border-radius: 30px; font-size: 10px; letter-spacing: 1px; display: inline-block; }
        .hero { background: #fff0f2; padding: 75px 9%; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 45px; min-height: 510px; }
        .eyebrow { font-size: 10px; letter-spacing: 2px; color: #98778f; font-weight: bold; }
        h1 { font-family: Georgia, serif; font-size: clamp(42px, 5vw, 67px); line-height: 1.12; font-weight: normal; margin: 22px 0; }
        h1 em, h2 em { color: #c16c9c; }
        .hero p, .section-heading p, .about p { color: #786d79; line-height: 1.9; font-size: 14px; max-width: 430px; margin-bottom: 30px; }
        .hero-note { margin-top: 23px; font-size: 9px; letter-spacing: 1px; color: #98778f; }
        .hero-art { position: relative; height: 340px; display: flex; align-items: center; justify-content: center; }
        .art-circle { position: absolute; width: 280px; height: 280px; border-radius: 50%; background: #e4d9f6; color: #a18acb; font-size: 100px; display: grid; place-items: center; }
        .paper { position: absolute; background: white; box-shadow: 0 15px 40px #8b718322; padding: 25px; display: flex; flex-direction: column; gap: 7px; width: 205px; transform: rotate(-8deg); left: 13%; top: 35px; }
        .paper-two { width: 145px; height: 185px; transform: rotate(10deg); left: auto; right: 4%; top: auto; bottom: 25px; background: #fff8dc; }
        .paper span { font-size: 8px; letter-spacing: 2px; color: #b07e9c; }
        .paper strong { font-family: Georgia, serif; font-size: 24px; line-height: 1.2; }
        .paper p { font-size: 10px; margin: 0; }
        .sparkle { position: absolute; right: 15%; top: 20px; color: #d99d49; font-size: 45px; }
        .benefits { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; padding: 25px 5%; background: #f5f0fa; font-size: 10px; letter-spacing: 1px; }
        .shop-section { padding: 85px 8%; }
        .section-heading { text-align: center; margin-bottom: 42px; }
        h2 { font-family: Georgia, serif; font-size: 42px; font-weight: normal; margin: 14px 0; }
        .section-heading p { margin: auto; }
        .product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
        .product-art { height: 235px; display: grid; place-items: center; position: relative; border-radius: 8px; }
        .product-emoji { font-size: 72px; }
        .preview-label { position: absolute; bottom: 15px; font-size: 8px; letter-spacing: 2px; color: #756c78; }
        .product-info { display: flex; justify-content: space-between; gap: 8px; align-items: center; padding: 15px 0 5px; }
        .category { font-size: 8px; letter-spacing: 1.5px; color: #a17b9b; }
        .product-info h3, .coloring-info h3 { font-family: Georgia, serif; font-size: 17px; font-weight: normal; margin: 7px 0; }
        .product-info strong { font-size: 13px; }
        .coming-soon { font-size: 9px; color: #a17b9b; letter-spacing: 1px; }
        .coloring-section { background: #fff7f2; padding: 85px 8%; }
        .coloring-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 25px; max-width: 1100px; margin: 0 auto; }
        .coloring-art { height: 245px; }
        .coloring-info { padding: 17px 2px; }
        .coloring-info p { color: #786d79; font-size: 13px; line-height: 1.7; margin: 7px 0 15px; }
        .coloring-note { text-align: center; font-size: 12px; color: #98778f; margin: 32px 0 0; }
        .about { background: #e4f1e8; text-align: center; padding: 75px 20px; }
        .about p { margin: 20px auto; }
        .about-heart { font-size: 35px; color: #c16c9c; }
        footer { text-align: center; padding: 45px 20px; }
        footer p { font-family: Georgia, serif; color: #887c8c; }
        footer span { font-size: 9px; letter-spacing: 1px; color: #988e98; }
        @media (max-width: 850px) { .header { flex-wrap: wrap; } nav { order: 3; width: 100%; justify-content: center; } }
        @media (max-width: 700px) {
          .hero { grid-template-columns: 1fr; padding: 55px 7%; }
          .hero-art { height: 300px; }
          .product-grid, .coloring-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
          .product-art, .coloring-art { height: 175px; }
          .product-info { flex-wrap: wrap; }
          .coloring-section { padding: 65px 7%; }
          h2 { font-size: 34px; }
        }
        @media (max-width: 420px) { .product-grid, .coloring-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
