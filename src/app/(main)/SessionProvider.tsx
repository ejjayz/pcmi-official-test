// src/app/(main)/SessionProvider.tsx
'use client';

import { createContext, useContext } from "react";
import { SessionContext } from "@/lib/session";

const Context = createContext<SessionContext>({ user: null, session: null });

export default function SessionProvider({
  value,
  children,
}: {
  value: SessionContext;
  children: React.ReactNode;
}) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSession() {
  return useContext(Context);
}