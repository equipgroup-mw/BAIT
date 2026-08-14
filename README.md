# Clickbait — Website & Digital Portfolio

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.
Design is derived directly from `CLICKBAIT_BRAND_GUIDELINE_2025.pdf` — colours,
type (Manrope / a bold display face), the tilted "sticker" tag, and the
cursor‑arrow shard motif used for imagery throughout.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Replace the placeholder photography

Everything is wired up and ready — you only need to add real image files at
the paths below (same filenames, any of `.jpg` / `.png` / `.webp`, just update
the extension in `lib/data.ts` and the two components below if you don't use `.jpg`):

| Path | Used for |
|---|---|
| `public/team/sophie.jpg` | Sophie — Team Lead |
| `public/team/max.jpg` | Max — Head of Video |
| `public/team/haywood.jpg` | Haywood — Head of Graphic Design |
| `public/team/group.jpg` | Full team group shot (About page hero + homepage) |
| `public/team/hero.jpg` | Homepage hero image |
| `public/work/project-1.jpg` … `project-4.jpg` | The four portfolio projects |

Project titles/summaries live in `lib/data.ts` — edit the `projects` and
`team` arrays there; nothing else needs to change.

## Project structure

```
app/
  layout.tsx        — fonts, metadata, Nav + Footer shell
  page.tsx           — homepage (Hero, Vision/Mission, Services, Values, Work, Team)
  about/page.tsx      — group photo + individual team breakdown
  work/page.tsx        — full 4-project portfolio / case studies
components/           — Logo, ArrowIcon, Sticker, ArrowShard, ProjectCard, etc.
lib/data.ts            — team + services + project content (edit here)
public/team, public/work — image assets (see table above)
```

## Deploy: GitHub → Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial Clickbait site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/clickbait-site.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
   - Framework preset: **Next.js** (auto-detected). No environment variables
     are required for the current build.
   - Click **Deploy** — Vercel will build and give you a live URL, and every
     push to `main` will auto-deploy from then on.

3. **Custom domain** (optional): in the Vercel project → Settings → Domains,
   add `clickbait.com` (or whichever domain you own) and follow the DNS
   instructions Vercel provides.

## Notes

- All photography is currently generated placeholder art in the brand's own
  colour palette so nothing looks broken — swap in real photos whenever
  they're ready, no code changes needed.
- Motion respects `prefers-reduced-motion`.
- Colours, type scale, and the sticker/shard motifs are defined as reusable
  components/tokens (`tailwind.config.ts`, `components/Sticker.tsx`,
  `components/ArrowShard.tsx`) so extending the site to new pages stays
  consistent with the brand guide automatically.
