import { getEntry } from "astro:content";

/** The single site.md entry (intro, links, experience, about). */
export async function getSite() {
  const site = await getEntry("site", "site");
  if (!site) throw new Error("src/content/site.md is missing.");
  return site;
}
