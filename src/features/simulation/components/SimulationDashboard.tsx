"use client";

import { useMemo, useState } from "react";
import {
  FiActivity,
  FiInfo,
  FiSliders,
  FiTarget,
  FiTrendingDown,
} from "react-icons/fi";
import { ParameterSlider } from "./ParameterSlider";
import { StressEvolutionChart } from "./StressEvolutionChart";
import { StressGauge } from "./StressGauge";
import {
  DEFAULT_SIMULATION_PARAMETERS,
  simulateStressRecovery,
} from "../lib/stressSimulation";
import type {
  SimulationParameters,
  StressRiskLevel,
} from "../types/stressSimulation.types";
import SplitText from "@/shared/ui/animateText/SplitText";
import TextType from "@/shared/ui/animateText/TextType";
import { ButtonGooeyPurple } from "@/shared/ui/buttons/ButtonGooeyPurple";
import { ButtonGooeyGreen } from "@/shared/ui/buttons/ButtonGooeyGreen";
import { IoWarningOutline } from "react-icons/io5";
import { BsClipboardData } from "react-icons/bs";
import { MetricCard } from "./MetricCard";
import { areParametersEqual } from "../lib/areParametersEqual";
import { AnimatePresence, motion } from "motion/react";

type EditableParameter = keyof Pick<
  SimulationParameters,
  "initialStress" | "externalPressure" | "recoveryRate" | "duration"
>;

type RiskPresentation = {
  label: string;
  helper: string;
  badgeClassName: string;
  dotClassName: string;
};

const riskPresentation: Record<StressRiskLevel, RiskPresentation> = {
  low: {
    label: "Bajo",
    helper: "Tu nivel de estres esta en un rango saludable.",
    badgeClassName: "bg-[#e4f6ea] text-[#7CCA9E]",
    dotClassName: "bg-[#62be7e]",
  },
  moderate: {
    label: "Moderado",
    helper: "Hay carga acumulada; la recuperacion todavia necesita espacio.",
    badgeClassName: "bg-[#fff3d8] text-[#c58318]",
    dotClassName: "bg-[#e5a72d]",
  },
  high: {
    label: "Alto",
    helper: "El sistema muestra acumulacion fuerte de estres.",
    badgeClassName: "bg-[#ffe6e2] text-[#dc4f42]",
    dotClassName: "bg-[#ef6958]",
  },
};

export function SimulationDashboard() {
  const [parameters, setParameters] = useState<SimulationParameters>(
    DEFAULT_SIMULATION_PARAMETERS,
  );
  const [draftParameters, setDraftParameters] = useState<SimulationParameters>(
    DEFAULT_SIMULATION_PARAMETERS,
  );
  const result = useMemo(
    () => simulateStressRecovery(parameters),
    [parameters],
  );
  const risk = riskPresentation[result.riskLevel];
  const hasPendingChanges = !areParametersEqual(parameters, draftParameters);

  const updateDraftParameter = (key: EditableParameter, value: number) => {
    setDraftParameters((currentParameters) => ({
      ...currentParameters,
      [key]: value,
    }));
  };

  const runSimulation = () => {
    setParameters(draftParameters);
  };

  const resetSimulation = () => {
    setParameters(DEFAULT_SIMULATION_PARAMETERS);
    setDraftParameters(DEFAULT_SIMULATION_PARAMETERS);
  };

  return (
    <main className="rounded-[20px] bg-white shadow-2xl w-full flex flex-col justify-center items-center">
      <div className="w-full overflow-hidden">
        <div className="w-full">
          <section className="p-7.5">
            <header className="mb-5 flex items-center justify-start gap-4">
              <div className="flex flex-col md:flex-row items-center gap-5">
                <FiActivity className=" mr-auto w-15 h-15 p-3.75 shrink-0 text-[30px] rounded-full bg-[#e9f8ed] text-[#7CCA9E]" />
                <div className="flex flex-col w-full">
                  <SplitText
                    text="Simulador"
                    className="text-[35px] md:text-[40px] font-bold text-center leading-tight text-[#8482F5]"
                    delay={50}
                    duration={1.25}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                  />
                  <TextType
                    text={[
                      "Visualiza y simula tu nivel de estres",
                      "Analiza tu recuperación",
                      "Explora distintos escenarios",
                    ]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="_"
                    deletingSpeed={50}
                    variableSpeed={{ min: 60, max: 120 }}
                    cursorBlinkDuration={0.5}
                    className="text-left leading-snug text-gray-400 font-semibold"
                  />
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-5">
              <div className="flex flex-col gap-5">
                <section className="rounded-[20px] p-7.5 bg-white shadow-2xl">
                  <StressGauge
                    helper={risk.helper}
                    label={risk.label}
                    riskLevel={result.riskLevel}
                    value={result.finalStress}
                  />
                </section>

                <section className="rounded-[20px] p-7.5 bg-white shadow-2xl">
                  <div className="mb-5 flex">
                    <SplitText
                      text="Evolucion del Estres"
                      className="text-[18px] md:text-[20px] font-bold text-center leading-tight text-[#8482F5]"
                      delay={50}
                      duration={1.25}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="left"
                    />
                  </div>
                  <StressEvolutionChart
                    duration={parameters.duration}
                    equilibriumStress={result.equilibriumStress}
                    points={result.points}
                  />
                </section>
              </div>

              <aside className="flex flex-col gap-5">
                <section className="rounded-[20px] p-7.5 bg-white shadow-2xl">
                  <div className="mb-7 flex flex-col items-start justify-start gap-3">
                    <div className="flex items-center gap-3">
                      {/* <FiSliders className="text-[#536dfe]" size={24} /> */}
                      <FiSliders className=" mr-auto w-10 h-10 p-2.5 shrink-0 text-[30px] rounded-full bg-[#e9f8ed] text-[#7CCA9E]" />
                      <SplitText
                        text="Parametros de Simulacion"
                        className="text-[18px] md:text-[20px] font-bold text-center leading-tight text-[#8482F5]"
                        delay={50}
                        duration={1.25}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="left"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <ParameterSlider
                      accentColor="bg-green-600"
                      helper="S(0), valor inicial de la variable dependiente."
                      id="initialStress"
                      label="Estres inicial"
                      max={100}
                      min={0}
                      onChange={(value) =>
                        updateDraftParameter("initialStress", value)
                      }
                      step={1}
                      unit="%"
                      value={draftParameters.initialStress}
                    />
                    <ParameterSlider
                      accentColor="bg-yellow-600"
                      decimals={1}
                      helper="a, presion externa que aumenta el estres por minuto."
                      id="externalPressure"
                      label="Presion externa"
                      max={4}
                      min={0}
                      onChange={(value) =>
                        updateDraftParameter("externalPressure", value)
                      }
                      step={0.1}
                      unit="pts/min"
                      value={draftParameters.externalPressure}
                    />
                    <ParameterSlider
                      accentColor="bg-purple-600"
                      decimals={2}
                      helper="b, capacidad de recuperacion del sistema."
                      id="recoveryRate"
                      label="Capacidad de recuperacion"
                      max={0.2}
                      min={0.01}
                      onChange={(value) =>
                        updateDraftParameter("recoveryRate", value)
                      }
                      step={0.01}
                      unit="1/min"
                      value={draftParameters.recoveryRate}
                    />
                    <ParameterSlider
                      accentColor="bg-blue-600"
                      helper="Horizonte temporal usado por el metodo de Euler."
                      id="duration"
                      label="Tiempo de simulacion"
                      max={240}
                      min={10}
                      onChange={(value) =>
                        updateDraftParameter("duration", value)
                      }
                      step={5}
                      unit="min"
                      value={draftParameters.duration}
                    />
                  </div>

                  <div className="mt-7 space-y-3 flex flex-col justify-center items-center">
                    <ButtonGooeyPurple
                      type="button"
                      text="Simular"
                      onClick={runSimulation}
                      width="w-full z-999"
                    />
                    <ButtonGooeyGreen
                      type="button"
                      text="Reiniciar"
                      onClick={resetSimulation}
                      width="w-full z-999"
                    />
                    {/* {hasPendingChanges ? (
                      <span className="rounded-full bg-[#eef3ff] px-3 py-1 text-[14px] font-extrabold text-blue-600">
                        Se encontraron cambios
                      </span>
                    ) : null} */}
                    <AnimatePresence initial={false}>
                      {hasPendingChanges ? (
                        <motion.span
                          key="pending-changes"
                          layout
                          initial={{
                            opacity: 0,
                            y: -8,
                            scale: 0.96,
                            filter: "blur(4px)",
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            opacity: 0,
                            y: -8,
                            scale: 0.96,
                            filter: "blur(4px)",
                          }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="rounded-full bg-[#eef3ff] px-3 py-1 text-[14px] font-extrabold text-blue-600"
                        >
                          Se encontraron cambios
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </section>
              </aside>
            </div>

            <section className="mt-5 grid gap-5 md:grid-cols-3">
              <MetricCard
                Icon={FiTarget}
                label="Nivel final estimado"
                value={`${Math.round(result.finalStress)}%`}
                detail="Resultado numerico de Euler"
              />
              <MetricCard
                Icon={FiTrendingDown}
                label="Equilibrio teorico"
                value={`${Math.round(result.equilibriumStress)}%`}
                detail="Aproximacion a / b"
              />
              <div className="rounded-[20px] bg-white p-5 shadow-2xl">
                <div className="mb-1 flex items-center justify-start gap-4">
                  {/* <p className="text-sm font-bold text-[#7180a5]">
                    Indicador de riesgo
                  </p> */}
                  <SplitText
                    text="Indicador de riesgo"
                    className="text-[18px] md:text-[20px] font-bold text-center leading-tight text-[#8482F5]"
                    delay={50}
                    duration={1.25}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                  />
                  <IoWarningOutline
                    className={`mr-auto w-10 h-10 p-2.5 shrink-0 text-[30px] rounded-full ${risk.badgeClassName}`}
                  />
                  {/* <span
                    className={`size-3 rounded-full ${risk.dotClassName}`}
                  /> */}
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-extrabold ${risk.badgeClassName}`}
                >
                  Riesgo {risk.label}
                </span>
                <p className="mt-2 text-[15px] font-bold text-gray-400">
                  Pico: {Math.round(result.peakStress)}% - Minimo:{" "}
                  {Math.round(result.lowestStress)}%
                </p>
              </div>
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.1fr]">
              <div className="rounded-[20px] bg-blue-100 p-5 shadow-2xl">
                <div className="flex items-start gap-3">
                  <FiInfo className=" mr-auto w-10 h-10 p-2.5 shrink-0 text-[30px] rounded-full bg-[#e9f8ed] text-[#7CCA9E]" />
                  <div>
                    <SplitText
                      text="Modelo diferencial"
                      className="text-[18px] md:text-[20px] font-bold text-center leading-tight text-[#8482F5]"
                      delay={50}
                      duration={1.25}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="left"
                    />
                    <p className="mt-2 text-[15px] leading-snug font-bold text-gray-400">
                      Se modela con{" "}
                      <span className="text-[#7CCA9E]">dS/dt = a - bS</span>,
                      donde <span className="text-[#7CCA9E]">S(t)</span>
                      representa el nivel de estres, a la presion externa y b la
                      recuperacion.
                    </p>
                    <p className="mt-3 rounded-[10px] text-[15px] bg-white px-4 py-3 leading-snug font-bold text-gray-400">
                      Siguiente = S actual + h * (a - bS)
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] bg-white p-5 shadow-2xl">
                <div className="flex items-start gap-3">
                  <BsClipboardData className=" mr-auto w-10 h-10 p-2.5 shrink-0 text-[30px] rounded-full bg-[#e9f8ed] text-[#7CCA9E]" />
                  <div>
                    <SplitText
                      text="Interpretacion"
                      className="text-[18px] md:text-[20px] font-bold text-center leading-tight text-[#8482F5]"
                      delay={50}
                      duration={1.25}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-50px"
                      textAlign="left"
                    />
                    <p className="mt-2 text-[15px] leading-snug font-bold text-gray-400">
                      {result.interpretation}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
