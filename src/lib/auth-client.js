import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://my-assignment-08-49n1o79pe-ra-soikot-s-projects.vercel.app",
});