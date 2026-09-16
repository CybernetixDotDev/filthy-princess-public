import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/home", "/cally", "/experience", "/retreat", "/store", "/events", "/inner-sanctum"].map((path) => ({ url: `https://filthyprincesss.com${path}`, lastModified: new Date() }));
}