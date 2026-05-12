"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useRefreshTokenMutation } from "../api/authApi";
import { clearCredentials, setCredentials } from "../slices/authSlice";

export const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const [
    refreshTokenMutation,
    { data, error, isLoading, isSuccess, isError, reset },
  ] = useRefreshTokenMutation();

  const refreshToken = useCallback(async () => {
    const result = await refreshTokenMutation();

    if ("error" in result) {
      dispatch(clearCredentials());
      throw new Error("REFRESH_TOKEN_FAILED");
    }

    dispatch(
      setCredentials({
        accessToken: result.data.accessToken,
        user: result.data.user,
      }),
    );

    return result.data;
  }, [dispatch, refreshTokenMutation]);

  return {
    refreshToken,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
};
