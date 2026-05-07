import { useState, useCallback, useMemo } from 'react';

type RoofShape = 'flat' | 'arched' | 'stepped' | 'baroque';

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
  hasAnchors?: boolean;
  hasWindowPediments?: boolean;
  windowFrameClass?: string;
  groundFloorVariant?: 'arched' | 'simple' | 'grand';
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
  hasAnchors = false,
  hasWindowPediments = false,
  windowFrameClass = 'bg-foreground/15',
  groundFloorVariant = 'simple',
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
      }, i * 35);
    }
  }, [totalWindows]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setLitWindows([]);
  }, []);

  // Memoize the color for SVG use
  const svgColorClass = useMemo(() => colorClass.replace('bg-', 'text-'), [colorClass]);

  const renderRoof = () => {
    switch (roofShape) {
      case 'stepped':
        return (
          <div className="absolute -top-[28px] left-0 right-0">
            <svg viewBox="0 0 100 36" className="w-full h-[28px]" preserveAspectRatio="none">
              {/* Shadow/depth behind */}
              <path
                d="M-1,36 L-1,22 L10,22 L10,16 L22,16 L22,10 L34,10 L34,5 L44,5 L44,0 L56,0 L56,5 L66,5 L66,10 L78,10 L78,16 L90,16 L90,22 L101,22 L101,36 Z"
                fill="currentColor"
                className="text-foreground/25"
              />
              {/* Main gable */}
              <path
                d="M0,36 L0,23 L11,23 L11,17 L23,17 L23,11 L35,11 L35,6 L45,6 L45,1 L55,1 L55,6 L65,6 L65,11 L77,11 L77,17 L89,17 L89,23 L100,23 L100,36 Z"
                fill="currentColor"
                className={svgColorClass}
              />
              {/* Finial ornament */}
              <rect x="47" y="-2" width="6" height="4" rx="1" fill="currentColor" className="text-foreground/30" />
              <circle cx="50" cy="-4" r="2" fill="currentColor" className="text-foreground/25" />
            </svg>
          </div>
        );
      case 'arched':
        return (
          <div className="absolute -top-[24px] left-0 right-0">
            <svg viewBox="0 0 100 28" className="w-full h-[24px]" preserveAspectRatio="none">
              {/* Shadow */}
              <path d="M-1,28 L-1,14 Q50,-10 101,14 L101,28 Z" fill="currentColor" className="text-foreground/20" />
              {/* Main arch */}
              <path d="M0,28 L0,15 Q50,-8 100,15 L100,28 Z" fill="currentColor" className={svgColorClass} />
              {/* Cornice line at base of pediment */}
              <line x1="0" y1="26" x2="100" y2="26" stroke="currentColor" strokeWidth="0.8" className="text-foreground/15" />
              {/* Oculus (round window) */}
              <circle cx="50" cy="10" r="4" fill="currentColor" className="text-foreground/15" />
              <circle cx="50" cy="10" r="3" fill="currentColor" className="text-background/30" />
            </svg>
          </div>
        );
      case 'baroque':
        return (
          <div className="absolute -top-[26px] left-0 right-0">
            <svg viewBox="0 0 100 32" className="w-full h-[26px]" preserveAspectRatio="none">
              {/* Shadow */}
              <path d="M-1,32 L-1,18 Q10,14 20,16 Q35,8 50,4 Q65,8 80,16 Q90,14 101,18 L101,32 Z" fill="currentColor" className="text-foreground/20" />
              {/* Main baroque curve */}
              <path d="M0,32 L0,19 Q10,15 20,17 Q35,9 50,5 Q65,9 80,17 Q90,15 100,19 L100,32 Z" fill="currentColor" className={svgColorClass} />
              {/* Cornice */}
              <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.8" className="text-foreground/12" />
              {/* Ball finial */}
              <circle cx="50" cy="4" r="2.5" fill="currentColor" className="text-foreground/30" />
              <line x1="50" y1="6" x2="50" y2="10" stroke="currentColor" strokeWidth="1" className="text-foreground/20" />
              {/* Side urns/finials */}
              <circle cx="12" cy="16" r="1.5" fill="currentColor" className="text-foreground/15" />
              <circle cx="88" cy="16" r="1.5" fill="currentColor" className="text-foreground/15" />
            </svg>
          </div>
        );
      default:
        // Flat mansard-style with dark cap
        return (
          <div className="absolute -top-[14px] left-0 right-0">
            <svg viewBox="0 0 100 16" className="w-full h-[14px]" preserveAspectRatio="none">
              {/* Dark mansard cap */}
              <rect x="-1" y="0" width="102" height="10" fill="currentColor" className="text-foreground/40" />
              {/* Cap ledge */}
              <rect x="-2" y="8" width="104" height="3" fill="currentColor" className="text-foreground/25" />
              {/* Main body connection */}
              <rect x="0" y="10" width="100" height="6" fill="currentColor" className={svgColorClass} />
              {/* Cornice trim */}
              <line x1="-2" y1="8" x2="102" y2="8" stroke="currentColor" strokeWidth="0.6" className="text-foreground/15" />
            </svg>
          </div>
        );
    }
  };

  const renderWindow = (i: number) => {
    const isLit = litWindows.includes(i);
    return (
      <div key={i} className="relative flex flex-col items-center">
        {/* Window pediment (decorative cap above window) */}
        {hasWindowPediments && (
          <svg viewBox="0 0 20 6" className="w-[14px] h-[4px] mb-[1px]" preserveAspectRatio="none">
            <path d="M0,6 L2,1 Q10,-1 18,1 L20,6 Z" fill="currentColor" className="text-foreground/12" />
          </svg>
        )}
        {/* Window assembly */}
        <div className={`relative transition-all duration-300 ${isLit ? '' : ''}`} style={{ width: 14, height: 20 }}>
          {/* Window frame/surround */}
          <div className={`absolute -inset-[2px] rounded-t-[3px] ${windowFrameClass}`} />
          {/* Glass pane */}
          <div className={`absolute inset-0 rounded-t-[2px] ${isLit ? 'bg-stone-wash' : 'bg-background/20'} transition-all duration-300`} />
          {/* Cross muntin - vertical */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-[0.5px] bg-foreground/25 z-10" />
          {/* Cross muntin - horizontal */}
          <div className="absolute top-[42%] left-0 right-0 h-[1px] bg-foreground/25 z-10" />
          {/* Window sill */}
          <div className="absolute -bottom-[3px] -left-[3px] -right-[3px] h-[3px] bg-foreground/12 rounded-sm" />
          {/* Glow effect when lit */}
          {isLit && (
            <div className="absolute inset-0 rounded-t-[2px] shadow-[0_0_12px_2px_hsla(var(--stone-wash),0.3)]" />
          )}
        </div>
      </div>
    );
  };

  const renderIronAnchor = () => (
    <svg viewBox="0 0 10 12" className="w-[8px] h-[10px]" preserveAspectRatio="xMidYMid meet">
      {/* Vertical bar */}
      <rect x="4" y="0" width="2" height="12" rx="0.5" fill="currentColor" className="text-foreground/35" />
      {/* Horizontal bar */}
      <rect x="0" y="4" width="10" height="2" rx="0.5" fill="currentColor" className="text-foreground/35" />
      {/* Decorative ends */}
      <circle cx="1" cy="5" r="1" fill="currentColor" className="text-foreground/30" />
      <circle cx="9" cy="5" r="1" fill="currentColor" className="text-foreground/30" />
      <circle cx="5" cy="1" r="1" fill="currentColor" className="text-foreground/30" />
      <circle cx="5" cy="11" r="1" fill="currentColor" className="text-foreground/30" />
    </svg>
  );

  const renderGroundFloor = () => {
    switch (groundFloorVariant) {
      case 'arched':
        return (
          <div className="absolute bottom-0 left-0 right-0 h-[18%] z-10">
            {/* Stone base band */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/10" />
            <div className="absolute inset-0 bg-foreground/8" />
            {/* Grand archway */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <svg viewBox="0 0 28 36" className="w-[24px] h-[32px]">
                {/* Stone surround */}
                <path d="M0,36 L0,14 Q14,-2 28,14 L28,36 Z" fill="currentColor" className="text-foreground/15" />
                {/* Dark interior */}
                <path d="M3,36 L3,15 Q14,1 25,15 L25,36 Z" fill="currentColor" className="text-foreground/40" />
                {/* Keystone */}
                <path d="M12,3 L14,0 L16,3 Z" fill="currentColor" className="text-foreground/20" />
              </svg>
            </div>
          </div>
        );
      case 'grand':
        return (
          <div className="absolute bottom-0 left-0 right-0 h-[16%] z-10">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/10" />
            <div className="absolute inset-0 bg-foreground/6" />
            {/* Two doorways */}
            <div className="absolute bottom-0 left-[20%] -translate-x-1/2">
              <div className="w-[12px] h-[20px] bg-foreground/35 rounded-t-[2px]" />
            </div>
            <div className="absolute bottom-0 right-[20%] translate-x-1/2">
              <div className="w-[10px] h-[16px] bg-foreground/25 rounded-t-[2px]" />
            </div>
            {/* Ground window */}
            <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[10px] h-[12px] bg-background/15 rounded-t-[1px]">
              <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-foreground/20" />
            </div>
          </div>
        );
      default:
        return (
          <div className="absolute bottom-0 left-0 right-0 h-[14%] z-10">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/8" />
            <div className="absolute inset-0 bg-foreground/5" />
            {/* Simple door */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <div className="w-[14px] h-[22px] bg-foreground/30 rounded-t-[2px]">
                <div className="absolute bottom-[8px] right-[3px] w-[1.5px] h-[1.5px] rounded-full bg-stone-wash/40" />
              </div>
            </div>
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
        {/* Subtle plaster texture via gradient */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, currentColor 0.5px, transparent 0.5px),
            radial-gradient(ellipse at 70% 60%, currentColor 0.5px, transparent 0.5px),
            radial-gradient(ellipse at 40% 80%, currentColor 0.5px, transparent 0.5px)
          `,
          backgroundSize: '18px 22px, 24px 18px, 14px 26px',
        }} />
      </div>

      {/* Roof */}
      {renderRoof()}

      {/* Floor cornice bands */}
      {[35, 55, 75].map((top, idx) => (
        <div key={idx} className="absolute left-0 right-0" style={{ top: `${top}%` }}>
          <div className="h-[1.5px] bg-foreground/8" />
          <div className="h-[1px] bg-foreground/5 mt-[1px]" />
        </div>
      ))}

      {/* Windows grid with optional anchors */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '12%', bottom: '22%' }}>
        <div className="h-full flex flex-col justify-between">
          {Array.from({ length: windowRows }).map((_, row) => (
            <div key={row} className="flex items-center justify-center gap-3">
              {Array.from({ length: windowCols }).map((_, col) => {
                const windowIdx = row * windowCols + col;
                return (
                  <div key={col} className="flex items-center gap-[3px]">
                    {renderWindow(windowIdx)}
                    {/* Iron anchor between windows (not after last col) */}
                    {hasAnchors && col < windowCols - 1 && (
                      <div className="mx-[1px]">
                        {renderIronAnchor()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Ground floor */}
      {renderGroundFloor()}

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
