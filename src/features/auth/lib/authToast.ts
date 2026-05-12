"use client";

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { sileo } from "sileo";

type AuthRequestError = FetchBaseQueryError | SerializedError | undefined;

type AuthErrorBody = {
  message?: string | string[];
  error?: string;
  status?: number;
  statusCode?: number;
};

const translatedMessages: Record<string, string> = {
  "Passwords do not match": "Las contrasenas no coinciden.",
  "Email already registered": "Este correo ya esta registrado.",
  "Error sending verification email":
    "No pudimos enviar el correo de verificacion. Intentalo de nuevo.",
  "Invalid credentials": "Credenciales invalidas. Revisa tu correo y contrasena.",
  "Email not verified": "Tu correo aun no esta verificado.",
  "Invalid verification data": "Los datos de verificacion no son validos.",
  "Email already verified": "Este correo ya fue verificado.",
  "Verification code not found":
    "No se encontro un codigo de verificacion activo.",
  "Verification code expired": "El codigo de verificacion expiro.",
  "Invalid verification code": "El codigo de verificacion no es valido.",
  "Refresh token not found": "No se encontro una sesion activa.",
  "Invalid refresh token": "La sesion expiro o no es valida.",
  "Bad Request": "Revisa los datos ingresados.",
};

const successMessages: Record<string, string> = {
  "User registered successfully":
    "Registro exitoso. Te enviamos un codigo de verificacion.",
  "Verification email sent":
    "Te enviamos un codigo de verificacion al correo.",
  "Sign in code sent": "Te enviamos un codigo para verificar el ingreso.",
  "Email verified successfully": "Correo verificado correctamente.",
  "Sign up verified successfully": "Registro verificado correctamente.",
  "Sign in verified successfully": "Ingreso verificado correctamente.",
  "Password reset email sent":
    "Si el correo existe, enviamos un codigo de recuperacion.",
  "Password reset successfully": "Contrasena actualizada correctamente.",
  "Logged out successfully": "Sesion cerrada correctamente.",
};

const AUTH_SUCCESS_TOAST_DURATION_MS = 3000;
const AUTH_REDIRECT_BUFFER_MS = 400;

export function notifyAuthSuccess(
  title: string,
  backendMessage: string | undefined,
  fallbackDescription: string,
) {
  sileo.clear("top-center");
  sileo.success({
    title,
    description: resolveSuccessMessage(backendMessage, fallbackDescription),
    position: "top-center",
    duration: AUTH_SUCCESS_TOAST_DURATION_MS,
  });
}

export function notifyAuthError(
  title: string,
  error: AuthRequestError,
  fallbackDescription = "No pudimos completar la solicitud. Intentalo de nuevo.",
) {
  sileo.clear("top-center");
  sileo.error({
    title,
    description: resolveErrorMessage(error, fallbackDescription),
    position: "top-center",
    duration: 7000,
  });
}

export function notifyAuthWarning(title: string, description: string) {
  sileo.clear("top-center");
  sileo.warning({
    title,
    description,
    position: "top-center",
    duration: AUTH_SUCCESS_TOAST_DURATION_MS,
  });
}

export function waitForAuthToastToClose() {
  return new Promise<void>((resolve) => {
    window.setTimeout(
      resolve,
      AUTH_SUCCESS_TOAST_DURATION_MS + AUTH_REDIRECT_BUFFER_MS,
    );
  });
}

function resolveSuccessMessage(
  backendMessage: string | undefined,
  fallbackDescription: string,
) {
  if (!backendMessage) {
    return fallbackDescription;
  }

  return successMessages[backendMessage] ?? fallbackDescription;
}

function resolveErrorMessage(
  error: AuthRequestError,
  fallbackDescription: string,
) {
  const messages = getBackendMessages(error);

  if (messages.length > 0) {
    return messages.map(translateMessage).join(" ");
  }

  if (error && isFetchBaseQueryError(error)) {
    return getStatusFallback(error.status, fallbackDescription);
  }

  return error?.message ?? fallbackDescription;
}

function getBackendMessages(error: AuthRequestError) {
  if (!error || !isFetchBaseQueryError(error) || !("data" in error) || !error.data) {
    return [];
  }

  const data = error.data as AuthErrorBody | string | string[];

  if (typeof data === "string") {
    return [data];
  }

  if (Array.isArray(data)) {
    return data;
  }

  const message = data.message;

  if (Array.isArray(message)) {
    return message;
  }

  if (typeof message === "string") {
    return [message];
  }

  if (typeof data.error === "string") {
    return [data.error];
  }

  return [];
}

function translateMessage(message: string) {
  const translatedMessage = translatedMessages[message];

  if (translatedMessage) {
    return translatedMessage;
  }

  return translateValidationMessage(message);
}

function translateValidationMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("should not exist") ||
    normalizedMessage.includes("property ")
  ) {
    return "El formulario contiene campos no permitidos.";
  }

  if (normalizedMessage.includes("email")) {
    return "Ingresa un correo valido de maximo 150 caracteres.";
  }

  if (normalizedMessage.includes("password")) {
    return "La contrasena debe tener entre 8 y 72 caracteres, con mayuscula, minuscula, numero y caracter especial.";
  }

  if (normalizedMessage.includes("code")) {
    return "El codigo debe tener exactamente 6 digitos.";
  }

  if (
    normalizedMessage.includes("firstname") ||
    normalizedMessage.includes("lastname")
  ) {
    return "Nombre y apellido son obligatorios y deben tener maximo 80 caracteres.";
  }

  return "Revisa los datos ingresados.";
}

function getStatusFallback(
  status: FetchBaseQueryError["status"],
  fallbackDescription: string,
) {
  if (status === "FETCH_ERROR") {
    return "No pudimos conectar con el servidor. Verifica que el backend este activo.";
  }

  if (status === "PARSING_ERROR") {
    return "El servidor respondio con un formato inesperado.";
  }

  if (status === "TIMEOUT_ERROR") {
    return "La solicitud tardo demasiado. Intentalo de nuevo.";
  }

  if (status === "CUSTOM_ERROR") {
    return fallbackDescription;
  }

  if (status === 400) {
    return "Revisa los datos ingresados.";
  }

  if (status === 401) {
    return "Tu sesion o credenciales no son validas.";
  }

  if (status >= 500) {
    return "Ocurrio un problema en el servidor. Intentalo mas tarde.";
  }

  return fallbackDescription;
}

function isFetchBaseQueryError(
  error: FetchBaseQueryError | SerializedError,
): error is FetchBaseQueryError {
  return "status" in error;
}
