export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  compareAt?: number;
  category: "planters" | "propagation" | "care" | "lighting" | "display" | "gift-sets";
  collection: string;
  description: string;
  details: string[];
  specs: { label: string; value: string }[];
  badge?: string;
};

export const products: Product[] = [
  {
    slug: "root-watch",
    name: "Root Watch",
    tagline: "Glass propagation station · walnut base · 3 tubes",
    price: 32.99,
    compareAt: 39.99,
    category: "propagation",
    collection: "The Living Desk",
    description:
      "Watching roots grow is the most quietly addictive thing on your desk. Root Watch holds three cuttings in hand-blown borosilicate tubes set into a solid walnut base — a tiny working laboratory that doubles as the calmest object in the room.",
    details: [
      "Three removable hand-blown borosilicate glass tubes",
      "Solid walnut base, oiled and hand-finished",
      "Holds pothos, monstera, philodendron and most soft-stem cuttings",
      "Tubes lift out for easy water changes and cleaning",
    ],
    specs: [
      { label: "Dimensions", value: '9.5" W × 4" H × 2.5" D' },
      { label: "Tubes", value: "3 × borosilicate glass" },
      { label: "Base", value: "Solid walnut" },
      { label: "Care", value: "Rinse tubes weekly, refresh water" },
    ],
    badge: "Bestseller",
  },
  {
    slug: "breath",
    name: "Breath",
    tagline: "Self-watering concrete planter for succulents & air plants",
    price: 26.99,
    category: "planters",
    collection: "The Living Desk",
    description:
      "A self-watering concrete planter sized for the small things — succulents, air plants, a single trailing pothos. The wicking reservoir means you can leave town for a week and come back to something still alive. Minimal enough to disappear into any desk.",
    details: [
      "Cast concrete body with matte sealed finish",
      "Self-watering wick + hidden reservoir holds ~5 days of water",
      "Cork base protects desk surfaces",
      "Drainage-free design — no saucer, no mess",
    ],
    specs: [
      { label: "Dimensions", value: '3.5" diameter × 4" H' },
      { label: "Material", value: "Sealed cast concrete" },
      { label: "Reservoir", value: "~5 day capacity" },
      { label: "Best for", value: "Succulents, air plants, small foliage" },
    ],
  },
  {
    slug: "understory",
    name: "Understory",
    tagline: "Tiered shelf display for 3–5 small plants",
    price: 54.99,
    compareAt: 64.99,
    category: "display",
    collection: "The Living Desk",
    description:
      "Build a desk jungle without losing your desk. Understory is a tiered walnut-and-steel shelf that stages three to five small plants at staggered heights, turning a flat surface into a layered little ecosystem.",
    details: [
      "Three staggered tiers in walnut veneer and powder-coated steel",
      "Holds 3–5 planters up to 4\" diameter",
      "Felt-lined shelves protect pots and finishes",
      "Flat-pack design assembles in under five minutes",
    ],
    specs: [
      { label: "Dimensions", value: '14" W × 11" H × 6" D' },
      { label: "Capacity", value: "3–5 small planters" },
      { label: "Material", value: "Walnut veneer + steel" },
      { label: "Assembly", value: "Tool-free, < 5 min" },
    ],
  },
  {
    slug: "tend",
    name: "Tend",
    tagline: "Plant care toolkit · brass mister, shears, soil probe",
    price: 29.99,
    category: "care",
    collection: "The Living Desk",
    description:
      "Everything a desk gardener actually reaches for, in objects worth leaving out. A brass mister, precision pruning shears, and a soil moisture probe — the small ritual of tending, made tactile.",
    details: [
      "Solid brass fine-mist sprayer, 100ml",
      "Stainless precision pruning shears with leather sheath",
      "Analog soil moisture probe — no batteries",
      "Packed in a kraft gift box, ready to give",
    ],
    specs: [
      { label: "Includes", value: "Mister, shears, soil probe" },
      { label: "Mister", value: "Brass, 100ml" },
      { label: "Shears", value: "Stainless, leather sheath" },
      { label: "Probe", value: "Analog, battery-free" },
    ],
  },
  {
    slug: "canopy-light",
    name: "Canopy Light",
    tagline: "Minimal USB-powered grow light for desk plants",
    price: 34.99,
    category: "lighting",
    collection: "The Living Desk",
    description:
      "For the corners of the office the sun never reaches. Canopy Light is a slim, full-spectrum grow light on a flexible gooseneck that clips to a shelf or stands on its own — warm enough to read by, full-spectrum enough to keep your plants honest.",
    details: [
      "Full-spectrum LED tuned for foliage growth",
      "Flexible aluminum gooseneck, clamp + base included",
      "USB-C powered with inline touch dimmer",
      "Warm color profile — looks like a desk lamp, works like a grow light",
    ],
    specs: [
      { label: "Spectrum", value: "Full-spectrum LED" },
      { label: "Power", value: "USB-C, 10W" },
      { label: "Mount", value: "Clamp + weighted base" },
      { label: "Control", value: "Inline touch dimmer" },
    ],
    badge: "New",
  },
];

export const giftSets: Product[] = [
  {
    slug: "new-plant-parent",
    name: "New Plant Parent",
    tagline: "Starter kit for the freshly obsessed",
    price: 49.99,
    compareAt: 59.98,
    category: "gift-sets",
    collection: "Gift Sets",
    description:
      "Everything someone needs to keep their first plant alive and want a second one. Pairs the Breath self-watering planter with the Tend care toolkit, wrapped in branded kraft packaging with a hand-stamped card.",
    details: [
      "Breath self-watering concrete planter",
      "Tend plant care toolkit",
      "Hand-stamped care card",
      "Kraft gift box with dried sprig",
    ],
    specs: [
      { label: "Includes", value: "Breath + Tend" },
      { label: "Packaging", value: "Branded kraft gift box" },
      { label: "Card", value: "Hand-stamped care guide" },
      { label: "Value", value: "Save vs. buying separately" },
    ],
    badge: "Gift",
  },
  {
    slug: "propagation-station",
    name: "Propagation Station",
    tagline: "For the cutting-swapping, root-watching type",
    price: 39.99,
    compareAt: 47.98,
    category: "gift-sets",
    collection: "Gift Sets",
    description:
      "The Root Watch propagation station paired with the Tend toolkit's brass mister and shears — the complete kit for turning one plant into a whole shelf of them.",
    details: [
      "Root Watch 3-tube propagation station",
      "Brass mister + precision shears",
      "Illustrated propagation guide",
      "Kraft gift box with dried sprig",
    ],
    specs: [
      { label: "Includes", value: "Root Watch + mister & shears" },
      { label: "Packaging", value: "Branded kraft gift box" },
      { label: "Guide", value: "Illustrated propagation card" },
      { label: "Value", value: "Save vs. buying separately" },
    ],
    badge: "Gift",
  },
  {
    slug: "desk-jungle",
    name: "Desk Jungle",
    tagline: "The complete living-desk setup",
    price: 89.99,
    compareAt: 109.96,
    category: "gift-sets",
    collection: "Gift Sets",
    description:
      "The whole story in one box. Understory tiered display, Breath self-watering planter, Root Watch propagation station, and Canopy Light — a flat desk transformed into a layered indoor garden.",
    details: [
      "Understory tiered display shelf",
      "Breath self-watering planter",
      "Root Watch propagation station",
      "Canopy Light USB grow light",
    ],
    specs: [
      { label: "Includes", value: "Understory + Breath + Root Watch + Canopy Light" },
      { label: "Packaging", value: "Branded kraft gift box" },
      { label: "Setup", value: "Tool-free, < 10 min" },
      { label: "Value", value: "Save vs. buying separately" },
    ],
    badge: "Best value",
  },
];

export const allProducts: Product[] = [...products, ...giftSets];

export function getProduct(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export const collections = [
  {
    slug: "living-desk",
    name: "The Living Desk",
    description:
      "Five objects that turn a flat work surface into something that breathes. Curated, not stocked — every piece earns its place.",
    productSlugs: ["root-watch", "breath", "understory", "tend", "canopy-light"],
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    description:
      "Bundled, boxed, and ready to give — for new plant parents, propagation obsessives, and the person whose desk needs help.",
    productSlugs: ["new-plant-parent", "propagation-station", "desk-jungle"],
  },
];
