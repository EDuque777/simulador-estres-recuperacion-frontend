// import { useMemo } from "react";
// import { FiHeart } from "react-icons/fi";
// import type { EChartsOption } from "echarts";
// import { EChartsCanvas } from "./EChartsCanvas";
// import type { StressRiskLevel } from "../types/stressSimulation.types";
// import SplitText from "@/shared/ui/animateText/SplitText";

// type StressGaugeProps = {
//   value: number;
//   riskLevel: StressRiskLevel;
//   label: string;
//   helper: string;
// };

// const riskTextClasses: Record<StressRiskLevel, string> = {
//   low: "text-[#45a95a]",
//   moderate: "text-[#d99b1d]",
//   high: "text-[#e8564a]",
// };

// export function StressGauge({
//   value,
//   riskLevel,
//   label,
//   helper,
// }: StressGaugeProps) {
//   const normalizedValue = Math.min(100, Math.max(0, value));
//   const option = useMemo<EChartsOption>(
//     () => ({
//       animationDuration: 900,
//       animationEasing: "cubicOut",
//       series: [
//         {
//           axisLabel: {
//             show: false,
//           },
//           axisLine: {
//             lineStyle: {
//               color: [[1, "#edf1f7"]],
//               width: 18,
//             },
//             roundCap: true,
//           },
//           axisTick: {
//             show: false,
//           },
//           center: ["50%", "62%"],
//           data: [
//             {
//               value: normalizedValue,
//             },
//           ],
//           detail: {
//             show: false,
//           },
//           endAngle: -20,
//           max: 100,
//           min: 0,
//           pointer: {
//             show: false,
//           },
//           progress: {
//             itemStyle: {
//               color: {
//                 colorStops: [
//                   { color: "#76ca82", offset: 0 },
//                   { color: "#f2d74b", offset: 0.55 },
//                   { color: "#ff6a55", offset: 1 },
//                 ],
//                 x: 0,
//                 x2: 1,
//                 y: 0,
//                 y2: 0,
//                 type: "linear",
//               },
//               shadowBlur: 12,
//               shadowColor: "rgba(124, 202, 158, 0.25)",
//             },
//             roundCap: true,
//             show: true,
//             width: 18,
//           },
//           radius: "92%",
//           splitLine: {
//             show: false,
//           },
//           startAngle: 200,
//           type: "gauge",
//         },
//       ],
//     }),
//     [normalizedValue],
//   );

//   return (
//     <div className="flex h-full flex-col">
//       <SplitText
//         text="Nivel de Estres Actual"
//         className="text-[18px] md:text-[20px] font-bold text-center leading-tight text-[#8482F5]"
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

//       <div className="relative mx-auto w-full max-w-97.5 -mt-5 md:mt-0">
//         <EChartsCanvas
//           ariaLabel={`Gauge interactivo de estres final ${Math.round(
//             normalizedValue,
//           )}%`}
//           className="h-61.25 md:h-71.25 w-full"
//           option={option}
//         />

//         <div className="pointer-events-none absolute inset-x-0 top-[36%] flex flex-col items-center">
//           <p
//             className={`text-6xl font-bold leading-none ${riskTextClasses[riskLevel]}`}
//           >
//             {Math.round(normalizedValue)}
//             <span className="text-4xl">%</span>
//           </p>
//           <p
//             className={`mt-2 text-xl font-extrabold ${riskTextClasses[riskLevel]}`}
//           >
//             {label}
//           </p>
//           <div className="mt-3">
//             <FiHeart
//               className=" mr-auto w-10 h-10 p-2.5 shrink-0 text-[30px] rounded-full bg-[#e9f8ed] text-[#7CCA9E]"
//             />
//           </div>
//         </div>

//         <div className="pointer-events-none absolute inset-x-8 bottom-7 flex justify-between">
//           <SplitText
//             text="0%"
//             className="text-[15px] font-bold text-center leading-snug text-gray-400"
//             delay={50}
//             duration={1.25}
//             ease="power3.out"
//             splitType="chars"
//             from={{ opacity: 0, y: 40 }}
//             to={{ opacity: 1, y: 0 }}
//             threshold={0.1}
//             rootMargin="-100px"
//             textAlign="center"
//           />
//           <SplitText
//             text="100%"
//             className="text-[15px] font-bold text-center leading-snug text-gray-400"
//             delay={50}
//             duration={1.25}
//             ease="power3.out"
//             splitType="chars"
//             from={{ opacity: 0, y: 40 }}
//             to={{ opacity: 1, y: 0 }}
//             threshold={0.1}
//             rootMargin="-100px"
//             textAlign="center"
//           />
//         </div>
//       </div>

//       <SplitText
//         text={helper}
//         className="text-[15px] font-bold text-center leading-snug text-gray-400"
//         delay={50}
//         duration={1.25}
//         ease="power3.out"
//         splitType="chars"
//         from={{ opacity: 0, y: 40 }}
//         to={{ opacity: 1, y: 0 }}
//         threshold={0.1}
//         rootMargin="-100px"
//         textAlign="center"
//       />
//     </div>
//   );
// }


import { useEffect, useMemo, useRef, useState } from "react";
import { FiHeart } from "react-icons/fi";
import type { EChartsOption } from "echarts";
import { EChartsCanvas } from "./EChartsCanvas";
import type { StressRiskLevel } from "../types/stressSimulation.types";
import SplitText from "@/shared/ui/animateText/SplitText";

type StressGaugeProps = {
  value: number;
  riskLevel: StressRiskLevel;
  label: string;
  helper: string;
};

const riskTextClasses: Record<StressRiskLevel, string> = {
  low: "text-[#45a95a]",
  moderate: "text-[#d99b1d]",
  high: "text-[#e8564a]",
};

export function StressGauge({
  value,
  riskLevel,
  label,
  helper,
}: StressGaugeProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));

  const gaugeRef = useRef<HTMLDivElement | null>(null);
  const hasPlayedEntranceAnimation = useRef(false);
  const [isGaugeVisible, setIsGaugeVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const element = gaugeRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasPlayedEntranceAnimation.current) return;

        hasPlayedEntranceAnimation.current = true;
        setIsGaugeVisible(true);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

useEffect(() => {
  if (!isGaugeVisible) return;

  const animationFrameId = window.requestAnimationFrame(() => {
    setAnimatedValue(normalizedValue);
  });

  return () => {
    window.cancelAnimationFrame(animationFrameId);
  };
}, [isGaugeVisible, normalizedValue]);

  const option = useMemo<EChartsOption>(
    () => ({
      animation: true,
      animationDuration: 900,
      animationDurationUpdate: 1200,
      animationEasing: "cubicOut",
      animationEasingUpdate: "cubicOut",
      series: [
        {
          axisLabel: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: [[1, "#edf1f7"]],
              width: 18,
            },
            roundCap: true,
          },
          axisTick: {
            show: false,
          },
          center: ["50%", "62%"],
          data: [
            {
              value: animatedValue,
            },
          ],
          detail: {
            show: false,
          },
          endAngle: -20,
          max: 100,
          min: 0,
          pointer: {
            show: false,
          },
          progress: {
            itemStyle: {
              color: {
                colorStops: [
                  { color: "#76ca82", offset: 0 },
                  { color: "#f2d74b", offset: 0.55 },
                  { color: "#ff6a55", offset: 1 },
                ],
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                type: "linear",
              },
              shadowBlur: 12,
              shadowColor: "rgba(124, 202, 158, 0.25)",
            },
            roundCap: true,
            show: true,
            width: 18,
          },
          radius: "92%",
          splitLine: {
            show: false,
          },
          startAngle: 200,
          type: "gauge",
        },
      ],
    }),
    [animatedValue],
  );

  return (
    <div ref={gaugeRef} className="flex h-full flex-col">
      <SplitText
        text="Nivel de Estres Actual"
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

      <div className="relative mx-auto w-full max-w-97.5 -mt-5 md:mt-0">
        <EChartsCanvas
          ariaLabel={`Gauge interactivo de estres final ${Math.round(
            normalizedValue,
          )}%`}
          className="h-61.25 md:h-71.25 w-full"
          option={option}
        />

        <div className="pointer-events-none absolute inset-x-0 top-[36%] flex flex-col items-center">
          <p
            className={`text-6xl font-bold leading-none ${riskTextClasses[riskLevel]}`}
          >
            {Math.round(animatedValue)}
            <span className="text-4xl">%</span>
          </p>

          <p
            className={`mt-2 text-xl font-extrabold ${riskTextClasses[riskLevel]}`}
          >
            {label}
          </p>

          <div className="mt-3">
            <FiHeart className=" mr-auto w-10 h-10 p-2.5 shrink-0 text-[30px] rounded-full bg-[#e9f8ed] text-[#7CCA9E]" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-8 bottom-7 flex justify-between">
          <SplitText
            text="0%"
            className="text-[15px] font-bold text-center leading-snug text-gray-400"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />

          <SplitText
            text="100%"
            className="text-[15px] font-bold text-center leading-snug text-gray-400"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
      </div>

      <SplitText
        text={helper}
        className="text-[15px] font-bold text-center leading-snug text-gray-400"
        delay={50}
        duration={1.25}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
    </div>
  );
}