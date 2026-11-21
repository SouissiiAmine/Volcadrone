// Drone de l'ancien hero : rotors, LED et faisceau animés en CSS pur.
export default function Drone({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div className="drone">
        <svg viewBox="0 0 240 110" className="w-full drop-shadow-[0_18px_30px_rgb(0_0_0/0.35)]" fill="none">
          <g className="text-fg" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
            <path d="M92 52 44 40M148 52l48-12M100 46 74 30M140 46l26-16" />
          </g>
          <g fill="var(--accent)" opacity=".55">
            <ellipse className="rotor" cx="44" cy="31" rx="40" ry="3.5" />
            <ellipse className="rotor" cx="196" cy="31" rx="40" ry="3.5" />
            <ellipse className="rotor" cx="74" cy="22" rx="26" ry="2.5" />
            <ellipse className="rotor" cx="166" cy="22" rx="26" ry="2.5" />
          </g>
          <g fill="currentColor" className="text-fg">
            <rect x="40" y="32" width="8" height="12" rx="3" /><rect x="192" y="32" width="8" height="12" rx="3" />
            <rect x="71" y="23" width="6" height="9" rx="2.5" /><rect x="163" y="23" width="6" height="9" rx="2.5" />
            <path d="M88 44c0-7 6-12 13-12h38c7 0 13 5 13 12v10c0 6-5 11-11 11h-42c-6 0-11-5-11-11z" />
            <path d="M96 64l-10 24M144 64l10 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </g>
          <rect x="108" y="64" width="24" height="18" rx="6" fill="var(--bg2)" stroke="currentColor" className="text-fg" strokeWidth="3" />
          <circle cx="120" cy="73" r="4.5" fill="var(--accent)" />
          <circle className="led" cx="96" cy="42" r="2.5" fill="#ff4d4d" />
          <circle cx="144" cy="42" r="2.5" fill="var(--accent)" />
        </svg>
        <div className="beam mx-auto -mt-5 aspect-[4/5] w-3/4" />
      </div>
    </div>
  );
}
