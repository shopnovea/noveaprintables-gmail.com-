import type { Metadata } from "next";
import BackToTop from "./BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://noveaodelis.com"),
  title: "NOVÉA ODELIS PRINTABLES",
  description: "Discover coloring pages, puzzles, mazes, educational worksheets and creative activities for kids and adults. Enjoy free printables and instant PDF bundles.",
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
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
