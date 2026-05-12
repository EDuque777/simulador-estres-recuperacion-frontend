"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useVerifySignUpCodeMutation } from "../api/authApi";
import { notifyAuthError, notifyAuthSuccess } from "../lib/authToast";
import { setCredentials } from "../slices/authSlice";
import type { VerifyCodeRequest } from "../types/auth.types";

export const useVerifySignUpCode = () => {
  const dispatch = useAppDispatch();
  const [
    verifySignUpCodeMutation,
    { data, error, isLoading, isSuccess, isError, reset },
  ] = useVerifySignUpCodeMutation();

  const verifySignUpCode = useCallback(
    async (request: VerifyCodeRequest) => {
      const result = await verifySignUpCodeMutation(request);

      if ("error" in result) {
        notifyAuthError("No se pudo verificar el registro", result.error);
        throw new Error("VERIFY_SIGN_UP_CODE_FAILED");
      }

      dispatch(
        setCredentials({
          accessToken: result.data.accessToken,
          user: result.data.user,
        }),
      );

      notifyAuthSuccess(
        "Registro verificado",
        result.data.message,
        "Tu cuenta fue verificada correctamente.",
      );

      return result.data;
    },
    [dispatch, verifySignUpCodeMutation],
  );

  return {
    verifySignUpCode,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
