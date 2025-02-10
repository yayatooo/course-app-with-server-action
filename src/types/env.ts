import z from "zod";

export const envSchema = z.object({
  NODE_ENV: z.string().min(1),
  PORT: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().min(1),
  R2_PUBLIC_URL: z.string().min(1),
  R2_ACCESS_ID: z.string().min(1),
  R2_SECRET_KEY: z.string().min(1),
  R2_S3API_URL: z.string().min(1)
});

const envParser = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  R2_ACCESS_ID: process.env.R2_ACCESS_ID,
  R2_SECRET_KEY: process.env.R2_SECRET_KEY,
  R2_S3API_URL: process.env.R2_S3API_URL
});

if (!envParser.success) {
  throw new Error("Invalid environment variables");
  process.exit(1);
}

type TENV = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TENV {}
  }
}
