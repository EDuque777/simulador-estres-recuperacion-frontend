// "use client";

// import { useEffect, useRef } from "react";
// import * as echarts from "echarts";
// import type { EChartsOption, EChartsType } from "echarts";

// type EChartsCanvasProps = {
//   ariaLabel: string;
//   className: string;
//   option: EChartsOption;
// };

// export function EChartsCanvas({
//   ariaLabel,
//   className,
//   option,
// }: EChartsCanvasProps) {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const chartRef = useRef<EChartsType | null>(null);

//   useEffect(() => {
//     if (!containerRef.current) {
//       return;
//     }

//     const container = containerRef.current;
//     const chart = echarts.init(container, undefined, { renderer: "canvas" });
//     chartRef.current = chart;

//     const resizeObserver =
//       typeof ResizeObserver === "undefined"
//         ? null
//         : new ResizeObserver(() => chart.resize());

//     resizeObserver?.observe(container);

//     const handleResize = () => chart.resize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       resizeObserver?.disconnect();
//       window.removeEventListener("resize", handleResize);
//       chart.dispose();
//       chartRef.current = null;
//     };
//   }, []);

//   useEffect(() => {
//     chartRef.current?.setOption(option, true);
//   }, [option]);

//   return (
//     <div
//       aria-label={ariaLabel}
//       className={className}
//       ref={containerRef}
//       role="img"
//     />
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption, EChartsType } from "echarts";

type EChartsCanvasProps = {
  ariaLabel: string;
  className: string;
  option: EChartsOption;
};

export function EChartsCanvas({
  ariaLabel,
  className,
  option,
}: EChartsCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<EChartsType | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const chart = echarts.init(container, undefined, { renderer: "canvas" });
    chartRef.current = chart;

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => chart.resize());

    resizeObserver?.observe(container);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option, {
      notMerge: false,
      lazyUpdate: true,
    });
  }, [option]);

  return (
    <div
      aria-label={ariaLabel}
      className={className}
      ref={containerRef}
      role="img"
    />
  );
}