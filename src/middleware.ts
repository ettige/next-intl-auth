import createMiddleware from 'next-intl/middleware';
import { i18nConfig } from './i18n';
import withAuth from 'next-auth/middleware';
import { NextRequest } from 'next/server';

const publicPages = ['/', '/signin'];

const intlMiddleware = createMiddleware(i18nConfig);
const authMiddleware = withAuth(
    // Note that this callback is only invoked if
    // the `authorized` callback has returned `true`
    // and not for pages listed in `pages`.
    function onSuccess(req) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({ token }) => token != null
        },
        pages: {
            signIn: '/signin'
        }
    }
);
export default async function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${i18nConfig.locales.join('|')}))?(${publicPages.join('|')})?/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    const ip = req.headers.get("x-forwarded-for");

    if (!req.cookies.get("NEXT_LOCALE")?.value) {
        const ip2c = await fetch(`https://ip2c.org/${ip}`)
            .then(response => response.text())
            .then(data => {
                const responseParts = data.split(';');
                const countryCode = responseParts[1];
                const countryName = responseParts[3];
                if (i18nConfig.locales.includes(countryCode.toLowerCase()))
                    req.cookies.set("NEXT_LOCALE", countryCode)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    // Skip all paths that should not be internationalized. This example skips
    // certain folders and all pathnames with a dot (e.g. favicon.ico)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};