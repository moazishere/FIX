'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

interface ProductGalleryProps {
  /** Photo URLs. A thumbnail strip appears automatically when there is more than one. */
  images: string[];
  alt: string;
  /** Discount percentage badge, if on sale. */
  badge?: number;
}

/**
 * Main photo with desktop hover-zoom (follows the pointer), click to enlarge in a dialog,
 * and thumbnails once more photos are added. `data-fly-source` lets add-to-cart fly this photo to the cart.
 */
export function ProductGallery({ images, alt, badge }: ProductGalleryProps) {
  const t = useTranslations('pdp');
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const src = images[active] ?? images[0];

  const follow = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--ox', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    e.currentTarget.style.setProperty('--oy', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  return (
    <div className="gallery" data-fly-source>
      <button
        type="button"
        className="gallery-main"
        aria-label={t('zoom')}
        onPointerMove={follow}
        onClick={() => {
          setZoomed(true);
          dialog.current?.showModal();
        }}
      >
        <Image src={src} alt={alt} width={800} height={800} sizes="(max-width: 768px) 100vw, 560px" priority />
        {badge ? <span className="badge">-{badge}%</span> : null}
      </button>

      {images.length > 1 ? (
        <div className="gallery-thumbs" role="group" aria-label={t('photos')}>
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              className={`gallery-thumb${i === active ? ' is-on' : ''}`}
              aria-label={t('photo', { n: i + 1 })}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <Image src={img} alt="" width={160} height={160} sizes="72px" />
            </button>
          ))}
        </div>
      ) : null}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={alt}
        onClose={() => setZoomed(false)}
        onClick={(e) => {
          // A click on the dimmed backdrop lands on the <dialog> element itself.
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <button type="button" className="lightbox-close" aria-label={t('closeZoom')} onClick={() => dialog.current?.close()}>
          <Icon name="x" />
        </button>
        {/* Only mounted while open, so the enlarged file isn't downloaded unless someone asks for it. */}
        {zoomed ? <Image src={src} alt={alt} width={800} height={800} sizes="(max-width: 900px) 92vw, 880px" /> : null}
      </dialog>
    </div>
  );
}
