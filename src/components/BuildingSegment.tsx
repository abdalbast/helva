import { useState, useCallback } from 'react';

interface BuildingSegmentProps {
  title: string;
  label: string;
  index: string;
  windowCount: number;
  colorClass: string;
  heightClass: string;
  staggerClass: string;
  translateX: number;
}

const BuildingSegment = ({
  title,
  label,
  index,
  windowCount,
  colorClass,
  heightClass,
  staggerClass,
  translateX,
}: BuildingSegmentProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [litWindows, setLitWindows] = useState<number[]>([]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    // Sequentially light up windows
    const windows: number[] = [];
    for (let i = 0; i < windowCount; i++) {
      setTimeout(() => {
        windows.push(i);
        setLitWindows([...windows]);
      }, i * 50);
    }
  }, [windowCount]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setLitWindows([]);
  }, []);

  return (
    <div
      className={`building-segment flex-1 ${heightClass} ${colorClass} relative cursor-pointer overflow-hidden flex flex-col justify-end p-5 animate-reveal ${staggerClass}`}
      style={{ transform: `translateX(${translateX}px)` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Windows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 grid grid-cols-2 gap-4 opacity-30">
        {Array.from({ length: windowCount }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-5 bg-background rounded-t-sm transition-all duration-300 ${
              litWindows.includes(i) ? 'window-lit' : ''
            }`}
          />
        ))}
      </div>

      {/* Segment Title */}
      <div
        className="font-display font-extrabold text-xl whitespace-nowrap absolute bottom-[120px] left-5"
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: 'left bottom',
        }}
      >
        {title}
      </div>

      {/* Building Label */}
      <div
        className="font-mono text-xs uppercase tracking-[0.3em] mb-5 opacity-60"
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
