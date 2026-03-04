# 🎨 IRIS DESIGN SPEC — Tattoo Portfolio

> **Author:** @iris | **Date:** 2026-03-04 | **Stack:** Next.js App Router + TypeScript + Tailwind CSS 4 + shadcn/ui (new-york)
> **Kontekst:** Static demo, dark-first, srpski + engleski (next-intl, localePrefix: 'never')

---

## AESTHETIC DIRECTION

**Tone:** _Luxe Underground_ — tattoo parlor mystique meets editorial refinement. Not grungy. Not gothic. Dark, prestigious, minimal. Like a high-end studio where every wall is black velvet and the artist's work is the only color.

**Differentiation:** The one thing someone will remember — **gold glows in the dark**. Every accent, border, hover, and CTA uses warm gold (#d4a853) against deep black. The typography is dramatically large, serif, and confident. A site that feels like the tattooist's portfolio — not a SaaS landing page wearing tattoo clothes.

**Why gold over red?** Red is expected (danger, punk, blood). Gold says _master craftsman_ — surgical precision, lasting legacy, your body as canvas for fine art. It differentiates this studio in a sea of red-and-black competitors.

---

## 1. DESIGN TOKENS

### 1.1 CSS Custom Properties (append to `src/app/globals.css`)

```css
/* ═══════════════════════════════════════
   TATTOO STUDIO — DARK THEME TOKENS
   Tailwind CSS 4 syntax (@theme inline)
═══════════════════════════════════════ */

/* Override shadcn dark base for tattoo theme */
:root {
  --radius: 0.25rem; /* Sharp corners — tattoo studios don't do bubbly */
}

.dark,
:root {
  /* === BASE PALETTE === */
  --background:        #0a0a0a;  /* Near-void black */
  --foreground:        #f5f0e8;  /* Warm off-white — not harsh pure white */
  --card:              #111111;  /* Panel surfaces */
  --card-foreground:   #f5f0e8;
  --popover:           #111111;
  --popover-foreground: #f5f0e8;

  /* === GOLD ACCENT SYSTEM === */
  --gold-primary:      #d4a853;  /* Main gold — warm, deep */
  --gold-bright:       #f59e0b;  /* Highlight gold — amber glow */
  --gold-muted:        #8a6a2f;  /* Subdued gold for borders */
  --gold-dark:         #3d2e0f;  /* Gold tint on dark bg */

  /* === NEUTRAL SCALE (warm-toned blacks) === */
  --neutral-950:       #0a0a0a;
  --neutral-900:       #111111;
  --neutral-800:       #1a1a1a;
  --neutral-700:       #222222;
  --neutral-600:       #2e2e2e;
  --neutral-500:       #444444;
  --neutral-400:       #666666;
  --neutral-300:       #888888;
  --neutral-200:       #aaaaaa;
  --neutral-100:       #cccccc;

  /* === SEMANTIC TOKENS (shadcn-compatible) === */
  --primary:           #d4a853;
  --primary-foreground: #0a0a0a;
  --secondary:         #1a1a1a;
  --secondary-foreground: #f5f0e8;
  --muted:             #1a1a1a;
  --muted-foreground:  #888888;
  --accent:            #d4a853;
  --accent-foreground: #0a0a0a;
  --destructive:       #dc2626;
  --border:            #2e2e2e;
  --input:             #1a1a1a;
  --ring:              #d4a853;

  /* === STYLE TAG COLORS (for TattooStyle.color) === */
  --style-blackwork:   #4a4a4a;
  --style-fineline:    #8b7355;
  --style-traditional: #8b3a3a;
  --style-realism:     #2d5a5a;
  --style-watercolor:  #4a3d6b;
}

@theme inline {
  /* Extend Tailwind with tattoo tokens */
  --color-gold:           var(--gold-primary);
  --color-gold-bright:    var(--gold-bright);
  --color-gold-muted:     var(--gold-muted);
  --color-gold-dark:      var(--gold-dark);
  --color-surface:        var(--neutral-800);
  --color-surface-raised: var(--neutral-700);

  /* Typography */
  --font-display: 'Cormorant Garamond', 'Georgia', serif;
  --font-sans:    'Syne', 'system-ui', sans-serif;
  --font-mono:    'Space Mono', monospace;

  /* Spacing overrides */
  --spacing-hero: 100svh;
  --spacing-section: 7rem;    /* 112px section padding */

  /* Border radius — sharp for tattoo aesthetic */
  --radius-sm:   0px;
  --radius-md:   2px;
  --radius-lg:   4px;
  --radius-xl:   8px;
  --radius-full: 9999px;
}
```

### 1.2 Font Loading (layout.tsx)

```typescript
// src/app/[locale]/layout.tsx
import { Cormorant_Garamond, Syne } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

// Apply: className={`${cormorant.variable} ${syne.variable}`}
```

### 1.3 Design Token Reference Table

| Token | Value | Usage |
|-------|-------|-------|
| `#0a0a0a` | Near-black | Page background |
| `#111111` | Dark surface | Cards, panels |
| `#1a1a1a` | Raised surface | Input fields, hover states |
| `#2e2e2e` | Border | Dividers, card borders |
| `#d4a853` | Gold primary | CTAs, accents, hovers |
| `#f59e0b` | Gold bright | Glow effects, active states |
| `#f5f0e8` | Warm white | Body text |
| `#888888` | Muted text | Labels, meta info |
| Cormorant Garamond | Display serif | H1–H3, hero, section titles |
| Syne | Geometric sans | Body, nav, labels, buttons |

---

## 2. COMPONENT INVENTORY

### 2.1 Marketing Nav (`<MarketingNav>`)

**File:** `src/components/marketing/marketing-nav.tsx`  
**Type:** Client Component (`"use client"`)

**Props:**
```typescript
interface MarketingNavProps {
  locale: string
}
```

**Behavior:**
- `position: fixed`, full width, `z-50`
- **Transparent** when `scrollY === 0` (over hero) → `transition-colors duration-500`
- **Solid** `bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#2e2e2e]` on scroll (`scrollY > 80`)
- Logo: studio name in Cormorant Garamond, italic, gold — left
- Nav links: Syne 500, `text-sm tracking-[0.15em] uppercase`, right side
- Language toggle: custom `<LanguageToggle>` component (EN | SR)
- Mobile: hamburger → full-screen overlay menu (shadcn `<Sheet>`)

**States:**
- Link default: `text-neutral-300 hover:text-gold transition-colors`
- Link active: `text-gold`
- Nav transparent: `bg-transparent`
- Nav solid: `bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2e2e2e]`

---

### 2.2 Hero Section (`<HeroSection>`)

**File:** `src/components/marketing/hero-section.tsx`  
**Type:** Server Component

**Props:**
```typescript
interface HeroSectionProps {
  studioName: string
  tagline: string
  ctaLabel: string
  bookLabel: string
  ctaHref: string
  bookHref: string
}
```

**Visual Structure:**
- Full viewport height (`min-h-[100svh]`)
- Background: dark image placeholder with `overlay` using `bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]`
- Noise texture overlay: CSS `url('/noise.svg')` at 3% opacity for film grain effect
- Content: centered, slightly left-biased (`items-start pl-[8%]`)
- Studio name: Cormorant Garamond, `text-[clamp(4rem,10vw,9rem)]`, font-weight 300, italic, line-height 0.9
- Tagline: Syne, `text-sm md:text-base tracking-[0.3em] uppercase`, gold color, below name
- CTAs: primary gold button + ghost white button, side by side
- Scroll indicator: animated chevron-down, bottom center

**Background image:** `/images/hero-bg.jpg` — placeholder `next/image` with `fill` and `object-cover priority`

---

### 2.3 Gallery Preview (`<GalleryPreview>`)

**File:** `src/components/marketing/gallery-preview.tsx`  
**Type:** Server Component (receives data via props)

**Props:**
```typescript
interface GalleryPreviewProps {
  works: TattooWork[]   // First 6 works
  ctaLabel: string
  ctaHref: string
  sectionTitle: string
}
```

**Visual:** 3-column grid on desktop, 2-column tablet, 1-column mobile. Each card is a `<WorkCard>` component. Below grid: centered "View All" CTA.

---

### 2.4 Work Card (`<WorkCard>`)

**File:** `src/components/marketing/work-card.tsx`  
**Type:** Client Component (for hover animation)

**Props:**
```typescript
interface WorkCardProps {
  work: TattooWork
  locale: 'en' | 'sr'
  priority?: boolean   // For above-fold images
}
```

**Visual:**
- Aspect ratio: `aspect-[3/4]` (portrait — fits tattoo photography)
- Rounded: `rounded-sm` (2px — sharp)
- Overflow hidden, `group` class for hover orchestration
- **Image:** `next/image` with `fill object-cover`, scale `1 → 1.05` on group-hover (`transition-transform duration-700`)
- **Overlay:** `bg-gradient-to-t from-black/80 via-black/20 to-transparent`, opacity `0 → 1` on group-hover (`transition-opacity duration-300`)
- **Content (on hover):** title (Cormorant Garamond, 1.25rem, white), style badge (`<StyleBadge>`) — slide up from bottom (`translate-y-4 → translate-y-0`)
- **Gold border:** `ring-0 group-hover:ring-1 ring-gold/60 transition-all duration-300`
- **Cursor:** `cursor-pointer`
- Wrapped in `<Link href={/gallery/${work.slug}}>` 

**States:**
- Default: image only, subtle shadow
- Hover: overlay fades in, content slides up, gold ring appears, image scales

---

### 2.5 Gallery Filter (`<GalleryFilter>`)

**File:** `src/components/marketing/gallery-filter.tsx`  
**Type:** Client Component

**Props:**
```typescript
interface GalleryFilterProps {
  styles: TattooStyle[]
  allLabel: string       // i18n "All Styles"
  activeSlug: string | null
  onChange: (slug: string | null) => void
}
```

**Visual:**
- Horizontal scrollable row on mobile, centered on desktop
- Filter pills: Syne 600, `text-xs tracking-[0.2em] uppercase px-5 py-2`
- Default: `border border-[#2e2e2e] text-neutral-400 hover:border-gold/50 hover:text-gold`
- Active: `bg-gold text-[#0a0a0a] border-gold`
- Transition: `transition-all duration-200`
- Uses `nuqs` `useQueryState` for URL-sync: `?style=blackwork`

---

### 2.6 Gallery Grid (`<GalleryGrid>`)

**File:** `src/components/marketing/gallery-grid.tsx`  
**Type:** Client Component

**Props:**
```typescript
interface GalleryGridProps {
  initialWorks: TattooWork[]
  styles: TattooStyle[]
  locale: 'en' | 'sr'
}
```

**Visual:**
- `columns-1 sm:columns-2 lg:columns-3` — CSS columns masonry layout (simpler than CSS Grid for variable heights)
- `gap-3` between items
- Each work: `break-inside-avoid mb-3`
- Filtering: Framer Motion `AnimatePresence` + `layout` prop for smooth reflow
- No pagination for demo (all works shown, filter client-side)

**Loading skeleton:** `<GallerySkeleton>` — 6 dark rectangles with `animate-pulse`

---

### 2.7 Work Detail (`<WorkDetail>`)

**File:** `src/components/marketing/work-detail.tsx`  
**Type:** Server Component

**Props:**
```typescript
interface WorkDetailProps {
  work: TattooWork & { style: TattooStyle }
  locale: 'en' | 'sr'
  backLabel: string
}
```

**Layout (desktop):**
- `grid grid-cols-[1fr,420px] gap-12 min-h-screen`
- Left: sticky image, full height, `next/image` with `object-contain`
- Right: back button, style badge, title (Cormorant Garamond display size), description (Syne body), CTA to contact

**Layout (mobile):**
- Stack: image top (aspect-square), info below
- Back button as `<Button variant="ghost">` with `<ArrowLeft>` icon (Lucide)

---

### 2.8 Style Badge (`<StyleBadge>`)

**File:** `src/components/shared/style-badge.tsx`  
**Type:** Server Component

**Props:**
```typescript
interface StyleBadgeProps {
  style: TattooStyle
  size?: 'sm' | 'md'
}
```

**Visual:**
- Pill shape, `rounded-sm`
- Background: semi-transparent style color (`${style.color}33` — 20% opacity)
- Border: `1px solid ${style.color}66` — 40% opacity
- Text: style.name, Syne 600, `text-xs tracking-[0.2em] uppercase`, color = `style.color`
- Size sm: `px-2 py-0.5 text-[10px]`
- Size md: `px-3 py-1 text-xs`

---

### 2.9 Contact Form (`<ContactForm>`)

**File:** `src/components/marketing/contact-form.tsx`  
**Type:** Client Component (`"use client"`)

**Pattern:** react-hook-form + zod

**Zod Schema:**
```typescript
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  message: z.string().min(20, { message: 'Tell us more about your idea (min 20 chars)' }),
})
type ContactFormValues = z.infer<typeof contactSchema>
```

**Visual:**
- `max-w-lg mx-auto`
- Labels: Syne 500, `text-xs tracking-[0.2em] uppercase text-neutral-400`, `mb-1.5`
- Inputs: `bg-[#1a1a1a] border border-[#2e2e2e] focus:border-gold focus:ring-1 focus:ring-gold/30 text-[#f5f0e8] placeholder:text-neutral-500 rounded-sm transition-colors`
- Textarea: `min-h-[140px] resize-none`
- Submit: gold button, full width, Syne 700, `tracking-[0.2em] uppercase`
- Error messages: `text-red-400 text-xs mt-1`
- Success state: gold checkmark + success message, form fades out
- Uses shadcn `<Form>`, `<FormField>`, `<FormItem>`, `<FormControl>`, `<FormMessage>`

---

### 2.10 Language Toggle (`<LanguageToggle>`)

**File:** `src/components/shared/language-toggle.tsx`  
**Type:** Client Component

**Props:**
```typescript
interface LanguageToggleProps {
  locale: string
}
```

**Visual:**
- Two-part pill: `EN | SR`
- Active locale: gold text, no bg
- Inactive: `text-neutral-500 hover:text-neutral-300`
- Separator: `text-[#2e2e2e]`
- Font: Syne 600, `text-xs tracking-[0.15em]`
- Uses `next-intl` `useRouter` for locale switching

---

### 2.11 Gallery Skeleton (`<GallerySkeleton>`)

**File:** `src/components/shared/gallery-skeleton.tsx`  
**Type:** Server Component

**Visual:**
- 6 `<Skeleton>` cards in grid layout
- Variable heights (3 tall: `h-96`, 2 medium: `h-64`, 1 short: `h-48`) — mimics masonry
- `bg-[#1a1a1a] animate-pulse rounded-sm`

---

### 2.12 Section Header (`<SectionHeader>`)

**File:** `src/components/shared/section-header.tsx`  
**Type:** Server Component

**Props:**
```typescript
interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  goldAccent?: boolean   // Shows thin gold line above title
}
```

**Visual:**
- Gold accent: `w-12 h-px bg-gold mb-6`
- Title: Cormorant Garamond, `text-4xl md:text-5xl font-light italic`
- Subtitle: Syne, `text-sm tracking-[0.2em] uppercase text-neutral-400 mt-3`

---

### 2.13 Marketing Footer (`<MarketingFooter>`)

**File:** `src/components/marketing/marketing-footer.tsx`  
**Type:** Server Component

**Visual:**
- `bg-[#0a0a0a] border-t border-[#1a1a1a]`
- Three columns (desktop): Studio name + tagline | Nav links | Social icons
- Bottom bar: copyright, language toggle
- All text: Syne, `text-xs text-neutral-500`
- Studio name: Cormorant Garamond, italic, gold

---

## 3. PAGE LAYOUTS (Wireframes)

### 3.1 Home Page (`/`)

```
┌─────────────────────────────────────────────────────────┐
│ NAV: [Studio Name*]           [Gallery] [Contact] [EN|SR]│  ← Transparent
├─────────────────────────────────────────────────────────┤
│                                                          │
│  HERO (100svh)                                           │
│  Background: dark image + noise texture overlay          │
│                                                          │
│    SHADOW INK                                            │  ← Cormorant, 7-9rem
│    STUDIO                                                │     font-light italic
│                                                          │
│    BELGRADE TATTOO ART ——————————                        │  ← Syne, gold
│                                                          │
│    [VIEW GALLERY]  [BOOK APPOINTMENT]                    │  ← gold solid | ghost
│                                                          │
│                         ↓                               │  ← animated scroll cue
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  GALLERY PREVIEW                         │
│                                                          │
│  ─── Featured Work ─────────────────────────────────    │  ← SectionHeader
│                                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐                           │
│  │      │  │      │  │      │                           │  ← WorkCard 3-col
│  │  3/4 │  │  3/4 │  │  3/4 │                           │
│  │ratio │  │ratio │  │ratio │                           │
│  └──────┘  └──────┘  └──────┘                           │
│                                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐                           │
│  │      │  │      │  │      │                           │
│  └──────┘  └──────┘  └──────┘                           │
│                                                          │
│                  [SEE ALL WORK →]                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              ABOUT / STUDIO STRIP (optional)             │
│  Short bio text + one accent image, 2-col layout        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                       FOOTER                             │
│  Studio Name | Gallery · Contact | Instagram TikTok      │
│  © 2026 Shadow Ink Studio. All rights reserved.         │
└─────────────────────────────────────────────────────────┘
```

**Breakpoints:**
- Mobile (< 768px): 1-col grid, smaller hero text (`clamp(3rem,8vw,9rem)`)
- Tablet (768-1024px): 2-col grid
- Desktop (> 1024px): 3-col grid

---

### 3.2 Gallery Page (`/gallery`)

```
┌─────────────────────────────────────────────────────────┐
│ NAV: [Studio Name*]           [Gallery] [Contact] [EN|SR]│  ← Solid black
├─────────────────────────────────────────────────────────┤
│  pt-28 (nav compensation)                                │
│                                                          │
│  Portfolio                                               │  ← Cormorant, italic
│  BROWSE ALL WORKS BY STYLE ──────────────────────        │  ← gold, uppercase
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │ [All] [Blackwork] [Fineline] [Traditional] ...   │    │  ← Filter pills
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────┐ ┌────┐ ┌────┐                                    │
│  │    │ │    │ │    │  ← Masonry columns (CSS columns)   │
│  │    │ │    │ ├────┤                                    │
│  │    │ ├────┤ │    │                                    │
│  ├────┤ │    │ │    │                                    │
│  │    │ │    │ ├────┤                                    │
│  │    │ ├────┤ │    │                                    │
│  └────┘ └────┘ └────┘                                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Interaction Flow:**
1. User clicks filter pill → `useQueryState('style', ...)` updates URL param
2. Works filter client-side (no re-fetch for demo)
3. Framer Motion `AnimatePresence` + `layout` reflows cards smoothly

**Breakpoints:**
- Mobile: 1 column, filters scroll horizontally
- Tablet: 2 columns
- Desktop: 3 columns

---

### 3.3 Work Detail Page (`/gallery/[slug]`)

```
DESKTOP:
┌─────────────────────────────────────────────────────────┐
│ NAV (solid)                                              │
├────────────────────────────┬────────────────────────────┤
│                            │ pt-28                       │
│   STICKY IMAGE             │ [← Back to Gallery]         │  ← ArrowLeft icon
│                            │                             │
│   Large tattoo photo,      │  ┌─────────────┐           │
│   object-contain,          │  │ BLACKWORK   │           │  ← StyleBadge
│   bg-[#111]                │  └─────────────┘           │
│                            │                             │
│   sticky top-0             │  Geometric Wolf Sleeve      │  ← Cormorant, 3rem
│   height: 100svh           │                             │
│                            │  Fine blackwork piece       │  ← Syne body text
│                            │  with geometric patterns... │
│                            │                             │
│                            │  ─────────────────────      │  ← divider
│                            │                             │
│                            │  [BOOK THIS STYLE →]        │  ← gold button
│                            │                             │
└────────────────────────────┴────────────────────────────┘

MOBILE (< 768px):
┌─────────────────────────────┐
│ NAV (solid)                 │
├─────────────────────────────┤
│ [← Back]                    │
├─────────────────────────────┤
│ IMAGE (aspect-square)       │
├─────────────────────────────┤
│ [BLACKWORK]                 │  ← StyleBadge
│                             │
│ Title                       │  ← Cormorant
│ Description...              │  ← Syne
│                             │
│ [BOOK THIS STYLE]           │  ← full-width gold
└─────────────────────────────┘
```

---

### 3.4 Contact Page (`/contact`)

```
┌─────────────────────────────────────────────────────────┐
│ NAV (solid)                                              │
├─────────────────────────────────────────────────────────┤
│  pt-28                                                   │
│                                                          │
│         Book an Appointment                              │  ← Cormorant, center
│    FILL OUT THE FORM BELOW ─────────────────────         │  ← gold, uppercase
│                                                          │
│         ┌─────────────────────────────┐                  │
│  max-w  │  NAME                       │  ← label        │
│  lg     │  ┌─────────────────────┐   │                  │
│         │  │                     │   │  ← Input         │
│         │  └─────────────────────┘   │                  │
│         │                             │                  │
│         │  EMAIL                      │                  │
│         │  ┌─────────────────────┐   │                  │
│         │  │                     │   │                  │
│         │  └─────────────────────┘   │                  │
│         │                             │                  │
│         │  PHONE (OPTIONAL)           │                  │
│         │  ┌─────────────────────┐   │                  │
│         │  │                     │   │                  │
│         │  └─────────────────────┘   │                  │
│         │                             │                  │
│         │  YOUR IDEA                  │                  │
│         │  ┌─────────────────────┐   │                  │
│         │  │                     │   │                  │
│         │  │    (textarea)       │   │                  │
│         │  │                     │   │                  │
│         │  └─────────────────────┘   │                  │
│         │                             │                  │
│         │  ┌─────────────────────┐   │                  │
│         │  │   SEND REQUEST      │   │  ← gold, full-w  │
│         │  └─────────────────────┘   │                  │
│         └─────────────────────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

**Success State:**
- Form fades out (`opacity-0 scale-95`)
- Success card fades in: gold check icon, "Request Sent!", message
- No redirect — stays on page

---

## 4. MOCK DATA SCHEMA

### 4.1 TypeScript Interfaces

```typescript
// src/types/tattoo.ts

export type TattooStyleSlug =
  | 'blackwork'
  | 'fineline'
  | 'traditional'
  | 'realism'
  | 'watercolor'

export interface TattooStyle {
  id: string
  slug: TattooStyleSlug
  nameEn: string
  nameSr: string
  color: string         // hex, used for StyleBadge
  order: number
}

export interface TattooWork {
  id: string
  slug: string
  imageUrl: string      // placeholder image URL
  imageAlt: string      // accessibility
  titleEn: string
  titleSr: string
  descriptionEn: string
  descriptionSr: string
  style: TattooStyle
  featured: boolean     // Show on home page preview
  order: number
  published: boolean
}

// For static mock data (demo — no DB)
export type TattooWorkWithStyle = TattooWork & {
  style: TattooStyle
}
```

### 4.2 Mock Styles (`src/data/mock-styles.ts`)

```typescript
import type { TattooStyle } from '@/types/tattoo'

export const mockStyles: TattooStyle[] = [
  {
    id: 'style-1',
    slug: 'blackwork',
    nameEn: 'Blackwork',
    nameSr: 'Blackwork',
    color: '#6b7280',   // Cool grey — solid, precise
    order: 1,
  },
  {
    id: 'style-2',
    slug: 'fineline',
    nameEn: 'Fine Line',
    nameSr: 'Fina Linija',
    color: '#a08060',   // Warm tan — delicate, artistic
    order: 2,
  },
  {
    id: 'style-3',
    slug: 'traditional',
    nameEn: 'Traditional',
    nameSr: 'Tradicionalno',
    color: '#b45252',   // Muted red — bold, classic
    order: 3,
  },
  {
    id: 'style-4',
    slug: 'realism',
    nameEn: 'Realism',
    nameSr: 'Realizam',
    color: '#3d7a7a',   // Teal — depth, photographic
    order: 4,
  },
  {
    id: 'style-5',
    slug: 'watercolor',
    nameEn: 'Watercolor',
    nameSr: 'Akvarel',
    color: '#7c5a9e',   // Purple — fluid, painterly
    order: 5,
  },
]
```

### 4.3 Mock Works (`src/data/mock-works.ts`)

```typescript
// Placeholder images from: https://picsum.photos/seed/{slug}/800/1067
// (3:4 ratio for portrait tattoo photography)

import { mockStyles } from './mock-styles'
import type { TattooWork } from '@/types/tattoo'

const [blackwork, fineline, traditional, realism, watercolor] = mockStyles

export const mockWorks: TattooWork[] = [
  {
    id: 'work-1',
    slug: 'geometric-wolf-sleeve',
    imageUrl: 'https://picsum.photos/seed/wolf/800/1067',
    imageAlt: 'Geometric wolf sleeve tattoo in blackwork style',
    titleEn: 'Geometric Wolf Sleeve',
    titleSr: 'Geometrijski Vuk na Rukavu',
    descriptionEn:
      'A full sleeve composition blending geometric precision with organic wolf imagery. Bold black lines create a striking contrast against the skin, with intricate dot-work shading filling the negative space.',
    descriptionSr:
      'Kompozicija na punom rukavu koja spaja geometrijsku preciznost sa organskim prikazom vuka. Podebljane crne linije stvaraju upečatljiv kontrast, dok detaljan dot-work upotpunjuje negativan prostor.',
    style: blackwork,
    featured: true,
    order: 1,
    published: true,
  },
  {
    id: 'work-2',
    slug: 'botanical-fineline-forearm',
    imageUrl: 'https://picsum.photos/seed/botanical/800/1067',
    imageAlt: 'Botanical fine line tattoo on forearm',
    titleEn: 'Botanical Forearm',
    titleSr: 'Botanika na Podlaktici',
    descriptionEn:
      'Delicate wildflower arrangement running along the forearm. Single-needle technique captures every petal\'s translucent quality — as if the flowers simply grew through the skin.',
    descriptionSr:
      'Delikatna kompozicija divljeg cvijeća duž podlaktice. Tehnika jedne igle bilježi gotovo providnu teksturu latica — kao da su cvijetovi izrasli kroz kožu.',
    style: fineline,
    featured: true,
    order: 2,
    published: true,
  },
  {
    id: 'work-3',
    slug: 'american-traditional-eagle',
    imageUrl: 'https://picsum.photos/seed/eagle/800/1067',
    imageAlt: 'American traditional eagle tattoo',
    titleEn: 'American Eagle',
    titleSr: 'Američki Orao',
    descriptionEn:
      'Bold traditional American eagle with clean outlines, flat classic fills, and timeless iconography. A tribute to the golden era of tattooing — built to age gracefully for decades.',
    descriptionSr:
      'Snažan tradicionalni američki orao s čistim obrisima, ravnim klasičnim bojama i vjekovnom ikonografijom. Hommage zlatnom dobu tetoviranja — rađen da što ljepše stari.',
    style: traditional,
    featured: true,
    order: 3,
    published: true,
  },
  {
    id: 'work-4',
    slug: 'portrait-realism-chest',
    imageUrl: 'https://picsum.photos/seed/portrait/800/1067',
    imageAlt: 'Photorealistic portrait tattoo on chest',
    titleEn: 'Portrait — Chest Piece',
    titleSr: 'Portret — Grudi',
    descriptionEn:
      'Photorealistic portrait covering the upper chest. Every strand of hair, every wrinkle, rendered in hyper-detailed black and grey. A technical tour de force.',
    descriptionSr:
      'Fotorealistički portret koji pokriva gornji dio grudi. Svaka nit kose, svaki nabor kože, prikazani su u ultra-detaljnoj crno-sivoj tehnici.',
    style: realism,
    featured: true,
    order: 4,
    published: true,
  },
  {
    id: 'work-5',
    slug: 'watercolor-koi-thigh',
    imageUrl: 'https://picsum.photos/seed/koi/800/1067',
    imageAlt: 'Watercolor koi fish tattoo on thigh',
    titleEn: 'Koi Thigh Piece',
    titleSr: 'Koi Šarani na Bedru',
    descriptionEn:
      'Fluid watercolor koi fish in vivid blues and oranges, designed to flow with the body\'s natural curves. Deliberate "bleeding" edges create the illusion of paint on skin.',
    descriptionSr:
      'Tečni akvarel koi šarana u živim plavim i narandžastim bojama, dizajniran da prati prirodne krivine tijela. Namjerni "krvarući" rubovi stvaraju iluziju boje na koži.',
    style: watercolor,
    featured: true,
    order: 5,
    published: true,
  },
  {
    id: 'work-6',
    slug: 'mandala-blackwork-back',
    imageUrl: 'https://picsum.photos/seed/mandala/800/1067',
    imageAlt: 'Mandala blackwork tattoo on back',
    titleEn: 'Mandala Back Piece',
    titleSr: 'Mandala na Leđima',
    descriptionEn:
      'Sprawling mandala composition across the entire back. Hundreds of hours of meticulous dot-work and geometric linework — a meditative masterwork.',
    descriptionSr:
      'Kompozicija mandala koja prekriva cijela leđa. Stotine sati pažljivog dot-worka i geometrijskih linija — meditativno remek-djelo.',
    style: blackwork,
    featured: true,
    order: 6,
    published: true,
  },
  {
    id: 'work-7',
    slug: 'serpent-fineline-collarbone',
    imageUrl: 'https://picsum.photos/seed/serpent/800/1067',
    imageAlt: 'Fine line serpent tattoo along collarbone',
    titleEn: 'Collarbone Serpent',
    titleSr: 'Zmija na Ključnoj Kosti',
    descriptionEn:
      'Sinuous serpent curving along the collarbone in a single, unbroken fine line. Minimal shading amplifies the elegance of pure linework.',
    descriptionSr:
      'Vijugava zmija koja se uvija duž ključne kosti u jednoj, neprekinutoj finoj liniji. Minimalno sjenčanje pojačava eleganciju čistog lineworka.',
    style: fineline,
    featured: false,
    order: 7,
    published: true,
  },
  {
    id: 'work-8',
    slug: 'neo-traditional-cat',
    imageUrl: 'https://picsum.photos/seed/neocat/800/1067',
    imageAlt: 'Neo-traditional cat tattoo with floral elements',
    titleEn: 'Neo-Traditional Cat',
    titleSr: 'Neo-Tradicionalna Mačka',
    descriptionEn:
      'Bold neo-traditional cat surrounded by lush florals. Heavy outlines with rich colour fills — a contemporary spin on flash-sheet iconography.',
    descriptionSr:
      'Snažna neo-tradicionalna mačka okružena bujnim cvijećem. Debeli obrisi s bogatim punjenjem boje — savremeni zaokret na klasičnu ikonografiju.',
    style: traditional,
    featured: false,
    order: 8,
    published: true,
  },
]

export const featuredWorks = mockWorks.filter(w => w.featured)
```

---

## 5. ANIMATION & INTERACTION NOTES

### 5.1 Nav Scroll Transition
```typescript
// useEffect + scroll listener
// scrollY < 80 → transparent; scrollY >= 80 → solid
// CSS transition: bg, border, backdrop-filter — duration-500 ease-out
```

### 5.2 Hero Entrance
- Text: `opacity-0 translate-y-8` → `opacity-100 translate-y-0` on mount
- Stagger: studio name first (0ms), tagline (200ms), CTAs (400ms)
- Scroll indicator: `animate-bounce` (CSS) — infinite, subtle

### 5.3 Work Card Hover
```css
/* All via Tailwind group-hover utilities */
.card-image     → scale-105 (duration-700 ease-out)
.card-overlay   → opacity-100 (duration-300)
.card-content   → translate-y-0 opacity-100 (duration-300 delay-100)
.card-ring      → ring-1 ring-gold/60 (duration-300)
```

### 5.4 Gallery Filter Animation
```typescript
// Framer Motion
const variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

// AnimatePresence mode="popLayout" on grid container
// Each WorkCard: motion.div with layout prop (auto-handles position changes)
// Transition: duration 0.35s, ease [0.4, 0, 0.2, 1]
```

### 5.5 Contact Form States
- Form mount: fade + slide up (150ms delay after page load)
- Field focus: gold border glow `ring-1 ring-gold/30` — `transition-all duration-200`
- Submit button hover: `bg-gold/90 scale-[1.01]` — `transition duration-150`
- Submit button loading: `opacity-70 cursor-not-allowed`, spinner icon (Loader2 from Lucide, `animate-spin`)
- Success: form `opacity-0 scale-95 duration-300` → success card `opacity-100 scale-100 duration-300 delay-300`

### 5.6 Page Transitions (optional, nice-to-have)
- Next.js View Transitions API (`unstable_ViewTransition` or Framer Motion `AnimatePresence` at layout level)
- Fade only — no slides (cleaner for dark aesthetic)
- Duration: 200ms

### 5.7 Image Loading
- `next/image` with `placeholder="blur"` for all tattoo images
- Blur placeholder: generate low-res blur data URI or use a dark fallback `#1a1a1a`
- Lazy load by default (except hero: `priority`)

---

## 6. SHADCN/UI COMPONENTS

### Install Commands

```bash
# Already installed (check components.json):
# button, badge, card, dialog, form, input, label, select,
# separator, sheet, skeleton, sonner, tabs, textarea, tooltip

# Install missing:
npx shadcn@latest add badge
npx shadcn@latest add toast
# (others already present in the template)
```

### Usage Map

| Page/Component | shadcn Components Used |
|----------------|------------------------|
| MarketingNav | `Sheet`, `Button` |
| HeroSection | `Button` |
| GalleryFilter | Custom pills (styled from scratch — pills fit better than shadcn Tabs) |
| WorkCard | Custom (performance — minimal wrapper) |
| GalleryGrid | `Skeleton` (loading state) |
| WorkDetail | `Button`, `Separator`, `Badge` (via StyleBadge custom) |
| ContactForm | `Form`, `FormField`, `FormItem`, `FormControl`, `FormLabel`, `FormMessage`, `Input`, `Textarea`, `Button` |
| LanguageToggle | Custom (minimal, inline) |
| MarketingFooter | `Separator` |
| Success toast | `Sonner` (for error fallback) |

### Custom Components (no shadcn equivalent)

| Component | Reason |
|-----------|--------|
| `<StyleBadge>` | Needs dynamic hex color — shadcn Badge is variant-based |
| `<GalleryFilter>` | Pills with active/inactive state, URL-synced — custom logic |
| `<LanguageToggle>` | Too minimal to warrant a full shadcn component |
| `<SectionHeader>` | Layout component, purely presentational |
| `<HeroSection>` | Full-page layout component |

---

## 7. IMPLEMENTATION NOTES FOR @VULCAN

### File Structure to Create
```
src/
├── types/
│   └── tattoo.ts                          ← TattooWork, TattooStyle interfaces
├── data/
│   ├── mock-styles.ts                     ← 5 styles
│   └── mock-works.ts                      ← 8 works (with featured flag)
├── app/[locale]/(marketing)/
│   ├── gallery/
│   │   ├── page.tsx                       ← Server Component, passes data to GalleryGrid
│   │   └── [slug]/
│   │       └── page.tsx                   ← Server Component, finds work by slug
│   └── contact/
│       └── page.tsx                       ← Server Component wrapper
└── components/
    ├── marketing/
    │   ├── marketing-nav.tsx              ← Client (scroll listener)
    │   ├── hero-section.tsx               ← Server
    │   ├── gallery-preview.tsx            ← Server
    │   ├── gallery-grid.tsx               ← Client (filtering + animation)
    │   ├── gallery-filter.tsx             ← Client (nuqs)
    │   ├── work-card.tsx                  ← Client (hover)
    │   ├── work-detail.tsx                ← Server
    │   ├── contact-form.tsx               ← Client (RHF)
    │   └── marketing-footer.tsx           ← Server
    └── shared/
        ├── style-badge.tsx                ← Server
        ├── section-header.tsx             ← Server
        ├── gallery-skeleton.tsx           ← Server
        └── language-toggle.tsx            ← Client
```

### Static Data Pattern (no DB for demo)
```typescript
// In Server Components — import directly:
import { mockWorks, featuredWorks } from '@/data/mock-works'
import { mockStyles } from '@/data/mock-styles'

// For gallery/[slug]/page.tsx:
const work = mockWorks.find(w => w.slug === params.slug)
if (!work) notFound()
```

### i18n in Static Data
```typescript
// Helper for locale-aware text:
export function getLocalizedWork(work: TattooWork, locale: 'en' | 'sr') {
  return {
    ...work,
    title: locale === 'sr' ? work.titleSr : work.titleEn,
    description: locale === 'sr' ? work.descriptionSr : work.descriptionEn,
  }
}
```

### Key Packages Required
```bash
npm install nuqs          # URL state for gallery filter
npm install framer-motion # Gallery animation
# next/font: Cormorant_Garamond + Syne (already built-in Next.js)
```

### SEO (generateMetadata)
```typescript
// Every marketing page should have:
export const metadata: Metadata = {
  title: 'Shadow Ink Studio | Belgrade Tattoo Art',
  description: '...',
  openGraph: { images: ['/og-image.jpg'] },
}
// Use dynamic generateMetadata for /gallery/[slug]
```

---

## 8. ACCENT COLOR DECISION: WHY GOLD

| | Gold (#d4a853) | Red (#dc2626) |
|---|---|---|
| **Associations** | Prestige, mastery, permanence | Danger, punk, aggression |
| **Uniqueness** | Rare in tattoo sites | Very common |
| **Dark contrast** | Warm, glowing | Harsh, alarming |
| **CTA readability** | Excellent on black | Good but clichéd |
| **Aging metaphor** | Gold doesn't fade | Red connotes fresh blood |
| **Studio positioning** | High-end fine art | Street/punk studio |

**Verdict:** Gold is the differentiator. Every competitor uses red or white. This studio is for clients who want art that lasts a lifetime — gold communicates that permanence.

---

*🌈 Design by @iris — The Rainbow Architect | Shadow Ink Studio Visual Identity*
