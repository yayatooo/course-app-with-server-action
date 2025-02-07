import z from "zod";

// Define the schema for environment variables
export const envSchema = z.object({
  NODE_ENV: z.string().min(1),
  PORT: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().min(1),
});

// Parse environment variables
const envParser = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
});

// Validate environment variables
if (!envParser.success) {
  console.error("Invalid environment variables:", envParser.error.format());
  process.exit(1); // Exit the process if validation fails
}

// Infer the type of environment variables
// will remove the export
type TENV = z.infer<typeof envSchema>;

// Augment the global `ProcessEnv` interface

declare global {
  interface ProcessEnv extends TENV {}
}