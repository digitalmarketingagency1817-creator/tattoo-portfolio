# Oracle Recommendation — Tattoo Portfolio Architecture

> **Status:** Draft v1.0 | **Author:** @oracle | **Date:** 2026-03-04

---

## 1. DB Schema — Prisma

### Šta ukloniti

```prisma
// UKLONI: Post model + User.posts relacija
// User model ostaje isti (Better Auth tabele se ne diraju)
```

### Novi modeli — dodati u `prisma/schema.prisma`

```prisma
// ===== Tattoo Portfolio tables =====

model TattooStyle {
  id        String   @id @default(cuid())
  name      String   // "Traditional", "Blackwork", "Fineline"...
  slug      String   @unique // "traditional", "blackwork", "fineline"
  color     String   // hex color za badge/filter, npr. "#FF6B35"
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  works TattooWork[]

  @@index([slug])
}

model TattooWork {
  id String @id @default(cuid())

  // Vercel Blob URL
  imageUrl String

  // i18n: 2 jezika — separate columns (jednostavnije od Json za 2 locale)
  titleEn       String
  titleSr       String
  descriptionEn String  @db.Text
  descriptionSr String  @db.Text

  // URL-friendly slug (za detaljna stranica: /gallery/[slug])
  slug String @unique

  // Relations
  styleId String
  style   TattooStyle @relation(fields: [styleId], references: [id])

  // Status & ordering
  published Boolean @default(false)
  order     Int     @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([styleId])
  @@index([published, order]) // Public gallery query optimization
  @@index([slug])
}

model ContactRequest {
  id      String  @id @default(cuid())
  name    String
  email   String
  phone   String? // Optional — ne svi imaju
  message String  @db.Text

  status ContactStatus @default(PENDING)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status, createdAt])
}

enum ContactStatus {
  PENDING
  SEEN
  REPLIED
  ARCHIVED
}
```

### Napomene o dizajnu

- **i18n titlovi kao separate columns** (ne Json) — jedino 2 jezika, Type-safe Prisma queries, bolje indexiranje
- **slug na TattooWork** — omogućava SEO-friendly URLs `/gallery/geometric-wolf-sleeve`
- **ContactStatus enum** — admin može trackati gdje je svaki request
- **@@index([published, order])** — ključan za public gallery `WHERE published=true ORDER BY order`

---

## 2. App Router Struktura

### Stranice za dodati/izmijeniti

```
src/app/[locale]/
│
├── (marketing)/
│   ├── layout.tsx              ← UPDATE: dodati tattoo nav (Gallery, Contact)
│   ├── page.tsx                ← UPDATE: Hero + galerija preview
│   ├── gallery/
│   │   ├── page.tsx            ← NEW: Galerija sa filterima
│   │   └── [slug]/
│   │       └── page.tsx        ← NEW: Detalj rada (slika, opis, stil)
│   └── contact/
│       └── page.tsx            ← NEW: Kontakt/booking forma
│
├── (dashboard)/
│   ├── layout.tsx              ← EXISTS: sidebar + header (UPDATE sidebar links)
│   ├── dashboard/
│   │   └── page.tsx            ← UPDATE: overview stats (works count, pending contacts)
│   ├── dashboard/works/
│   │   ├── page.tsx            ← NEW: Lista radova (table + filters)
│   │   ├── new/
│   │   │   └── page.tsx        ← NEW: Upload novi rad
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx    ← NEW: Editovanje rada
│   └── dashboard/contacts/
│       └── page.tsx            ← NEW: Lista kontakt upita
│
└── (auth)/                     ← EXISTS: login page, ne diraj
```

### Server Component data fetching pattern

```tsx
// gallery/page.tsx — Server Component
import { HydrateClient } from "@/trpc/server";
import { api } from "@/trpc/server";
import { GalleryGrid } from "@/components/marketing/gallery-grid";

export default async function GalleryPage({ searchParams }) {
  // Prefetch za TanStack Query
  void api.tattooWork.publicList.prefetch({ styleSlug: searchParams.style });
  void api.style.list.prefetch();
  
  return (
    <HydrateClient>
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryGrid />
      </Suspense>
    </HydrateClient>
  );
}
```

---

## 3. tRPC Routeri

### 3.1 `tattooWork` router

```
src/trpc/routers/tattoo-work.ts
```

```typescript
// Procedures:

// PUBLIC
publicList(input: { styleSlug?: string; limit?: number; cursor?: string })
  → TattooWork[] + nextCursor (cursor pagination)
  // WHERE published=true, ORDER BY order ASC
  // Filter by styleSlug if provided

bySlug(input: { slug: string })
  → TattooWork & { style: TattooStyle }
  // Public detail page

// PROTECTED (admin)
adminList(input: { styleId?: string; published?: boolean; limit: number; cursor?: string })
  → TattooWork[]

create(input: {
  imageUrl: string,
  titleEn: string, titleSr: string,
  descriptionEn: string, descriptionSr: string,
  slug: string,
  styleId: string,
  published?: boolean,
  order?: number
}) → TattooWork

update(input: { id: string, ...partial create fields }) → TattooWork

delete(input: { id: string }) → { success: boolean }

reorder(input: { items: { id: string; order: number }[] }) → { success: boolean }
// Batch update order — za drag-and-drop reordering
```

### 3.2 `contact` router

```
src/trpc/routers/contact.ts
```

```typescript
// PUBLIC
submit(input: {
  name: string,
  email: string,
  phone?: string,
  message: string
}) → { success: boolean }
// + triggeruje Inngest event → Resend email notifikacija adminu

// PROTECTED (admin)
adminList(input: { status?: ContactStatus; limit: number; cursor?: string })
  → ContactRequest[]

updateStatus(input: { id: string; status: ContactStatus }) → ContactRequest
```

### 3.3 `style` router

```
src/trpc/routers/style.ts
```

```typescript
// PUBLIC
list() → TattooStyle[]   // Za filter dropdown u galeriji

// PROTECTED (admin)
adminList() → TattooStyle[] // Sa counts radova

create(input: { name: string; slug: string; color: string; order?: number }) → TattooStyle

update(input: { id: string; name?: string; color?: string; order?: number }) → TattooStyle

delete(input: { id: string }) → { success: boolean }
// Guard: ne brisati style ako ima radova (ili na frontend prikazati warning)
```

### Ažuriran `_app.ts`

```typescript
import { tattooWorkRouter } from "./tattoo-work";
import { contactRouter } from "./contact";
import { styleRouter } from "./style";
import { aiRouter } from "./ai"; // Zadržati

export const appRouter = createTRPCRouter({
  tattooWork: tattooWorkRouter,
  contact: contactRouter,
  style: styleRouter,
  ai: aiRouter,
});
```

---

## 4. Component Plan

### 4.1 Marketing (public) komponente

```
src/components/marketing/
├── hero-section.tsx           // Ime majstora, tagline, CTA buttons, background image
├── gallery-preview.tsx        // 6 featured radova na home page-u
├── gallery-grid.tsx           // Client: useSuspenseQuery + grid layout
├── gallery-filter.tsx         // Client: style filter tabs/buttons (nuqs za URL state)
├── work-card.tsx              // Slika + hover overlay + title + style badge
├── work-detail.tsx            // Full detail: large image + description + style tag + back
└── contact-form.tsx           // react-hook-form + zod, Submit → contact.submit mutation
```

### 4.2 Admin (dashboard) komponente

```
src/components/dashboard/
├── works/
│   ├── work-table.tsx         // TanStack Table: slika thumbnail, title, style, status, actions
│   ├── work-form.tsx          // Create/Edit form: react-hook-form + zod
│   ├── work-image-upload.tsx  // Vercel Blob upload (extend existing file-upload.tsx)
│   └── work-reorder.tsx       // Drag-and-drop order (dnd-kit)
├── contacts/
│   └── contact-table.tsx      // Lista upita, filter po statusu, update status inline
└── stats/
    └── overview-stats.tsx     // Cards: total radova, published, pending contacts
```

### 4.3 Shared komponente (dodati)

```
src/components/shared/
├── style-badge.tsx            // Badge sa bojom stila (color prop iz TattooStyle.color)
├── gallery-skeleton.tsx       // Loading skeleton za galeriju
└── image-lightbox.tsx         // Full-screen preview slike (koristiti Shadcn Dialog)
```

---

## 5. i18n Keys

### `messages/en.json` — Dodati sekcije

```json
{
  "HomePage": {
    "heroTitle": "Ink Your Story",
    "heroSubtitle": "Custom tattoo artistry in Belgrade. Every piece tells a story.",
    "heroCta": "View Gallery",
    "heroBookCta": "Book Appointment",
    "galleryPreviewTitle": "Featured Work",
    "galleryPreviewCta": "See All Work"
  },
  "GalleryPage": {
    "title": "Portfolio",
    "subtitle": "Browse all works by style",
    "filterAll": "All Styles",
    "noResults": "No works found for this style.",
    "metaTitle": "Gallery",
    "metaDescription": "Browse the tattoo portfolio."
  },
  "WorkDetail": {
    "style": "Style",
    "backToGallery": "Back to Gallery",
    "bookThisStyle": "Book This Style"
  },
  "ContactPage": {
    "title": "Book an Appointment",
    "subtitle": "Fill out the form and we'll get back to you within 24 hours.",
    "nameLabel": "Your Name",
    "namePlaceholder": "Ana Jovanović",
    "emailLabel": "Email",
    "emailPlaceholder": "ana@example.com",
    "phoneLabel": "Phone (optional)",
    "phonePlaceholder": "+381 60 123 4567",
    "messageLabel": "Tell us about your idea",
    "messagePlaceholder": "Style, placement, size, reference images...",
    "submitLabel": "Send Request",
    "submitting": "Sending...",
    "successTitle": "Request Sent!",
    "successMessage": "We'll reach out to you soon.",
    "metaTitle": "Contact",
    "metaDescription": "Book a tattoo appointment."
  },
  "AdminWorks": {
    "title": "Tattoo Works",
    "addNew": "Add New Work",
    "tableTitle": "Title",
    "tableStyle": "Style",
    "tableStatus": "Status",
    "tableOrder": "Order",
    "tableActions": "Actions",
    "published": "Published",
    "draft": "Draft",
    "editWork": "Edit Work",
    "deleteWork": "Delete Work",
    "deleteConfirm": "Are you sure you want to delete this work?",
    "uploadImage": "Upload Image",
    "titleEnLabel": "Title (English)",
    "titleSrLabel": "Title (Serbian)",
    "descriptionEnLabel": "Description (English)",
    "descriptionSrLabel": "Description (Serbian)",
    "slugLabel": "URL Slug",
    "slugHint": "Auto-generated from English title",
    "styleLabel": "Style / Category",
    "publishedLabel": "Published",
    "orderLabel": "Display Order",
    "createSubmit": "Create Work",
    "updateSubmit": "Update Work",
    "creating": "Creating...",
    "updating": "Updating..."
  },
  "AdminContacts": {
    "title": "Contact Requests",
    "filterAll": "All",
    "filterPending": "Pending",
    "filterSeen": "Seen",
    "filterReplied": "Replied",
    "filterArchived": "Archived",
    "tableName": "Name",
    "tableEmail": "Email",
    "tablePhone": "Phone",
    "tableMessage": "Message",
    "tableStatus": "Status",
    "tableDate": "Date",
    "statusPending": "Pending",
    "statusSeen": "Seen",
    "statusReplied": "Replied",
    "statusArchived": "Archived",
    "markAs": "Mark as",
    "noRequests": "No contact requests yet."
  },
  "AdminStyles": {
    "title": "Styles",
    "addStyle": "Add Style",
    "nameLabel": "Style Name",
    "slugLabel": "Slug",
    "colorLabel": "Color (hex)",
    "worksCount": "{count} works"
  },
  "Sidebar": {
    "appName": "Tattoo Studio",
    "dashboard": "Dashboard",
    "works": "Works",
    "contacts": "Contacts",
    "settings": "Settings"
  },
  "MarketingLayout": {
    "home": "Home",
    "gallery": "Gallery",
    "contact": "Contact",
    "adminLogin": "Admin",
    "rightsReserved": "© {year} {studioName}. All rights reserved."
  }
}
```

### `messages/sr.json` — Iste sekcije na srpskom

```json
{
  "HomePage": {
    "heroTitle": "Utetoviraj Svoju Priču",
    "heroSubtitle": "Autorske tetovaže u Beogradu. Svaki rad priča priču.",
    "heroCta": "Pogledaj Galeriju",
    "heroBookCta": "Rezerviši Termin",
    "galleryPreviewTitle": "Izdvojeni Radovi",
    "galleryPreviewCta": "Svi Radovi"
  },
  "GalleryPage": {
    "title": "Portfolio",
    "subtitle": "Pregled radova po stilu",
    "filterAll": "Svi Stilovi",
    "noResults": "Nema radova za ovaj stil.",
    "metaTitle": "Galerija",
    "metaDescription": "Pogledaj portfolio tetovaža."
  },
  "WorkDetail": {
    "style": "Stil",
    "backToGallery": "Nazad na Galeriju",
    "bookThisStyle": "Rezerviši Ovaj Stil"
  },
  "ContactPage": {
    "title": "Rezerviši Termin",
    "subtitle": "Popuni formu i javimo se u roku od 24 sata.",
    "nameLabel": "Tvoje Ime",
    "namePlaceholder": "Ana Jovanović",
    "emailLabel": "Email",
    "emailPlaceholder": "ana@primer.com",
    "phoneLabel": "Telefon (opciono)",
    "phonePlaceholder": "+381 60 123 4567",
    "messageLabel": "Opiši svoju ideju",
    "messagePlaceholder": "Stil, pozicija, veličina, referentne slike...",
    "submitLabel": "Pošalji Upit",
    "submitting": "Slanje...",
    "successTitle": "Upit Poslat!",
    "successMessage": "Javićemo ti se uskoro.",
    "metaTitle": "Kontakt",
    "metaDescription": "Rezerviši termin za tetovažu."
  },
  "AdminWorks": {
    "title": "Radovi",
    "addNew": "Dodaj Rad",
    "tableTitle": "Naziv",
    "tableStyle": "Stil",
    "tableStatus": "Status",
    "tableOrder": "Redosled",
    "tableActions": "Akcije",
    "published": "Objavljeno",
    "draft": "Draft",
    "editWork": "Uredi Rad",
    "deleteWork": "Obriši Rad",
    "deleteConfirm": "Da li si siguran da želiš da obrišeš ovaj rad?",
    "uploadImage": "Upload Sliku",
    "titleEnLabel": "Naziv (Engleski)",
    "titleSrLabel": "Naziv (Srpski)",
    "descriptionEnLabel": "Opis (Engleski)",
    "descriptionSrLabel": "Opis (Srpski)",
    "slugLabel": "URL Slug",
    "slugHint": "Automatski generisan iz engleskog naziva",
    "styleLabel": "Stil / Kategorija",
    "publishedLabel": "Objavljeno",
    "orderLabel": "Redosled Prikaza",
    "createSubmit": "Kreiraj Rad",
    "updateSubmit": "Ažuriraj Rad",
    "creating": "Kreiranje...",
    "updating": "Ažuriranje..."
  },
  "AdminContacts": {
    "title": "Kontakt Upiti",
    "filterAll": "Svi",
    "filterPending": "Na čekanju",
    "filterSeen": "Pregledano",
    "filterReplied": "Odgovoreno",
    "filterArchived": "Arhivirano",
    "tableName": "Ime",
    "tableEmail": "Email",
    "tablePhone": "Telefon",
    "tableMessage": "Poruka",
    "tableStatus": "Status",
    "tableDate": "Datum",
    "statusPending": "Na čekanju",
    "statusSeen": "Pregledano",
    "statusReplied": "Odgovoreno",
    "statusArchived": "Arhivirano",
    "markAs": "Označi kao",
    "noRequests": "Nema kontakt upita."
  },
  "AdminStyles": {
    "title": "Stilovi",
    "addStyle": "Dodaj Stil",
    "nameLabel": "Naziv Stila",
    "slugLabel": "Slug",
    "colorLabel": "Boja (hex)",
    "worksCount": "{count} radova"
  },
  "Sidebar": {
    "appName": "Tattoo Studio",
    "dashboard": "Pregled",
    "works": "Radovi",
    "contacts": "Kontakti",
    "settings": "Podešavanja"
  },
  "MarketingLayout": {
    "home": "Početna",
    "gallery": "Galerija",
    "contact": "Kontakt",
    "adminLogin": "Admin",
    "rightsReserved": "© {year} {studioName}. Sva prava zadržana."
  }
}
```

---

## 6. Inngest — Email Notifikacija

Iskoristiti postojeću infrastrukturu:

```typescript
// src/inngest/functions/email.ts — DODATI:
// Event: "contact/submitted"
// Trigger: kada contact.submit tRPC procedure uspješno kreira ContactRequest
// Action: Resend → pošalji email adminu sa detaljima upita
```

```typescript
// U contact tRPC router — nakon db.contactRequest.create():
await inngest.send({
  name: "contact/submitted",
  data: { requestId: created.id, name, email, message }
});
```

---

## 7. Redosled Implementacije (za @vulcan)

```
Phase 1 — Foundation
  1. Prisma schema update (ukloni Post, dodaj 3 nova modela)
  2. `prisma migrate dev --name tattoo-schema`
  3. tRPC routeri (style, tattooWork, contact)
  4. Seed script — default stilovi (Traditional, Blackwork, Fineline, Geometric, Watercolor)

Phase 2 — Admin Panel
  5. Sidebar links update
  6. /dashboard/works — lista, upload, edit, delete
  7. /dashboard/contacts — pregled, status update

Phase 3 — Public Strana
  8. Hero sekcija (home page)
  9. /gallery — grid + filter (nuqs za URL state)
  10. /gallery/[slug] — detalj rada
  11. /contact — booking forma + Inngest email

Phase 4 — Polish
  12. Dark theme fine-tuning
  13. i18n strings finalize
  14. SEO (generateMetadata na svim stranicama)
  15. Deploy check
```

---

## 8. Ključne Tehničke Odluke

| Odluka | Izbor | Razlog |
|--------|-------|--------|
| i18n titles | Separate columns (`titleEn`, `titleSr`) | Jedino 2 locale, type-safe queries, lakše indexiranje vs JSON |
| URL slugs | Vlastiti `slug` field | SEO-friendly URLs, stable references |
| Filtering | nuqs (URL search params) | Shareable gallery filter URLs, no extra state management |
| Image ordering | `order: Int` + dnd-kit | Drag-and-drop admin reordering, jednostavno batch update |
| Contact status | Enum u Prisma | Type-safety, ograničeni skup vrijednosti, jasna semantika |
| Email notif | Inngest + Resend | Infrastruktura već tu, retry-capable, non-blocking |

---

*📜 Oracle has spoken. Implement with confidence, @vulcan.*
