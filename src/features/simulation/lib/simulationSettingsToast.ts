"use client";

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { sileo } from "sileo";

type SimulationSettingsError = FetchBaseQueryError | SerializedError | undefined;

type SimulationErrorBody = {
  message?: string | string[];
  error?: string;
};

const successMessages: Record<string, string> = {
  "Simulation settings saved successfully":
    "La configuracion del simulador fue guardada correctamente.",
};

export function notifySimulationSettingsSaved(message: string | undefined) {
  sileo.clear("top-center");
  sileo.success({
    title: "Configuracion guardada",
    description:
      message && successMessages[message]
        ? successMessages[message]
        : "La configuracion del simulador fue guardada correctamente.",
    position: "top-center",
    duration: 3000,
  });
}

export function notifySimulationSettingsError(
  error: SimulationSettingsError,
  fallbackDescription = "No pudimos guardar la configuracion. Intentalo de nuevo.",
) {
  sileo.clear("top-center");
  sileo.error({
    title: "Error en la configuracion",
    description: resolveSimulationSettingsError(error, fallbackDescription),
    position: "top-center",
    duration: 7000,
  });
}

function resolveSimulationSettingsError(
  error: SimulationSettingsError,
  fallbackDescription: string,
) {
  const messages = getBackendMessages(error);

  if (messages.length > 0) {
    return messages.map(translateMessage).join(" ");
  }

  if (error && isFetchBaseQueryError(error)) {
    if (error.status === 401) {
      return "Tu sesion expiro. Inicia sesion nuevamente.";
    }

    if (error.status === 400) {
      return "Revisa que todos los valores esten dentro de los rangos permitidos.";
    }

    if (error.status === "FETCH_ERROR") {
      return "No pudimos conectar con el servidor. Verifica que el backend este activo.";
    }

    if (error.status === "TIMEOUT_ERROR") {
      return "La solicitud tardo demasiado. Intentalo de nuevo.";
    }
  }

  if (error && !isFetchBaseQueryError(error) && error.message) {
    return error.message;
  }

  return fallbackDescription;
}

function getBackendMessages(error: SimulationSettingsError) {
  if (!error || !isFetchBaseQueryError(error) || !("data" in error) || !error.data) {
    return [];
  }

  const data = error.data as SimulationErrorBody | string | string[];

  if (typeof data === "string") {
    return [data];
  }

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.message)) {
    return data.message;
  }

  if (typeof data.message === "string") {
    return [data.message];
  }

  if (typeof data.error === "string") {
    return [data.error];
  }

  return [];
}

function translateMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("initialstress")) {
    return "El estres inicial debe estar entre 0 y 100.";
  }

  if (normalizedMessage.includes("externalpressure")) {
    return "La presion externa debe estar entre 0 y 4.";
  }

  if (normalizedMessage.includes("recoveryrate")) {
    return "La capacidad de recuperacion debe estar entre 0.01 y 0.2.";
  }

  if (normalizedMessage.includes("duration")) {
    return "El tiempo de simulacion debe estar entre 10 y 240 minutos.";
  }

  if (normalizedMessage.includes("timestep")) {
    return "El intervalo de tiempo debe estar entre 1 y 10 minutos.";
  }

  if (
    normalizedMessage.includes("should not exist") ||
    normalizedMessage.includes("property ")
  ) {
    return "La solicitud contiene campos no permitidos.";
  }

  return "Revisa que todos los valores esten dentro de los rangos permitidos.";
}

function isFetchBaseQueryError(
  error: FetchBaseQueryError | SerializedError,
): error is FetchBaseQueryError {
  return "status" in error;
}
