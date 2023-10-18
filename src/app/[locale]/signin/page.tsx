"use client"

import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

const Signin = () => {
    const t = useTranslations("Signin");
    const {status} = useSession();
    if (status=="authenticated")
        redirect("/")
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <form className="p-2 bg-slate-500 text-center rounded-md w-60">
                <label htmlFor="">
                    {t("oauthTitle")}
                </label>
                <button
                    onClick={() => {
                        signIn("github")
                    }}
                    type="button"
                    className="bg-black w-full px-3 hover:bg-slate-800 transition-colors text-white p-2 text-center rounded-md"
                >
                    {t("github")}
                </button>
            </form>
        </main>
    );
}

export default Signin;