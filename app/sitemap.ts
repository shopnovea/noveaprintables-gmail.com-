import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://noveaodelis.vercel.app";
  const paths = [
    "/",
    "/coloring-pages",
    "/holiday/christmas",
    "/coloring-pages?collection=thanksgiving",
    "/coloring-pages?collection=cozy",
    "/coloring-pages?collection=ocean",
    "/coloring-pages?collection=flowers",
    "/privacy-policy",
    "/terms-of-use",
    "/refund-policy",
  ];
  return paths.map(path => ({ url: `${origin}${path}` }));
}
