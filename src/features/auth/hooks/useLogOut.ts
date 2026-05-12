"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useLogOutMutation } from "../api/authApi";
import { clearCredentials } from "../slices/authSlice";

export const useLogOut = () => {
  const dispatch = useAppDispatch();
  const [logOutMutation, { data, error, isLoading, isSuccess, isError, reset }] =
    useLogOutMutation();

  const logOut = useCallback(async () => {
    try {
      return await logOutMutation().unwrap();
    } finally {
      dispatch(clearCredentials());
    }
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
