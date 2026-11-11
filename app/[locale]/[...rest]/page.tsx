import { notFound } from 'next/navigation';

/** Any unknown URL under a locale renders the localized not-found page (with header and footer). */
export default function CatchAll() {
  notFound();
}
