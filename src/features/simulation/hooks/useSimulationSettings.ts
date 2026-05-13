"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  useGetSimulationSettingsQuery,
  useUpdateSimulationSettingsMutation,
} from "../api/simulationSettingsApi";
import {
  notifySimulationSettingsError,
  notifySimulationSettingsSaved,
} from "../lib/simulationSettingsToast";
import type {
  SimulationParameters,
  SimulationSettings,
} from "../types/stressSimulation.types";

function getParametersFromSettings(
  settings: SimulationSettings,
): SimulationParameters {
  return {
    initialStress: settings.initialStress,
    externalPressure: settings.externalPressure,
    recoveryRate: settings.recoveryRate,
    duration: settings.duration,
    timeStep: settings.timeStep,
  };
}

export const useSimulationSettings = () => {
  const hasShownLoadError = useRef(false);
  const {
    data: loadedSettings,
    error: settingsError,
    isLoading: isLoadingSettings,
  } = useGetSimulationSettingsQuery();
  const [updateSimulationSettings, { isLoading: isSavingSettings }] =
    useUpdateSimulationSettingsMutation();

  useEffect(() => {
    if (!settingsError || hasShownLoadError.current) {
      return;
    }

    hasShownLoadError.current = true;
    notifySimulationSettingsError(
      settingsError,
      "No pudimos cargar la configuracion guardada. Usaremos los valores iniciales.",
    );
  }, [settingsError]);

  const saveSimulationSettings = useCallback(
    async (parameters: SimulationParameters) => {
      const result = await updateSimulationSettings(parameters);

      if ("error" in result) {
        notifySimulationSettingsError(result.error);
        return null;
      }

      const nextParameters = getParametersFromSettings(result.data.settings);

      notifySimulationSettingsSaved(result.data.message);

      return nextParameters;
    },
    [updateSimulationSettings],
  );

  return {
    loadedSettings,
    isLoadingSettings,
    isSavingSettings,
    saveSimulationSettings,
  };
};
