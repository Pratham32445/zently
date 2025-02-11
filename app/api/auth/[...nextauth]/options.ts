import client from "@/client";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Welcome Back",
      credentials: {
        email: {
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          type: "password",
          placeholder: "Enter your password",
        },
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
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        return isPasswordMatch ? user : null;
      },
    }),
  ],
};
