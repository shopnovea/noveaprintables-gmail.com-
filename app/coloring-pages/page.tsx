
export default function ColoringPages() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff7f2",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#39313d",
      }}
    >
      <a
        href="/"
        style={{
          color: "#b26796",
          textDecoration: "none",
        }}
      >
        ← BACK TO SHOP
      </a>

      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "42px",
          marginTop: "35px",
        }}
      >
        Ocean Friends 🐢
      </h1>

      <p>Sea Turtle Coloring Page</p>
      <p>1 Printable Page</p>

      <img
        src="/ocean-friends-preview.png"
        alt="Watermarked Ocean Friends turtle coloring page"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "450px",
          height: "auto",
          margin: "30px auto",
          borderRadius: "12px",
        }}
      />

      <h2>$0.75</h2>

      <p>
        A cute sea turtle coloring page for kids and adults.
      </p>

      <p style={{ color: "#98778f" }}>
        Secure checkout will be available soon.
      </p>
    </main>
  );
}

