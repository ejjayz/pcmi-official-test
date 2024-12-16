import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Google } from "arctic";
import { Lucia, Session, User } from "lucia";
import { cache } from "react";
import prisma from "./lib/prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      username: attributes.username,
      displayName: attributes.displayName,
      avatarUrl: attributes.avatarUrl,
      googleId: attributes.googleId,
      isVerified: attributes.isVerified
    };
  }
});

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!
);

export const validateRequest = cache(async () => {
  try {
    const authRequest = auth();
    const session = await authRequest.validate();
    return {
      user: session?.user ?? null,
      session: session ?? null,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return { user: null, session: null };
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      id: string;
      username: string;
      displayName: string;
      avatarUrl: string | null;
      googleId: string | null;
      isVerified: boolean;
    };
  }
}

export type { Session, User };