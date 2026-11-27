export default function TermsOfUse() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFF7ED', color: '#492D35', fontFamily: 'Arial, sans-serif', fontSize: '1.125rem', lineHeight: 1.7, padding: '40px 20px', overflowWrap: 'anywhere' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#652C46', textDecoration: 'underline', display: 'inline-block', padding: '12px 0' }}>← BACK TO SHOP</a>
        <h1 style={{ fontFamily: 'Georgia, serif', color: '#652C46', fontWeight: 'normal', fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>Terms of Use</h1>
        <p>Last updated: November 27, 2026</p>
        <p>Welcome to NOVÉA ODELIS PRINTABLES. These terms describe the permitted use of our digital printables and the conditions of purchasing and downloading products from our website at noveaodelis.com.</p>

        <h2 style={heading}>Digital Products</h2>
        <p>Our coloring pages and other digital printables are supplied as downloadable files. Product descriptions identify the available file formats. No physical products are shipped. Prices are displayed in US dollars.</p>

        <h2 style={heading}>Personal Use</h2>
        <div style={{ backgroundColor: '#D6B894', borderRadius: '16px', padding: '20px' }}>
          <p style={{ marginTop: 0 }}>Your purchase or authorized free download grants you permission to download and print your digital printables as often as you like for personal use.</p>
          <p>Please do not share, redistribute, resell or upload the digital files elsewhere. You may not sell printed copies or use our designs in products offered for sale.</p>
          <p style={{ marginBottom: 0 }}>Commercial use is not included unless expressly authorized. Purchasing or downloading a file does not transfer ownership of any intellectual property rights.</p>
        </div>

        <h2 style={heading}>Purchases and Downloads</h2>
        <p>Purchased downloads become available after successful checkout. Please save your purchased files to your device and keep your purchase confirmation link private. If you have difficulty accessing your files, contact us for assistance.</p>

        <h2 style={heading}>Refunds</h2>
        <p>Please read our <a href="/refund-policy" style={{ color: '#652C46', textDecoration: 'underline' }}>Digital Download &amp; Refund Policy</a>. Nothing in these terms limits rights that cannot lawfully be waived.</p>

        <h2 style={heading}>Privacy</h2>
        <p>Please review our <a href="/privacy-policy" style={{ color: '#652C46', textDecoration: 'underline' }}>Privacy Policy</a> for information about how personal information is handled.</p>

        <h2 style={heading}>Changes to These Terms</h2>
        <p>We may update these terms as our shop and services change. The latest version will be available on our website.</p>

        <h2 style={heading}>Contact Us</h2>
        <p>For questions about your purchase or permitted use, email <a href="mailto:noveaprintables@gmail.com" style={{ color: '#652C46', textDecoration: 'underline' }}>noveaprintables@gmail.com</a>.</p>

        <footer style={{ textAlign: 'center', marginTop: '40px', color: '#492D35', fontFamily: 'Georgia, serif' }}>Thank you for supporting NOVÉA ODELIS PRINTABLES. ♡</footer>
      </article>
    </main>
  );
}

const heading = { fontFamily: 'Georgia, serif', fontWeight: 'normal', fontSize: '1.5rem', color: '#652C46', marginTop: '28px' } as const;
