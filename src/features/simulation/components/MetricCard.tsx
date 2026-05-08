import SplitText from "@/shared/ui/animateText/SplitText";
import type { IconType } from "react-icons";

type MetricCardProps = {
  Icon: IconType;
  label: string;
  value: string;
  detail: string;
};

export function MetricCard({ Icon, detail, label, value }: MetricCardProps) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-2xl">
      <div className="flex items-center justify-start gap-4">
        {/* <p className="text-[15px] font-bold text-gray-400">{label}</p> */}
        <SplitText
          text={label}
          className="text-[18px] md:text-[20px] font-bold text-center leading-tight text-[#8482F5]"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="left"
        />
        {/* <div className="grid size-10 place-items-center rounded-lg bg-[#edf4ff] text-[#4b93ec]">
          <Icon size={20} />
        </div> */}
        <Icon className=" mr-auto w-10 h-10 p-2.5 shrink-0 text-[30px] rounded-full bg-[#e9f8ed] text-[#7CCA9E]" />
      </div>
      <p className="text-3xl font-extrabold text-black">{value}</p>
      <p className="mt-1 text-[15px] font-bold text-gray-400">{detail}</p>
    </div>
  );
}