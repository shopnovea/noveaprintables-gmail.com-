
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
    color: "#DDA078",
  },
  {
    name: "Little Bundle",
    pages: 5,
    price: "$2.99",
    color: "#A9BE83",
  },
  {
    name: "Happy Bundle",
    pages: 10,
    price: "$4.99",
    color: "#A0BBD3",
  },
  {
    name: "Mega Bundle",
    pages: 20,
    price: "$7.99",
    color: "#C4ACD3",
    comingSoon: false,
  },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        A LITTLE CREATIVITY GOES A LONG WAY ✨
      </div>

      <header className="header">
        <a href="#home" className="logo">NOVÉA ODELIS<span className="logo-subtitle">PRINTABLES</span></a>
        <p className="brand-tagline">A little creativity, delivered instantly.</p>

        <nav aria-label="Main navigation">
          <a href="#home">HOME</a>
          <a href="/coloring-pages">COLORING PAGES</a>
          <a href="/free-printables">FREE PRINTABLES</a>
          <a href="#about">ABOUT</a>
