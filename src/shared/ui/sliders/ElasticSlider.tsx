// import React, { useRef, useState } from 'react';
// import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
// import type { IconType } from "react-icons";

// const MAX_OVERFLOW = 20;

// interface ElasticSliderProps {
//   defaultValue?: number;
//   startingValue?: number;
//   maxValue?: number;
//   className?: string;
//   isStepped?: boolean;
//   stepSize?: number;
//   leftIcon: IconType
//   rightIcon: IconType
//   styleLeftIcon: string;
//   styleRightIcon: string;
//   styleColor: string;
// }

// const ElasticSlider: React.FC<ElasticSliderProps> = ({
//   defaultValue = 50,
//   startingValue = 0,
//   maxValue = 100,
//   className = '',
//   isStepped = false,
//   stepSize = 1,
//   leftIcon: IconLeft,
//   rightIcon: IconRight,
//   styleLeftIcon,
//   styleRightIcon,
//   styleColor,
// }) => {
//   return (
//     <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
//       <Slider
//         defaultValue={defaultValue}
//         startingValue={startingValue}
//         maxValue={maxValue}
//         isStepped={isStepped}
//         stepSize={stepSize}
//         leftIcon={IconLeft}
//         rightIcon={IconRight}
//         styleLeftIcon={styleLeftIcon}
//         styleRightIcon={styleRightIcon}
//         styleColor={styleColor}
//       />
//     </div>
//   );
// };

// interface SliderProps {
//   defaultValue: number;
//   startingValue: number;
//   maxValue: number;
//   isStepped: boolean;
//   stepSize: number;
//   leftIcon: IconType
//   rightIcon: IconType
//   styleLeftIcon: string;
//   styleRightIcon: string;
//   styleColor: string;
// }

// const Slider: React.FC<SliderProps> = ({
//   defaultValue,
//   startingValue,
//   maxValue,
//   isStepped,
//   stepSize,
//   leftIcon: IconLeft,
//   rightIcon: IconRight,
//   styleLeftIcon,
//   styleRightIcon,
//   styleColor
// }) => {
//   const [value, setValue] = useState<number>(defaultValue);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [region, setRegion] = useState<'left' | 'middle' | 'right'>('middle');
//   const clientX = useMotionValue(0);
//   const overflow = useMotionValue(0);
//   const scale = useMotionValue(1);

//   useMotionValueEvent(clientX, 'change', (latest: number) => {
//     if (sliderRef.current) {
//       const { left, right } = sliderRef.current.getBoundingClientRect();
//       let newValue: number;
//       if (latest < left) {
//         setRegion('left');
//         newValue = left - latest;
//       } else if (latest > right) {
//         setRegion('right');
//         newValue = latest - right;
//       } else {
//         setRegion('middle');
//         newValue = 0;
//       }
//       overflow.jump(decay(newValue, MAX_OVERFLOW));
//     }
//   });

//   const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
//     if (e.buttons > 0 && sliderRef.current) {
//       const { left, width } = sliderRef.current.getBoundingClientRect();
//       let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);
//       if (isStepped) {
//         newValue = Math.round(newValue / stepSize) * stepSize;
//       }
//       newValue = Math.min(Math.max(newValue, startingValue), maxValue);
//       setValue(newValue);
//       clientX.jump(e.clientX);
//     }
//   };

//   const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
//     handlePointerMove(e);
//     e.currentTarget.setPointerCapture(e.pointerId);
//   };

//   const handlePointerUp = () => {
//     animate(overflow, 0, { type: 'spring', bounce: 0.5 });
//   };

//   const getRangePercentage = (): number => {
//     const totalRange = maxValue - startingValue;
//     if (totalRange === 0) return 0;
//     return ((value - startingValue) / totalRange) * 100;
//   };

//   return (
//     <>
//       <motion.div
//         onHoverStart={() => animate(scale, 1.05)}
//         onHoverEnd={() => animate(scale, 1)}
//         onTouchStart={() => animate(scale, 1.05)}
//         onTouchEnd={() => animate(scale, 1)}
//         style={{
//           scale,
//           opacity: useTransform(scale, [1, 1.2], [0.7, 1])
//         }}
//         className="flex w-full touch-none select-none items-center justify-center gap-4"
//       >
//         <motion.div
//           animate={{
//             scale: region === 'left' ? [1, 1.4, 1] : 1,
//             transition: { duration: 0.25 }
//           }}
//           style={{
//             x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))
//           }}
//         >
//           <IconLeft className={`${styleLeftIcon}`} />
//         </motion.div>

//         <div
//           ref={sliderRef}
//           className="relative flex w-full max-w-xs grow cursor-grab touch-none select-none items-center py-4"
//           onPointerMove={handlePointerMove}
//           onPointerDown={handlePointerDown}
//           onPointerUp={handlePointerUp}
//           onPointerCancel={handlePointerUp}
//           onLostPointerCapture={handlePointerUp}
//         >
//           <motion.div
//             style={{
//               scaleX: useTransform(() => {
//                 if (sliderRef.current) {
//                   const { width } = sliderRef.current.getBoundingClientRect();
//                   return 1 + overflow.get() / width;
//                 }
//                 return 1;
//               }),
//               scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),
//               transformOrigin: useTransform(() => {
//                 if (sliderRef.current) {
//                   const { left, width } = sliderRef.current.getBoundingClientRect();
//                   return clientX.get() < left + width / 2 ? 'right' : 'left';
//                 }
//                 return 'center';
//               }),
//               height: useTransform(scale, [1, 1.2], [6, 12]),
//               marginTop: useTransform(scale, [1, 1.2], [0, -3]),
//               marginBottom: useTransform(scale, [1, 1.2], [0, -3])
//             }}
//             className="flex grow"
//           >
//             <div className="relative h-full grow overflow-hidden rounded-full bg-gray-200">
//               <div className={`absolute h-full ${styleColor} rounded-full`} style={{ width: `${getRangePercentage()}%` }} />
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           animate={{
//             scale: region === 'right' ? [1, 1.4, 1] : 1,
//             transition: { duration: 0.25 }
//           }}
//           style={{
//             x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))
//           }}
//         >
//           <IconRight className={`${styleRightIcon}`} />
//         </motion.div>
//       </motion.div>
//       <p className="absolute text-gray-400 font-bold transform -translate-y-4 text-xs tracking-wide">
//         {Math.round(value)}
//       </p>
//     </>
//   );
// };

// function decay(value: number, max: number): number {
//   if (max === 0) {
//     return 0;
//   }
//   const entry = value / max;
//   const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
//   return sigmoid * max;
// }

// export default ElasticSlider;




"use client";

import React, { useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import type { IconType } from "react-icons";

const MAX_OVERFLOW = 20;
const HOVER_SCALE = 1.05;

interface ElasticSliderProps {
  value: number;
  onChange: (value: number) => void;
  startingValue?: number;
  maxValue?: number;
  className?: string;
  isStepped?: boolean;
  stepSize?: number;
  leftIcon: IconType;
  rightIcon: IconType;
  styleLeftIcon?: string;
  styleRightIcon?: string;
  styleColor?: string;
  decimals?: number;
}

export default function ElasticSlider({
  value,
  onChange,
  startingValue = 0,
  maxValue = 100,
  className = "",
  isStepped = false,
  stepSize = 1,
  leftIcon: IconLeft,
  rightIcon: IconRight,
  styleLeftIcon = "text-[15px] text-gray-500",
  styleRightIcon = "text-[15px] text-gray-500",
  styleColor = "bg-green-600",
  decimals = 0,
}: ElasticSliderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <Slider
        value={value}
        onChange={onChange}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={IconLeft}
        rightIcon={IconRight}
        styleLeftIcon={styleLeftIcon}
        styleRightIcon={styleRightIcon}
        styleColor={styleColor}
        decimals={decimals}
      />
    </div>
  );
}

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  startingValue: number;
  maxValue: number;
  isStepped: boolean;
  stepSize: number;
  leftIcon: IconType;
  rightIcon: IconType;
  styleLeftIcon: string;
  styleRightIcon: string;
  styleColor: string;
  decimals: number;
}

function Slider({
  value,
  onChange,
  startingValue,
  maxValue,
  isStepped,
  stepSize,
  leftIcon: IconLeft,
  rightIcon: IconRight,
  styleLeftIcon,
  styleRightIcon,
  styleColor,
  decimals,
}: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<"left" | "middle" | "right">("middle");

  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  const opacity = useTransform(scale, [1, HOVER_SCALE], [0.7, 1]);

  const leftIconX = useTransform(() =>
    region === "left" ? -overflow.get() / scale.get() : 0,
  );

  const rightIconX = useTransform(() =>
    region === "right" ? overflow.get() / scale.get() : 0,
  );

  const trackScaleX = useTransform(() => {
    if (!sliderRef.current) return 1;

    const { width } = sliderRef.current.getBoundingClientRect();

    return 1 + (overflow.get() / width) * 0.4;
  });

  const trackScaleY = useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.92]);

  const transformOrigin = useTransform(() => {
    if (!sliderRef.current) return "center";

    const { left, width } = sliderRef.current.getBoundingClientRect();

    return clientX.get() < left + width / 2 ? "right" : "left";
  });

  const trackHeight = useTransform(scale, [1, HOVER_SCALE], [6, 8]);
  const trackMarginTop = useTransform(scale, [1, HOVER_SCALE], [0, -1]);
  const trackMarginBottom = useTransform(scale, [1, HOVER_SCALE], [0, -1]);

  useMotionValueEvent(clientX, "change", (latest: number) => {
    if (!sliderRef.current) return;

    const { left, right } = sliderRef.current.getBoundingClientRect();

    let overflowValue: number;

    if (latest < left) {
      setRegion("left");
      overflowValue = left - latest;
    } else if (latest > right) {
      setRegion("right");
      overflowValue = latest - right;
    } else {
      setRegion("middle");
      overflowValue = 0;
    }

    overflow.jump(decay(overflowValue, MAX_OVERFLOW));
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.buttons <= 0 || !sliderRef.current) return;

    const { left, width } = sliderRef.current.getBoundingClientRect();

    let newValue =
      startingValue +
      ((event.clientX - left) / width) * (maxValue - startingValue);

    if (isStepped) {
      newValue = roundToStep(newValue, stepSize, startingValue);
    }

    newValue = Math.min(Math.max(newValue, startingValue), maxValue);

    onChange(newValue);
    clientX.jump(event.clientX);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    handlePointerMove(event);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = () => {
    animate(overflow, 0, { type: "spring", bounce: 0.5 });
  };

  const getRangePercentage = (): number => {
    const totalRange = maxValue - startingValue;

    if (totalRange === 0) return 0;

    return ((value - startingValue) / totalRange) * 100;
  };

  const displayValue =
    decimals === 0 ? Math.round(value).toString() : value.toFixed(decimals);

  return (
    <>
      <motion.div
        onHoverStart={() => animate(scale, HOVER_SCALE)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, HOVER_SCALE)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity,
        }}
        className="flex w-full touch-none select-none items-center justify-center gap-4"
      >
        <motion.div
          animate={{
            scale: region === "left" ? [1, 1.15, 1] : 1,
            transition: { duration: 0.25 },
          }}
          style={{
            x: leftIconX,
          }}
        >
          <IconLeft className={styleLeftIcon} />
        </motion.div>

        <div
          ref={sliderRef}
          className="relative flex w-full grow cursor-grab touch-none select-none items-center py-4 active:cursor-grabbing"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onLostPointerCapture={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: trackScaleX,
              scaleY: trackScaleY,
              transformOrigin,
              height: trackHeight,
              marginTop: trackMarginTop,
              marginBottom: trackMarginBottom,
            }}
            className="flex grow"
          >
            <div className="relative h-full grow overflow-hidden rounded-full bg-gray-200">
              <div
                className={`absolute h-full rounded-full ${styleColor}`}
                style={{ width: `${getRangePercentage()}%` }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: region === "right" ? [1, 1.15, 1] : 1,
            transition: { duration: 0.25 },
          }}
          style={{
            x: rightIconX,
          }}
        >
          <IconRight className={styleRightIcon} />
        </motion.div>
      </motion.div>

      <p className="absolute -top-2 text-[15px] font-bold tracking-wide text-gray-400">
        {displayValue}
      </p>
    </>
  );
}

function decay(value: number, max: number): number {
  if (max === 0) return 0;

  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

  return sigmoid * max;
}

function roundToStep(value: number, step: number, min: number): number {
  const decimals = step.toString().split(".")[1]?.length ?? 0;
  const roundedValue = Math.round((value - min) / step) * step + min;

  return Number(roundedValue.toFixed(decimals));
}