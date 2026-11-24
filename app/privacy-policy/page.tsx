export default function PrivacyPolicy() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fff7f2', padding: '40px 20px', color: '#39313d', fontFamily: 'Arial, sans-serif', fontSize: '1.125rem', lineHeight: 1.7, overflowWrap: 'anywhere' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#8b3f70', display: 'inline-block', padding: '12px 0' }}>← BACK TO SHOP</a>
        <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 'normal', fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center', color: '#8b3f70' }}>Privacy Policy</h1>
        <p>At NOVÉA Printables, we respect your privacy. This policy explains how information is handled when you browse our shop, purchase coloring pages or contact us.</p>
        <h2 style={heading}>Information We Collect</h2>
        <p>When you make a purchase, Stripe collects checkout information, which may include your email address, payment information and billing details. We may receive your email address, order details and payment confirmation. If you contact us, we receive the information you choose to provide. Our hosting and storage providers may also process technical information such as IP addresses and request logs.</p>
        <h2 style={heading}>How Information Is Used</h2>
        <p>Information is used to process purchases, verify payments, deliver digital files, respond to questions, maintain website security and meet applicable legal obligations.</p>
        <h2 style={heading}>Payments and Service Providers</h2>
        <p>Payments are processed by Stripe. Our website uses Vercel for hosting and Supabase for digital file storage. These providers process information as needed to provide their services. Please see their respective privacy policies for more information.</p>
        <p>We do not directly collect full payment card numbers through our shop. Please do not send payment card information by email.</p>
        <h2 style={heading}>Browser Storage and Downloads</h2>
        <p>Our shop uses browser session storage to remember your selected coloring pages and manage your basket. Purchase confirmation links provide access to purchased files. Please keep these links private and save your downloads to your device.</p>
        <h2 style={heading}>Email Communications</h2>
        <p>Purchasing a product does not automatically subscribe you to marketing emails. If we introduce an optional newsletter, you will be able to unsubscribe from marketing messages.</p>
        <h2 style={heading}>Information Retention and Your Choices</h2>
        <p>Purchase and support information may be retained as needed to provide services, resolve disputes, maintain business records and comply with legal obligations. Depending on applicable law, you may have rights to access, correct or request deletion of personal information. Contact us to make a request.</p>
        <h2 style={heading}>Children&apos;s Privacy</h2>
        <p>Our coloring pages are suitable for a range of ages, but purchases should be made by adults. Our checkout is not intended to collect personal information directly from children. Please contact us if you believe a child has provided personal information to us.</p>
        <h2 style={heading}>Changes to This Policy</h2>
        <p>We may update this policy as our shop and services change.</p>
        <section aria-labelledby="questions-heading" style={{ backgroundColor: '#f9e3eb', borderRadius: '16px', padding: '20px', margin: '32px auto', textAlign: 'center' }}>
          <h2 id="questions-heading" style={{ ...heading, marginTop: 0 }}>QUESTIONS</h2>
          <a href="mailto:noveaprintables@gmail.com" style={{ color: '#8b3f70', textDecoration: 'underline' }}>noveaprintables@gmail.com</a>
        </section>
        <footer style={{ textAlign: 'center', fontFamily: 'Georgia, serif', color: '#594e5c', marginTop: '32px' }}>Made with love, color &amp; a little creativity. ♡</footer>
      </article>
    </main>
  );
}

const heading = { fontFamily: 'Georgia, serif', fontWeight: 'normal', fontSize: '1.5rem', color: '#8b3f70', marginTop: '28px' } as const;
