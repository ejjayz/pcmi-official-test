import { validateRequest } from "@/auth";
import { cache } from "react";

export const getAuthSession = cache(async () => {
  try {
    const { user, session } = await validateRequest();
    return {
      user: user ? {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        googleId: user.googleId
      } : null,
      session
    };
  } catch (error) {
    console.error("Auth error:", error);
    return { user: null, session: null };
  }
});