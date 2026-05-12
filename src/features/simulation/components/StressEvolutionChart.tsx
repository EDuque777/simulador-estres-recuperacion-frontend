// import { useMemo } from "react";
// import type { EChartsOption } from "echarts";
// import { EChartsCanvas } from "./EChartsCanvas";
// import type { StressPoint } from "../types/stressSimulation.types";
// import SplitText from "@/shared/ui/animateText/SplitText";

// type StressEvolutionChartProps = {
//   equilibriumStress: number;
//   points: StressPoint[];
//   duration: number;
// };

// export function StressEvolutionChart({
//   equilibriumStress,
//   points,
//   duration,
// }: StressEvolutionChartProps) {
//   const chartData = useMemo(
//     () => points.map((point) => [point.time, point.stress]),
//     [points],
//   );
//   const option = useMemo<EChartsOption>(
//     () => ({
//       animationDuration: 950,
//       animationEasing: "cubicOut",
//       grid: {
//         bottom: 42,
//         containLabel: true,
//         left: 12,
//         right: 55,
//         top: 22,
//       },
//       tooltip: {
//         appendToBody: true,
//         axisPointer: {
//           lineStyle: {
//             color: "#8c91f6",
//             width: 2,
//           },
//           type: "line",
//         },
//         backgroundColor: "rgba(255,255,255,0.96)",
//         borderColor: "#dfe5f0",
//         borderRadius: 12,
//         borderWidth: 1,
//         confine: true,
//         extraCssText: "box-shadow: 0 16px 35px rgba(23,33,63,0.12);",
//         formatter: formatTooltip,
//         textStyle: {
//           color: "#17213f",
//           fontFamily: "Manrope, sans-serif",
//           fontSize: 12,
//           fontWeight: 700,
//         },
//         trigger: "axis",
//       },
//       visualMap: {
//         dimension: 1,
//         pieces: [
//           { color: "#52b86a", gte: 0, lt: 40 },
//           { color: "#e7b42e", gte: 40, lt: 70 },
//           { color: "#ef6958", gte: 70, lte: 100 },
//         ],
//         show: false,
//       },
//       xAxis: {
//         axisLabel: {
//           color: "#99a1af",
//           fontFamily: "Manrope, sans-serif",
//           fontSize: 12,
//           fontWeight: 700,
//           formatter: (value: number) => `${Math.round(value)}m`,
//         },
//         axisLine: {
//           lineStyle: {
//             color: "#dce4f1",
//           },
//         },
//         axisTick: {
//           show: false,
//         },
//         max: duration,
//         min: 0,
//         splitLine: {
//           show: false,
//         },
//         type: "value",
//       },
//       yAxis: {
//         axisLabel: {
//           color: "#99a1af",
//           fontFamily: "Manrope, sans-serif",
//           fontSize: 12,
//           fontWeight: 700,
//           formatter: "{value}%",
//         },
//         axisLine: {
//           show: false,
//         },
//         axisTick: {
//           show: false,
//         },
//         interval: 25,
//         max: 100,
//         min: 0,
//         splitLine: {
//           lineStyle: {
//             color: "#edf1f7",
//           },
//         },
//         type: "value",
//       },
//       series: [
//         {
//           areaStyle: {
//             color: {
//               colorStops: [
//                 { color: "rgba(255, 205, 82, 0.46)", offset: 0 },
//                 { color: "rgba(118, 202, 130, 0.22)", offset: 0.55 },
//                 { color: "rgba(255, 255, 255, 0.08)", offset: 1 },
//               ],
//               x: 0,
//               x2: 0,
//               y: 0,
//               y2: 1,
//               type: "linear",
//             },
//           },
//           data: chartData,
//           emphasis: {
//             focus: "series",
//           },
//           lineStyle: {
//             shadowBlur: 10,
//             shadowColor: "rgba(82, 184, 106, 0.24)",
//             width: 4,
//           },
//           markArea: {
//             data: [
//               [{ yAxis: 0 }, { yAxis: 40 }],
//               [{ yAxis: 40 }, { yAxis: 70 }],
//               [{ yAxis: 70 }, { yAxis: 100 }],
//             ],
//             itemStyle: {
//               color: "rgba(124, 202, 158, 0.06)",
//             },
//             silent: true,
//           },
//           markLine: {
//             data: [
//               {
//                 label: {
//                   color: "#99a1af",
//                   formatter: "Equilibrio",
//                   fontFamily: "Manrope, sans-serif",
//                   fontSize: 11,
//                   fontWeight: 700,
//                 },
//                 lineStyle: {
//                   color: "#8c91f6",
//                   type: "dashed",
//                   width: 2,
//                 },
//                 yAxis: equilibriumStress,
//               },
//             ],
//             symbol: "none",
//           },
//           name: "Nivel de Estres",
//           showSymbol: false,
//           smooth: 0.38,
//           symbol: "circle",
//           symbolSize: 8,
//           type: "line",
//         },
//       ],
//     }),
//     [chartData, duration, equilibriumStress],
//   );

//   return (
//     <div className="w-full overflow-hidden">
//       <EChartsCanvas
//         ariaLabel="Grafica interactiva de evolucion del estres"
//         className="h-67.5 w-full md:h-80"
//         option={option}
//       />
//       <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#7180a5]">
//         <span className="h-1 w-8 rounded-full bg-linear-to-r from-[#52b86a] via-[#e7b42e] to-[#ef6958]" />
//         <SplitText
//         text="Nivel de Estres"
//         className="text-[15px] font-bold text-center leading-snug text-gray-400"
//         delay={50}
//         duration={1.25}
//         ease="power3.out"
//         splitType="chars"
//         from={{ opacity: 0, y: 40 }}
//         to={{ opacity: 1, y: 0 }}
//         threshold={0.1}
//         rootMargin="-100px"
//         textAlign="left"
//       />
//       </div>
//     </div>
//   );
// }

// type TooltipDatum = {
//   value?: unknown;
// };

// function formatTooltip(params: unknown) {
//   const primaryParam = Array.isArray(params) ? params[0] : params;

//   if (!isTooltipDatum(primaryParam)) {
//     return "";
//   }

//   const [time, stress] = readChartTuple(primaryParam.value);

//   return `<strong>${Math.round(time)} min</strong><br/>Nivel de Estres: ${stress.toFixed(
//     1,
//   )}%`;
// }

// function readChartTuple(value: unknown): [number, number] {
//   if (Array.isArray(value)) {
//     return [toNumber(value[0]), toNumber(value[1])];
//   }

//   return [0, toNumber(value)];
// }

// function toNumber(value: unknown) {
//   const numericValue = Number(value);

//   return Number.isFinite(numericValue) ? numericValue : 0;
// }

// function isTooltipDatum(value: unknown): value is TooltipDatum {
//   return typeof value === "object" && value !== null && "value" in value;
// }



"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { EChartsOption } from "echarts";
import { EChartsCanvas } from "./EChartsCanvas";
import type { StressPoint } from "../types/stressSimulation.types";

type StressEvolutionChartProps = {
  equilibriumStress: number;
  points: StressPoint[];
  duration: number;
};

const ENTRANCE_ANIMATION_DURATION = 1800;

export function StressEvolutionChart({
  equilibriumStress,
  points,
  duration,
}: StressEvolutionChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const hasPlayedEntranceAnimation = useRef(false);

  const [entrancePointCount, setEntrancePointCount] = useState(1);
  const [isEntranceAnimationActive, setIsEntranceAnimationActive] =
    useState(true);

  const eulerChartData = useMemo(
    () => points.map((point) => [point.time, point.stress]),
    [points],
  );
  const exactChartData = useMemo(
    () => points.map((point) => [point.time, point.exactStress]),
    [points],
  );

  const animatedEulerChartData = useMemo(() => {
    if (!isEntranceAnimationActive) {
      return eulerChartData;
    }

    return sliceAnimatedData(eulerChartData, entrancePointCount);
  }, [eulerChartData, entrancePointCount, isEntranceAnimationActive]);

  const animatedExactChartData = useMemo(() => {
    if (!isEntranceAnimationActive) {
      return exactChartData;
    }

    return sliceAnimatedData(exactChartData, entrancePointCount);
  }, [exactChartData, entrancePointCount, isEntranceAnimationActive]);

  useEffect(() => {
    const element = chartContainerRef.current;
    const totalPoints = eulerChartData.length;

    if (!element || totalPoints <= 1 || hasPlayedEntranceAnimation.current) {
      return;
    }

    let animationFrameId = 0;
    let startedAt = 0;
    let lastPointCount = 1;

    const animateLine = (currentTime: number) => {
      if (startedAt === 0) {
        startedAt = currentTime;
      }

      const elapsedTime = currentTime - startedAt;
      const progress = Math.min(
        elapsedTime / ENTRANCE_ANIMATION_DURATION,
        1,
      );
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextPointCount = Math.max(
        1,
        Math.ceil(easedProgress * totalPoints),
      );

      if (nextPointCount !== lastPointCount) {
        lastPointCount = nextPointCount;
        setEntrancePointCount(nextPointCount);
      }

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animateLine);
        return;
      }

      setEntrancePointCount(totalPoints);
      setIsEntranceAnimationActive(false);
    };

    const startEntranceAnimation = () => {
      if (hasPlayedEntranceAnimation.current) {
        return;
      }

      hasPlayedEntranceAnimation.current = true;

      animationFrameId = window.requestAnimationFrame(() => {
        setIsEntranceAnimationActive(true);
        setEntrancePointCount(1);

        animationFrameId = window.requestAnimationFrame(animateLine);
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      startEntranceAnimation();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        startEntranceAnimation();
        observer.disconnect();
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [eulerChartData.length]);

  const option = useMemo<EChartsOption>(
    () => ({
      animation: true,
      animationDuration: 300,
      animationDurationUpdate: 0,
      animationEasing: "cubicOut",
      animationEasingUpdate: "cubicOut",
      grid: {
        bottom: 42,
        containLabel: true,
        left: 0,
        right: 60,
        top: 22,
      },
      tooltip: {
        appendToBody: true,
        axisPointer: {
          lineStyle: {
            color: "#8c91f6",
            width: 2,
          },
          type: "line",
        },
        backgroundColor: "rgba(255,255,255,0.96)",
        borderColor: "#dfe5f0",
        borderRadius: 12,
        borderWidth: 1,
        confine: true,
        extraCssText: "box-shadow: 0 16px 35px rgba(23,33,63,0.12);",
        formatter: formatTooltip,
        textStyle: {
          color: "#17213f",
          fontFamily: "Manrope, sans-serif",
          fontSize: 12,
          fontWeight: 700,
        },
        trigger: "axis",
      },
      visualMap: {
        dimension: 1,
        pieces: [
          { color: "#52b86a", gte: 0, lt: 40 },
          { color: "#e7b42e", gte: 40, lt: 70 },
          { color: "#ef6958", gte: 70, lte: 100 },
        ],
        seriesIndex: 0,
        show: false,
      },
      xAxis: {
        axisLabel: {
          color: "#99a1af",
          fontFamily: "Manrope, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          formatter: (value: number) => `${Math.round(value)}m`,
        },
        axisLine: {
          lineStyle: {
            color: "#dce4f1",
          },
        },
        axisTick: {
          show: false,
        },
        max: duration,
        min: 0,
        splitLine: {
          show: false,
        },
        type: "value",
      },
      yAxis: {
        axisLabel: {
          color: "#99a1af",
          fontFamily: "Manrope, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          formatter: "{value}%",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        interval: 25,
        max: 100,
        min: 0,
        splitLine: {
          lineStyle: {
            color: "#edf1f7",
          },
        },
        type: "value",
      },
      series: [
        {
          id: "stress-line",
          areaStyle: {
            color: {
              colorStops: [
                { color: "rgba(255, 205, 82, 0.46)", offset: 0 },
                { color: "rgba(118, 202, 130, 0.22)", offset: 0.55 },
                { color: "rgba(255, 255, 255, 0.08)", offset: 1 },
              ],
              x: 0,
              x2: 0,
              y: 0,
              y2: 1,
              type: "linear",
            },
          },
          data: animatedEulerChartData,
          emphasis: {
            focus: "series",
          },
          lineStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(82, 184, 106, 0.24)",
            width: 4,
          },
          markArea: {
            data: [
              [{ yAxis: 0 }, { yAxis: 40 }],
              [{ yAxis: 40 }, { yAxis: 70 }],
              [{ yAxis: 70 }, { yAxis: 100 }],
            ],
            itemStyle: {
              color: "rgba(124, 202, 158, 0.06)",
            },
            silent: true,
          },
          name: "Euler",
          showSymbol: false,
          smooth: 0.38,
          symbol: "circle",
          symbolSize: 8,
          type: "line",
        },
        {
          id: "exact-solution-line",
          animation: true,
          data: animatedExactChartData,
          emphasis: {
            focus: "series",
          },
          lineStyle: {
            color: "#8482F5",
            shadowBlur: 10,
            shadowColor: "rgba(132, 130, 245, 0.22)",
            type: "dashed",
            width: 3,
          },
          name: "Solucion exacta",
          showSymbol: false,
          smooth: 0.38,
          symbol: "circle",
          symbolSize: 8,
          type: "line",
        },
        {
          id: "equilibrium-line",
          animation: false,
          data: [
            [0, equilibriumStress],
            [duration, equilibriumStress],
          ],
          endLabel: {
            color: "#99a1af",
            formatter: "Equilibrio",
            fontFamily: "Manrope, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            show: true,
          },
          lineStyle: {
            color: "#8c91f6",
            type: "dashed",
            width: 2,
          },
          name: "Equilibrio",
          showSymbol: false,
          silent: true,
          symbol: "none",
          tooltip: {
            show: false,
          },
          type: "line",
        },
      ],
    }),
    [animatedEulerChartData, animatedExactChartData, duration, equilibriumStress],
  );

  return (
    <div ref={chartContainerRef} className="w-full overflow-hidden">
      <EChartsCanvas
        ariaLabel="Grafica interactiva de evolucion del estres"
        className="h-67.5 w-full md:h-80"
        option={option}
      />

      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#7180a5]">
        <div className="flex items-center gap-2">
          <span className="h-1 w-8 rounded-full bg-linear-to-r from-[#52b86a] via-[#e7b42e] to-[#ef6958]" />
          <span className="text-[15px] font-bold leading-snug text-gray-400">
            Euler
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-0 w-8 border-t-2 border-dashed border-[#8482F5]" />
          <span className="text-[15px] font-bold leading-snug text-gray-400">
            Solucion exacta
          </span>
        </div>
      </div>
    </div>
  );
}

type TooltipDatum = {
  seriesName?: string;
  value?: unknown;
};

function formatTooltip(params: unknown) {
  const tooltipParams = Array.isArray(params)
    ? params.filter(isTooltipDatum)
    : isTooltipDatum(params)
      ? [params]
      : [];
  const eulerParam = tooltipParams.find(
    (param) => param.seriesName === "Euler",
  );
  const exactParam = tooltipParams.find(
    (param) => param.seriesName === "Solucion exacta",
  );
  const primaryParam = eulerParam ?? exactParam ?? tooltipParams[0];

  if (!isTooltipDatum(primaryParam)) {
    return "";
  }

  const [time, eulerStress] = readChartTuple(
    (eulerParam ?? primaryParam).value,
  );
  const [, exactStress] = readChartTuple(
    (exactParam ?? primaryParam).value,
  );
  const error = Math.abs(eulerStress - exactStress);

  return `<strong>${Math.round(time)} min</strong><br/>Euler: ${eulerStress.toFixed(
    1,
  )}%<br/>Solucion exacta: ${exactStress.toFixed(
    1,
  )}%<br/>Error: ${error.toFixed(
    2,
  )}%`;
}

function sliceAnimatedData(data: number[][], pointCount: number) {
  return data.slice(0, Math.max(1, Math.min(pointCount, data.length)));
}

function readChartTuple(value: unknown): [number, number] {
  if (Array.isArray(value)) {
    return [toNumber(value[0]), toNumber(value[1])];
  }

  return [0, toNumber(value)];
}

function toNumber(value: unknown) {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

function isTooltipDatum(value: unknown): value is TooltipDatum {
  return typeof value === "object" && value !== null && "value" in value;
}
