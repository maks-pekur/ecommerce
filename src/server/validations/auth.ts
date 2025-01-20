import * as z from "zod";

export const authSchema = z.object({
  phoneNumber: z.string(),
  code: z
    .string()
    .min(4, {
      message: "Verification code must be 4 characters long",
    })
    .max(4),
});

export type AuthFormValues = z.infer<typeof authSchema>;
