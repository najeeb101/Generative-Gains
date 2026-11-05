# Generative Gains website

Company site for Generative Gains LLC, built with Next.js and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Editing content

All copy and links live in `src/content/site.ts`:

- `links.thermalTrace` and `links.freshDriv` point to the product landing pages.
- `links.contact` is empty for now. Set it to a `mailto:` address or form URL and the contact section shows a "Get in touch" button.

## Structure

- `src/app/page.tsx`: page sections
- `src/components/HeroFlow.tsx`: animated hero (systems, the GenOps line, finished tasks)
- `src/components/GenOpsStack.tsx`: interactive GenOps layer stack
- `src/components/ProductArt.tsx`: product illustrations
- `public/logo.png`: logo

## Deploy

Push to GitHub and import the repo in Vercel, or run `npx vercel` from this folder.
