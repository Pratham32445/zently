import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Please Enter a valid email").nonempty(),
  userName: z.string().min(4, "Please Enter more than 4 digit"),
  password: z.string().min(6, "Please Enter more than 6 digit"),
});

export const slotSchema = z.object({});
