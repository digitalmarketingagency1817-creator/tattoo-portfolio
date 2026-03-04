// Placeholder images from: https://picsum.photos/seed/{slug}/800/1067
// (3:4 ratio for portrait tattoo photography)

import { mockStyles } from "./mock-styles";
import type { TattooWork } from "@/types/tattoo";

const [blackwork, fineline, traditional, realism, watercolor] = mockStyles as [
  (typeof mockStyles)[0],
  (typeof mockStyles)[1],
  (typeof mockStyles)[2],
  (typeof mockStyles)[3],
  (typeof mockStyles)[4],
];

export const mockWorks: TattooWork[] = [
  {
    id: "work-1",
    slug: "geometric-wolf-sleeve",
    imageUrl: "https://picsum.photos/seed/wolf/800/1067",
    imageAlt: "Geometric wolf sleeve tattoo in blackwork style",
    titleEn: "Geometric Wolf Sleeve",
    titleSr: "Geometrijski Vuk na Rukavu",
    descriptionEn:
      "A full sleeve composition blending geometric precision with organic wolf imagery. Bold black lines create a striking contrast against the skin, with intricate dot-work shading filling the negative space.",
    descriptionSr:
      "Kompozicija na punom rukavu koja spaja geometrijsku preciznost sa organskim prikazom vuka. Podebljane crne linije stvaraju upečatljiv kontrast, dok detaljan dot-work upotpunjuje negativan prostor.",
    style: blackwork,
    featured: true,
    order: 1,
    published: true,
  },
  {
    id: "work-2",
    slug: "botanical-fineline-forearm",
    imageUrl: "https://picsum.photos/seed/botanical/800/1067",
    imageAlt: "Botanical fine line tattoo on forearm",
    titleEn: "Botanical Forearm",
    titleSr: "Botanika na Podlaktici",
    descriptionEn:
      "Delicate wildflower arrangement running along the forearm. Single-needle technique captures every petal's translucent quality — as if the flowers simply grew through the skin.",
    descriptionSr:
      "Delikatna kompozicija divljeg cvijeća duž podlaktice. Tehnika jedne igle bilježi gotovo providnu teksturu latica — kao da su cvijetovi izrasli kroz kožu.",
    style: fineline,
    featured: true,
    order: 2,
    published: true,
  },
  {
    id: "work-3",
    slug: "american-traditional-eagle",
    imageUrl: "https://picsum.photos/seed/eagle/800/1067",
    imageAlt: "American traditional eagle tattoo",
    titleEn: "American Eagle",
    titleSr: "Američki Orao",
    descriptionEn:
      "Bold traditional American eagle with clean outlines, flat classic fills, and timeless iconography. A tribute to the golden era of tattooing — built to age gracefully for decades.",
    descriptionSr:
      "Snažan tradicionalni američki orao s čistim obrisima, ravnim klasičnim bojama i vjekovnom ikonografijom. Hommage zlatnom dobu tetoviranja — rađen da što ljepše stari.",
    style: traditional,
    featured: true,
    order: 3,
    published: true,
  },
  {
    id: "work-4",
    slug: "portrait-realism-chest",
    imageUrl: "https://picsum.photos/seed/portrait/800/1067",
    imageAlt: "Photorealistic portrait tattoo on chest",
    titleEn: "Portrait — Chest Piece",
    titleSr: "Portret — Grudi",
    descriptionEn:
      "Photorealistic portrait covering the upper chest. Every strand of hair, every wrinkle, rendered in hyper-detailed black and grey. A technical tour de force.",
    descriptionSr:
      "Fotorealistički portret koji pokriva gornji dio grudi. Svaka nit kose, svaki nabor kože, prikazani su u ultra-detaljnoj crno-sivoj tehnici.",
    style: realism,
    featured: true,
    order: 4,
    published: true,
  },
  {
    id: "work-5",
    slug: "watercolor-koi-thigh",
    imageUrl: "https://picsum.photos/seed/koi/800/1067",
    imageAlt: "Watercolor koi fish tattoo on thigh",
    titleEn: "Koi Thigh Piece",
    titleSr: "Koi Šarani na Bedru",
    descriptionEn:
      "Fluid watercolor koi fish in vivid blues and oranges, designed to flow with the body's natural curves. Deliberate \"bleeding\" edges create the illusion of paint on skin.",
    descriptionSr:
      "Tečni akvarel koi šarana u živim plavim i narandžastim bojama, dizajniran da prati prirodne krivine tijela. Namjerni \"krvarući\" rubovi stvaraju iluziju boje na koži.",
    style: watercolor,
    featured: true,
    order: 5,
    published: true,
  },
  {
    id: "work-6",
    slug: "mandala-blackwork-back",
    imageUrl: "https://picsum.photos/seed/mandala/800/1067",
    imageAlt: "Mandala blackwork tattoo on back",
    titleEn: "Mandala Back Piece",
    titleSr: "Mandala na Leđima",
    descriptionEn:
      "Sprawling mandala composition across the entire back. Hundreds of hours of meticulous dot-work and geometric linework — a meditative masterwork.",
    descriptionSr:
      "Kompozicija mandala koja prekriva cijela leđa. Stotine sati pažljivog dot-worka i geometrijskih linija — meditativno remek-djelo.",
    style: blackwork,
    featured: true,
    order: 6,
    published: true,
  },
  {
    id: "work-7",
    slug: "serpent-fineline-collarbone",
    imageUrl: "https://picsum.photos/seed/serpent/800/1067",
    imageAlt: "Fine line serpent tattoo along collarbone",
    titleEn: "Collarbone Serpent",
    titleSr: "Zmija na Ključnoj Kosti",
    descriptionEn:
      "Sinuous serpent curving along the collarbone in a single, unbroken fine line. Minimal shading amplifies the elegance of pure linework.",
    descriptionSr:
      "Vijugava zmija koja se uvija duž ključne kosti u jednoj, neprekinutoj finoj liniji. Minimalno sjenčanje pojačava eleganciju čistog lineworka.",
    style: fineline,
    featured: false,
    order: 7,
    published: true,
  },
  {
    id: "work-8",
    slug: "neo-traditional-cat",
    imageUrl: "https://picsum.photos/seed/neocat/800/1067",
    imageAlt: "Neo-traditional cat tattoo with floral elements",
    titleEn: "Neo-Traditional Cat",
    titleSr: "Neo-Tradicionalna Mačka",
    descriptionEn:
      "Bold neo-traditional cat surrounded by lush florals. Heavy outlines with rich colour fills — a contemporary spin on flash-sheet iconography.",
    descriptionSr:
      "Snažna neo-tradicionalna mačka okružena bujnim cvijećem. Debeli obrisi s bogatim punjenjem boje — savremeni zaokret na klasičnu ikonografiju.",
    style: traditional,
    featured: false,
    order: 8,
    published: true,
  },
];

export const featuredWorks = mockWorks.filter((w) => w.featured);
