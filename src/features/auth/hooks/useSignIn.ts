"use client";

import { useCallback } from "react";
import { useSignInMutation } from "../api/authApi";
import {
  authErrorHasBackendMessage,
  notifyAuthError,
  notifyAuthSuccess,
  notifyAuthWarning,
} from "../lib/authToast";
import type { SignInRequest } from "../types/auth.types";

export const EMAIL_NOT_VERIFIED_SIGN_IN_ERROR = "EMAIL_NOT_VERIFIED";

export const useSignIn = () => {
  const [signInMutation, { data, error, isLoading, isSuccess, isError, reset }] =
    useSignInMutation();

  const signIn = useCallback(
    async (request: SignInRequest) => {
      const result = await signInMutation(request);

      if ("error" in result) {
        notifyAuthError("No se pudo iniciar sesion", result.error);

        if (authErrorHasBackendMessage(result.error, "Email not verified")) {
          throw new Error(EMAIL_NOT_VERIFIED_SIGN_IN_ERROR);
        }

        throw new Error("SIGN_IN_FAILED");
      }

      if (result.data.message === "Email not verified") {
        notifyAuthWarning(
          "Correo no verificado",
          "Tu correo aun no esta verificado.",
        );
        throw new Error(EMAIL_NOT_VERIFIED_SIGN_IN_ERROR);
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
