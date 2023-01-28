import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }) {
      const getToken = await prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      })

      let accessToken: string | null = null
      if (getToken) {
        accessToken = getToken.access_token!
      }

      ;(session.user as any).token = accessToken
      ;(session.user as any).id = user.id
      return session
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
}

export default NextAuth(authOptions)
