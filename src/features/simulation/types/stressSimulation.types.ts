export type StressRiskLevel = "low" | "moderate" | "high";

export type SimulationParameters = {
  initialStress: number;
  externalPressure: number;
  recoveryRate: number;
  duration: number;
  timeStep: number;
};

export type StressPoint = {
  time: number;
  stress: number;
  derivative: number;
};

export type SimulationResult = {
  points: StressPoint[];
  finalStress: number;
  initialStress: number;
  peakStress: number;
  lowestStress: number;
  equilibriumStress: number;
  riskLevel: StressRiskLevel;
  trend: "decreasing" | "stable" | "increasing";
  interpretation: string;
};
