"use client";

import React from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { ButtonGooeyGreen } from "@/shared/ui/buttons/ButtonGooeyGreen";
import { ButtonGooeyPurple } from "@/shared/ui/buttons/ButtonGooeyPurple";
import { InputEmail } from "@/shared/ui/inputs/InputEmail";
import { InputPassword } from "@/shared/ui/inputs/InputPassword";
import { InputText } from "@/shared/ui/inputs/InputText";
import { usePasswordResetFlow } from "../hooks/usePasswordResetFlow";
import { useVerificationCodeForm } from "../hooks/useVerificationCodeForm";
import {
  type FlowDirection,
  type PasswordResetStep,
  useAuthFlowStore,
} from "../stores/authFlowStore";

type ModalShellProps = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
};

const modalTransition: Transition = {
  duration: 0.36,
  ease: "easeOut",
};

const stepTransition: Transition = {
  duration: 0.42,
  ease: "easeOut",
};

const stepVariants = {
  enter: (direction: FlowDirection) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: FlowDirection) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    filter: "blur(4px)",
  }),
};

function ModalShell({ children, onClose, title }: ModalShellProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.34, ease: "easeOut" }}
    >
      <motion.section
        className="relative w-full max-w-125 overflow-hidden rounded-[20px] bg-white p-8 text-black shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.97, y: 12, filter: "blur(8px)" }}
        transition={modalTransition}
      >
        <button
          type="button"
          aria-label="Cerrar modal"
          onClick={onClose}
          className="absolute right-5 top-4 cursor-pointer text-xl font-bold text-gray-400 transition-colors hover:text-[#8482F5]"
        >
          x
        </button>
        <h2 className="mb-2 text-center text-[28px] font-bold leading-tight text-[#8482F5]">
          {title}
        </h2>
        {children}
      </motion.section>
    </motion.div>
  );
}

type SlidingStepProps = {
  children: React.ReactNode;
  direction: FlowDirection;
  stepKey: PasswordResetStep;
};

function SlidingStep({ children, direction, stepKey }: SlidingStepProps) {
  return (
    <div className="overflow-hidden">
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <motion.div
          key={stepKey}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={stepTransition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type PasswordResetFlow = ReturnType<typeof usePasswordResetFlow>;

function VerificationCodeModal() {
  const {
    code,
    handleClose,
    handleCodeChange,
    handleSubmit,
    isLoading,
    isReady,
    isSubmitDisabled,
    title,
  } = useVerificationCodeForm();

  if (!isReady) {
    return null;
  }

  return (
    <ModalShell onClose={handleClose} title={title}>
      <form noValidate onSubmit={handleSubmit} className="mt-7 flex flex-col gap-7">
        <InputText
          id="auth-verification-code"
          name="code"
          label="Codigo de verificacion"
          type="text"
          containerStyle="w-full"
          autoComplete="one-time-code"
          value={code}
          onChange={handleCodeChange}
        />
        <ButtonGooeyPurple
          type="submit"
          text={isLoading ? "Verificando" : "Verificar"}
          disabled={isSubmitDisabled}
          width="w-full z-999"
        />
      </form>
    </ModalShell>
  );
}

function PasswordResetEmailStep({ flow }: { flow: PasswordResetFlow }) {
  const { handleEmailSubmit, isSendingCode } = flow;

  return (
    <form noValidate onSubmit={handleEmailSubmit} className="mt-7 flex flex-col gap-7">
      <InputEmail
        id="password-reset-email"
        name="email"
        label="Correo electronico"
        type="email"
        containerStyle="w-full"
      />
      <ButtonGooeyPurple
        type="submit"
        text={isSendingCode ? "Enviando" : "Enviar codigo"}
        disabled={isSendingCode}
        width="w-full z-999"
      />
    </form>
  );
}

function PasswordResetCodeStep({ flow }: { flow: PasswordResetFlow }) {
  const {
    handleCodeChange,
    handleResendCode,
    handleTryAnotherEmail,
    isSendingCode,
    passwordResetCode,
  } = flow;

  return (
    <div className="mt-7 flex flex-col gap-7">
      <InputText
        id="password-reset-code"
        name="code"
        label="Codigo de verificacion"
        type="text"
        containerStyle="w-full"
        autoComplete="one-time-code"
        value={passwordResetCode}
        onChange={handleCodeChange}
      />
      <div className="flex flex-col gap-3">
        <ButtonGooeyGreen
          type="button"
          text="Probar con otro correo"
          onClick={handleTryAnotherEmail}
          disabled={isSendingCode}
          width="w-full z-999"
        />
        <ButtonGooeyPurple
          type="button"
          text={isSendingCode ? "Enviando" : "Reenviar codigo"}
          onClick={handleResendCode}
          disabled={isSendingCode}
          width="w-full z-999"
        />
      </div>
    </div>
  );
}

function PasswordResetPasswordStep({ flow }: { flow: PasswordResetFlow }) {
  const {
    handleChangeCode,
    handlePasswordSubmit,
    isResettingPassword,
  } = flow;

  return (
    <form noValidate onSubmit={handlePasswordSubmit} className="mt-7 flex flex-col gap-7">
      <InputPassword
        id="password-reset-new-password"
        name="newPassword"
        label="Nueva contrasena"
        containerStyle="w-full"
        autoComplete="new-password"
        required
      />
      <InputPassword
        id="password-reset-confirm-password"
        name="confirmPassword"
        label="Confirmar nueva contrasena"
        containerStyle="w-full"
        autoComplete="new-password"
        required
      />
      <ButtonGooeyPurple
        type="submit"
        text={isResettingPassword ? "Cambiando" : "Cambiar contrasena"}
        disabled={isResettingPassword}
        width="w-full z-999"
      />
      <button
        type="button"
        onClick={handleChangeCode}
        className="mx-auto cursor-pointer border-0 bg-transparent p-0 text-sm font-bold text-[#8482F5]"
      >
        Cambiar codigo
      </button>
    </form>
  );
}

function PasswordResetModal() {
  const flow = usePasswordResetFlow();
  const {
    closePasswordResetModal,
    passwordResetDirection,
    passwordResetStep,
    title,
  } = flow;

  return (
    <ModalShell
      onClose={closePasswordResetModal}
      title={title}
    >
      <SlidingStep
        direction={passwordResetDirection}
        stepKey={passwordResetStep}
      >
        {passwordResetStep === "email" ? (
          <PasswordResetEmailStep flow={flow} />
        ) : null}
        {passwordResetStep === "code" ? (
          <PasswordResetCodeStep flow={flow} />
        ) : null}
        {passwordResetStep === "password" ? (
          <PasswordResetPasswordStep flow={flow} />
        ) : null}
      </SlidingStep>
    </ModalShell>
  );
}

export function AuthFlowModals() {
  const isPasswordResetModalOpen = useAuthFlowStore(
    (state) => state.isPasswordResetModalOpen,
  );
  const isVerificationModalOpen = useAuthFlowStore(
    (state) => state.isVerificationModalOpen,
  );
  const resetPasswordResetModal = useAuthFlowStore(
    (state) => state.resetPasswordResetModal,
  );
  const resetVerificationModal = useAuthFlowStore(
    (state) => state.resetVerificationModal,
  );

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={resetVerificationModal}>
        {isVerificationModalOpen ? (
          <VerificationCodeModal key="verification-code-modal" />
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait" onExitComplete={resetPasswordResetModal}>
        {isPasswordResetModalOpen ? (
          <PasswordResetModal key="password-reset-modal" />
        ) : null}
      </AnimatePresence>
    </>
  );
}
