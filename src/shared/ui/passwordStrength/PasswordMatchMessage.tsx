type PasswordMatchMessageProps = {
  id?: string;
  confirmPassword: string;
  passwordsMatch: boolean;
  className?: string;
};

export function PasswordMatchMessage({
  id,
  confirmPassword,
  passwordsMatch,
  className = "",
}: PasswordMatchMessageProps) {
  const message = passwordsMatch
    ? "Las contraseñas coinciden"
    : "Las contraseñas no coinciden";

  return (
    <p
      id={id}
      className={`min-h-4 text-xs font-medium transition-colors duration-300 ${
        confirmPassword
          ? passwordsMatch
            ? "text-[#7CCA9E]"
            : "text-red-500"
          : "text-gray-400"
      } ${className}`}
      aria-live="polite"
    >
      {confirmPassword ? message : ""}
    </p>
  );
}
