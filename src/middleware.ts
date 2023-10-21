import createMiddleware from 'next-intl/middleware';
import { countryTolocale, i18nConfig } from './i18n';
import withAuth from 'next-auth/middleware';
import { NextRequest } from 'next/server';

const publicPages = ['/', '/signin'];

const intlMiddleware = createMiddleware(i18nConfig);
const authMiddleware = withAuth(
    // Note that this callback is only invoked if
    // the `authorized` callback has returned `true`
    // and not for pages listed in `pages`.
    function onSuccess(req:any) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: async ({ req: { cookies }, token }) => {
                if (token != null) {
                    return true;
                }
                //see https://stackoverflow.com/questions/76496259/how-to-secure-routes-using-next-auth-and-middleware-with-database-strategy
                const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://") ?? !!process.env.VERCEL;
                const cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token";
                const session = await (await fetch(process.env.NEXTAUTH_URL + '/api/auth/session', { method: 'GET', headers: { 'Cookie': `${cookieName}=${cookies.get(cookieName)?.value}` } })).json();
                return !!session.user;
            }
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
                console.log(countryCode)
                if (i18nConfig.locales.includes(countryTolocale[countryCode.toLowerCase()]))
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