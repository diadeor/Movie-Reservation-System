import { z } from "zod";

export const signUpSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .min(2, { error: "Name must be minimum 2 characters" })
      .max(50, { error: "Name cannot exceed 50 characters" }),
    email: z
      .string({ error: "Email address is required" })
      .trim()
      .pipe(z.email({ error: "Invalid email format" })),
    password: z
      .string({ error: "Password is required" })
      .trim()
      .min(6, { error: "Password must be minimum 6 characters" })
      .max(50, { error: "Password cannot exceed 50 characters" }),
  }),
});

export const signInSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email address is required" })
      .trim()
      .pipe(z.email({ error: "Invalid email format" })),
    password: z
      .string({ error: "Password is required" })
      .trim()
      .min(6, { error: "Password must be minimum 6 characters" })
      .max(50, { error: "Password cannot exceed 50 characters" }),
  }),
});

export const changePassSchema = z.object({
  body: z.object({
    current: z
      .string({ error: "Current password is required" })
      .trim()
      .min(6, { error: "Password must be minimum 6 characters" })
      .max(50, { error: "Password cannot exceed 50 characters" }),
    newPassword: z
      .string({ error: "New password is required" })
      .trim()
      .min(6, { error: "Password must be minimum 6 characters" })
      .max(50, { error: "Password cannot exceed 50 characters" }),
  }),
});

export const editUserSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .min(2, { error: "Name must be minimum 2 characters" })
      .max(50, { error: "Name cannot exceed 50 characters" })
      .optional(),
    email: z
      .string({ error: "Email address is required" })
      .trim()
      .pipe(z.email({ error: "Invalid email format" }))
      .optional(),
  }),
});
