
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NOVĒA | Creative Printables",
  description: "Colorful printables and digital goodies.",
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
