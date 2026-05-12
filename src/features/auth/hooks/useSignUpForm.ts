"use client";

import { useCallback, type FormEvent } from "react";
import { usePasswordPairValidation } from "@/shared/ui/passwordStrength/usePasswordPairValidation";
import { getFormValue } from "../lib/getFormValue";
import { useAuthFlowStore } from "../stores/authFlowStore";
import { useSignUp } from "./useSignUp";

export const useSignUpForm = () => {
  const { signUp, isLoading } = useSignUp();
  const passwordValidation = usePasswordPairValidation();
  const { confirmPassword, isPairValid, password } = passwordValidation;
  const openVerificationModal = useAuthFlowStore(
    (state) => state.openVerificationModal,
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const firstName = getFormValue(formData, "firstName");
      const lastName = getFormValue(formData, "lastName");
      const email = getFormValue(formData, "email");
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !isPairValid
      ) {
        return;
      }

      try {
        await signUp({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        });
        openVerificationModal({ email, type: "register" });
      } catch {
        // No se muestran mensajes visuales todavia.
      }
    },
    [
      confirmPassword,
      isPairValid,
      openVerificationModal,
      password,
      signUp,
    ],
  );

  return {
    handleSubmit,
    isLoading,
    passwordValidation,
  };
};
