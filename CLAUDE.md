# CLAUDE.md — Trevor Wattles Portfolio Site

> Put this file in the root of a new GitHub repo for the site (see §13 for the repo name).
> Claude Code reads it at the start of every session. To begin, paste the **Kickoff prompt** at the bottom.

---

## 0. What we're building

A single-page personal site for **Trevor Wattles**, a BYU Computer Science senior (graduating April 2027) who works as a backend developer at BYU Law School and a full-stack developer at EnrollPro. It's the link on his resume, LinkedIn, GitHub, and job applications.

**Audience:** recruiters who skim for ~60 seconds and engineers who click into one project.
**Success test:** someone who doesn't know Trevor can say what he does and name one project after 60 seconds on the page.

**Decisions already made (don't reopen unless Trevor asks):**
- Design direction **A — Editorial**: calm, magazine-like, off-white paper, serif headings, one rust accent, small monospace labels.
- Hosting: **GitHub Pages** first, on the free `github.io` address. Custom domain later (§13.3).
- Projects: Trevor's five resume projects, any order for now. The D2D CRM may be shown with mock data.
- **EnrollPro: text only.** No screenshots, no internal names, no feature details beyond what's on his resume.
- "Other projects" list: built but hidden behind a flag until Trevor turns it on.

---

## 1. Non-negotiable rules

### 1.1 Truth only
- Every fact on the page comes from Trevor or from the content files in `src/content/`. Never invent metrics, users, dates, technologies, employers, or outcomes.
- When a fact is missing, leave a visible `TODO:` in the content file and ask Trevor. Never fill gaps with plausible-sounding text.
- Never describe his degree as completed. It's "B.S. Computer Science, BYU, expected April 2027."

### 1.2 Privacy and permissions
- **EnrollPro:** text only, as above.
- **BYU Law School information system:** holds student records. No screenshots of the real system, ever. Describe it in text; an architecture diagram with generic labels is OK if Trevor approves it.
- **D2D CRM and anything else:** screenshots only with **mock data** (fake names, fake dollar amounts). Before committing any screenshot, check it for real names, emails, phone numbers, addresses, API keys, URLs of private systems, and browser tabs/bookmarks. Crop or blur if anything slips in, and tell Trevor.
- No secrets in the repo. The site is static and needs none.

### 1.3 Don't make it look AI-generated
This is a hard requirement, not a nice-to-have. The things that make a page read as AI-made are mostly sameness and vague copy, so these are banned:

**Visual — do not use:**
- Gradients of any kind (especially indigo/purple/blue), glows, blurred blobs, glassmorphism, grain overlays
- The Inter font, or any font picked "by default". Fonts are set in §4.2; don't change them without asking.
- Rows of three (or four) equal rounded cards with an icon on top
- Icon packs / thin-line icon sets (Lucide, Heroicons, etc.) as decoration. The only icons allowed are small inline SVGs for GitHub, LinkedIn, and email, and only if Trevor wants them; plain text links are the default.
- Tech-logo walls or skill bars / percentage meters
- Emoji in headings or labels
- Typing animations, particles, parallax, scroll-jacking, cursor effects, fade-in-on-scroll for every element
- Fake device mockups (phones/laptops around screenshots), stock photos, AI-generated images
- Dark "hacker terminal" styling
- Tailwind default palette, shadcn defaults, or any UI kit

**Copy — do not use these words or patterns:**
passionate, innovative, cutting-edge, leverage/leveraging, seamless, robust (unless describing a specific test), dynamic, synergy, "I love building things", "turning ideas into reality", "crafting digital experiences", "Hi, I'm Trevor 👋", "Let's build something amazing together", "Transform/Elevate/Empower". No sentence that would still make sense on another developer's site.

**Do instead:**
- Show real screenshots of real interfaces.
- Specific nouns and numbers: names of real systems (except EnrollPro internals), real stacks, real outcomes Trevor confirms.
- First person, short sentences, plain words. Read like Trevor wrote it on a good day.
- Break the grid once: the first project is larger than the rest, and projects alternate image left/right.
- A real photo of Trevor.

**The cover-the-name test:** before finishing any phase that touches copy, re-read the page as if Trevor's name were hidden. Flag any sentence that could belong to someone else and propose a specific rewrite.

### 1.4 How you (Claude Code) work here
- **Content before design.** Phase 1 is writing, with Trevor, in Markdown. No styling until the words exist.
- One phase at a time (§15). At each phase end: run the build, start the dev server, show Trevor (screenshot via Playwright if useful), and wait for his OK.
- Ask before adding any dependency not listed in §2.
- Verify version-specific details (Astro config, GitHub Actions deploy action, GitHub Pages IPs) against current official docs before relying on them; this file may be out of date.
- Keep JavaScript near zero. The page should work with JS disabled except the screenshot lightbox.

---

## 2. Tech stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | **Astro** (latest stable) | Static output, zero JS by default |
| Language | TypeScript (strict) | For config, content schemas, scripts |
| Styling | **Plain CSS** with custom properties (§4) | One `global.css` + component-scoped `<style>`. No Tailwind, no CSS frameworks |
| Content | Astro **content collections** with a zod schema | One Markdown file per project |
| Images | `astro:assets` `<Image>` / `<Picture>` | AVIF + WebP, responsive `srcset`, explicit width/height |
| Fonts | `@fontsource` packages, self-hosted | No Google Fonts network request |
| Screenshots | Playwright script (`scripts/`) | Dev dependency only |
| Video loops | `ffmpeg` (installed via Homebrew if Trevor approves) | MP4 + WebM, muted, short |
| Lint/format | Prettier (+ `prettier-plugin-astro`) | Keep it light |
| Deploy | GitHub Actions → GitHub Pages | Astro's official Pages workflow (§13) |

Trevor's machine: **2025 MacBook Air (macOS)**. Node 20+ (`node -v`; use `nvm` if needed).

---

## 3. Repository layout

```
<repo>/
  CLAUDE.md
  README.md                        # how to run, add a project, deploy (Phase 6)
  astro.config.mjs
  package.json
  tsconfig.json
  .github/workflows/deploy.yml     # GitHub Pages deploy (§13)
  public/
    favicon.svg                    # "TW" monogram in the heading serif
    og.png                         # 1200x630 link-preview image (§11)
    resume/Trevor_Wattles_Resume.pdf
    robots.txt
    # CNAME                        # added later with the custom domain
  src/
    content.config.ts              # collection schemas (check current Astro docs for file name/location)
    content/
      projects/
        d2d-crm.md
        chess-server.md
        aws-webapp.md
        cicd-webapp.md
        home-price-ml.md
      other/                       # "Other projects" one-liners (hidden at launch)
      site.md                      # intro sentence, about paragraph, experience entries
    assets/
      me.jpg                       # headshot (Trevor provides)
      projects/<slug>/...          # screenshots and video posters per project
    components/
      Nav.astro
      Intro.astro
      ProjectRow.astro
      ProjectMedia.astro           # screenshot(s) / video loop + lightbox trigger
      Experience.astro
      About.astro
      Footer.astro
      Lightbox.astro               # native <dialog>, tiny inline script
    layouts/
      Base.astro                   # <head>, meta, fonts, skip link
    styles/
      tokens.css                   # §4 design tokens
      global.css                   # resets, base typography, utilities
    pages/
      index.astro
      404.astro
  scripts/
    shots.yaml                     # what to screenshot (§9)
    screenshots.ts                 # Playwright capture script
    loops.sh                       # ffmpeg recipes for short video loops
  media-src/                       # raw recordings (gitignored)
```

---

## 4. Design system (Direction A — Editorial)

### 4.1 Color tokens (`src/styles/tokens.css`)

The accent is a Utah red-rock rust; neutrals are warm to match it. Light theme only at launch.

```css
:root {
  --paper:      #FAF8F4;  /* page background */
  --paper-2:    #F2EEE6;  /* subtle panels, figure backgrounds */
  --ink:        #1F1D1A;  /* body text */
  --ink-2:      #4A453E;  /* secondary text */
  --muted:      #6B655C;  /* captions, labels (check AA on --paper) */
  --rule:       #E2DBCF;  /* hairlines, screenshot borders */
  --accent:     #A4472A;  /* links, small highlights — Utah red rock */
  --accent-ink: #84361F;  /* link hover/active */
  --focus:      #A4472A;
}
```

Rules: accent is for links, the active nav item, and at most one small highlight per section. Never fill large areas with it. Verify every text/background pair meets WCAG AA (4.5:1 body, 3:1 large) with a contrast checker and fix any that fail.

### 4.2 Typography

| Role | Font | Weights | Package |
| --- | --- | --- | --- |
| Headings, name | **Source Serif 4** | 600 (opsz if variable) | `@fontsource-variable/source-serif-4` |
| Body | **IBM Plex Sans** | 400, 500 | `@fontsource/ibm-plex-sans` |
| Labels (stack, dates, captions) | **IBM Plex Mono** | 400 | `@fontsource/ibm-plex-mono` |

Check exact package names on npm before installing. Use `font-display: swap`; preload only the body regular and heading weight.

**Type scale** (modular, ratio ~1.2, body 17px) — use these steps only:

```css
:root {
  --step--1: 0.875rem;  /* 14px  labels, captions */
  --step-0:  1.0625rem; /* 17px  body */
  --step-1:  1.25rem;   /* 20px  lead text */
  --step-2:  1.5rem;    /* 24px  project titles */
  --step-3:  1.8125rem; /* 29px  section headings */
  --step-4:  2.1875rem; /* 35px  name on mobile */
  --step-5:  2.625rem;  /* 42px  name on desktop */
  --leading-body: 1.6;
  --leading-tight: 1.15;
  --measure: 38rem;     /* max line length for prose */
}
```

Labels in mono: `--step--1`, letter-spacing `0.02em`, color `--muted`, no all-caps shouting (sentence case or small caps via `font-variant-caps: all-small-caps` sparingly).

### 4.3 Space and layout

```css
:root {
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem;
  --space-5: 1.5rem;  --space-6: 2rem;   --space-7: 3rem;    --space-8: 4.5rem; --space-9: 7rem;
  --wide: 72rem;      /* max width for project rows */
  --gutter: clamp(1rem, 4vw, 2rem);
  --radius: 4px;      /* screenshots only; text blocks are square */
}
```

- Prose sits in a `--measure` column; project media can go to `--wide`.
- Sections separated by generous space (`--space-8`/`--space-9`) and a single 1px `--rule` hairline, not boxes.
- No shadows, except an optional very faint one on screenshots (`0 1px 2px rgb(0 0 0 / 0.06)`).
- Mobile first. Everything stacks below ~760px. No horizontal scroll at 320px.

### 4.4 Links and focus
- Links: `--accent`, underline with `text-underline-offset: 0.18em` and `text-decoration-thickness: 1px`; hover → `--accent-ink`, thicker underline.
- Visible focus ring everywhere: `outline: 2px solid var(--focus); outline-offset: 3px`.

### 4.5 Motion
- None by default. Allowed: link color transitions (≤150ms), lightbox open/close fade (≤150ms).
- Video loops autoplay only when `prefers-reduced-motion: no-preference`; otherwise show the poster with a play button.

---

## 5. Page structure and content (`src/pages/index.astro`)

Order is fixed. Top nav (not sticky on mobile; sticky with a thin `--rule` bottom border on desktop is OK): **Work · Experience · About · Resume · Contact**. "Resume" links to the PDF; the rest are in-page anchors. Add a skip link to `#work`.

### 5.1 Intro (above the fold)
Layout: photo on the left (square, ~160–200px desktop, ~120px mobile, `--radius`), text on the right; stacks on mobile.

- Name: "Trevor Wattles" in Source Serif 4, `--step-5`.
- One specific sentence (draft; Trevor approves the final wording):
  > Backend developer at BYU Law School and full-stack developer at EnrollPro. I build Node.js and Express APIs on MySQL and AWS, and I graduate from BYU in Computer Science in April 2027.
- One mono label line: `Provo, Utah · Open to full-time roles from May 2027` (confirm city and date with Trevor).
- Links as plain text in one row: Email · GitHub · LinkedIn · Resume (PDF). Email is a visible `mailto:` address, not a form.

### 5.2 Selected work (`#work`)
Section heading: "Selected work". Then the five projects (§6), rendered by `ProjectRow.astro`:
- **First project:** full `--wide` width, large screenshot above, text below in two columns on desktop (description left, details right).
- **Projects 2–5:** two-column rows, media and text alternating sides (even rows flip). Media ~58%, text ~42%.
- Thin `--rule` between rows. No card backgrounds.

### 5.3 Experience (`#experience`)
Simple list, newest first. Each entry: role, company, location, dates (mono), then 1–3 lines of plain text.
- **Software Developer — EnrollPro** (Remote, Apr 2026–present): text only, based on the resume: full-stack features and testing suites for an enrollment and team-building CRM; diagnosing and fixing frontend and backend issues from customer tickets. No screenshots, no internals.
- **Backend Developer — J. Reuben Clark Law School, BYU** (Provo, UT, Jan 2026–present): develops and maintains the law school's information system; builds and tests REST APIs with Node.js and Express; manages MySQL; works with AWS.
- **Delivery Associate — Amazon** (American Fork, UT, Feb–Dec 2025): one line, Employee of the Month twice among 140+ employees.
- Education line at the bottom of this section: BYU, B.S. Computer Science, expected April 2027 · GPA 3.93 (4.0 in major) · Dean's List. Confirm Trevor wants GPA shown.

### 5.4 About (`#about`)
One short paragraph (80–120 words), Trevor's voice, specific. Facts available (Trevor picks which to use): served two years as a volunteer representative in France and speaks French; Eagle Scout; co-runs Anthem Gutters, a gutter-guard business in Utah, and built its website; does freelance web development; originally from Las Vegas. **Claude drafts only from these and Trevor's answers in Phase 1; Trevor edits.**

### 5.5 Contact / footer (`#contact`)
- "Email me at <address>" as a sentence, then GitHub · LinkedIn · Resume.
- Small mono line: `Last updated <Month YYYY>` (from build date) · "Built with Astro" is optional; skip "made with ❤️".

### 5.6 Other projects (hidden at launch)
A compact list (name — one line — link) under Selected work, controlled by `SHOW_OTHER_PROJECTS = false` in a small `src/config.ts`. Candidates later: Canvas Board Mobile, Conference Talk RAG, MongoDB aggregation project, systems programming in C, Anthem Gutters website.

---

## 6. Project content model

### 6.1 Schema (zod, in the content config)

```ts
{
  title: string,
  order: number,                     // 1 = featured/largest
  oneLiner: string,                  // one sentence, what it does, no adjectives
  role: string,                      // e.g., "Solo developer" / "Team of 4, owned the server"
  dates: string,                     // e.g., "2025" or "Jan–Apr 2026"
  context?: string,                  // e.g., "BYU CS 240" or "Built for a sales team"
  stack: string[],                   // plain text, shown in mono joined by " · "
  visibility: "public" | "private",
  links: { live?: url, repo?: url, video?: url },
  privateNote?: string,              // default: "Source is private — happy to walk through it."
  result?: string,                   // a number or concrete outcome, only if Trevor confirms
  media: Array<{
    type: "image" | "video",
    src: string,                     // path under src/assets/projects/<slug>/
    poster?: string,                 // for video
    alt: string,                     // describes what the screen shows, not "screenshot"
    caption?: string                 // short, mono
  }>,                                // 1–3 items; first is the hero
  draft: boolean                     // drafts don't render
}
```

Body Markdown: a "What I built" list of 2–4 bullets, then one short paragraph titled "The hard part" (the most interesting technical problem and how he solved it). Trevor's words, edited lightly.

### 6.2 Seed files (create in Phase 1, with TODOs — only resume facts filled in)

- **`d2d-crm.md`** — title: TODO (confirm name, e.g., "D2D Sales CRM"). oneLiner from resume: a custom CRM for a door-to-door sales team that calculates automated rep payouts, tracks performance metrics, and manages incentive reward programs. Stack: TODO. Visibility: TODO. Media: screenshots with **mock data only**.
- **`chess-server.md`** — oneLiner: a chess server with client-server architecture over HTTP and WebSockets. Stack: TODO (language). Context: TODO (course?). Visibility: TODO.
- **`aws-webapp.md`** — title TODO. oneLiner: a full-stack web application built with core web technologies and deployed on AWS. Stack: TODO.
- **`cicd-webapp.md`** — title TODO. oneLiner: a web app with automated testing, CI/CD pipelines, and cloud-based monitoring. Stack: TODO (test framework, CI tool, monitoring tool).
- **`home-price-ml.md`** — title TODO. oneLiner: machine learning models that predict home prices. Stack: TODO (Python libraries). Media: charts or notebook output screenshots are fine.

Ask Trevor which should be `order: 1`. If he says "you pick," pick the one with the strongest visual and the most real-world use, and say why.

### 6.3 Interview Trevor for each project (Phase 1)
Ask these, one project at a time, and write his answers into the file:
1. What does it do, in one sentence a recruiter would understand?
2. Who was it for, and was it used? By how many people / for how long?
3. What did *you* build vs. teammates or starter code?
4. Stack: languages, frameworks, database, hosting, testing.
5. What was the hardest problem, and how did you solve it?
6. Any number you can stand behind (users, records, latency, test count, accuracy)?
7. Is the repo public? Is there a live demo? Can you record a 60–90 second walkthrough?
8. Anything that must not be shown?

---

## 7. Project media rules

- **Hero image:** 16:10, captured at 1440×900 at 2× device scale. Secondary images: same or a 390×844 mobile view.
- Frame: 1px `--rule` border, `--radius`, `--paper-2` background behind transparent areas. No device mockups, no tilted perspective.
- Captions in mono `--step--1`: describe what's happening ("Payout summary for a pay period, mock data").
- Alt text describes the screen's content and purpose.
- Clicking an image opens it full size in `Lightbox.astro` (native `<dialog>`, Esc to close, focus returns to the trigger). This is the only client-side script.
- **Video loops** (optional, best for private projects): 10–20 s, silent, 1280px wide, MP4 (H.264) + WebM, ≤ 2 MB each, `muted loop playsinline`, `poster` required, `preload="none"` for rows below the fold.
- **Longer walkthroughs** (60–90 s, with Trevor's voice): host as an unlisted YouTube video and link it ("Watch a 90-second walkthrough"). Don't embed the YouTube player (it's heavy); link out.
- **Private repos:** show `privateNote` in place of a repo link. Optionally create a small public "showcase" repo per private project (README + screenshots + summary) and link that instead; ask Trevor first.

---

## 8. Headshot

- Trevor provides `src/assets/me.jpg`: real photo, daylight, plain background, head-and-shoulders. No filters, no AI enhancement, no background replacement.
- Crop square, render ~200px (2× source ≥ 400px), `loading="eager"`, `fetchpriority="high"`, alt: "Trevor Wattles".
- If the photo isn't ready, use a plain `--paper-2` square with his initials in the serif as a placeholder, and keep a TODO.

---

## 9. Screenshot pipeline (Phase 3)

`scripts/shots.yaml`:

```yaml
# one entry per screen; Trevor runs each app locally with MOCK DATA first
- project: d2d-crm
  name: payouts
  url: http://localhost:3000/payouts
  viewport: { width: 1440, height: 900 }
  deviceScaleFactor: 2
  waitFor: "[data-testid=payout-table]"   # or a text/selector that means "loaded"
  hide: [".dev-banner"]                    # selectors to hide before capture
  out: src/assets/projects/d2d-crm/payouts.png
```

`scripts/screenshots.ts` (Playwright, Chromium):
- Reads the YAML, opens each URL, waits for `waitFor` and network idle, hides listed selectors, disables animations (inject CSS), screenshots the viewport, saves to `out`.
- Supports `--only <project>` and `--list`.
- Never captures anything not on `localhost` or a URL Trevor explicitly adds.
- After capture, print the file list and remind Trevor to eyeball each for real data (§1.2).

`scripts/loops.sh`: ffmpeg recipes to trim a screen recording from `media-src/`, scale to 1280px, and export MP4 + WebM + a poster frame. Show Trevor the commands before running.

Projects that can't run locally anymore: use existing screenshots Trevor has, or describe them in text only. Don't fake a UI.

---

## 10. Components (behavior notes)

- `Nav.astro`: plain links; current-section highlight is optional and must not require heavy JS (an `IntersectionObserver` under 30 lines is acceptable if Trevor wants it).
- `ProjectRow.astro`: takes a project entry + index; flips media side on even indexes; renders title (`--step-2` serif), oneLiner (`--step-1`), mono meta line (role · dates · context), stack line, the Markdown body, result (if any), and links (Live demo ↗ · Code ↗ · Walkthrough ↗, or the private note).
- `ProjectMedia.astro`: hero media large, up to two thumbnails beneath; all open the lightbox.
- All components accept no styling props beyond what's needed; styles live in the component `<style>` using tokens only (no raw hex values outside `tokens.css`).

---

## 11. Meta, SEO, sharing

- `<title>`: "Trevor Wattles — Software Developer". Meta description: the intro sentence (≤ 160 chars version).
- Open Graph + Twitter card: `public/og.png` 1200×630 — Trevor's name in the serif, the one-line role, rust rule line, paper background. Build it as a small HTML page and screenshot it with Playwright (no design tools needed).
- `favicon.svg`: "TW" monogram, serif, ink on paper.
- JSON-LD `Person` with name, jobTitle, alumniOf (BYU), sameAs (GitHub, LinkedIn).
- `sitemap` (Astro integration) and `robots.txt` allowing all.
- Canonical URL from `site` in the Astro config.

---

## 12. Quality bars (check every phase from 2 on)

- Lighthouse (mobile): Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100.
- Total JS shipped < 5 KB (lightbox only). Total page weight above the fold < 300 KB.
- No layout shift: every image/video has width and height.
- Keyboard: tab through the whole page; every interactive element reachable and visibly focused; skip link works.
- Works at 320px, 390px, 768px, 1024px, 1440px. Check with Playwright screenshots at each width and show Trevor.
- HTML validates; headings in order (one `h1` = his name).
- Spell-check all copy.

---

## 13. Deploy to GitHub Pages

### 13.1 Repo
- Recommended: a **user site** repo named `<github-username>.github.io` so the site lives at `https://<github-username>.github.io/` with no sub-path. Ask Trevor for his GitHub username.
- If he'd rather use another repo name, the site will be at `https://<username>.github.io/<repo>/` and Astro needs `base: "/<repo>"` and all internal links must respect it.
- Public repo is fine (the site is public anyway). Raw recordings stay in gitignored `media-src/`.

### 13.2 Workflow
- Use Astro's official GitHub Pages deploy guide and its GitHub Action (check the current action name and version in Astro's docs).
- `.github/workflows/deploy.yml`: on push to `main` + manual `workflow_dispatch`; build with the Astro action; deploy with `actions/deploy-pages`.
- Trevor sets **Settings → Pages → Build and deployment → Source: GitHub Actions** (walk him through it).
- `astro.config.mjs`: `site: "https://<username>.github.io"`, `output: "static"`, sitemap integration.

### 13.3 Custom domain (later — only when Trevor says so)
Same pattern as his existing GitHub Pages + Cloudflare setup:
- Add `public/CNAME` with the domain; set it in Settings → Pages; update `site` in the Astro config.
- In Cloudflare DNS: `www` CNAME → `<username>.github.io`; apex A/AAAA records → GitHub Pages IPs (look up the current list in GitHub's docs). Start with Cloudflare proxy **off** (DNS only) until GitHub issues the certificate, then enable "Enforce HTTPS".
- Update resume, LinkedIn, GitHub profile, and the job-hunter `profile.yaml` `portfolio_url`.

---

## 14. Pre-launch review checklist (Phase 5 gate)

Go through this with Trevor and report pass/fail per line:

- [ ] Cover-the-name test passes on every section (§1.3)
- [ ] No banned words or patterns (search the built HTML for the §1.3 list)
- [ ] No gradients, card grids, icon packs, emoji, or default fonts
- [ ] Every project shows: name, one-liner, role, stack, real media, links or private note
- [ ] Every fact traced to Trevor's answers or his resume; no remaining TODOs on the page
- [ ] No real personal data in any screenshot; nothing from EnrollPro or the Law School system shown visually
- [ ] Email visible in the intro and footer; resume PDF downloads
- [ ] All links work (run a link checker on the built site)
- [ ] Quality bars in §12 met
- [ ] A friend who doesn't know Trevor's work does the 60-second test; note what they say and fix what they stumble on

---

## 15. Phases

| Phase | What | Done when |
| --- | --- | --- |
| 0. Scaffold | Astro + TS strict, Prettier, folder layout, tokens.css with §4 values, fonts installed, empty components, `npm run dev` / `build` work | Builds clean; Trevor sees a plain unstyled page with section headings |
| 1. Content | Interview Trevor (§6.3) project by project; write `site.md` (intro, experience, about drafts) and all five project files | Trevor approves every sentence; TODO list for missing media only |
| 2. Design + layout | Base styles, Intro, Nav, ProjectRow (alternating), Experience, About, Footer; placeholder media boxes | Screenshots at 390/768/1440 shown to Trevor; he approves the look |
| 3. Media | Run apps with mock data, capture via `screenshots.ts`, make loops if wanted, add headshot, wire lightbox | All five projects have real media; privacy check done |
| 4. Polish | Meta/OG/favicon/JSON-LD, accessibility and performance passes to §12, 404 page, README | All quality bars met |
| 5. Review | §14 checklist with Trevor | All items pass |
| 6. Deploy | Repo, workflow, Pages settings, live URL check on phone and desktop | Site live at `https://<username>.github.io/`; Trevor has the URL for his resume |

---

## 16. Questions for Trevor (ask in Phase 0, one message)

1. GitHub username, LinkedIn URL, and the email to show publicly.
2. City to show (Provo? Lehi? "Utah"?) and availability line wording.
3. OK to show GPA?
4. Which project goes first, or should I pick?
5. For each project: is the repo public, is there a live demo, can it still run locally for screenshots?
6. Headshot: do you have one, or will you take one?
7. Icons for GitHub/LinkedIn/email, or plain text links? (Default: text.)
8. Anything on the resume you'd phrase differently on the site?

---

## Kickoff prompt (paste into Claude Code)

```
Read CLAUDE.md fully. We're doing Phase 0 only.
1. Post a short plan: commands you'll run, packages you'll install (Astro, fonts per §4.2, Prettier), and files you'll create.
2. After I say go: scaffold the Astro project in this folder (TypeScript strict), create the §3 layout, put the §4 tokens in src/styles/tokens.css, install and wire the fonts, and create empty components that render the section headings in §5 order.
3. Run npm run build and npm run dev, and show me the result.
4. Then send ONE message with the §16 questions.
Don't start Phase 1 until I approve.
```
