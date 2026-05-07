import { useEffect, useState } from 'react';
import BuildingSegment from './BuildingSegment';

const segments = [
  {
    title: 'Deqnus',
    label: 'Whole',
    index: '01',
    windowCount: 6,
    colorClass: 'bg-gamla-sage',
    heightClass: 'h-full',
  },
  {
    title: 'Code',
    label: 'Human',
    index: '02',
    windowCount: 8,
    colorClass: 'bg-gamla-coral',
    heightClass: 'h-[85%]',
  },
  {
    title: 'Chat',
    label: 'Scalable',
    index: '03',
    windowCount: 6,
    colorClass: 'bg-gamla-ochre',
    heightClass: 'h-[95%]',
  },
  {
    title: 'Game',
    label: 'Enduring',
    index: '04',
    windowCount: 4,
    colorClass: 'bg-gamla-yellow',
    heightClass: 'h-[75%]',
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
        const translateX = (mouseX - 0.5) * depth;

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
