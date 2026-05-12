"use client";

import { ButtonGooeyPurple } from "@/shared/ui/buttons/ButtonGooeyPurple";
import { InputEmail } from "@/shared/ui/inputs/InputEmail";
import { InputPassword } from "@/shared/ui/inputs/InputPassword";
import { InputText } from "@/shared/ui/inputs/InputText";
import { PasswordMatchMessage } from "@/shared/ui/passwordStrength/PasswordMatchMessage";
import { PasswordRequirements } from "@/shared/ui/passwordStrength/PasswordRequirements";
import { PasswordStrengthBar } from "@/shared/ui/passwordStrength/PasswordStrengthBar";
import { useSignUpForm } from "../hooks/useSignUpForm";

export function SignUpForm() {
  const { handleSubmit, isLoading, passwordValidation } = useSignUpForm();
  const {
    confirmPassword,
    handleConfirmPasswordChange,
    handlePasswordChange,
    isPasswordValid,
    password,
    passwordsMatch,
    requirements,
    strength,
  } = passwordValidation;
  const isPasswordInvalid = password.length > 0 && !isPasswordValid;
  const isConfirmPasswordInvalid =
    confirmPassword.length > 0 && !passwordsMatch;

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
      <div className="w-full">
        <InputPassword
          id="password"
          name="password"
          label="Contraseña"
          containerStyle="w-full"
          autoComplete="new-password"
          value={password}
          onChange={handlePasswordChange}
          error={isPasswordInvalid}
          aria-invalid={isPasswordInvalid}
          aria-describedby="sign-up-password-requirements sign-up-password-strength"
        />
        <PasswordRequirements
          id="sign-up-password-requirements"
          requirements={requirements}
          className="mt-3"
        />
        <PasswordStrengthBar
          id="sign-up-password-strength"
          strength={strength}
          className="mt-3"
        />
      </div>
      <div className="w-full">
        <InputPassword
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar Contraseña"
          containerStyle="w-full"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={isConfirmPasswordInvalid}
          aria-invalid={isConfirmPasswordInvalid}
          aria-describedby="sign-up-password-match"
        />
        <PasswordMatchMessage
          id="sign-up-password-match"
          confirmPassword={confirmPassword}
          passwordsMatch={passwordsMatch}
          className="mt-2"
        />
      </div>
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
