import client from "@/client";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", placeholder: "enter your email" },
        password: { type: "password", placeholder: "Enter password" },
      },
      async authorize(credentials) {
        if (!credentials) return;
        const { email: emailOrUserName, password } = credentials;
        const user = await client.user.findFirst({
          where: {
            OR: [{ email: emailOrUserName }, { userName: emailOrUserName }],
          },
        });
        if (user) {
          const isPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          return isPassword ? user : null;
        }
        return null;
      },
    }),
  ],
};
