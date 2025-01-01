import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export const intlMiddleware = createMiddleware(routing);

// Define a route matcher for protected routes
const isProtectedRoute = createRouteMatcher(['/(.*)']);

// Define API routes pattern
const isApiRoute = createRouteMatcher(['/api/:path*', '/trpc/:path*','/admin/:path*']);

export default clerkMiddleware(async (auth, req) => {
    // Skip `next-intl` for API routes
    if (isApiRoute(req)) {
        return; // Directly allow API routes to proceed
    }

    // Handle protected routes
    if (isProtectedRoute(req)) {
        await auth();
    }

    // Apply `next-intl` middleware for other routes
    return intlMiddleware(req);
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Include API and TRPC routes
        '/api/:path*',
        '/trpc/:path*',
        // Include other app routes
        '/', '/(de|en)/:path*'
    ],
};
