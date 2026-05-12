"use client";

import { Toaster } from "sileo";

export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      offset={{ top: 20 }}
      options={{
        duration: 6000,
        fill: "#000000",
        roundness: 16,
        styles: {
          title: "font-bold!",
          description: "font-semibold! text-white! text-center!",
          // badge: "shadow-sm!",
          // button: "font-bold!",
        },
      }}
    />
  );
}
