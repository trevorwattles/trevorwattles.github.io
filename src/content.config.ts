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
    // Optional until Trevor confirms each project; the row shows a TODO when missing.
    visibility: z.enum(["public", "private"]).optional(),
    links: z
      .object({
        live: z.url().optional(),
        repo: z.url().optional(),
        video: z.url().optional(),
        // A site path to a PDF in public/, e.g. "/papers/home-price-prediction.pdf".
        paper: z.string().startsWith("/").optional(),
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
    // "stack": hero + thumbnails beneath. "pair": images side by side, equal size.
    mediaLayout: z.enum(["stack", "pair"]).default("stack"),
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

// §5 — intro, experience, education, links. The Markdown body is the About paragraph.
const site = defineCollection({
  loader: glob({ pattern: "site.md", base: "./src/content" }),
  schema: z.object({
    intro: z.string(),
    location: z.string(),
    availability: z.string(),
    email: z.string(), // empty string until Trevor confirms the public address
    github: z.url(),
    linkedin: z.url(),
    resume: z.string(),
    experience: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        location: z.string(),
        dates: z.string(),
        lines: z.array(z.string()).min(1).max(3),
      }),
    ),
    education: z.object({
      school: z.string(),
      degree: z.string(),
      details: z.string().optional(),
    }),
  }),
});

export const collections = { projects, other, site };
