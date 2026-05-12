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
  const equilibriumStress = clampStress(
    parameters.externalPressure / parameters.recoveryRate,
  );
  const points: StressPoint[] = [
    createPoint(0, initialStress, initialStress, parameters),
  ];

  let currentStress = initialStress;
  let currentTime = 0;

  while (currentTime < duration) {
    const nextTime = Math.min(currentTime + timeStep, duration);
    const deltaTime = nextTime - currentTime;
    const derivative = calculateStressDerivative(currentStress, parameters);
    const nextStress = clampStress(currentStress + deltaTime * derivative);

    points.push(createPoint(nextTime, nextStress, initialStress, parameters));
    currentStress = nextStress;
    currentTime = nextTime;
  }

  const stressValues = points.map((point) => point.stress);
  const errorValues = points.map((point) => point.error);
  const finalStress = stressValues[stressValues.length - 1] ?? initialStress;
  const exactFinalStress =
    points[points.length - 1]?.exactStress ?? initialStress;
  const finalError = Math.abs(finalStress - exactFinalStress);
  const maxError = Math.max(...errorValues);
  const peakStress = Math.max(...stressValues);
  const lowestStress = Math.min(...stressValues);
  const riskLevel = getStressRiskLevel(finalStress);
  const trend = getStressTrend(initialStress, finalStress);

  return {
    points,
    finalStress: round(finalStress),
    exactFinalStress: round(exactFinalStress),
    finalError: round(finalError),
    maxError: round(maxError),
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

export function calculateExactStress(
  time: number,
  parameters: Pick<
    SimulationParameters,
    "externalPressure" | "recoveryRate"
  >,
  initialStress: number,
) {
  const equilibriumStress = parameters.externalPressure / parameters.recoveryRate;
  const exactStress =
    equilibriumStress +
    (initialStress - equilibriumStress) *
      Math.exp(-parameters.recoveryRate * time);

  return clampStress(exactStress);
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
  initialStress: number,
  parameters: SimulationParameters,
): StressPoint {
  const exactStress = calculateExactStress(time, parameters, initialStress);

  return {
    time: round(time),
    stress: round(stress),
    exactStress: round(exactStress),
    error: round(Math.abs(stress - exactStress)),
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
