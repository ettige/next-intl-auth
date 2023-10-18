"use client"
import { i18nConfig } from "@/i18n";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";

const LocaleSwitcher = () => {
    const router = useRouter();//note use next-intl router
    const pathname = usePathname();
    const t = useTranslations("LocaleSwitcher");
    return (
        <div className="flex gap-1">
            {i18nConfig.locales.map(locale => (
                <button
                    className="bg-black px-3 hover:bg-slate-800 transition-colors text-white p-2 text-center rounded-md"
                    key={locale}
                    onClick={() => router.push(pathname, { locale: locale })}
                >
                    {t("switch-to", { locale })}
                </button>
            ))}
        </div>
    );
}

export default LocaleSwitcher;