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

  const renderRoof = () => {
    switch (roofShape) {
      case 'stepped':
        // Crow-step gable like the terracotta building in Gamla Stan
        return (
          <div className="absolute -top-[24px] left-0 right-0 flex justify-center">
            <svg viewBox="0 0 100 30" className="w-full h-[24px]" preserveAspectRatio="none">
              <path
                d="M0,30 L0,18 L12,18 L12,12 L24,12 L24,6 L38,6 L38,0 L62,0 L62,6 L76,6 L76,12 L88,12 L88,18 L100,18 L100,30 Z"
                fill="currentColor"
                className="text-foreground/20"
              />
              <path
                d="M2,30 L2,20 L14,20 L14,14 L26,14 L26,8 L40,8 L40,2 L60,2 L60,8 L74,8 L74,14 L86,14 L86,20 L98,20 L98,30 Z"
                fill="currentColor"
                className={colorClass.replace('bg-', 'text-')}
              />
            </svg>
          </div>
        );
      case 'arched':
        // Rounded pediment like the teal/green building
        return (
          <div className="absolute -top-[20px] left-0 right-0 flex justify-center">
            <svg viewBox="0 0 100 24" className="w-full h-[20px]" preserveAspectRatio="none">
              <path
                d="M0,24 L0,12 Q50,-8 100,12 L100,24 Z"
                fill="currentColor"
                className="text-foreground/20"
              />
              <path
                d="M2,24 L2,13 Q50,-6 98,13 L98,24 Z"
                fill="currentColor"
                className={colorClass.replace('bg-', 'text-')}
              />
            </svg>
          </div>
        );
      case 'peaked':
        // Simple triangular pediment with a finial
        return (
          <div className="absolute -top-[22px] left-0 right-0 flex justify-center">
            <svg viewBox="0 0 100 28" className="w-full h-[22px]" preserveAspectRatio="none">
              <path
                d="M0,28 L0,16 L50,0 L100,16 L100,28 Z"
                fill="currentColor"
                className="text-foreground/20"
              />
              <path
                d="M2,28 L2,17 L50,2 L98,17 L98,28 Z"
                fill="currentColor"
                className={colorClass.replace('bg-', 'text-')}
              />
              {/* Finial */}
              <circle cx="50" cy="3" r="2.5" fill="currentColor" className="text-foreground/30" />
            </svg>
          </div>
        );
      default:
        // Flat roof with a subtle cornice
        return (
          <div className="absolute -top-[6px] left-0 right-0">
            <div className="h-[3px] bg-foreground/15 mx-0" />
            <div className="h-[3px] bg-foreground/10 mx-1 mt-[1px]" />
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

      {/* Cornice / floor divider line */}
      <div className="absolute top-[8px] left-[6px] right-[6px] h-[1px] bg-foreground/8" />

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

      {/* Doorway */}
      {hasDoorway && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
          <div className="relative">
            <div className="w-[16px] h-[22px] bg-foreground/25 rounded-t-[3px]" />
            {/* Door frame highlight */}
            <div className="absolute -top-[1px] -left-[2px] -right-[2px] h-[1px] bg-foreground/15" />
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
