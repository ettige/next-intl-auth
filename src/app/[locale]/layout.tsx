import '@/styles/globals.css'
import { i18nConfig, rtlLanguages } from '@/i18n'

import { Vazirmatn } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslator } from 'next-intl/server'
import { notFound, redirect } from 'next/navigation'
import AuthProvider from './components/auth-provider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/authOptions'

const font = Vazirmatn({ subsets: ['latin'] })

export async function generateMetadata({ params: { locale } }: {
  params: { locale: string }
}) {

  const t = await getTranslator(locale, "metadata");
  return {
    title: t("title"),
    description: t("desc"),
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const isValidLocale = i18nConfig.locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} dir={rtlLanguages.includes(locale) ? "rtl" : ""}>
      <body className={font.className}>
        <AuthProvider session={session ? session : undefined}>
          <NextIntlClientProvider messages={await getMessages(locale)} locale={locale} >
            {children}
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
