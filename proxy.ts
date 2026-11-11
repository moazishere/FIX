import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next 16 renamed "middleware" to "proxy". Redirects "/" to /en or /ar from the saved cookie or the
// browser's Accept-Language header, and keeps every URL prefixed with its locale.
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, fonts, favicon…).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
