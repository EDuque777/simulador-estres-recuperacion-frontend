import "./loaders.css";

type DotSpinnerLoaderProps = {
  className?: string;
};

export function DotSpinnerLoader({ className = "" }: DotSpinnerLoaderProps) {
  return (
    <div className={`dot-spinner ${className}`} role="status" aria-label="Loading">
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  );
}