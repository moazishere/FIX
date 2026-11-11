/**
 * Product catalogue.
 *
 * Typed, static data for now — swap `getAllProducts()` for a CMS / Shopify call later
 * without touching any component. Arabic names live here (not in messages/*.json)
 * because they are catalogue data, not interface copy.
 */

export const CATEGORY_IDS = ['audio', 'computers', 'phones', 'wearables', 'cameras', 'gaming'] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export const FINISHES = ['graphite', 'silver', 'sand'] as const;
export type Finish = (typeof FINISHES)[number];

export type ProductType =
  | 'headphones' | 'earbuds' | 'speaker' | 'smartspeaker' | 'laptop' | 'monitor' | 'keyboard' | 'mouse'
  | 'phone' | 'phonefront' | 'tablet' | 'watch' | 'camera' | 'drone' | 'controller' | 'vr';

export interface Product {
  id: number;
  /** URL slug, unique per finish: `arc-pro-elite-controller-sand` */
  slug: string;
  /** Index of the product line (the three finishes share one). */
  line: number;
  type: ProductType;
  category: CategoryId;
  finish: Finish;
  image: string;
  name: { en: string; ar: string };
  short: { en: string; ar: string };
  price: number;
  /** Previous price in USD when on sale. */
  was: number | null;
  rating: number;
  reviews: number;
  /** Sort key for "newest". */
  added: number;
}

interface Base {
  type: ProductType;
  category: CategoryId;
  image: string;
  en: string;
  ar: string;
  arShort: string;
  price: number;
  was?: number;
}

const BASES: Base[] = [
  { type: 'headphones', category: 'audio', image: 'headphones', price: 199, was: 249,
    en: 'Pulse ANC Wireless Over-Ear Headphones with 40-Hour Battery and Hi-Res Audio',
    ar: 'سماعات Pulse ANC لاسلكية فوق الأذن، بطارية 40 ساعة وصوت عالي الدقة', arShort: 'سماعات Pulse ANC اللاسلكية' },
  { type: 'earbuds', category: 'audio', image: 'earbuds', price: 129, was: 159,
    en: 'Aura Buds 2 True Wireless Earbuds with Active Noise Cancelling and Wireless Charging Case',
    ar: 'سماعات Aura Buds 2 لاسلكية بالكامل مع عزل نشط للضوضاء وعلبة شحن لاسلكية', arShort: 'سماعات Aura Buds 2 اللاسلكية' },
  { type: 'speaker', category: 'audio', image: 'speaker', price: 79,
    en: 'Boom Go Portable Bluetooth Speaker, IP67 Waterproof, 24-Hour Playtime',
    ar: 'مكبر صوت Boom Go بلوتوث محمول، مقاوم للماء IP67، تشغيل 24 ساعة', arShort: 'مكبر صوت Boom Go المحمول' },
  { type: 'smartspeaker', category: 'audio', image: 'smartspeaker', price: 99, was: 119,
    en: 'Echoly Home Smart Speaker with 360° Room-Filling Sound and Voice Assistant',
    ar: 'مكبر صوت ذكي Echoly Home بصوت 360° يملأ الغرفة ومساعد صوتي', arShort: 'مكبر الصوت الذكي Echoly Home' },
  { type: 'laptop', category: 'computers', image: 'laptop-1', price: 1099, was: 1299,
    en: 'Aero 14 Ultrabook, 14" 2.8K OLED, 16GB RAM, 512GB SSD, 1.2 kg',
    ar: 'لابتوب Aero 14 النحيف، شاشة OLED بدقة 2.8K مقاس 14 بوصة، ذاكرة 16GB، تخزين 512GB SSD، وزن 1.2 كجم', arShort: 'لابتوب Aero 14 النحيف' },
  { type: 'laptop', category: 'computers', image: 'laptop-2', price: 1749,
    en: 'Forge 16 Creator Laptop, 16" 165Hz Display, 32GB RAM, 1TB SSD',
    ar: 'لابتوب Forge 16 للمبدعين، شاشة 16 بوصة بتردد 165Hz، ذاكرة 32GB، تخزين 1TB SSD', arShort: 'لابتوب Forge 16 للمبدعين' },
  { type: 'monitor', category: 'computers', image: 'monitor', price: 379, was: 449,
    en: 'Vista 27" 4K IPS Monitor with USB-C 90W Power Delivery and Height-Adjustable Stand',
    ar: 'شاشة Vista مقاس 27 بوصة 4K IPS مع USB-C وشحن 90W وحامل قابل لتعديل الارتفاع', arShort: 'شاشة Vista مقاس 27 بوصة 4K' },
  { type: 'keyboard', category: 'computers', image: 'keyboard', price: 119,
    en: 'Keyline 75% Wireless Mechanical Keyboard with Hot-Swap Switches',
    ar: 'لوحة مفاتيح ميكانيكية لاسلكية Keyline بحجم 75% مع مفاتيح قابلة للتبديل', arShort: 'لوحة مفاتيح Keyline الميكانيكية' },
  { type: 'mouse', category: 'computers', image: 'mouse', price: 69, was: 99,
    en: 'Glide Pro Ergonomic Wireless Mouse, 8K DPI Sensor, 70-Day Battery',
    ar: 'ماوس لاسلكي مريح Glide Pro، مستشعر 8K DPI، بطارية 70 يومًا', arShort: 'ماوس Glide Pro اللاسلكي' },
  { type: 'phone', category: 'phones', image: 'phone', price: 899, was: 999,
    en: 'Nova 9 Pro Smartphone, 6.7" 120Hz Display, 256GB, Triple 50MP Camera',
    ar: 'هاتف Nova 9 Pro الذكي، شاشة 6.7 بوصة بتردد 120Hz، سعة 256GB، ثلاث كاميرات 50MP', arShort: 'هاتف Nova 9 Pro' },
  { type: 'phonefront', category: 'phones', image: 'phonefront', price: 499,
    en: 'Nova 9 Lite Smartphone, 6.1" OLED Display, 128GB, Dual Camera',
    ar: 'هاتف Nova 9 Lite الذكي، شاشة OLED مقاس 6.1 بوصة، سعة 128GB، كاميرا مزدوجة', arShort: 'هاتف Nova 9 Lite' },
  { type: 'tablet', category: 'phones', image: 'tablet', price: 449, was: 529,
    en: 'Slate 11 Tablet, 11" 2K Display, 128GB Wi-Fi with Stylus Support',
    ar: 'جهاز Slate 11 اللوحي، شاشة 2K مقاس 11 بوصة، سعة 128GB واي فاي مع دعم القلم', arShort: 'جهاز Slate 11 اللوحي' },
  { type: 'watch', category: 'wearables', image: 'watch-1', price: 279, was: 349,
    en: 'Orbit Watch 5 Smartwatch, 45mm Aluminium Case, GPS and Heart Rate',
    ar: 'ساعة Orbit Watch 5 الذكية، هيكل ألمنيوم 45 مم، GPS وقياس نبض القلب', arShort: 'ساعة Orbit Watch 5 الذكية' },
  { type: 'watch', category: 'wearables', image: 'watch-2', price: 189, was: 269,
    en: 'Orbit Watch Active, 41mm, Sleep and SpO2 Tracking, 7-Day Battery',
    ar: 'ساعة Orbit Watch Active مقاس 41 مم، تتبّع النوم والأكسجين، بطارية 7 أيام', arShort: 'ساعة Orbit Watch Active' },
  { type: 'camera', category: 'cameras', image: 'camera-1', price: 949, was: 1099,
    en: 'Lumen X20 Mirrorless Camera, 24MP APS-C, 4K60 Video, 18–55mm Kit Lens',
    ar: 'كاميرا Lumen X20 بدون مرآة، 24MP APS-C، فيديو 4K60، عدسة 18–55 مم', arShort: 'كاميرا Lumen X20 بدون مرآة' },
  { type: 'drone', category: 'cameras', image: 'drone', price: 559, was: 649,
    en: 'Skyline Mini 3 Foldable Drone, 4K HDR Camera, 34-Minute Flight Time',
    ar: 'درون Skyline Mini 3 قابلة للطي، كاميرا 4K HDR، زمن طيران 34 دقيقة', arShort: 'درون Skyline Mini 3 القابلة للطي' },
  { type: 'camera', category: 'cameras', image: 'camera-2', price: 599,
    en: 'Lumen Z5 Compact Vlog Camera with Flip Screen and 4K Video',
    ar: 'كاميرا Lumen Z5 المدمجة لصناعة المحتوى مع شاشة قلّابة وفيديو 4K', arShort: 'كاميرا Lumen Z5 المدمجة' },
  { type: 'controller', category: 'gaming', image: 'controller-1', price: 69, was: 79,
    en: 'Arc Wireless Game Controller with Hall-Effect Sticks and Rear Paddles',
    ar: 'يد تحكم Arc اللاسلكية للألعاب بعصي Hall-Effect وأزرار خلفية', arShort: 'يد تحكم Arc اللاسلكية' },
  { type: 'controller', category: 'gaming', image: 'controller-2', price: 149,
    en: 'Arc Pro Elite Controller, Swappable Thumbsticks, 40-Hour Battery',
    ar: 'يد تحكم Arc Pro Elite، عصي قابلة للتبديل، بطارية 40 ساعة', arShort: 'يد تحكم Arc Pro Elite' },
  { type: 'vr', category: 'gaming', image: 'vr', price: 399,
    en: 'Horizon VR Headset, 128GB Standalone with Hand Tracking',
    ar: 'نظارة Horizon للواقع الافتراضي، مستقلة بسعة 128GB مع تتبّع اليدين', arShort: 'نظارة Horizon للواقع الافتراضي' },
];

/** Integer-only hash → [0, 1). Identical on server and client in every browser (no Math.sin drift). */
function hash01(n: number): number {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const PRODUCTS: Product[] = BASES.flatMap((b, line) =>
  FINISHES.map((finish, vi): Product => {
    const id = line * 3 + vi;
    const short = b.en.split(',')[0].replace(/ with .*/, '');
    // Ratings, review counts and "newest" order are PLACEHOLDERS until real data exists.
    return {
      id,
      slug: `${slugify(short)}-${finish}`,
      line,
      type: b.type,
      category: b.category,
      finish,
      image: `/images/${b.image}.jpg`,
      name: { en: b.en, ar: b.ar },
      short: { en: short, ar: b.arShort },
      price: b.price,
      was: b.was && (line + vi) % 3 !== 2 ? b.was : null,
      rating: Math.round((4 + hash01(id + 3) * 0.95) * 10) / 10,
      reviews: Math.round(24 + Math.pow(hash01(id + 11), 1.6) * 2600),
      added: Math.floor(hash01(id + 29) * 1000),
    };
  }),
);

const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

export const getAllProducts = (): readonly Product[] => PRODUCTS;
export const getProductById = (id: number): Product | undefined => PRODUCTS[id];
export const getProductBySlug = (slug: string): Product | undefined => BY_SLUG.get(slug);
export const getFinishes = (line: number): Product[] => PRODUCTS.slice(line * 3, line * 3 + 3);
export const onePerLine = (list: readonly Product[]): Product[] => {
  const seen = new Set<number>();
  return list.filter((p) => !seen.has(p.line) && seen.add(p.line));
};
export const discount = (p: Product): number => (p.was ? Math.round((1 - p.price / p.was) * 100) : 0);
export const countInCategory = (c: CategoryId): number => PRODUCTS.filter((p) => p.category === c).length;
export const isCategory = (v: string | undefined): v is CategoryId => !!v && (CATEGORY_IDS as readonly string[]).includes(v);

/** Display name in the given locale. Finish is appended by callers where needed. */
export type Locale = 'en' | 'ar';
export const localName = (p: Product, locale: Locale, finishLabel?: string) =>
  finishLabel ? `${p.name[locale]}${locale === 'ar' ? '،' : ','} ${finishLabel}` : p.name[locale];
