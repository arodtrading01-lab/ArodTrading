import { clerkMiddleware } from '@clerk/nextjs/server';
export default clerkMiddleware();
export const config = {
  matcher: [
    '/rfq-prime(.*)',
    '/lead-wallet(.*)',
    '/reveal-rules(.*)',
    '/rfq-feed(.*)',
    '/api/(.*)'
  ]
};
