import React from "react";
import "./inputs.css";
import { MdAlternateEmail } from "react-icons/md";

type InputEmailProps = {
  id: string;
  name: string;
  label: string;
  type: "email";
  containerStyle: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "name" | "type" | "className"
>;

const particles = [
  { x: 0.2, y: -0.4, delay: "0.1s" },
  { x: 0.5, y: -0.2, delay: "0.3s" },
  { x: 0.3, y: 0.3, delay: "0.5s" },
  { x: 0.7, y: 0.1, delay: "0.2s" },
  { x: 0.1, y: -0.7, delay: "0.4s" },
  { x: 0.6, y: 0.4, delay: "0.6s" },
];

export function InputEmail({
  id,
  name,
  label,
  type,
  autoComplete = "email",
  containerStyle,
  required = false,
  ...inputProps
}: InputEmailProps) {
  return (
    <div className={`relative ${containerStyle}`}>
      <input
        id={id}
        required={required}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder=" "
        {...inputProps}
        className="peer w-full rounded-[10px] border-2 border-[#8482F5] bg-white pl-10 pr-3.75 pt-3.75 pb-3.75 text-base text-black outline-none transition-all duration-400 ease-out focus:border-[#7CCA9E] focus:shadow-[0_5px_8px_rgba(124,202,158,0.3),0_10px_20px_rgba(124,202,158,0.2),0_15px_40px_rgba(124,202,158,0.15),0_20px_60px_rgba(124,202,158,0.1)]"
      />

      <MdAlternateEmail className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[20px] text-gray-400 transition-colors duration-300 peer-focus:text-[#7CCA9E]" />

      <label
        htmlFor={id}
        className="pointer-events-none absolute left-9 top-4 bg-white px-1.25 text-gray-400 transition-all duration-400 ease-out
  peer-focus:left-2.5 peer-focus:-translate-y-6.25 peer-focus:text-xs peer-focus:text-[#7CCA9E]
  peer-[:not(:placeholder-shown)]:left-2.5 peer-[:not(:placeholder-shown)]:-translate-y-6.25 peer-[:not(:placeholder-shown)]:text-xs
  peer-[:not(:focus):not(:placeholder-shown)]:text-[#8482F5]"
      >
        {label}
      </label>

      {particles.map((particle, index) => (
        <div
          key={index}
          className="pointer-events-none absolute left-2.5 top-1/2 h-1.5 w-1.5 rounded-full opacity-0 blur-[0.8px] transition-opacity duration-300 peer-focus:animate-[nebula-float_2s_forwards_ease-out]"
          style={
            {
              "--x": particle.x,
              "--y": particle.y,
              "--delay": particle.delay,
              animationDelay: particle.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
