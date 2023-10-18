"use client"

import { signOut } from "next-auth/react";

const SignOut = ({ children }: { children: React.ReactNode }) => {

    return (
        <button
            className="bg-red-700 px-3 hover:bg-slate-800 transition-colors text-white p-2 text-center rounded-md"

            onClick={() => {
                signOut()
            }}
        >
            {children}
        </button>
    );
}

export default SignOut;