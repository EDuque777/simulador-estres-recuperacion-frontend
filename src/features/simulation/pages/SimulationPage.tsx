import {
  LogOutButton,
  ProtectedRoute,
} from "@/features/auth";
import { SimulationDashboard } from "../components/SimulationDashboard";
import Aurora from "@/shared/ui/backgrounds/Aurora";

export function SimulationPage() {
  return (
    <ProtectedRoute>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-4">
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#7CCA9E", "#8482F5", "#C9C8FB"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </div>
        <section className="relative z-10 w-full xl:w-[70%]">
          <div className="mb-4 flex w-full justify-end">
            <LogOutButton />
          </div>
          <SimulationDashboard />
        </section>
      </main>
    </ProtectedRoute>
  );
}
