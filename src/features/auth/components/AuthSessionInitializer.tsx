"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRefreshToken } from "../hooks/useRefreshToken";

export function AuthSessionInitializer() {
  const hasRequestedRefresh = useRef(false);
  const { authStatus, clearAuthCredentials } = useAuth();
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    if (authStatus !== "idle" || hasRequestedRefresh.current) {
      return;
    }

    hasRequestedRefresh.current = true;

    void refreshToken().catch(() => {
      clearAuthCredentials();
    });
  }, [authStatus, clearAuthCredentials, refreshToken]);

  return null;
}
