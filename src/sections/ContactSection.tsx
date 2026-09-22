import { ExternalLink, Mail, Phone } from 'lucide-react';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import { CERTIFICATIONS, EDUCATION, SITE } from '../data/constants';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] px-4 py-14 sm:px-8 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center sm:gap-12">
        <FadeIn y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 120px)' }}
          >
            Contact
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 text-[#D7E2EA] transition-opacity hover:opacity-70"
            >
              <Mail size={20} />
              <span className="text-sm sm:text-base">{SITE.email}</span>
            </a>
            <a
              href={`tel:${SITE.phone.replace(/-/g, '')}`}
              className="flex items-center gap-3 text-[#D7E2EA] transition-opacity hover:opacity-70"
            >
              <Phone size={20} />
              <span className="text-sm sm:text-base">{SITE.phone}</span>
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#D7E2EA] transition-opacity hover:opacity-70"
            >
              <ExternalLink size={20} />
              <span className="text-sm sm:text-base">LinkedIn</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <ContactButton />
        </FadeIn>

        <FadeIn delay={0.3} y={20} className="w-full">
          <div className="mt-8 border-t border-[#D7E2EA]/15 pt-10">
            <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
              Education
            </h3>
            <div className="flex flex-col gap-4">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="text-[#D7E2EA]">
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-sm opacity-60">
                    {edu.institution} · {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} y={20} className="w-full">
          <div className="border-t border-[#D7E2EA]/15 pt-10">
            <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
              Certifications
            </h3>
            <div className="flex flex-col gap-4">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title} className="text-[#D7E2EA]">
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-sm opacity-60">
                    {cert.issuer} · {cert.period}
                  </p>
                  <p className="text-xs opacity-40">{cert.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/30">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
