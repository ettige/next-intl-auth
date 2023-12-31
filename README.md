# Next.js Integration with next-intl and next-auth

This repository provides an integration of [`next-intl`](https://github.com/amannn/next-intl) and [`next-auth`](https://github.com/nextauthjs/next-auth) with Next.js.

## Extend More Locale

To extend the available locales for your application, follow these steps:

1. Open the `src/i18n/index.ts` file and locate the `i18nConfig` object.
2. Edit the `locales` array to include the desired locales for your application.
3. Save the file.

For example, if you want to add support for Persian , modify the `locales` array as follows:

```typescript
const i18nConfig = {
  locales: ['en', 'fa'],
  defaultLocale: 'en',
};
```

## Add Translations

To add translations for the new locales, follow these steps:

1. In the `src/i18n/messages` directory, create a new `<locale>.json` file for each added locale.
2. Open each `<locale>.json` file and add the translations for the corresponding locale.

For example, if you added French and Spanish locales, create `fa.json` and `en.json` files with the translations for each locale:

```json
// fa.json
{
  "hello": "سلام",
  "welcome": "خوش آمدید."
}

// en.json
{
  "hello": "Hello",
  "welcome": "Welcome"
}
```
## Next-auth
[`next-auth`](https://github.com/nextauthjs/next-auth) Configuration file located at `src/lib/auth/authOptions.ts`.

```ts
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: String(process.env.GITHUB_ID),
            clientSecret: String(process.env.GITHUB_SECRET),
        }),
    ],
    secret: String(process.env.NEXTAUTH_SECRET)
}
```
if you want to customize pages like this 
```ts
    pages:{
        signIn:"/signin"
    },
```
do this in middleware instead like so

```ts
const authMiddleware = withAuth(
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
```

## Learn More

To learn more about `next-intl`:

- [next-intl Documentation](https://next-intl-docs.vercel.app/)

To learn more about `next-auth`:

- [next-auth Documentation](https://next-auth.js.org/)
- [Auth.js Documentation](https://authjs.dev/)

To learn more about Next.js and its features and API, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

You can also contribute to the Next.js project by visiting the [Next.js GitHub repository](https://github.com/vercel/next.js/). Your feedback and contributions are always welcome!
