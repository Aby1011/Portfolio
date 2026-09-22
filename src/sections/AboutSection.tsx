import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import { DECORATIVE_IMAGES, SITE } from '../data/constants';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-16 sm:px-8 sm:py-20 md:px-10"
    >


      {/* Top-left */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
        <img
          src={DECORATIVE_IMAGES.topLeft}
          alt=""
          className="absolute left-[1%] top-[4%] w-[60px] sm:w-[110px] md:w-[160px] lg:w-[180px]"
        />
      </FadeIn>

      {/* Top-right */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
        <img
          src={DECORATIVE_IMAGES.topRight}
          alt=""
          className="absolute right-[1%] top-[4%] w-[60px] sm:w-[110px] md:w-[160px] lg:w-[180px]"
        />
      </FadeIn>

      {/* Bottom-left */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
        <img
          src={DECORATIVE_IMAGES.bottomLeft}
          alt=""
          className="absolute bottom-[8%] left-[3%] w-[60px] sm:w-[110px] md:w-[160px] lg:w-[180px]"
        />
      </FadeIn>

      {/* Bottom-right */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
        <img
          src={DECORATIVE_IMAGES.bottomRight}
          alt=""
          className="absolute bottom-[8%] right-[3%] w-[60px] sm:w-[110px] md:w-[160px] lg:w-[180px]"
        />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <AnimatedText
          text={SITE.aboutText}
          className="max-w-[90%] text-center font-medium leading-relaxed text-[#D7E2EA] sm:max-w-[560px]"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.35rem)' }}
        />

        <FadeIn delay={0.2} y={20} className="mt-10 sm:mt-16 md:mt-20">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
