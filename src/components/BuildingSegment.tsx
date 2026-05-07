import { useState, useCallback } from 'react';

type RoofShape = 'flat' | 'arched' | 'stepped' | 'peaked';

interface BuildingSegmentProps {
  title: string;
  label: string;
  index: string;
  windowRows: number;
  windowCols: number;
  colorClass: string;
  heightClass: string;
  staggerClass: string;
  translateX: number;
  roofShape: RoofShape;
  hasDoorway?: boolean;
}

const BuildingSegment = ({
  title,
  label,
  index,
  windowRows,
  windowCols,
  colorClass,
  heightClass,
  staggerClass,
  translateX,
  roofShape,
  hasDoorway = true,
}: BuildingSegmentProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [litWindows, setLitWindows] = useState<number[]>([]);

  const totalWindows = windowRows * windowCols;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    const windows: number[] = [];
    for (let i = 0; i < totalWindows; i++) {
      setTimeout(() => {
        windows.push(i);
        setLitWindows([...windows]);
      }, i * 40);
    }
  }, [totalWindows]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setLitWindows([]);
  }, []);

  /* ───────── Roof renderers ───────── */

  const renderRoof = () => {
    // Each roof uses the building's own color for the fill,
    // derived from the colorClass (bg-gamla-*).
    const fillClass = colorClass.replace('bg-', 'text-');

    switch (roofShape) {
      case 'stepped':
        // Crow-step gable with decorative cross-finials at each step,
        // matching the terracotta building in the reference.
        return (
          <div className="absolute left-0 right-0 bottom-full flex justify-center" style={{ marginBottom: -1 }}>
            <svg viewBox="0 0 120 50" className="w-full" style={{ height: 40 }} preserveAspectRatio="none">
              {/* Shadow / outline layer */}
              <path
                d="M0,50 L0,36 L15,36 L15,26 L30,26 L30,18 L45,18 L45,10 L60,4 L75,10 L75,18 L90,18 L90,26 L105,26 L105,36 L120,36 L120,50 Z"
                fill="currentColor"
                className="text-foreground/12"
              />
              {/* Main gable fill */}
              {/* Main symmetrical gable fill */}
              <path
                d="M2,50 L2,38 L17,38 L17,28 L32,28 L32,20 L47,20 L47,12 L60,6 L73,12 L73,20 L88,20 L88,28 L103,28 L103,38 L118,38 L118,50 Z"
                fill="currentColor"
                className={fillClass}
              />
              {/* Cornice line at base */}
              <line x1="0" y1="49" x2="120" y2="49" stroke="currentColor" strokeWidth="1" className="text-foreground/10" />
            </svg>
          </div>
        );

      case 'arched':
        // Rounded baroque pediment with a central oculus window,
        // like the teal/green building in Gamla Stan.
        return (
          <div className="absolute left-0 right-0 bottom-full flex justify-center" style={{ marginBottom: -1 }}>
            <svg viewBox="0 0 100 36" className="w-full" style={{ height: 32 }} preserveAspectRatio="none">
              {/* Shadow layer */}
              <path
                d="M0,36 L0,22 Q50,-10 100,22 L100,36 Z"
                fill="currentColor"
                className="text-foreground/12"
              />
              {/* Main arch fill */}
              <path
                d="M2,36 L2,23 Q50,-7 98,23 L98,36 Z"
                fill="currentColor"
                className={fillClass}
              />
              {/* Oculus (circular window) */}
              <circle cx="50" cy="18" r="5" fill="currentColor" className="text-foreground/15" />
              <circle cx="50" cy="18" r="3.5" fill="currentColor" className={fillClass} />
              <circle cx="50" cy="18" r="3.5" fill="currentColor" className="text-background/20" />
              {/* Oculus cross muntin */}
              <line x1="50" y1="14.5" x2="50" y2="21.5" stroke="currentColor" strokeWidth="0.6" className="text-foreground/20" />
              <line x1="46.5" y1="18" x2="53.5" y2="18" stroke="currentColor" strokeWidth="0.6" className="text-foreground/20" />
              {/* Keystone accent at apex */}
              <path d="M48,10 L50,7 L52,10 Z" fill="currentColor" className="text-foreground/15" />
              {/* Arch outline */}
              <path
                d="M2,23 Q50,-7 98,23"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground/10"
              />
              {/* Cornice line */}
              <line x1="0" y1="35" x2="100" y2="35" stroke="currentColor" strokeWidth="1" className="text-foreground/8" />
            </svg>
          </div>
        );

      case 'peaked':
        // Dutch bell gable with a curved silhouette and a circular finial,
        // like the yellow building in the reference.
        return (
          <div className="absolute left-0 right-0 bottom-full flex justify-center" style={{ marginBottom: -1 }}>
            <svg viewBox="0 0 100 40" className="w-full" style={{ height: 34 }} preserveAspectRatio="none">
              {/* Shadow layer */}
              <path
                d="M0,40 L0,28 C5,28 10,24 15,22 C25,16 35,12 42,8 Q50,2 58,8 C65,12 75,16 85,22 C90,24 95,28 100,28 L100,40 Z"
                fill="currentColor"
                className="text-foreground/12"
              />
              {/* Main bell gable fill */}
              <path
                d="M2,40 L2,30 C7,30 12,26 17,24 C27,18 37,14 44,10 Q50,4 56,10 C63,14 73,18 83,24 C88,26 93,30 98,30 L98,40 Z"
                fill="currentColor"
                className={fillClass}
              />
              {/* Scrollwork volutes */}
              <path d="M10,28 Q6,24 12,22" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-foreground/15" />
              <path d="M90,28 Q94,24 88,22" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-foreground/15" />
              {/* Central circular finial */}
              <circle cx="50" cy="5" r="3.5" fill="currentColor" className="text-foreground/20" />
              <circle cx="50" cy="5" r="2.2" fill="currentColor" className={fillClass} />
              {/* Finial dot */}
              <circle cx="50" cy="5" r="1" fill="currentColor" className="text-foreground/25" />
              {/* Cornice line */}
              <line x1="0" y1="39" x2="100" y2="39" stroke="currentColor" strokeWidth="1" className="text-foreground/8" />
            </svg>
          </div>
        );

      default:
        // Flat / mansard-style roof with a darker upper band,
        // like the navy-topped pink building in the reference.
        return (
          <div className="absolute left-0 right-0 bottom-full" style={{ marginBottom: -1 }}>
            <svg viewBox="0 0 100 14" className="w-full" style={{ height: 12 }} preserveAspectRatio="none">
              {/* Mansard slope */}
              <path
                d="M0,14 L0,6 L4,2 L96,2 L100,6 L100,14 Z"
                fill="currentColor"
                className="text-foreground/18"
              />
              {/* Ridge cap */}
              <rect x="4" y="1" width="92" height="2" rx="0.5" fill="currentColor" className="text-foreground/10" />
              {/* Cornice lines */}
              <line x1="0" y1="13" x2="100" y2="13" stroke="currentColor" strokeWidth="1" className="text-foreground/10" />
              <line x1="1" y1="11" x2="99" y2="11" stroke="currentColor" strokeWidth="0.5" className="text-foreground/6" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      className={`building-segment flex-1 ${heightClass} relative cursor-pointer overflow-visible flex flex-col justify-end animate-reveal ${staggerClass}`}
      style={{ transform: `translateX(${translateX}px)` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main building body */}
      <div className={`${colorClass} absolute inset-0 overflow-hidden`}>
        {/* Subtle vertical mortar lines */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 49%, currentColor 49%, currentColor 51%, transparent 51%)',
          backgroundSize: '33.33% 100%',
        }} />
      </div>

      {/* Roof */}
      {renderRoof()}

      {/* Upper cornice band */}
      <div className="absolute top-[2px] left-0 right-0 h-[3px] bg-foreground/8" />
      <div className="absolute top-[6px] left-[3px] right-[3px] h-[1px] bg-foreground/5" />

      {/* Windows grid */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: '14%' }}
      >
        <div
          className="grid gap-x-3 gap-y-4"
          style={{ gridTemplateColumns: `repeat(${windowCols}, 1fr)` }}
        >
          {Array.from({ length: totalWindows }).map((_, i) => {
            const isLit = litWindows.includes(i);
            return (
              <div
                key={i}
                className={`relative transition-all duration-300 ${isLit ? 'window-lit' : ''}`}
                style={{ width: 12, height: 18 }}
              >
                {/* Window frame */}
                <div className={`absolute inset-0 rounded-t-[2px] ${isLit ? 'bg-stone-wash' : 'bg-background/25'}`} />
                {/* Cross muntin - vertical */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-[0.5px] bg-foreground/20 z-10" />
                {/* Cross muntin - horizontal */}
                <div className="absolute top-[45%] left-0 right-0 h-[1px] bg-foreground/20 z-10" />
                {/* Sill */}
                <div className="absolute -bottom-[2px] -left-[1px] -right-[1px] h-[2px] bg-foreground/15 rounded-sm" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mid-floor cornice band */}
      <div className="absolute left-[4px] right-[4px] bg-foreground/6 h-[2px]" style={{ top: '55%' }} />
      <div className="absolute left-[2px] right-[2px] bg-foreground/4 h-[1px]" style={{ top: 'calc(55% + 3px)' }} />

      {/* Lower cornice / string course */}
      <div className="absolute left-0 right-0 bg-foreground/6 h-[2px]" style={{ bottom: '28px' }} />

      {/* Doorway */}
      {hasDoorway && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
          <div className="relative">
            {/* Door arch */}
            <div className="w-[16px] h-[22px] bg-foreground/25 rounded-t-[4px]" />
            {/* Door frame surround */}
            <div className="absolute -top-[1px] -left-[2px] -right-[2px] h-[24px] rounded-t-[5px] border border-foreground/10 pointer-events-none" />
            {/* Door knob */}
            <div className="absolute bottom-[8px] right-[3px] w-[1.5px] h-[1.5px] rounded-full bg-stone-wash/50" />
          </div>
        </div>
      )}

      {/* Segment Title */}
      <div
        className="font-display font-extrabold text-xl whitespace-nowrap absolute bottom-[120px] left-5 z-20"
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: 'left bottom',
        }}
      >
        {title}
      </div>

      {/* Building Label */}
      <div
        className="font-mono text-xs uppercase tracking-[0.3em] mb-5 opacity-60 relative z-20 pl-5"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        {index} // {label}
      </div>
    </div>
  );
};

export default BuildingSegment;
