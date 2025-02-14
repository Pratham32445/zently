import client from "@/client";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ account, profile }) {
      return true;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", placeholder: "Enter your email" },
        password: { type: "password", placeholder: "Enter your Password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email: emailOrUserName, password } = credentials;
        const user = await client.user.findFirst({
          where: {
            OR: [{ email: emailOrUserName }, { userName: emailOrUserName }],
          },
        });
        if (!user) return null;
        const isPassword = await bcrypt.compare(password, user.password);
        return isPassword ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
