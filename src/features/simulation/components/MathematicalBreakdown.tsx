import { FiBookOpen } from "react-icons/fi";
import SplitText from "@/shared/ui/animateText/SplitText";
import type {
  SimulationParameters,
  SimulationResult,
} from "../types/stressSimulation.types";

type MathematicalBreakdownProps = {
  parameters: SimulationParameters;
  result: SimulationResult;
};

type MathItem = {
  label: string;
  lines: string[];
};

export function MathematicalBreakdown({
  parameters,
  result,
}: MathematicalBreakdownProps) {
  const initialStress = formatNumber(result.initialStress);
  const externalPressure = formatNumber(parameters.externalPressure);
  const recoveryRate = formatNumber(parameters.recoveryRate);
  const duration = formatNumber(parameters.duration);
  const timeStep = formatNumber(parameters.timeStep);
  const equilibriumStress = formatNumber(
    parameters.externalPressure / parameters.recoveryRate,
  );
  const finalStress = formatNumber(result.finalStress);
  const exactFinalStress = formatNumber(result.exactFinalStress);
  const finalError = formatNumber(result.finalError);
  const maxError = formatNumber(result.maxError);
  const firstEulerPoint = result.points[1] ?? result.points[0];
  const firstEulerStress = formatNumber(firstEulerPoint?.stress ?? result.initialStress);
  const firstEulerTime = formatNumber(firstEulerPoint?.time ?? parameters.timeStep);
  const firstEulerDerivative = formatNumber(
    parameters.externalPressure - parameters.recoveryRate * result.initialStress,
  );

  const mathItems: MathItem[] = [
    {
      label: "Condicion inicial",
      lines: [
        "Formula: S(0) = S0",
        `S(0) = ${initialStress}%`,
      ],
    },
    {
      label: "Modelo diferencial",
      lines: [
        "Formula: dS/dt = a - bS",
        `Sustitucion: dS/dt = ${externalPressure} - ${recoveryRate}S`,
        "S representa el estres en cada instante.",
      ],
    },
    {
      label: "Solucion exacta",
      lines: [
        "Formula: S(t) = a/b + (S0 - a/b)e^(-bt)",
        `Sustitucion: S(t) = ${equilibriumStress} + (${initialStress} - ${equilibriumStress})e^(-${recoveryRate}t)`,
      ],
    },
    {
      label: "Evaluacion final",
      lines: [
        `S(${duration}) = ${equilibriumStress} + (${initialStress} - ${equilibriumStress})e^(-${recoveryRate} * ${duration})`,
        `Resultado exacto: S(${duration}) = ${exactFinalStress}%`,
      ],
    },
    {
      label: "Primer paso de Euler",
      lines: [
        "Formula: S1 = S0 + h(a - bS0)",
        `S1 = ${initialStress} + ${timeStep}(${externalPressure} - ${recoveryRate} * ${initialStress})`,
        `S1 = ${initialStress} + ${timeStep}(${firstEulerDerivative}) = ${firstEulerStress}%`,
        `Tiempo: t = ${firstEulerTime} min`,
      ],
    },
    {
      label: "Error final",
      lines: [
        "Formula: Error = |Euler - Exacta|",
        `|${finalStress} - ${exactFinalStress}| = ${finalError}%`,
      ],
    },
  ];

  return (
    <section className="mt-5 rounded-[20px] bg-white p-5 shadow-2xl">
      <div className="flex items-start gap-3">
        <FiBookOpen className="h-10 w-10 shrink-0 rounded-full bg-[#e9f8ed] p-2.5 text-[30px] text-[#7CCA9E]" />
        <div className="w-full min-w-0">
          <SplitText
            text="Desarrollo matematico"
            className="text-[18px] md:text-[20px] font-bold text-left leading-tight text-[#8482F5]"
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

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {mathItems.map((item) => (
              <div
                key={item.label}
                className="rounded-[10px] bg-[#f7f9ff] px-4 py-3"
              >
                <p className="text-[13px] font-extrabold uppercase text-[#8482F5]">
                  {item.label}
                </p>
                <div className="mt-2 space-y-1">
                  {item.lines.map((line) => (
                    <p
                      key={line}
                      className="break-words font-mono text-[14px] font-bold leading-snug text-gray-500"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <p className="rounded-[10px] bg-blue-100 px-4 py-3 text-[15px] font-bold leading-snug text-gray-500">
              Error maximo entre Euler y la solucion exacta:{" "}
              <span className="text-[#8482F5]">{maxError}%</span>
            </p>
            <p className="rounded-[10px] bg-[#e9f8ed] px-4 py-3 text-[15px] font-bold leading-snug text-gray-500">
              Modelo academico simplificado; no representa un diagnostico
              clinico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatNumber(value: number) {
  return Number(value.toFixed(2)).toString();
}
