"use client";

import { ButtonGooeyPurple } from "@/shared/ui/buttons/ButtonGooeyPurple";
import { InputEmail } from "@/shared/ui/inputs/InputEmail";
import { InputPassword } from "@/shared/ui/inputs/InputPassword";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm() {
  const { handleSubmit, isLoading } = useLoginForm();

  return (
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
  );
}
