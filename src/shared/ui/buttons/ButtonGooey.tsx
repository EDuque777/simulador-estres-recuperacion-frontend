"use client";

import "./buttons.css"

type ButtonGooeyProps = {
  type: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  width: string;
};

export function ButtonGooey({
  type,
  text,
  onClick,
  disabled = false,
  width,
}: ButtonGooeyProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`gooey-button relative z-99 inline-block cursor-pointer overflow-hidden border-2 border-[#8482F5] px-[1.6em] py-[0.9em] align-middle text-[15px] font-bold uppercase tracking-[2px] text-[#8482F5] transition-all duration-700 ease-out hover:text-white ${width}`}
      >
        <p>{text}</p>
        <div className="gooey-button__blobs">
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
