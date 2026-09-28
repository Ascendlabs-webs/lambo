import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, select, textarea, [role="button"], canvas');
        setIsPointer(!!clickable);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className="pointer-events-none fixed z-50 rounded-full transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '8px' : '5px',
          height: isPointer ? '8px' : '5px',
          backgroundColor: isPointer ? '#E5A823' : '#FFFFFF',
        }}
      />
      {/* Outer Luxury Halo */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '44px' : '26px',
          height: isPointer ? '44px' : '26px',
          borderColor: isPointer ? 'rgba(229, 168, 35, 0.65)' : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: isPointer ? 'rgba(229, 168, 35, 0.05)' : 'transparent',
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.15 : 1})`,
        }}
      />
    </>
  );
};
