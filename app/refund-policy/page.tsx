export default function RefundPolicyPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#FFF7ED", color: "#492D35", padding: "40px 20px", fontFamily: "Arial, sans-serif", fontSize: "1.125rem", lineHeight: 1.7, overflowWrap: "anywhere" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <a href="/" style={{ color: "#652C46", textDecoration: "underline", display: "inline-block", padding: "12px 0" }}>← BACK TO SHOP</a>
        <h1 style={{ fontFamily: "Georgia, serif", fontWeight: "normal", color: "#652C46", fontSize: "clamp(2rem, 5vw, 2.75rem)", textAlign: "center" }}>Digital Download &amp; Refund Policy</h1>

        <p>Last updated: November 27, 2026</p>

        <div style={{ backgroundColor: "#D6B894", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
          <strong style={{ color: "#652C46" }}>NOVÉA ODELIS PRINTABLES</strong>
          <p style={{ margin: "8px 0 0", fontFamily: "Georgia, serif", fontStyle: "italic" }}>A little creativity, delivered instantly. ♡</p>
        </div>

        <h2 style={heading}>Instant Digital Downloads</h2>
        <p>All products offered through noveaodelis.com are digital downloads. No physical products will be shipped.</p>
        <p>Your purchased coloring pages are available after successful checkout. You may download them individually or together as a ZIP file. Please save your files to your device for future use.</p>

        <h2 style={heading}>Refunds</h2>
        <p>Due to the digital nature of our products, purchases are generally non-refundable once downloads have been made available, except where required by applicable law.</p>
        <p>Refunds are generally not provided for a change of mind or accidental selection of a design after the digital files have been made available.</p>

        <h2 style={heading}>Download Problems and Duplicate Charges</h2>
        <p>We want you to enjoy your purchase. If you receive an incorrect or damaged file, experience a download problem or believe you have been charged twice for the same order, please contact us.</p>
        <p>We will review the issue and work with you to provide a replacement file, restore access or issue an appropriate refund where warranted.</p>
        <p>Nothing in this policy limits any consumer rights that cannot lawfully be waived.</p>

        <h2 style={heading}>Personal Use</h2>
        <p>Purchased and authorized free digital printables may be printed as often as you like for personal use. Digital files may not be shared, redistributed, resold or uploaded elsewhere. Commercial use is not included unless expressly authorized.</p>
        <p>Please review our <a href="/terms-of-use" style={{ color: "#652C46", textDecoration: "underline" }}>Terms of Use</a> for additional information.</p>

        <section aria-labelledby="questions-heading" style={{ backgroundColor: "#D6B894", borderRadius: "16px", padding: "20px", margin: "32px auto", textAlign: "center" }}>
          <h2 id="questions-heading" style={{ ...heading, marginTop: 0 }}>QUESTIONS</h2>
          <p>Email <a href="mailto:noveaprintables@gmail.com" style={{ color: "#652C46", textDecoration: "underline" }}>noveaprintables@gmail.com</a>.</p>
          <p style={{ marginBottom: 0 }}>For questions about an order, please include your order details, but do not send payment card information.</p>
        </section>

        <footer style={{ textAlign: "center", marginTop: "40px", color: "#492D35", fontFamily: "Georgia, serif" }}>Thank you for supporting NOVÉA ODELIS PRINTABLES. ♡</footer>
      </div>
    </main>
  );
}

const heading = { color: "#652C46", fontFamily: "Georgia, serif", fontWeight: "normal", fontSize: "1.5rem", marginTop: "28px" } as const;
