"use client";

import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useAuthFlowStore } from "../stores/authFlowStore";
import { useVerifySignInCode } from "./useVerifySignInCode";
import { useVerifySignUpCode } from "./useVerifySignUpCode";

const MODAL_EXIT_DURATION_MS = 360;

export const useVerificationCodeForm = () => {
  const router = useRouter();
  const {
    closeVerificationModal,
    verificationEmail,
    verificationType,
  } = useAuthFlowStore();
  const { verifySignInCode, isLoading: isVerifyingSignIn } =
    useVerifySignInCode();
  const { verifySignUpCode, isLoading: isVerifyingSignUp } =
    useVerifySignUpCode();
  const [code, setCode] = useState("");
  const isLoading = isVerifyingSignIn || isVerifyingSignUp;
  const normalizedCode = code.trim();

  const title = useMemo(() => {
    return verificationType === "register"
      ? "Verificar registro"
      : "Verificar login";
  }, [verificationType]);

  const handleCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCode(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!verificationEmail || !verificationType || normalizedCode.length !== 6) {
        return;
      }

      try {
        const request = {
          email: verificationEmail,
          code: normalizedCode,
        };

        if (verificationType === "register") {
          await verifySignUpCode(request);
        } else {
          await verifySignInCode(request);
        }

        setCode("");
        closeVerificationModal();
        window.setTimeout(() => {
          router.push("/simulacion");
        }, MODAL_EXIT_DURATION_MS);
      } catch {
        // Mantener el modal abierto para que el usuario pueda corregir el codigo.
      }
    },
    [
      closeVerificationModal,
      normalizedCode,
      router,
      verificationEmail,
      verificationType,
      verifySignInCode,
      verifySignUpCode,
    ],
  );

  const handleClose = useCallback(() => {
    setCode("");
    closeVerificationModal();
  }, [closeVerificationModal]);

  return {
    code,
    handleClose,
    handleCodeChange,
    handleSubmit,
    isLoading,
    isReady: Boolean(verificationType),
    isSubmitDisabled: isLoading || normalizedCode.length !== 6,
    title,
  };
};
