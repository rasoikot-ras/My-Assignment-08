import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://my-assignment-08-h12b7h6rd-ra-soikot-s-projects.vercel.app/",
});

export const { useSession } = authClient;