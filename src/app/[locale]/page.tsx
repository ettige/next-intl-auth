import { getTranslator } from "next-intl/server";
import LocaleSwitcher from "./components/switch-locale";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import Link from "next/link";
import SignOut from "./components/signout";

const Root = async ({
  params: { locale }
}: {
  params: { locale: string }
}) => {
  const t = await getTranslator(locale, "Root");
  const session = await getServerSession(authOptions);

  return (
    <main className="flex h-screen justify-center flex-col items-center">
      <h1 className="font-bold text-lg">{t("appName")}</h1>
      <p>{t("appDesc")}</p>
      <LocaleSwitcher />
      {session ? <div className="flex gap-1">{session.user?.name}<SignOut> {t("signout")}</SignOut> </div> : <Link href={"/signin"}>{t("signin")}</Link>}
    </main>
  );
}

export default Root;