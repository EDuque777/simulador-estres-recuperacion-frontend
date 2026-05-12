"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useLogOutMutation } from "../api/authApi";
import {
  notifyAuthSuccess,
  notifyAuthWarning,
  waitForAuthToastToClose,
} from "../lib/authToast";
import { clearCredentials } from "../slices/authSlice";

export const useLogOut = () => {
  const dispatch = useAppDispatch();
  const [logOutMutation, { data, error, isLoading, isSuccess, isError, reset }] =
    useLogOutMutation();

  const logOut = useCallback(async () => {
    const result = await logOutMutation();

    if ("error" in result) {
      notifyAuthWarning(
        "Sesion cerrada localmente",
        "No pudimos confirmar la salida con el servidor, pero tu sesion local fue eliminada.",
      );

      await waitForAuthToastToClose();
      dispatch(clearCredentials());

      return null;
    }

    notifyAuthSuccess(
      "Sesion cerrada",
      result.data.message,
      "Sesion cerrada correctamente.",
    );

    await waitForAuthToastToClose();
    dispatch(clearCredentials());

    return result.data;
  }, [dispatch, logOutMutation]);

  return {
    logOut,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
