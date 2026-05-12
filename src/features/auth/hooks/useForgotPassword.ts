"use client";

import { useCallback } from "react";
import { useForgotPasswordMutation } from "../api/authApi";
import { notifyAuthError, notifyAuthSuccess } from "../lib/authToast";
import type { ForgotPasswordRequest } from "../types/auth.types";

export const useForgotPassword = () => {
  const [
    forgotPasswordMutation,
    { data, error, isLoading, isSuccess, isError, reset },
  ] = useForgotPasswordMutation();

  const forgotPassword = useCallback(
    async (request: ForgotPasswordRequest) => {
      const result = await forgotPasswordMutation(request);

      if ("error" in result) {
        notifyAuthError("No se pudo enviar el codigo", result.error);
        throw new Error("FORGOT_PASSWORD_FAILED");
      }

      notifyAuthSuccess(
        "Codigo enviado",
        result.data.message,
        "Si el correo existe, enviamos un codigo de recuperacion.",
      );

      return result.data;
    },
    [forgotPasswordMutation],
  );

  return {
    forgotPassword,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
