
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
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
