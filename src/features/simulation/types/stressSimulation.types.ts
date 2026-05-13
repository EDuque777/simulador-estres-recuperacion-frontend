export type StressRiskLevel = "low" | "moderate" | "high";

export type SimulationParameters = {
  initialStress: number;
  externalPressure: number;
  recoveryRate: number;
  duration: number;
  timeStep: number;
};

export type SimulationSettings = SimulationParameters & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type SimulationSettingsResponse = {
  status: number;
  message: string;
  settings: SimulationSettings;
};

export type StressPoint = {
  time: number;
  stress: number;
  exactStress: number;
  error: number;
  derivative: number;
};

export type SimulationResult = {
  points: StressPoint[];
  finalStress: number;
  exactFinalStress: number;
  finalError: number;
  maxError: number;
  initialStress: number;
  peakStress: number;
  lowestStress: number;
  equilibriumStress: number;
  riskLevel: StressRiskLevel;
  trend: "decreasing" | "stable" | "increasing";
  interpretation: string;
};
