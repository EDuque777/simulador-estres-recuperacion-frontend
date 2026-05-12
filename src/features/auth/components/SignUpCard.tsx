import Image from "next/image";
import Link from "next/link";
import GradientText from "@/shared/ui/animateText/GradientText";
import SplitText from "@/shared/ui/animateText/SplitText";
import TextType from "@/shared/ui/animateText/TextType";
import logoEstresRecuperacion from "../../../../public/img/logoEstresRecuperacion.png";
import { SignUpForm } from "./SignUpForm";

export function SignUpCard() {
  return (
    <div className="rounded-[20px] text-black bg-white p-10 shadow-2xl w-full flex flex-col justify-center items-center">
      <div className="w-62.5">
        <Image
          src={logoEstresRecuperacion}
          alt="logo"
          width={500}
          height={150}
          loading="eager"
          fetchPriority="high"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="flex flex-col w-full mb-7.5 mt-7.5">
        <SplitText
          text="Registrate"
          className="text-[35px] md:text-[40px] font-bold text-center leading-tight text-[#8482F5]"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <TextType
          text={[
            "Visualiza cómo evoluciona tu nivel de estrés en tiempo real",
            "Explora diferentes escenarios de recuperación emocional",
            "Toma decisiones basadas en simulaciones dinámicas",
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="_"
          deletingSpeed={50}
          variableSpeed={{ min: 60, max: 120 }}
          cursorBlinkDuration={0.5}
          className="text-center leading-snug text-gray-400 font-semibold mt-1"
        />
      </div>
      <SignUpForm />
      <GradientText
        colors={["#7CCA9E", "#8482F5", "#7CCA9E"]}
        animationSpeed={8}
        showBorder={false}
        className="custom-class font-semibold text-center"
      >
        <Link href="/">Ya Tienes una Cuenta? Inicia Sesion</Link>
      </GradientText>
    </div>
  );
}
