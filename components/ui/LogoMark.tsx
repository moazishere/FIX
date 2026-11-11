import Image from 'next/image';
import logo from '@/assets/logo.png';

/**
 * The FIX logo (assets/logo.png — a transparent-cornered cut of assets/logo.jpeg).
 * The artwork already spells "FIX", so it is decorative here: the surrounding link carries the accessible name.
 */
export function LogoMark({ size = 44, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <Image
      className="logo-img"
      src={logo}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
    />
  );
}
