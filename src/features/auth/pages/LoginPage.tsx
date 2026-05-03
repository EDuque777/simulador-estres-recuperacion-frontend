import { LoginCard } from "../components/LoginCard";
import Aurora from "@/shared/ui/backgrounds/Aurora";

export function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4">
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#7CCA9E", "#8482F5", "#C9C8FB"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      <section className="relative z-10 w-full md:w-137.5">
          <LoginCard />
      </section>
    </main>
  );
}
