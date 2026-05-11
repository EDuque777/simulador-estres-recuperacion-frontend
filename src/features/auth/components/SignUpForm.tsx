"use client";

import { ButtonGooeyPurple } from "@/shared/ui/buttons/ButtonGooeyPurple";
import { InputEmail } from "@/shared/ui/inputs/InputEmail";
import { InputPassword } from "@/shared/ui/inputs/InputPassword";
import { InputText } from "@/shared/ui/inputs/InputText";
import { useSignUpForm } from "../hooks/useSignUpForm";

export function SignUpForm() {
  const { handleSubmit, isLoading } = useSignUpForm();

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-7.5"
    >
      <InputText
        id="firstName"
        name="firstName"
        label="Nombre"
        type="text"
        autoComplete="given-name"
        containerStyle="w-full"
      />
      <InputText
        id="lastName"
        name="lastName"
        label="Apellido"
        type="text"
        autoComplete="family-name"
        containerStyle="w-full"
      />
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
        autoComplete="new-password"
      />
      <InputPassword
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmar Contraseña"
        containerStyle="w-full"
        autoComplete="new-password"
      />
      <ButtonGooeyPurple
        type="submit"
        text={isLoading ? "Enviando" : "Ingresar"}
        disabled={isLoading}
        width="w-full z-999"
      />
    </form>
  );
}
