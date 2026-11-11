/**
 * Product page content: a one-line summary and a specification table per product line.
 *
 * Everything here is derived from facts already in the product names (sizes, memory, battery…),
 * so nothing is invented. Replace with real copy / a CMS when available. Values are plain
 * strings when identical in both languages, or { en, ar } when they contain words or units.
 */
import type { Locale } from './catalog';

export type Text = string | { en: string; ar: string };

export type SpecKey =
  | 'type' | 'display' | 'size' | 'resolution' | 'memory' | 'storage' | 'weight' | 'battery'
  | 'connectivity' | 'noise' | 'audio' | 'charging' | 'waterproof' | 'playtime' | 'sound'
  | 'assistant' | 'power' | 'stand' | 'layout' | 'switches' | 'sensor' | 'design' | 'camera'
  | 'video' | 'lens' | 'flightTime' | 'sticks' | 'extras' | 'stylus' | 'screen' | 'tracking'
  | 'case' | 'features';

export interface Content {
  summary: { en: string; ar: string };
  specs: [SpecKey, Text][];
}

const x = (en: string, ar: string) => ({ en, ar });

/** Same order as the product lines in lib/catalog.ts. */
const CONTENT: Content[] = [
  { // 0 Pulse ANC headphones
    summary: x('Wireless over-ear headphones with active noise cancelling, Hi-Res Audio support and a 40-hour battery.',
      'سماعات لاسلكية فوق الأذن مع عزل نشط للضوضاء ودعم الصوت عالي الدقة وبطارية تدوم 40 ساعة.'),
    specs: [['type', x('Over-ear', 'فوق الأذن')], ['noise', x('Active noise cancelling', 'عزل نشط للضوضاء')],
      ['audio', x('Hi-Res Audio', 'صوت عالي الدقة')], ['battery', x('40 hours', '40 ساعة')], ['connectivity', x('Wireless', 'لاسلكي')]],
  },
  { // 1 Aura Buds 2
    summary: x('True wireless earbuds with active noise cancelling and a wireless charging case.',
      'سماعات أذن لاسلكية بالكامل مع عزل نشط للضوضاء وعلبة شحن لاسلكية.'),
    specs: [['type', x('True wireless earbuds', 'سماعات أذن لاسلكية بالكامل')], ['noise', x('Active noise cancelling', 'عزل نشط للضوضاء')],
      ['charging', x('Wireless charging case', 'علبة شحن لاسلكية')]],
  },
  { // 2 Boom Go
    summary: x('Portable Bluetooth speaker with IP67 waterproofing and 24 hours of playtime.',
      'مكبر صوت بلوتوث محمول مقاوم للماء IP67 ومدة تشغيل 24 ساعة.'),
    specs: [['type', x('Portable speaker', 'مكبر صوت محمول')], ['connectivity', 'Bluetooth'], ['waterproof', x('IP67 waterproof', 'مقاوم للماء IP67')],
      ['playtime', x('24 hours', '24 ساعة')]],
  },
  { // 3 Echoly Home
    summary: x('Smart speaker with 360° room-filling sound and a voice assistant.',
      'مكبر صوت ذكي بصوت 360° يملأ الغرفة ومساعد صوتي.'),
    specs: [['type', x('Smart speaker', 'مكبر صوت ذكي')], ['sound', x('360° room-filling', '360° يملأ الغرفة')], ['assistant', x('Voice assistant', 'مساعد صوتي')]],
  },
  { // 4 Aero 14
    summary: x('Ultrabook with a 14-inch 2.8K OLED display, 16 GB of memory, a 512 GB SSD and a weight of just 1.2 kg.',
      'لابتوب نحيف بشاشة OLED مقاس 14 بوصة بدقة 2.8K وذاكرة 16 جيجابايت وتخزين SSD بسعة 512 جيجابايت ووزن 1.2 كجم فقط.'),
    specs: [['display', '14" 2.8K OLED'], ['memory', x('16 GB RAM', '16 جيجابايت RAM')], ['storage', '512 GB SSD'],
      ['weight', x('1.2 kg', '1.2 كجم')], ['battery', x('Up to 18 hours', 'حتى 18 ساعة')]],
  },
  { // 5 Forge 16
    summary: x('Creator laptop with a 16-inch 165 Hz display, 32 GB of memory and a 1 TB SSD.',
      'لابتوب للمبدعين بشاشة 16 بوصة بتردد 165Hz وذاكرة 32 جيجابايت وتخزين SSD بسعة 1 تيرابايت.'),
    specs: [['type', x('Creator laptop', 'لابتوب للمبدعين')], ['display', '16" 165 Hz'], ['memory', x('32 GB RAM', '32 جيجابايت RAM')], ['storage', '1 TB SSD']],
  },
  { // 6 Vista 27
    summary: x('27-inch 4K IPS monitor with USB-C 90 W power delivery and a height-adjustable stand.',
      'شاشة مقاس 27 بوصة 4K IPS مع USB-C وشحن بقدرة 90 واط وحامل قابل لتعديل الارتفاع.'),
    specs: [['size', '27"'], ['resolution', '4K IPS'], ['power', 'USB-C, 90 W'], ['stand', x('Height-adjustable', 'قابل لتعديل الارتفاع')]],
  },
  { // 7 Keyline
    summary: x('75% wireless mechanical keyboard with hot-swap switches.',
      'لوحة مفاتيح ميكانيكية لاسلكية بحجم 75% مع مفاتيح قابلة للتبديل.'),
    specs: [['type', x('Mechanical', 'ميكانيكية')], ['layout', '75%'], ['connectivity', x('Wireless', 'لاسلكي')], ['switches', x('Hot-swap', 'قابلة للتبديل')]],
  },
  { // 8 Glide Pro
    summary: x('Ergonomic wireless mouse with an 8K DPI sensor and a 70-day battery.',
      'ماوس لاسلكي مريح بمستشعر 8K DPI وبطارية تدوم 70 يومًا.'),
    specs: [['design', x('Ergonomic', 'مريح')], ['sensor', '8K DPI'], ['battery', x('70 days', '70 يومًا')], ['connectivity', x('Wireless', 'لاسلكي')]],
  },
  { // 9 Nova 9 Pro
    summary: x('Smartphone with a 6.7-inch 120 Hz display, 256 GB of storage and a triple 50 MP camera.',
      'هاتف ذكي بشاشة 6.7 بوصة بتردد 120Hz وسعة تخزين 256 جيجابايت وثلاث كاميرات 50MP.'),
    specs: [['display', '6.7" 120 Hz'], ['storage', x('256 GB', '256 جيجابايت')], ['camera', x('Triple 50 MP', 'ثلاثية 50MP')]],
  },
  { // 10 Nova 9 Lite
    summary: x('Smartphone with a 6.1-inch OLED display, 128 GB of storage and a dual camera.',
      'هاتف ذكي بشاشة OLED مقاس 6.1 بوصة وسعة تخزين 128 جيجابايت وكاميرا مزدوجة.'),
    specs: [['display', '6.1" OLED'], ['storage', x('128 GB', '128 جيجابايت')], ['camera', x('Dual', 'مزدوجة')]],
  },
  { // 11 Slate 11
    summary: x('11-inch 2K tablet with 128 GB of storage, Wi-Fi and stylus support.',
      'جهاز لوحي مقاس 11 بوصة بدقة 2K وسعة تخزين 128 جيجابايت وواي فاي ودعم للقلم.'),
    specs: [['display', '11" 2K'], ['storage', x('128 GB', '128 جيجابايت')], ['connectivity', 'Wi-Fi'], ['stylus', x('Supported', 'مدعوم')]],
  },
  { // 12 Orbit Watch 5
    summary: x('Smartwatch with a 45 mm aluminium case, GPS and heart rate tracking.',
      'ساعة ذكية بهيكل ألمنيوم 45 مم مع GPS وتتبّع نبض القلب.'),
    specs: [['case', x('45 mm aluminium', 'ألمنيوم 45 مم')], ['features', x('GPS, heart rate', 'GPS ونبض القلب')]],
  },
  { // 13 Orbit Watch Active
    summary: x('41 mm smartwatch with sleep and SpO2 tracking and a 7-day battery.',
      'ساعة ذكية مقاس 41 مم مع تتبّع النوم ومستوى الأكسجين (SpO2) وبطارية تدوم 7 أيام.'),
    specs: [['size', x('41 mm', '41 مم')], ['tracking', x('Sleep and SpO2', 'النوم والأكسجين (SpO2)')], ['battery', x('7 days', '7 أيام')]],
  },
  { // 14 Lumen X20
    summary: x('Mirrorless camera with a 24 MP APS-C sensor, 4K60 video and an 18–55 mm kit lens.',
      'كاميرا بدون مرآة بمستشعر APS-C بدقة 24MP وفيديو 4K60 وعدسة 18–55 مم.'),
    specs: [['type', x('Mirrorless', 'بدون مرآة')], ['sensor', '24 MP APS-C'], ['video', '4K60'], ['lens', x('18–55 mm kit lens', 'عدسة 18–55 مم')]],
  },
  { // 15 Skyline Mini 3
    summary: x('Foldable drone with a 4K HDR camera and 34 minutes of flight time.',
      'درون قابلة للطي بكاميرا 4K HDR وزمن طيران 34 دقيقة.'),
    specs: [['design', x('Foldable', 'قابلة للطي')], ['camera', '4K HDR'], ['flightTime', x('34 minutes', '34 دقيقة')]],
  },
  { // 16 Lumen Z5
    summary: x('Compact vlog camera with a flip screen and 4K video.',
      'كاميرا مدمجة لصناعة المحتوى مع شاشة قلّابة وفيديو 4K.'),
    specs: [['type', x('Compact vlog camera', 'كاميرا مدمجة لصناعة المحتوى')], ['screen', x('Flip screen', 'شاشة قلّابة')], ['video', '4K']],
  },
  { // 17 Arc
    summary: x('Wireless game controller with Hall-Effect sticks and rear paddles.',
      'يد تحكم لاسلكية للألعاب بعصي Hall-Effect وأزرار خلفية.'),
    specs: [['sticks', 'Hall-Effect'], ['extras', x('Rear paddles', 'أزرار خلفية')], ['connectivity', x('Wireless', 'لاسلكي')]],
  },
  { // 18 Arc Pro Elite
    summary: x('Pro controller with swappable thumbsticks and a 40-hour battery.',
      'يد تحكم احترافية بعصي قابلة للتبديل وبطارية تدوم 40 ساعة.'),
    specs: [['sticks', x('Swappable thumbsticks', 'عصي قابلة للتبديل')], ['battery', x('40 hours', '40 ساعة')]],
  },
  { // 19 Horizon VR
    summary: x('Standalone VR headset with 128 GB of storage and hand tracking.',
      'نظارة واقع افتراضي مستقلة بسعة تخزين 128 جيجابايت وتتبّع لليدين.'),
    specs: [['type', x('Standalone', 'مستقلة')], ['storage', x('128 GB', '128 جيجابايت')], ['tracking', x('Hand tracking', 'تتبّع اليدين')]],
  },
];

export const getContent = (line: number): Content => CONTENT[line];
export const specText = (v: Text, locale: Locale): string => (typeof v === 'string' ? v : v[locale]);
