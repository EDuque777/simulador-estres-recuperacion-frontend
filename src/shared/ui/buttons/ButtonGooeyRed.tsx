"use client";

import "./buttons.css";
import { AnimatePresence, motion } from "motion/react";
import { DotSpinnerRedLoader } from "../loaders/DotSpinnerRedLoader";

type ButtonGooeyProps = {
  type: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  width: string;
};

export function ButtonGooeyRed({
  type,
  text,
  onClick,
  disabled = false,
  isLoading = false,
  width,
}: ButtonGooeyProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`bg-white gooey-button relative z-99 inline-block cursor-pointer overflow-hidden border-2 border-red-500 px-[1.6em] py-[0.9em] align-middle text-[15px] font-bold uppercase tracking-[2px] text-red-500 transition-all duration-700 ease-out hover:text-white ${width}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex items-center justify-center"
            >
              <DotSpinnerRedLoader />
            </motion.div>
          ) : (
            <motion.p
              key="text"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {text}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="gooey-button__blobs gooey-button-red__blobs">
          <div />
          <div />
          <div />
        </div>
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="block h-0 w-0"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
