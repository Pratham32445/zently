import { z } from "zod";

export const signUpSchema = z.object({
  userName: z.string().min(4, "username must be more than 4 character"),
  email: z.string().email("please provide a valid email"),
  password: z.string().min(6, "password should be greater than 6 character"),
});
