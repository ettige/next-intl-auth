import { getRequestConfig } from 'next-intl/server';

export const i18nConfig = {
    locales: ["en", "fa"],
    defaultLocale: "fa"
}
//add languages that are rtl here
export const rtlLanguages=["fa"];
export const getMessages = async (locale: string) => (await import(`./messages/${locale}.json`)).default;

export default getRequestConfig(async ({ locale }) => ({
    messages: await getMessages(locale)
}));