import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://noveaodelis.vercel.app"),
  title: "NOVÉA ODELIS PRINTABLES | Printable Coloring Pages",
  description: "Discover printable coloring pages for kids and adults. Create your own mix-and-match bundles and enjoy instant digital PDF downloads.",
  robots: {
    index: true,
    follow: true,
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
