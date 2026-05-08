import type {
  SimulationParameters,
  SimulationResult,
  StressPoint,
  StressRiskLevel,
} from "../types/stressSimulation.types";

export const DEFAULT_SIMULATION_PARAMETERS: SimulationParameters = {
  initialStress: 60,
  externalPressure: 1.2,
  recoveryRate: 0.04,
  duration: 60,
  timeStep: 1,
};

const MIN_STRESS = 0;
const MAX_STRESS = 100;

export function simulateStressRecovery(
  parameters: SimulationParameters,
): SimulationResult {
  const initialStress = clampStress(parameters.initialStress);
  const duration = Math.max(parameters.duration, parameters.timeStep);
  const timeStep = Math.max(parameters.timeStep, 0.1);
  const points: StressPoint[] = [
    createPoint(0, initialStress, parameters),
  ];

  let currentStress = initialStress;
  let currentTime = 0;

  while (currentTime < duration) {
    const nextTime = Math.min(currentTime + timeStep, duration);
    const deltaTime = nextTime - currentTime;
    const derivative = calculateStressDerivative(currentStress, parameters);
    const nextStress = clampStress(currentStress + deltaTime * derivative);

    points.push(createPoint(nextTime, nextStress, parameters));
    currentStress = nextStress;
    currentTime = nextTime;
  }

  const stressValues = points.map((point) => point.stress);
  const finalStress = stressValues[stressValues.length - 1] ?? initialStress;
  const peakStress = Math.max(...stressValues);
  const lowestStress = Math.min(...stressValues);
  const equilibriumStress = clampStress(
    parameters.externalPressure / parameters.recoveryRate,
  );
  const riskLevel = getStressRiskLevel(finalStress);
  const trend = getStressTrend(initialStress, finalStress);

  return {
    points,
    finalStress: round(finalStress),
    initialStress: round(initialStress),
    peakStress: round(peakStress),
    lowestStress: round(lowestStress),
    equilibriumStress: round(equilibriumStress),
    riskLevel,
    trend,
    interpretation: buildInterpretation(riskLevel, trend, finalStress),
  };
}

export function calculateStressDerivative(
  stress: number,
  parameters: Pick<SimulationParameters, "externalPressure" | "recoveryRate">,
) {
  return parameters.externalPressure - parameters.recoveryRate * stress;
}

export function getStressRiskLevel(stress: number): StressRiskLevel {
  if (stress >= 70) {
    return "high";
  }

  if (stress >= 40) {
    return "moderate";
  }

  return "low";
}

function createPoint(
  time: number,
  stress: number,
  parameters: SimulationParameters,
): StressPoint {
  return {
    time: round(time),
    stress: round(stress),
    derivative: round(calculateStressDerivative(stress, parameters)),
  };
}

function getStressTrend(
  initialStress: number,
  finalStress: number,
): SimulationResult["trend"] {
  const difference = finalStress - initialStress;

  if (Math.abs(difference) < 2) {
    return "stable";
  }

  return difference > 0 ? "increasing" : "decreasing";
}

function buildInterpretation(
  riskLevel: StressRiskLevel,
  trend: SimulationResult["trend"],
  finalStress: number,
) {
  if (riskLevel === "high") {
    return `El modelo estima un cierre alto (${round(finalStress)}%). La presion externa domina a la recuperacion y conviene reducir carga o aumentar descanso.`;
  }

  if (riskLevel === "moderate") {
    return trend === "decreasing"
      ? `El estres baja hasta ${round(finalStress)}%, pero todavia queda en zona moderada. La recuperacion ayuda, aunque no alcanza un rango bajo en este periodo.`
      : `El estres queda en ${round(finalStress)}%, una zona moderada. El sistema necesita mas recuperacion o menor presion externa para estabilizarse mejor.`;
  }

  return trend === "increasing"
    ? `El resultado final es bajo (${round(finalStress)}%), aunque la tendencia sube. Es buena idea vigilar si la presion se mantiene por mas tiempo.`
    : `El resultado final es bajo (${round(finalStress)}%). La recuperacion supera la presion externa y el sistema converge hacia un estado saludable.`;
}

function clampStress(value: number) {
  if (!Number.isFinite(value)) {
    return MIN_STRESS;
  }

  return Math.min(MAX_STRESS, Math.max(MIN_STRESS, value));
}

function round(value: number) {
  return Number(value.toFixed(2));
}
