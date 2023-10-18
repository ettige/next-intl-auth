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

For example, if you added Persian and English locales, create `fa.json` and `en.json` files with the translations for each locale:

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

## Learn More

To learn more about Next.js and its features and API, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

You can also contribute to the Next.js project by visiting the [Next.js GitHub repository](https://github.com/vercel/next.js/). Your feedback and contributions are always welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is by using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For more details on deploying your Next.js app, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

Feel free to customize and improve this README to suit your needs!