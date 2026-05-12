"use client";

import { useCallback } from "react";
import { useResetPasswordMutation } from "../api/authApi";
import { notifyAuthError, notifyAuthSuccess } from "../lib/authToast";
import type { ResetPasswordRequest } from "../types/auth.types";

export const useResetPassword = () => {
  const [
    resetPasswordMutation,
    { data, error, isLoading, isSuccess, isError, reset },
  ] = useResetPasswordMutation();

  const resetPassword = useCallback(
    async (request: ResetPasswordRequest) => {
      const result = await resetPasswordMutation(request);

      if ("error" in result) {
        notifyAuthError("No se pudo cambiar la contrasena", result.error);
        throw new Error("RESET_PASSWORD_FAILED");
      }

      notifyAuthSuccess(
        "Contrasena actualizada",
        result.data.message,
        "Tu contrasena fue actualizada correctamente.",
      );

      return result.data;
    },
    [resetPasswordMutation],
  );

  return {
    resetPassword,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
