"use client";

import { useCallback } from "react";
import { useResendVerificationCodeMutation } from "../api/authApi";
import { notifyAuthError, notifyAuthSuccess } from "../lib/authToast";
import type { ResendVerificationCodeRequest } from "../types/auth.types";

export const useResendVerificationCode = () => {
  const [
    resendVerificationCodeMutation,
    { data, error, isLoading, isSuccess, isError, reset },
  ] = useResendVerificationCodeMutation();

  const resendVerificationCode = useCallback(
    async (request: ResendVerificationCodeRequest) => {
      const result = await resendVerificationCodeMutation(request);

      if ("error" in result) {
        notifyAuthError("No se pudo reenviar el codigo", result.error);
        throw new Error("RESEND_VERIFICATION_CODE_FAILED");
      }

      notifyAuthSuccess(
        "Codigo reenviado",
        result.data.message,
        "Te enviamos un nuevo codigo de verificacion.",
      );

      return result.data;
    },
    [resendVerificationCodeMutation],
  );

  return {
    resendVerificationCode,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
