import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import LiveProjectButton from '../components/LiveProjectButton';
import { PROJECTS } from '../data/projects';

const TOTAL_CARDS = PROJECTS.length;

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="relative h-[90vh] sm:h-[85vh]">
      <motion.div
        className="sticky rounded-[28px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-3 sm:rounded-[40px] sm:p-5 md:rounded-[50px] md:p-7 lg:rounded-[60px] lg:p-8"
        style={{
          top: `calc(${index * 20}px + 4.5rem)`,
          scale,
        }}
      >
        <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2rem, 8vw, 140px)' }}
            >
              {project.number}
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </p>
              <h3
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 3vw, 2.5rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <div className="mt-1 sm:mt-0">
            <LiveProjectButton href={project.liveUrl ?? '#projects'} />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row">
          {/* On mobile show only the main tall image to save vertical space */}
          <div className="hidden sm:flex w-full flex-col gap-3 sm:w-[40%]">
            <img
              src={project.images.leftTop}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full rounded-[20px] object-cover sm:rounded-[30px] md:rounded-[40px]"
              style={{ height: 'clamp(100px, 14vw, 230px)' }}
            />
            <img
              src={project.images.leftBottom}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full rounded-[20px] object-cover sm:rounded-[30px] md:rounded-[40px]"
              style={{ height: 'clamp(130px, 19vw, 340px)' }}
            />
          </div>
          <div className="w-full sm:w-[60%]">
            <img
              src={project.images.rightTall}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className="w-full rounded-[20px] object-cover sm:rounded-[30px] md:rounded-[40px]"
              style={{ height: 'clamp(200px, 45vw, 580px)' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-8 rounded-t-[30px] bg-[#0C0C0C] px-4 py-14 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-20 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      <div className="mx-auto max-w-6xl">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
