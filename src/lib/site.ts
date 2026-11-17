import { existsSync } from "node:fs";
import { join } from "node:path";
import { getEntry } from "astro:content";

/** The single site.md entry (intro, links, experience, about). */
export async function getSite() {
  const site = await getEntry("site", "site");
  if (!site) throw new Error("src/content/site.md is missing.");
  return site;
}

/**
 * True when the resume PDF named in site.md is actually in public/.
 * Resume links are hidden until it is, so the live site never shows a 404 link.
 */
export function hasFileInPublic(sitePath: string) {
  return existsSync(join(process.cwd(), "public", sitePath));
}
