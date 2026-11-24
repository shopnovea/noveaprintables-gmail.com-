import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://noveaodelis.vercel.app"),
  title: "NOVÉA ODELIS PRINTABLES | Printable Coloring Pages",
  description: "Discover printable coloring pages for kids and adults. Create your own mix-and-match bundles and enjoy instant digital PDF downloads.",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "msvalidate.01": "73B25D3FB831B001AA1E9718A3AC049F",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
