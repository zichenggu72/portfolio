# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Zicheng Gu built with Next.js 14 (App Router), featuring a blog, project showcase, interactive travel photography map, and collaborative pixel art canvas. The site is optimized for design presentation and deployed on Vercel at https://oorange-design.vercel.app/.

**Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS 4, MongoDB, GraphQL, Mapbox GL, Cloudinary, MDX

## Development Commands

```bash
npm run dev     # Start development server at localhost:3000
npm run build   # Production build
npm start       # Run production server
```

Note: This project uses `npm` (not pnpm/yarn). Package manager is configured via `.npm-global`.

## Environment Variables

Required in `.env.local`:
- `MONGODB_URI` - MongoDB connection string for canvas feature
- `MAPBOX_TOKEN` - Mapbox API token for interactive map (`/n/create`)

## Architecture Overview

### Next.js App Router Structure

The project uses Next.js 13+ App Router architecture with nested layouts:

- **`/app`** - Root application directory
  - **`/n`** - Main navigation section (projects, works, create, resources, hall-of-fame)
    - All content pages are nested under this route
    - Separate layouts for different sections (e.g., `/n/create` has map-based layout)
  - **`/blog`** - Blog section with MDX support
  - **`/api/graphql`** - GraphQL API endpoint

### Key Application Features

#### 1. Interactive Travel Map (`/n/create`)

Location: `app/n/create/layout.tsx`

- Full-screen Mapbox GL map with photo pins at travel locations
- Each pin contains multiple images with captions
- Images loaded from Cloudinary CDN
- Dark mode support with custom Mapbox styles
- Pin data is hardcoded in the layout file as `initialPins` array

**Important**: When adding new locations, update the `initialPins` array with:
```typescript
{
  id: string;
  latitude: number;
  longitude: number;
  images: Array<{
    url: string;
    alt?: string;
    orientation: 'horizontal' | 'vertical';
    caption?: string;
  }>;
  title: string;
}
```

#### 2. Collaborative Pixel Canvas (GraphQL)

Location: `app/api/graphql/`

A multi-user pixel art system with these constraints:
- Grid size: 23x23 pixels (529 total pixels)
- Max 10 unique visitors per canvas
- Auto-completes canvas when full or visitor limit reached
- Collaborative and personal canvas modes
- Completed canvases are archived and queryable

**GraphQL Schema**: See `app/api/graphql/schema.ts` for:
- `Query.activeCanvas` - Gets current active canvas (creates new if full/completed)
- `Query.completedCanvases` - Retrieves archived canvases
- `Mutation.addPixel` - Adds pixel and manages canvas lifecycle
- `Mutation.saveCanvas` - Manually completes current canvas
- `Mutation.clearCanvas` - Removes visitor's pixels
- `Mutation.deleteCompletedCanvas` - Deletes archived canvas

#### 3. MongoDB Integration

Location: `app/lib/mongodb.ts`

- Connection pooling with global caching pattern
- Database models in `app/models/`
- Primary model: Canvas (collaborative pixel art data)

**Important**: The connection uses Mongoose with connection caching to prevent exhausting database connections in serverless environments.

#### 4. Blog System

Location: `app/blog/`

- MDX and Markdown support with custom components
- Posts stored as `.mdx` files in `app/blog/posts/`
- Custom MDX components defined in `app/components/mdx.tsx`
- Syntax highlighting via `sugar-high`
- Dynamic OG image generation for social sharing

### Image Handling

**Local images**: Place in `/app/assets/images/` or `/public/pic/`
**Remote images**: Configure in `next.config.js` under `remotePatterns`

Current remote pattern configured:
- Cloudinary CDN: `https://res.cloudinary.com/dsu2yornu/**`

Use Next.js `<Image>` component for all images to leverage optimization.

### Styling Architecture

**Tailwind CSS 4.0** (alpha) is the primary styling system:
- Global styles in `app/global.css`
- Custom fonts configured in `tailwind.config.js` (Graphik, Oorangeregular)
- Dark mode via Tailwind's `dark:` variant (system preference)

**Emotion** (CSS-in-JS) is used alongside Tailwind for:
- Material-UI component styling
- Dynamic component styles in certain interactive features

### Custom Fonts

Fonts are loaded from `/app/fonts/` and `/public/fonts/`:
- **Graphik** - Primary sans-serif (multiple weights)
- **Oorangeregular** - Custom display font
- **Geist** - Vercel's design system font (from `geist` package)

Font configuration in `app/fonts.ts` uses Next.js Font Optimization.

### Project Showcase Structure

**Case Studies** (`/n/works`): Detailed project write-ups with images and descriptions
- `monitor/` - Project case study example
- `sales/` - Project case study example
- `integration/` - Project case study example

**Portfolio Grid** (`/n/projects`): Project showcase gallery
- Data defined in `app/n/projects/data.ts`

## TypeScript Patterns

Type definitions are located in `app/types/`:
- `post.tsx` - Blog post interfaces
- `work.ts` - Portfolio work types
- `experience.tsx` - Work experience types
- `user.tsx` - User/visitor types

Use strict null checks (enabled in `tsconfig.json`).

## i18n Configuration

The site supports English (default) and Spanish locales configured in `next.config.js`:
```javascript
i18n: {
  locales: ['en', 'es'],
  defaultLocale: 'en',
}
```

Currently, content is primarily in English. Spanish translations would need to be added to content files.

## SEO & Metadata

- **Sitemap**: Auto-generated via `app/sitemap.ts`
- **Robots.txt**: Configured in `app/robots.ts`
- **RSS Feed**: Generated in `app/rss/`
- **Open Graph Images**: Dynamic generation in `app/og/`

All metadata follows Next.js 14 metadata API conventions.

## Vercel Deployment

This project is optimized for Vercel:
- Analytics via `@vercel/analytics`
- Speed Insights via `@vercel/speed-insights`
- Automatic deployments from git
- Environment variables managed in Vercel dashboard

## Common Patterns

### Adding a new blog post
1. Create `.mdx` file in `app/blog/posts/`
2. Include frontmatter with metadata (title, publishedAt, summary)
3. Use custom MDX components from `app/components/mdx.tsx`

### Adding a new project
1. Add project data to `app/n/projects/data.ts`
2. For detailed case study, create new directory under `app/n/works/`
3. Include images in Cloudinary and reference via CDN URLs

### Adding a new map pin
1. Upload images to Cloudinary
2. Add pin data to `initialPins` array in `app/n/create/layout.tsx`
3. Include latitude/longitude coordinates and image metadata

### Working with the Canvas feature
- GraphQL endpoint: `/api/graphql`
- Test queries in GraphQL playground or via client
- Canvas automatically resets when full (529 pixels) or 10 visitors reached
- Check `app/api/graphql/schema.ts` for mutation signatures

## Design System

The site uses a custom design aesthetic:
- Figma design file: https://www.figma.com/design/SwNhYh6d6urfYAkI1tPrCC/Zicheng
- Custom color palette defined in Tailwind config
- Responsive breakpoints follow Tailwind defaults
- Mobile-first approach with responsive components

## Navigation Structure

Main navigation lives in `app/components/Navbar.tsx`:
- Desktop: Full navigation bar
- Mobile: Hamburger menu (implementation in `app/n/components/MobileNav.tsx`)

The `/n` section has its own navigation component at `app/n/components/Navigation.tsx`.

### Note
whenever you make a new change
follow the steps
1) call the agent one to check if there is any exsiting error
2) call the code simipler agent after the code is finished