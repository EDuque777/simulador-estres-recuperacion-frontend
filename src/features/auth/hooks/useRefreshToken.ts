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
    try {
      const response = await refreshTokenMutation().unwrap();

      dispatch(
        setCredentials({
          accessToken: response.accessToken,
          user: response.user,
        }),
      );

      return response;
    } catch (error) {
      dispatch(clearCredentials());
      throw error;
    }
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
