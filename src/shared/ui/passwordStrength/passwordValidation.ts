import { zxcvbn, zxcvbnOptions, type Score } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import * as zxcvbnEsEsPackage from "@zxcvbn-ts/language-es-es";

export type PasswordRequirementKey =
  | "minLength"
  | "uppercase"
  | "lowercase"
  | "number"
  | "special";

export type PasswordRequirementState = {
  key: PasswordRequirementKey;
  label: string;
  isMet: boolean;
};

export type PasswordStrengthLevel = {
  score: Score;
  label: string;
  percentage: number;
};

const PASSWORD_STRENGTH_LABELS: Record<Score, string> = {
  0: "Muy débil",
  1: "Débil",
  2: "Medio",
  3: "Fuerte",
  4: "Muy fuerte",
};

const PASSWORD_REQUIREMENTS: Array<{
  key: PasswordRequirementKey;
  label: string;
  test: (password: string) => boolean;
}> = [
  {
    key: "minLength",
    label: "Mínimo 8 caracteres",
    test: (password) => password.length >= 8,
  },
  {
    key: "uppercase",
    label: "Al menos una mayúscula",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    key: "lowercase",
    label: "Al menos una minúscula",
    test: (password) => /[a-z]/.test(password),
  },
  {
    key: "number",
    label: "Al menos un número",
    test: (password) => /\d/.test(password),
  },
  {
    key: "special",
    label: "Al menos un carácter especial",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

let isZxcvbnConfigured = false;

const configureZxcvbn = () => {
  if (isZxcvbnConfigured) {
    return;
  }

  zxcvbnOptions.setOptions({
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
      ...zxcvbnEsEsPackage.dictionary,
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    translations: zxcvbnEsEsPackage.translations,
  });

  isZxcvbnConfigured = true;
};

export const validatePasswordRequirements = (
  password: string,
): PasswordRequirementState[] =>
  PASSWORD_REQUIREMENTS.map(({ key, label, test }) => ({
    key,
    label,
    isMet: test(password),
  }));

export const isPasswordRequirementValid = (password: string) =>
  validatePasswordRequirements(password).every((requirement) => requirement.isMet);

export const getPasswordStrength = (password: string): PasswordStrengthLevel => {
  configureZxcvbn();

  const score = zxcvbn(password).score;

  return {
    score,
    label: PASSWORD_STRENGTH_LABELS[score],
    percentage: password ? (score + 1) * 20 : 0,
  };
};

export const doPasswordsMatch = (password: string, confirmPassword: string) =>
  confirmPassword.length > 0 && password === confirmPassword;
