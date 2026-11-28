import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://noveaodelis.com";

  const paths = [
    "/",
    "/coloring-pages",
    "/animal-coloring",
    "/cozy-coloring",
    "/nature-coloring",
    "/holiday-coloring",
    "/holiday/christmas",
    "/coloring-pages?collection=thanksgiving",
    "/coloring-pages?collection=cozy",
    "/coloring-pages?collection=ocean",
    "/coloring-pages?collection=farm",
    "/coloring-pages?collection=woodland",
    "/coloring-pages?collection=flowers",
    "/activity-center",
    "/activity-center?collection=activity_puzzles_and_mazes",
    "/activity-center?collection=activity_little_learners",
    "/activity-center?collection=activity_word_fun",
    "/activity-center?collection=activity_creative_activities",
    "/activity-center?collection=activity_seasonal_fun",
    "/activity-center?collection=activity_brain_games",
    "/free-printables",
    "/privacy-policy",
    "/terms-of-use",
    "/refund-policy",
  ];

  return paths.map(path => ({
    url: `${origin}${path}`,
  }));
}
