import { DotSpinnerLoader } from "./DotSpinnerLoader";

type DotSpinnerRedLoaderProps = {
  className?: string;
};

export function DotSpinnerRedLoader({
  className = "",
}: DotSpinnerRedLoaderProps) {
  return (
    <DotSpinnerLoader className={`dot-spinner--red ${className}`} />
  );
}
