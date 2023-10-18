import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: String(process.env.GITHUB_ID),
            clientSecret: String(process.env.GITHUB_SECRET),
        }),
    ],
    // pages:{
    //     signIn:"/signin"
    // }, 
    //do this in middleware
    secret: String(process.env.NEXTAUTH_SECRET)
}