import ElasticSlider from "@/shared/ui/sliders/ElasticSlider";
import { FaPlus, FaMinus } from "react-icons/fa6";
import SplitText from "@/shared/ui/animateText/SplitText";
import { InputNumber } from "@/shared/ui/inputs/inputNumber";

type ParameterSliderProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  accentColor: string;
  decimals?: number;
  helper?: string;
  onChange: (value: number) => void;
};

export function ParameterSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  unit,
  accentColor,
  decimals = 0,
  helper,
  onChange,
}: ParameterSliderProps) {
  const displayValue =
    decimals === 0 ? Math.round(value).toString() : value.toFixed(decimals);

  const handleChange = (rawValue: string) => {
    const parsedValue = Number(rawValue);

    if (!Number.isFinite(parsedValue)) {
      return;
    }

    onChange(Math.min(max, Math.max(min, parsedValue)));
  };

  return (
    <div className="border-b-2 border-gray-200 pb-6 last:border-b-0 last:pb-0">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <label className="w-full md:w-[50%] text-[16px] font-bold text-black" htmlFor={id}>
          {label}
        </label>
        <div className="w-full md:w-[50%] flex items-center gap-2">
          {/* <input
            aria-label={`${label} valor numerico`}
            className="w-16 bg-transparent text-center text-[14px] font-semibold text-black outline-none shadow-2xl"
            max={max}
            min={min}
            onChange={(event) => handleChange(event.target.value)}
            step={step}
            type="number"
            value={displayValue}
          /> */}
          <InputNumber
            id="stress-value"
            name="stress-value"
            // label={label}
            required
            containerStyle="w-full"
            min={min}
            max={max}
            step={step}
            displayValue={displayValue}
            handleChange={handleChange}
          />
          <span className="text-[14px] font-bold text-gray-400">{unit}</span>
        </div>
      </div>

      {/* <input
        aria-label={label}
        className="h-2 w-full cursor-pointer rounded-full bg-[#edf1f7]"
        id={id}
        max={max}
        min={min}
        onChange={(event) => handleChange(event.target.value)}
        step={step}
        style={{ accentColor }}
        type="range"
        value={value}
      /> */}

      <ElasticSlider
        value={value}
        onChange={onChange}
        leftIcon={FaMinus}
        rightIcon={FaPlus}
        startingValue={min}
        maxValue={max}
        isStepped
        stepSize={step}
        decimals={decimals}
        className="w-full"
        styleLeftIcon="text-[15px] text-gray-500"
        styleRightIcon="text-[15px] text-gray-500"
        styleColor={accentColor}
      />

      {/* <ElasticSlider
        leftIcon={FaMinus}
        rightIcon={FaPlus}
        startingValue={0}
        defaultValue={50}
        maxValue={100}
        isStepped={false}
        stepSize={10}
        className="w-full"
        styleLeftIcon="text-[15px] text-gray-500"
        styleRightIcon="text-[15px] text-gray-500"
        styleColor={accentColor}
      /> */}

      <div className="flex items-center justify-between text-xs font-medium text-[#7180a5]">
        {/* <span>{min}</span>
        <span>{max}</span> */}
        <SplitText
          text={String(min)}
          className="text-[15px] font-bold text-center leading-snug text-gray-400"
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
        <SplitText
          text={String(max)}
          className="text-[15px] font-bold text-center leading-snug text-gray-400"
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
      </div>

      {helper ? (
        <p className="mt-5 text-[15px] leading-snug font-bold text-gray-400">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
