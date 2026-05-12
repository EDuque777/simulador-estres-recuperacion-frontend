"use client";

import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { usePasswordPairValidation } from "@/shared/ui/passwordStrength/usePasswordPairValidation";
import { getFormValue } from "../lib/getFormValue";
import { waitForAuthToastToClose } from "../lib/authToast";
import {
  type PasswordResetStep,
  useAuthFlowStore,
} from "../stores/authFlowStore";
import { useForgotPassword } from "./useForgotPassword";
import { useResetPassword } from "./useResetPassword";

const getPasswordResetTitle = (step: PasswordResetStep) => {
  if (step === "code") {
    return "Codigo de recuperacion";
  }

  if (step === "password") {
    return "Nueva contrasena";
  }

  return "Restablecer contrasena";
};

export const usePasswordResetFlow = () => {
  const router = useRouter();
  const { forgotPassword, isLoading: isSendingCode } = useForgotPassword();
  const { resetPassword, isLoading: isResettingPassword } = useResetPassword();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const passwordValidation = usePasswordPairValidation();
  const {
    confirmPassword,
    isPairValid,
    password: newPassword,
  } = passwordValidation;
  const {
    closePasswordResetModal,
    passwordResetCode,
    passwordResetDirection,
    passwordResetEmail,
    passwordResetStep,
    setPasswordResetCode,
    setPasswordResetEmail,
    setPasswordResetStep,
  } = useAuthFlowStore();

  const handleEmailSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const email = getFormValue(formData, "email");

      if (!email) {
        return;
      }

      try {
        await forgotPassword({ email });
        setPasswordResetEmail(email);
        setPasswordResetStep("code", 1);
      } catch {
        // Mantener el paso actual para reintentar sin mostrar mensajes aun.
      }
    },
    [forgotPassword, setPasswordResetEmail, setPasswordResetStep],
  );

  const handleCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const code = event.target.value.trim();

      setPasswordResetCode(code);

      if (code.length === 6) {
        setPasswordResetStep("password", 1);
      }
    },
    [setPasswordResetCode, setPasswordResetStep],
  );

  const handleTryAnotherEmail = useCallback(() => {
    setPasswordResetEmail("");
    setPasswordResetCode("");
    setPasswordResetStep("email", -1);
  }, [setPasswordResetCode, setPasswordResetEmail, setPasswordResetStep]);

  const handleResendCode = useCallback(async () => {
    if (!passwordResetEmail) {
      return;
    }

    try {
      await forgotPassword({ email: passwordResetEmail });
    } catch {
      // Dejar el usuario en el mismo paso para poder reintentar.
    }
  }, [forgotPassword, passwordResetEmail]);

  const handlePasswordSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!passwordResetEmail || !passwordResetCode) {
        setPasswordResetStep("email", -1);
        return;
      }

      if (!newPassword || !confirmPassword || !isPairValid) {
        return;
      }

      try {
        setIsRedirecting(true);
        await resetPassword({
          email: passwordResetEmail,
          code: passwordResetCode,
          newPassword,
          confirmPassword,
        });

        await waitForAuthToastToClose();
        closePasswordResetModal();
        router.push("/");
      } catch {
        setIsRedirecting(false);
        // Mantener este paso para corregir contrasenas o volver a cambiar codigo.
      }
    },
    [
      closePasswordResetModal,
      confirmPassword,
      isPairValid,
      newPassword,
      passwordResetCode,
      passwordResetEmail,
      resetPassword,
      router,
      setPasswordResetStep,
    ],
  );

  const handleChangeCode = useCallback(() => {
    setPasswordResetCode("");
    setPasswordResetStep("code", -1);
  }, [setPasswordResetCode, setPasswordResetStep]);

  return {
    closePasswordResetModal,
    handleChangeCode,
    handleCodeChange,
    handleEmailSubmit,
    handlePasswordSubmit,
    handleResendCode,
    handleTryAnotherEmail,
    isResettingPassword: isResettingPassword || isRedirecting,
    isSendingCode,
    passwordResetCode,
    passwordResetDirection,
    passwordResetStep,
    passwordValidation,
    title: getPasswordResetTitle(passwordResetStep),
  };
};
