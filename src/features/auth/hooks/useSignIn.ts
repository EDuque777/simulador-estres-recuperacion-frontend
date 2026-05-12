"use client";

import { useCallback } from "react";
import { useSignInMutation } from "../api/authApi";
import { notifyAuthError, notifyAuthSuccess } from "../lib/authToast";
import type { SignInRequest } from "../types/auth.types";

export const useSignIn = () => {
  const [signInMutation, { data, error, isLoading, isSuccess, isError, reset }] =
    useSignInMutation();

  const signIn = useCallback(
    async (request: SignInRequest) => {
      const result = await signInMutation(request);

      if ("error" in result) {
        notifyAuthError("No se pudo iniciar sesion", result.error);
        throw new Error("SIGN_IN_FAILED");
      }

      notifyAuthSuccess(
        "Codigo enviado",
        result.data.message,
        "Te enviamos un codigo para verificar el ingreso.",
      );

      return result.data;
    },
    [signInMutation],
  );

  return {
    signIn,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
