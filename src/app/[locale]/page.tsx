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
    <main className="flex h-screen justify-center gap-1 flex-col items-center">
      <Link
        href={"/secure"}
      >
        Secure
      </Link>
      {
        session ?
          <div className="rounded-lg p-4 bg-gray-200 flex flex-col gap-1 items-center">
            <figure className="rounded-xl w-56">
              <img src={session.user?.image || ""} alt="User-Image" />
            </figure>
            <h2>{session.user?.name}</h2>
            <p>{session.user?.email}</p>
            <SignOut>
              {t("signout")}
            </SignOut>
          </div> :
          <Link
            className="bg-lime-700 px-3 hover:bg-lime-800 transition-colors text-white p-2 text-center rounded-md"
            href={"/signin"}>{t("signin")}</Link>
      }
      <h1 className="font-bold text-lg">{t("appName")}</h1>
      <p>{t("appDesc")}</p>
      <LocaleSwitcher />

    </main>
  );
}

export default Root;