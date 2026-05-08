"use client";

import "./buttons.css"

type ButtonBubbleProps = {
  type: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  width: string;
};

export function ButtonBubble({
  type,
  text,
  onClick,
  disabled = false,
  width,
}: ButtonBubbleProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${width}`}
    >
        {text}
    </button>
  );
}