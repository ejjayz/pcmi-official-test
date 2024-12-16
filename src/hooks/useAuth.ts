"use client";

import { User } from "lucia";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("/api/auth/validate");
      if (!response.ok) {
        throw new Error("Failed to validate auth");
      }
      return response.json();
    },
  });

  return {
    user: data?.user as User | null,
    isLoading,
  };
}
