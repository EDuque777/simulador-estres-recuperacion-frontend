import { DotSpinnerLoader } from "./DotSpinnerLoader";

type DotSpinnerGreenLoaderProps = {
  className?: string;
};

export function DotSpinnerGreenLoader({
  className = "",
}: DotSpinnerGreenLoaderProps) {
  return (
    <DotSpinnerLoader className={`dot-spinner--green ${className}`} />
  );
}
