"use client";

import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import {
  doPasswordsMatch,
  getPasswordStrength,
  isPasswordRequirementValid,
  validatePasswordRequirements,
} from "./passwordValidation";

export const usePasswordPairValidation = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [],
  );

  const handleConfirmPasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    },
    [],
  );

  const requirements = useMemo(
    () => validatePasswordRequirements(password),
    [password],
  );
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const isPasswordValid = useMemo(
    () => isPasswordRequirementValid(password),
    [password],
  );
  const passwordsMatch = useMemo(
    () => doPasswordsMatch(password, confirmPassword),
    [confirmPassword, password],
  );

  const resetPasswordPair = useCallback(() => {
    setPassword("");
    setConfirmPassword("");
  }, []);

  return {
    confirmPassword,
    handleConfirmPasswordChange,
    handlePasswordChange,
    isPasswordValid,
    isPairValid: isPasswordValid && passwordsMatch,
    password,
    passwordsMatch,
    requirements,
    resetPasswordPair,
    strength,
  };
};
