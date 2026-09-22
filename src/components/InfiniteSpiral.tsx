import { useEffect, useRef, useState, useCallback } from 'react';

interface SpiralItem {
  src: string;
  alt: string;
}

interface InfiniteSpiralProps {
  items: SpiralItem[];
  animationMode?: 'auto' | 'scroll';
  speed?: number;
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardRadius?: number;
  centerScale?: number;
  edgeBlur?: number;
  cardsPerTurn?: number;
  pauseOnHover?: boolean;
  direction?: 'up' | 'down';
  rotation?: number;
  cardTilt?: number;
  edgeFade?: number;
  imageFit?: 'cover' | 'contain';
  grayscale?: number;
}

export default function InfiniteSpiral({
  items,
  speed = 0.55,
  radius = 115,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 66,
  perspective = 1000,
  cardRadius = 10,
  centerScale = 0.84,
  edgeBlur = 6,
  cardsPerTurn = 7,
  pauseOnHover = true,
  direction = 'up',
  rotation = 0,
  cardTilt = 0,
  edgeFade = 0.3,
  imageFit = 'cover',
  grayscale = 1,
}: InfiniteSpiralProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  // We need at least cardsPerTurn items visible; duplicate to fill
  const count = items.length;
  const totalHeight = count * verticalSpacing;

  const [, forceUpdate] = useState(0);

  const animate = useCallback(
    (time: number) => {
      if (!isPausedRef.current) {
        if (lastTimeRef.current !== null) {
          const delta = time - lastTimeRef.current;
          const dir = direction === 'up' ? 1 : -1;
          offsetRef.current =
            (offsetRef.current + dir * speed * (delta / 16.67)) % totalHeight;
          if (offsetRef.current < 0) offsetRef.current += totalHeight;
        }
        lastTimeRef.current = time;
        forceUpdate((n) => n + 1);
      } else {
        lastTimeRef.current = null;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    },
    [direction, speed, totalHeight]
  );

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [animate]);

  // Build visible cards: render 3× items so looping is seamless
  const renderItems = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onMouseEnter={() => pauseOnHover && (isPausedRef.current = true)}
      onMouseLeave={() => pauseOnHover && (isPausedRef.current = false)}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: `${perspective}px`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {renderItems.map((item, i) => {
          const baseIndex = i % count;
          // Position each card along the spiral
          const angle =
            ((baseIndex / cardsPerTurn) * 2 * Math.PI + rotation * (Math.PI / 180)) %
            (2 * Math.PI);

          // Raw vertical position before offset
          const rawY = i * verticalSpacing - offsetRef.current;
          // Normalize to container height range for seamless loop
          const containerHeight = containerRef.current?.clientHeight ?? 600;
          const halfH = containerHeight / 2;
          let y = ((rawY % (count * verticalSpacing)) + count * verticalSpacing) % (count * verticalSpacing) - halfH;

          // x based on radius and angle
          const x = Math.sin(angle) * radius;
          // depth: z from cosine
          const z = Math.cos(angle) * radius * 0.35;

          // Normalized depth [-1, 1]
          const depthNorm = Math.cos(angle); // -1 back, 1 front

          // Scale by depth
          const scale = centerScale + (1 - centerScale) * ((depthNorm + 1) / 2);

          // Blur by depth
          const blur = edgeBlur * (1 - (depthNorm + 1) / 2);

          // Fade edges (top/bottom of container)
          const distFromCenter = Math.abs(y) / halfH; // 0 center, 1 edge
          const fadeOpacity = distFromCenter > 1 - edgeFade
            ? Math.max(0, (1 - distFromCenter) / edgeFade)
            : 1;

          // Depth opacity
          const depthOpacity = 0.5 + 0.5 * ((depthNorm + 1) / 2);

          const opacity = fadeOpacity * depthOpacity;

          const tilt = cardTilt;

          return (
            <div
              key={`spiral-${i}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: cardWidth,
                height: cardHeight,
                transform: `
                  translate(-50%, -50%)
                  translateX(${x}px)
                  translateY(${y}px)
                  translateZ(${z}px)
                  scale(${scale})
                  rotateY(${tilt}deg)
                `,
                borderRadius: cardRadius,
                overflow: 'hidden',
                opacity,
                filter: `blur(${blur}px) grayscale(${grayscale})`,
                transition: 'filter 0.1s',
                pointerEvents: 'none',
                willChange: 'transform, opacity, filter',
                zIndex: Math.round((depthNorm + 1) * 50),
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: imageFit,
                  display: 'block',
                  userSelect: 'none',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
