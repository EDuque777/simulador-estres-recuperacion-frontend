import { create } from "zustand";

export type VerificationFlowType = "register" | "login" | "emailVerification";
export type PasswordResetStep = "email" | "code" | "password";
export type FlowDirection = -1 | 1;

type AuthFlowStore = {
  isVerificationModalOpen: boolean;
  verificationType: VerificationFlowType | null;
  verificationEmail: string;
  isPasswordResetModalOpen: boolean;
  passwordResetStep: PasswordResetStep;
  passwordResetDirection: FlowDirection;
  passwordResetEmail: string;
  passwordResetCode: string;
  openVerificationModal: (params: {
    email: string;
    type: VerificationFlowType;
  }) => void;
  closeVerificationModal: () => void;
  resetVerificationModal: () => void;
  openPasswordResetModal: (email?: string) => void;
  closePasswordResetModal: () => void;
  resetPasswordResetModal: () => void;
  setPasswordResetStep: (
    step: PasswordResetStep,
    direction?: FlowDirection,
  ) => void;
  setPasswordResetEmail: (email: string) => void;
  setPasswordResetCode: (code: string) => void;
};

export const useAuthFlowStore = create<AuthFlowStore>((set) => ({
  isVerificationModalOpen: false,
  verificationType: null,
  verificationEmail: "",
  isPasswordResetModalOpen: false,
  passwordResetStep: "email",
  passwordResetDirection: 1,
  passwordResetEmail: "",
  passwordResetCode: "",
  openVerificationModal: ({ email, type }) =>
    set({
      isVerificationModalOpen: true,
      verificationEmail: email,
      verificationType: type,
    }),
  closeVerificationModal: () =>
    set({
      isVerificationModalOpen: false,
    }),
  resetVerificationModal: () =>
    set({
      verificationEmail: "",
      verificationType: null,
    }),
  openPasswordResetModal: (email = "") =>
    set({
      isPasswordResetModalOpen: true,
      passwordResetStep: "email",
      passwordResetDirection: 1,
      passwordResetEmail: email,
      passwordResetCode: "",
    }),
  closePasswordResetModal: () =>
    set({
      isPasswordResetModalOpen: false,
    }),
  resetPasswordResetModal: () =>
    set({
      passwordResetStep: "email",
      passwordResetDirection: 1,
      passwordResetEmail: "",
      passwordResetCode: "",
    }),
  setPasswordResetStep: (passwordResetStep, passwordResetDirection = 1) =>
    set({ passwordResetStep, passwordResetDirection }),
  setPasswordResetEmail: (passwordResetEmail) => set({ passwordResetEmail }),
  setPasswordResetCode: (passwordResetCode) => set({ passwordResetCode }),
}));
