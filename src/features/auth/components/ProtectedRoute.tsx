"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { accessToken, authStatus, isAuthenticated, user } = useAuth();
  const hasValidReduxSession = isAuthenticated && Boolean(accessToken) && Boolean(user);

  useEffect(() => {
    if (
      authStatus === "unauthenticated" ||
      (authStatus === "authenticated" && !hasValidReduxSession)
    ) {
      router.replace("/");
    }
  }, [authStatus, hasValidReduxSession, router]);

  if (authStatus === "idle" || !hasValidReduxSession) {
    return null;
  }

  return <>{children}</>;
}
