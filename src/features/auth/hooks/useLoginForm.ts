"use client";

import { useCallback, type SubmitEvent } from "react";
import { getFormValue } from "../lib/getFormValue";
import { useAuthFlowStore } from "../stores/authFlowStore";
import { useSignIn } from "./useSignIn";

export const useLoginForm = () => {
  const { signIn, isLoading } = useSignIn();
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

      try {
        await signIn({ email, password });
        openVerificationModal({ email, type: "login" });
      } catch {
        // No se muestran mensajes visuales todavia.
      }
    },
    [openVerificationModal, signIn],
  );

  return {
    handleSubmit,
    isLoading,
  };
};
