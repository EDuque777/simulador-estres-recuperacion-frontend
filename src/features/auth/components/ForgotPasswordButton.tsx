"use client";

import GradientText from "@/shared/ui/animateText/GradientText";
import { useAuthFlowStore } from "../stores/authFlowStore";

export function ForgotPasswordButton() {
  const openPasswordResetModal = useAuthFlowStore(
    (state) => state.openPasswordResetModal,
  );

  return (
    <GradientText
      colors={["#7CCA9E", "#8482F5", "#7CCA9E"]}
      animationSpeed={8}
      showBorder={false}
      className="custom-class font-semibold text-center"
    >
      <button
        type="button"
        onClick={() => openPasswordResetModal()}
        className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-inherit"
      >
        Olvidaste tu contraseña?
      </button>
    </GradientText>
  );
}
