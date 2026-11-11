/**
 * Attribution for photos that are not ours. The Creative Commons licences these photos are published
 * under require crediting the author, linking the licence and the source, and saying when the image was
 * changed (we crop it). Keep every entry in sync with the file it describes; the credit is shown on the slide.
 */
export interface PhotoCredit {
  author: string;
  license: string;
  licenseUrl: string;
  /** Page where the original file (and its licence) is published. */
  source: string;
}

export const PHOTO_CREDITS = {
  s26: {
    author: 'Kyu3a',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Galaxy_S26_Ultra_-_4.jpg',
  },
} as const satisfies Record<string, PhotoCredit>;
