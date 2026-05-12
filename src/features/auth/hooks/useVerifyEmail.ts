"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useVerifyEmailMutation } from "../api/authApi";
import { notifyAuthError, notifyAuthSuccess } from "../lib/authToast";
import { setCredentials } from "../slices/authSlice";
import type { VerifyCodeRequest } from "../types/auth.types";

export const useVerifyEmail = () => {
  const dispatch = useAppDispatch();
  const [
    verifyEmailMutation,
    { data, error, isLoading, isSuccess, isError, reset },
  ] = useVerifyEmailMutation();

  const verifyEmail = useCallback(
    async (request: VerifyCodeRequest) => {
      const result = await verifyEmailMutation(request);

      if ("error" in result) {
        notifyAuthError("No se pudo verificar el correo", result.error);
        throw new Error("VERIFY_EMAIL_FAILED");
      }

      dispatch(
        setCredentials({
          accessToken: result.data.accessToken,
          user: result.data.user,
        }),
      );

      notifyAuthSuccess(
        "Correo verificado",
        result.data.message,
        "Tu correo fue verificado correctamente.",
      );

      return result.data;
    },
    [dispatch, verifyEmailMutation],
  );

  return {
    verifyEmail,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
