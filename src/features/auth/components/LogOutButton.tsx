"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonGooeyRed } from "@/shared/ui/buttons/ButtonGooeyRed";
import { useLogOut } from "../hooks/useLogOut";

export function LogOutButton() {
  const router = useRouter();
  const { isLoading, logOut } = useLogOut();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isButtonLoading = isLoading || isRedirecting;

  const handleLogOut = async () => {
    try {
      setIsRedirecting(true);
      await logOut();
    } catch {
      // La sesion local se limpia en el hook; el usuario debe salir igual.
    } finally {
      router.replace("/");
    }
  };

  return (
    <ButtonGooeyRed
      type="button"
      text="Cerrar sesion"
      onClick={handleLogOut}
      isLoading={isButtonLoading}
      disabled={isButtonLoading}
      width="w-[200px] z-999"
    />
  );
}
