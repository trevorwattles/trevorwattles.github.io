import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// §6.1 — one Markdown file per project in src/content/projects/
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    order: z.number().int().positive(), // 1 = featured/largest
    oneLiner: z.string(), // one sentence, what it does, no adjectives
    role: z.string(),
    dates: z.string(),
    context: z.string().optional(),
    stack: z.array(z.string()),
    visibility: z.enum(["public", "private"]),
    links: z
      .object({
        live: z.url().optional(),
        repo: z.url().optional(),
        video: z.url().optional(),
      })
      .default({}),
    privateNote: z
      .string()
      .default("Source is private — happy to walk through it."),
    result: z.string().optional(), // only if Trevor confirms
    // 1–3 items once media exists (Phase 3); first is the hero.
    // Paths are relative to src/assets/projects/<slug>/.
    media: z
      .array(
        z
          .object({
            type: z.enum(["image", "video"]),
            src: z.string(),
            poster: z.string().optional(),
            alt: z.string(),
            caption: z.string().optional(),
          })
          .refine((m) => m.type !== "video" || !!m.poster, {
            message: "Video media needs a poster (§7).",
          }),
      )
      .max(3)
      .default([]),
    draft: z.boolean().default(false), // drafts don't render
  }),
});

// §5.6 — "Other projects" one-liners, hidden behind SHOW_OTHER_PROJECTS
const other = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/other" }),
  schema: z.object({
    title: z.string(),
    oneLiner: z.string(),
    link: z.url().optional(),
    order: z.number().int().positive(),
  }),
});

// §5 — intro, about, experience. Fields are defined in Phase 1 with Trevor.
const site = defineCollection({
  loader: glob({ pattern: "site.md", base: "./src/content" }),
  schema: z.object({}),
});

export const collections = { projects, other, site };
