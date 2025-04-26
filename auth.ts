import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import prisma from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      profile(profile) {
        console.log("Google profile", profile);
        return {
          id: profile.sub, // Use the Google sub as the user id or leave undefined to auto-generate
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "READER", // Default role
        };
      },
    }),
    GitHub({
      profile(profile) {
        console.log("GitHub profile", profile);
        return {
          id: String(profile.id), // Convert number to string
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: "READER", // Use your default role as a string
        };
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});
