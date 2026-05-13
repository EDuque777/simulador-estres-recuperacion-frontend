"use client";

import { ButtonGooeyPurple } from "@/shared/ui/buttons/ButtonGooeyPurple";
import { InputEmail } from "@/shared/ui/inputs/InputEmail";
import { InputPassword } from "@/shared/ui/inputs/InputPassword";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm() {
  const {
    handleResendVerificationCode,
    handleSubmit,
    isLoading,
    isResendingVerificationCode,
    unverifiedEmail,
  } = useLoginForm();

  return (
  <div className="w-full">
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-7.5"
    >
      <InputEmail
        id="email"
        name="email"
        label="Correo electrónico"
        type="email"
        containerStyle="w-full"
      />
      <InputPassword
        id="password"
        name="password"
        label="Contraseña"
        containerStyle="w-full"
      />
      <ButtonGooeyPurple
        type="submit"
        text="Ingresar"
        isLoading={isLoading}
        disabled={isLoading}
        width="w-full z-999"
      />
    </form>
      {unverifiedEmail ? (
        <div
          role="alert"
          aria-live="polite"
          className="mb-7.5 w-full rounded-lg border border-[#8482F5]/30 bg-[#8482F5]/10 px-4 py-3 text-center text-sm font-semibold text-[#5553C7]"
        >
          <p>Tu correo aun no esta verificado.</p>
          <button
            type="button"
            onClick={handleResendVerificationCode}
            disabled={isResendingVerificationCode}
            className="mt-2 cursor-pointer border-0 bg-transparent p-0 text-sm font-bold text-[#8482F5] underline-offset-4 transition-colors hover:text-[#6FCA99] duration-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isResendingVerificationCode ? "Enviando..." : "Reenviar codigo"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
