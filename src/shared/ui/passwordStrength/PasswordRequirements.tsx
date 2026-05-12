import type { PasswordRequirementState } from "./passwordValidation";

type PasswordRequirementsProps = {
  id?: string;
  requirements: PasswordRequirementState[];
  className?: string;
};

export function PasswordRequirements({
  id,
  requirements,
  className = "",
}: PasswordRequirementsProps) {
  return (
    <ul
      id={id}
      className={`space-y-1 text-xs font-medium ${className}`}
      aria-live="polite"
    >
      {requirements.map((requirement) => (
        <li
          key={requirement.key}
          className={`flex items-center gap-2 transition-colors duration-300 ${
            requirement.isMet ? "text-[#7CCA9E]" : "text-gray-400"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              requirement.isMet ? "bg-[#7CCA9E]" : "bg-gray-300"
            }`}
          />
          <span>{requirement.label}</span>
        </li>
      ))}
    </ul>
  );
}
