"use client";

import React from "react";
import { InputEmail } from "@/shared/ui/inputs/InputEmail";
import { InputPassword } from "@/shared/ui/inputs/InputPassword";
import { ButtonGooeyPurple } from "@/shared/ui/buttons/ButtonGooeyPurple";

export function LoginForm() {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Enviando login");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-7.5"
    >
      <InputEmail
        id="email"
        name="email"
        label="Correo electrónico"
        type="email"
        containerStyle="w-full"
        required={false}
      />
      <InputPassword
        id="password"
        name="password"
        label="Contraseña"
        containerStyle="w-full"
        required={false}
      />
      <ButtonGooeyPurple
        type="submit"
        text="Ingresar"
        onClick={() => {}}
        width="w-full z-999"
      />
    </form>
  );
}
