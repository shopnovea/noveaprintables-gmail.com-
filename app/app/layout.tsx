
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NOVĒA | Creative Printables",
  description:
    "Colorful printables, planners, and digital goodies for everyday life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
