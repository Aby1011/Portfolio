import { useEffect, useRef, useState } from 'react';
import { MARQUEE_IMAGES } from '../data/constants';

const ROW1 = MARQUEE_IMAGES.slice(0, 8);
const ROW2 = MARQUEE_IMAGES.slice(8);

function tripleImages(images: string[]) {
  return [...images, ...images, ...images];
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollOffset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(scrollOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Images = tripleImages(ROW1);
  const row2Images = tripleImages(ROW2);

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="mx-auto mb-8 px-6 md:px-10 w-full max-w-screen-xl">
        <h2 className="text-5xl font-black uppercase tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Tech Stack
        </h2>
      </div>

      {/* Scroll-parallax marquee rows */}
      <div className="flex flex-col gap-4">
        <div
          className="flex gap-4"
          style={{
            willChange: 'transform',
            transform: `translateX(${offset - 200}px)`,
          }}
        >
          {row1Images.map((src, i) => (
            <img
              key={`row1-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="h-10 w-auto shrink-0 object-contain sm:h-12 md:h-14 lg:h-16"
            />
          ))}
        </div>

        <div
          className="flex gap-4"
          style={{
            willChange: 'transform',
            transform: `translateX(${-(offset - 200)}px)`,
          }}
        >
          {row2Images.map((src, i) => (
            <img
              key={`row2-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="h-10 w-auto shrink-0 object-contain sm:h-12 md:h-14 lg:h-16"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
