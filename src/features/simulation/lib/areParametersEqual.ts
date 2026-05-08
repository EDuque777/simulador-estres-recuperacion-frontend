import type {
  SimulationParameters,
} from "../types/stressSimulation.types";

export function areParametersEqual(
  firstParameters: SimulationParameters,
  secondParameters: SimulationParameters,
) {
  return (
    firstParameters.initialStress === secondParameters.initialStress &&
    firstParameters.externalPressure === secondParameters.externalPressure &&
    firstParameters.recoveryRate === secondParameters.recoveryRate &&
    firstParameters.duration === secondParameters.duration
  );
}