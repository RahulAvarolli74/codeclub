import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
 ...authConfig,
 adapter: PrismaAdapter(db),
 session: {
  strategy: "jwt",
 },
 pages: {
  signIn: "/login",
 },
 callbacks: {
  async jwt({ token, user }) {
   if (user) {
    // get user from db with the email
    // if there is no user with the email, create new user
    // else set the user data to token
    token.id = user.id;
    token.cfHandle = user.cfHandle || null;
   }

   return token;
  },

  async session({ session, token }) {
   if (token) {
    // set the token data to session
    session.user.id = String(token.id);
    session.user.cfHandle = (token.cfHandle as string) || null;
   }
   if (token.sub) {
      try {
        const dbUser = await db.user.findUnique({
          where: { id: token.sub },
          select: { id: true, cfHandle: true, email: true, name: true }
        });
        
        if (dbUser) {
          token.id = dbUser.id;
          token.cfHandle = dbUser.cfHandle;
        }
      } catch (error) {
        console.error("Error fetching user from database:", error);
      }
    }

   return session;
  },

  redirect() {
   return "/explore";
  },
 },
});