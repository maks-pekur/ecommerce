// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  server: {
    // REQUIRED
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().default(3000),
    AUTH_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    STRIPE_API_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    UPSTASH_REDIS_REST_URL: z.string().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
    EMAIL_SERVER_USER: z.string().optional(),
    EMAIL_SERVER_PASSWORD: z.string().optional(),
  },

  client: {
    // REQUIRED
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  },

  runtimeEnv: {
    // REQUIRED
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
