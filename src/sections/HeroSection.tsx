import { useState, useEffect } from 'react';
import ResumeButton from '../components/ResumeButton';
import FadeIn from '../components/FadeIn';
import { NAV_LINKS, SITE } from '../data/constants';

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.classList.remove('mobile-nav-open');
    }
    return () => document.body.classList.remove('mobile-nav-open');
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // External links are handled natively by the <a> tag
    if (href.startsWith('mailto:') || href.startsWith('http')) return;
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex h-[100dvh] min-h-screen flex-col overflow-x-clip">
      {/* ── Nav bar ── */}
      <FadeIn delay={0} y={-20}>
        <nav className="relative z-50 flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7 md:px-10 md:pt-8">
          {/* Desktop links – hidden on mobile */}
          <div className="hidden sm:flex items-center justify-between w-full gap-6 md:gap-10">
            {NAV_LINKS.map((link) => {
              const isExternal = link.href.startsWith('http');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (!isExternal && !link.href.startsWith('mailto:')) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }
                  }}
                  className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-base lg:text-lg"
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile: hamburger button */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden ml-auto flex flex-col gap-[6px] p-2 z-[60] relative"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className="hamburger-line"
              style={menuOpen ? { transform: 'translateY(8px) rotate(45deg)' } : {}}
            />
            <span
              className="hamburger-line"
              style={menuOpen ? { opacity: 0, transform: 'scaleX(0)' } : {}}
            />
            <span
              className="hamburger-line"
              style={menuOpen ? { transform: 'translateY(-8px) rotate(-45deg)' } : {}}
            />
          </button>
        </nav>
      </FadeIn>

      {/* Mobile full-screen nav overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-[#0c0c0c]/95 backdrop-blur-md transition-all duration-300 sm:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {NAV_LINKS.map((link) => {
          const isExternal = link.href.startsWith('http');
          return (
            <a
              key={link.href}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              onClick={(e) => {
                if (!isExternal && !link.href.startsWith('mailto:')) e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-3xl font-black uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              {link.label}
            </a>
          );
        })}
      </div>

      {/* ── Hero heading ── */}
      <FadeIn delay={0.15} y={40} className="flex justify-center text-center w-full relative z-0">
        <h1 className="hero-heading mt-6 text-[14vw] font-black uppercase leading-[0.85] tracking-tight sm:mt-4 md:-mt-5 md:text-[15vw] lg:text-[16vw]">
          Hi, i&apos;m<br />abhijith
        </h1>
      </FadeIn>

      {/* ── Avatar image ── */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[230px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[340px] sm:translate-y-0 md:w-[430px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <div className="relative">
            <img
              src="/avatar-placeholder.png"
              alt={`${SITE.name} - ${SITE.title}`}
              className="h-auto w-full object-cover"
            />
            {/* Bottom fade — blends image into background */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 w-full"
              style={{
                height: '45%',
                background: 'linear-gradient(to bottom, transparent 0%, #0c0c0c 100%)',
              }}
            />
          </div>
        </FadeIn>
      </div>

      {/* ── Bottom bar: tagline + social links ── */}
      <div className="mt-auto flex items-end justify-between px-5 pb-6 sm:pb-8 sm:px-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[130px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[200px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.65rem, 1.4vw, 1.5rem)' }}
          >
            {SITE.heroTagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <div className="flex items-center gap-2 sm:gap-3">
            <ResumeButton />
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub - Aby1011"
              className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white/80 bg-black transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-[0_0_16px_rgba(255,255,255,0.3)] sm:h-12 sm:w-12 md:h-[52px] md:w-[52px]"
            >
              <img
                src="/assets/gitlogo.png"
                alt="GitHub Profile"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn - Abhi Jith"
              className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white/80 bg-black transition-all duration-300 hover:scale-105 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:shadow-[0_0_16px_rgba(10,102,194,0.5)] sm:h-12 sm:w-12 md:h-[52px] md:w-[52px]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.62 1.62 1.62 0 0 0 1.63 1.62 1.62 1.62 0 0 0 1.62-1.62 1.62 1.62 0 0 0-1.62-1.62Z" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
