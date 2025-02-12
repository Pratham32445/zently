import { z } from "zod";

export const signUpSchema = z.object({
  userName: z.string().min(4, "username must be more than 4 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Please enter a 6 digit password"),
});
