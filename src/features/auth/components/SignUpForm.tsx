"use client";

import React from "react";
import { InputText } from "@/shared/ui/inputs/InputText";
import { InputEmail } from "@/shared/ui/inputs/InputEmail";
import { InputPassword } from "@/shared/ui/inputs/InputPassword";
import { ButtonGooeyPurple } from "@/shared/ui/buttons/ButtonGooeyPurple";

export function SignUpForm() {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Enviando login");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-7.5"
    >
      <InputText
        id="name"
        name="name"
        label="Nombre"
        type="text"
        containerStyle="w-full"
        required={false}
      />
      <InputText
        id="lastName"
        name="lastName"
        label="Apellido"
        type="text"
        containerStyle="w-full"
        required={false}
      />
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
      <InputPassword
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmar Contraseña"
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
