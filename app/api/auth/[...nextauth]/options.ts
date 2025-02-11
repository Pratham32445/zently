import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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
      authorize(credentials, req) {
        return null;
      },
    }),
  ],
};
