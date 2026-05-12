import type { PasswordStrengthLevel } from "./passwordValidation";

type PasswordStrengthBarProps = {
  id?: string;
  strength: PasswordStrengthLevel;
  className?: string;
};

export function PasswordStrengthBar({
  id,
  strength,
  className = "",
}: PasswordStrengthBarProps) {
  return (
    <div id={id} className={className} aria-live="polite">
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
        <span className="text-gray-400">Seguridad</span>
        <span
          className={
            strength.percentage > 0 ? "text-[#7CCA9E]" : "text-gray-400"
          }
        >
          {strength.label}
        </span>
      </div>
      <div
        role="meter"
        aria-label="Nivel de seguridad de la contraseña"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={strength.score}
        aria-valuetext={strength.label}
        className="h-2 w-full overflow-hidden rounded-full bg-gray-200"
      >
        <div
          className="h-full rounded-full bg-[#7CCA9E] transition-all duration-500 ease-out"
          style={{ width: `${strength.percentage}%` }}
        />
      </div>
    </div>
  );
}
