import "./loaders.css";

export function CyberPlasmaLoader() {
  return (
    <div className="cyber-loader-container">
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="gooeyPlasmaFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
            <feColorMatrix
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 22 -9
              "
            />
          </filter>
        </defs>
      </svg>

      <div className="plasma-vial">
        <div className="fluid-chamber">
          <div className="plasma-pool bottom-pool"></div>
          <div className="plasma-pool top-pool"></div>
          <div className="droplet d-1"></div>
          <div className="droplet d-2"></div>
          <div className="droplet d-3"></div>
          <div className="droplet d-4"></div>
          <div className="droplet d-5"></div>
        </div>
      </div>

      <div className="vial-base"></div>
    </div>
  );
}