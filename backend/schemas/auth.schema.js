import { z } from "zod";

export const signUpSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name cannot exceed 50 characters"),
    email: z
      .string()
      .trim()
      .pipe(z.email({ error: "Invalid email format" })),
    password: z
      .string({ error: "Password is required" })
      .trim()
      .min(6, "Password must be minimum 6 characters")
      .max(50, "Password is too long"),
  }),
});

export const signInSchema = z.object({
  body: z.object({
    email: z
      .string("Email address is required")
      .trim()
      .pipe(z.email({ error: "Invalid email format" })),
    password: z.string("Password is required"),
  }),
});
