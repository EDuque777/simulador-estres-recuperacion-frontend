"use client";

import { useCallback } from "react";
import { useSignUpMutation } from "../api/authApi";
import { notifyAuthError, notifyAuthSuccess } from "../lib/authToast";
import type { SignUpRequest } from "../types/auth.types";

export const useSignUp = () => {
  const [signUpMutation, { data, error, isLoading, isSuccess, isError, reset }] =
    useSignUpMutation();

  const signUp = useCallback(
    async (request: SignUpRequest) => {
      const result = await signUpMutation(request);

      if ("error" in result) {
        notifyAuthError("No se pudo crear la cuenta", result.error);
        throw new Error("SIGN_UP_FAILED");
      }

      notifyAuthSuccess(
        "Registro iniciado",
        result.data.message,
        "Te enviamos un codigo de verificacion al correo.",
      );

      return result.data;
    },
    [signUpMutation],
  );

  return {
    signUp,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
