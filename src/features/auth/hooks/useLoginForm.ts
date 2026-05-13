"use client";

import { useCallback, useState, type SubmitEvent } from "react";
import { getFormValue } from "../lib/getFormValue";
import { useAuthFlowStore } from "../stores/authFlowStore";
import { useResendVerificationCode } from "./useResendVerificationCode";
import {
  EMAIL_NOT_VERIFIED_SIGN_IN_ERROR,
  useSignIn,
} from "./useSignIn";

const isEmailNotVerifiedError = (error: unknown) =>
  error instanceof Error && error.message === EMAIL_NOT_VERIFIED_SIGN_IN_ERROR;

export const useLoginForm = () => {
  const { signIn, isLoading } = useSignIn();
  const {
    resendVerificationCode,
    isLoading: isResendingVerificationCode,
  } = useResendVerificationCode();
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const openVerificationModal = useAuthFlowStore(
    (state) => state.openVerificationModal,
  );

  const handleSubmit = useCallback(
    async (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const email = getFormValue(formData, "email");
      const password = getFormValue(formData, "password");

      if (!email || !password) {
        return;
      }

      setUnverifiedEmail("");

      try {
        await signIn({ email, password });
        openVerificationModal({ email, type: "login" });
      } catch (error) {
        if (isEmailNotVerifiedError(error)) {
          setUnverifiedEmail(email);
        }
      }
    },
    [openVerificationModal, signIn],
  );

  const handleResendVerificationCode = useCallback(async () => {
    if (!unverifiedEmail) {
      return;
    }

    try {
      await resendVerificationCode({ email: unverifiedEmail });
      openVerificationModal({
        email: unverifiedEmail,
        type: "emailVerification",
      });
    } catch {
      // El toast del hook conserva el motivo visible para el usuario.
    }
  }, [openVerificationModal, resendVerificationCode, unverifiedEmail]);

  return {
    handleSubmit,
    handleResendVerificationCode,
    isLoading,
    isResendingVerificationCode,
    unverifiedEmail,
  };
};
