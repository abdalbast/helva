import { useEffect, useState } from 'react';
import BuildingSegment from './BuildingSegment';

const segments = [
  {
    title: 'RESPONSIBLE AI',
    label: 'Trustworthy',
    index: '01',
    windowRows: 3,
    windowCols: 2,
    colorClass: 'bg-gamla-sage',
    heightClass: 'h-full',
    roofShape: 'arched' as const,
  },
  {
    title: 'UK SOVEREIGNTY',
    label: 'Compliant',
    index: '02',
    windowRows: 4,
    windowCols: 2,
    colorClass: 'bg-gamla-coral',
    heightClass: 'h-[85%]',
    roofShape: 'flat' as const,
  },
  {
    title: 'DIGITAL INCLUSION',
    label: 'Accessible',
    index: '03',
    windowRows: 3,
    windowCols: 3,
    colorClass: 'bg-gamla-ochre',
    heightClass: 'h-[95%]',
    roofShape: 'stepped' as const,
  },
  {
    title: 'UNDERSERVED LANGUAGES',
    label: 'First Class',
    index: '04',
    windowRows: 3,
    windowCols: 2,
    colorClass: 'bg-gamla-yellow',
    heightClass: 'h-[75%]',
    roofShape: 'peaked' as const,
  },
];

const FacadeContainer = () => {
  const [mouseX, setMouseX] = useState(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="col-span-12 lg:col-span-6 lg:col-start-7 flex gap-3 h-[400px] lg:h-[70vh] items-end mt-16 lg:mt-0">
      {segments.map((segment, index) => {
        const depth = (index + 1) * 10;
        const translateX = (mouseX - 0.5) * depth + 24;

        return (
          <BuildingSegment
            key={segment.title}
            {...segment}
            staggerClass={`stagger-${index + 1}`}
            translateX={translateX}
          />
        );
      })}
    </section>
  );
};

export default FacadeContainer;
