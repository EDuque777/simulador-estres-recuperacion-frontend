"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useVerifySignInCodeMutation } from "../api/authApi";
import { notifyAuthError, notifyAuthSuccess } from "../lib/authToast";
import { setCredentials } from "../slices/authSlice";
import type { VerifyCodeRequest } from "../types/auth.types";

export const useVerifySignInCode = () => {
  const dispatch = useAppDispatch();
  const [
    verifySignInCodeMutation,
    { data, error, isLoading, isSuccess, isError, reset },
  ] = useVerifySignInCodeMutation();

  const verifySignInCode = useCallback(
    async (request: VerifyCodeRequest) => {
      const result = await verifySignInCodeMutation(request);

      if ("error" in result) {
        notifyAuthError("No se pudo verificar el ingreso", result.error);
        throw new Error("VERIFY_SIGN_IN_CODE_FAILED");
      }

      dispatch(
        setCredentials({
          accessToken: result.data.accessToken,
          user: result.data.user,
        }),
      );

      notifyAuthSuccess(
        "Ingreso verificado",
        result.data.message,
        "Sesion iniciada correctamente.",
      );

      return result.data;
    },
    [dispatch, verifySignInCodeMutation],
  );

  return {
    verifySignInCode,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
