import Head from "next/head";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Car,
  ChevronRight,
  KeyRound,
  Leaf,
  Menu,
  MessageSquare,
  ShieldCheck,
  Waves,
  X,
} from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Residences", href: "#residences" },
  { label: "Architecture", href: "#architecture" },
  { label: "Lifestyle", href: "#lifestyle" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const heroStats = [
  { value: 12, suffix: "", label: "private homes" },
  { value: 4, suffix: "", label: "arrival courts" },
  { value: 2026, suffix: "", label: "release year" },
];

const residences = [
  {
    title: "Garden House",
    detail: "A ground-connected residence with private planting, concealed parking, and a quiet morning terrace.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Atrium House",
    detail: "Built around a central light well that draws daylight through the kitchen, stair, and primary suite.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Courtyard House",
    detail: "A deeper plan with layered privacy, full-height glazing, and sheltered indoor-outdoor living.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=88",
  },
];

const architecturePrinciples = [
  {
    number: "01",
    title: "Geometry with restraint",
    copy: "Project 12 uses long lines, measured volumes, and precise thresholds to create homes that feel composed before they feel decorative.",
  },
  {
    number: "02",
    title: "Materials with memory",
    copy: "Stone, bronze, timber, limewash, and low-sheen surfaces build a tactile interior language designed to age with confidence.",
  },
  {
    number: "03",
    title: "Privacy by design",
    copy: "Arrival courts, garden walls, filtered views, and acoustic planning shape the collection around modern private living.",
  },
];

const amenities = [
  { title: "Wellness garden", copy: "Native planting, shaded paths, and places to pause.", icon: Leaf },
  { title: "Residents lounge", copy: "A private room for hosting, working, and quiet evenings.", icon: KeyRound },
  { title: "Water courtyard", copy: "A calm pool edge framed by stone, timber, and soft light.", icon: Waves },
  { title: "Concierge access", copy: "Discreet coordination for tours, arrivals, and services.", icon: MessageSquare },
  { title: "EV ready parking", copy: "Secure resident parking prepared for electric mobility.", icon: Car },
  { title: "Layered security", copy: "Controlled entry, private paths, and smart monitoring.", icon: ShieldCheck },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1300&q=88",
    alt: "Project 12 exterior residence with pool and low evening light",
    size: "w-[82vw] sm:w-[560px] lg:w-[720px]",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=88",
    alt: "Warm architectural living room with stone fireplace",
    size: "w-[78vw] sm:w-[460px]",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=88",
    alt: "Private dining space with minimal furniture and garden views",
    size: "w-[78vw] sm:w-[520px]",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=88",
    alt: "Bedroom suite with refined neutral palette",
    size: "w-[78vw] sm:w-[460px]",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1300&q=88",
    alt: "Private residence bathroom with stone and glass detailing",
    size: "w-[82vw] sm:w-[580px]",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

function MotionSection({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-gold">
      <span className="font-display text-xl text-champagne">{number}</span>
      <span className="h-px w-12 bg-gold/70" />
      {children}
    </div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(value > 100 ? value - 18 : 0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const totalFrames = 56;
    const start = value > 100 ? value - 18 : 0;

    const tick = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(start + (value - start) * progress));

      if (frame < totalFrames) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
  const styles =
    variant === "primary"
      ? "bg-champagne text-ink hover:bg-parchment"
      : "border border-white/20 bg-white/[0.04] text-parchment backdrop-blur-md hover:border-gold hover:text-champagne";

  return (
    <a className={`${base} ${styles}`} href={href}>
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}

function ParallaxImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0 -inset-y-10" style={{ y }}>
        <Image className="object-cover" src={src} alt={alt} fill priority={priority} sizes="100vw" />
      </motion.div>
    </div>
  );
}

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Head>
        <title>Project 12 | Bespoke Private Residences</title>
        <meta
          name="description"
          content="Project 12 is a limited collection of 12 bespoke private residences focused on modern living, minimal architecture, privacy, and smart luxury."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-ink text-parchment">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/62 backdrop-blur-xl">
          <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="Main navigation">
            <a href="#top" className="font-display text-2xl font-semibold">
              Project 12
            </a>

            <div className="hidden items-center gap-7 xl:flex">
              {navLinks.map((link) => (
                <a key={link.label} className="text-sm text-limestone/80 transition hover:text-champagne" href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="hidden min-h-11 items-center justify-center border border-gold/70 px-5 text-sm font-semibold text-champagne transition hover:bg-gold hover:text-ink xl:inline-flex"
            >
              Request Private Access
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-parchment xl:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>

          {menuOpen && (
            <div className="border-t border-white/10 bg-charcoal/96 px-5 py-6 xl:hidden">
              <div className="mx-auto flex max-w-[1440px] flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    className="py-2 text-base text-limestone"
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="mt-2 inline-flex min-h-12 items-center justify-center bg-champagne px-5 text-sm font-semibold text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  Request Private Access
                </a>
              </div>
            </div>
          )}
        </header>

        <main id="top">
          <section className="relative min-h-screen overflow-hidden">
            <ParallaxImage
              className="absolute inset-0"
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90"
              alt="Project 12 private residence exterior with glass, stone, and warm interior light"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/86 via-ink/52 to-black/16" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />

            <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] content-end gap-12 px-5 pb-10 pt-28 sm:px-8 sm:pb-14 lg:grid-cols-[1fr_420px] lg:px-10 lg:pb-16">
              <motion.div
                className="max-w-4xl"
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.38em] text-champagne">
                  Bespoke Private Residences
                </p>
                <h1 className="font-display text-6xl font-semibold leading-[0.9] text-parchment sm:text-8xl lg:text-[8.5rem]">
                  Private Living. Redefined.
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-limestone sm:text-lg">
                  Project 12 is a limited architectural residence collection focused on modern private living, minimal design, and smart luxury that feels calm rather than loud.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <ButtonLink href="#residences">View The Collection</ButtonLink>
                  <ButtonLink href="#contact" variant="secondary">
                    Begin Private Inquiry
                  </ButtonLink>
                </div>
              </motion.div>

              <motion.div
                className="grid gap-3 self-end border border-white/14 bg-white/[0.06] p-3 shadow-glow backdrop-blur-xl sm:grid-cols-3 lg:grid-cols-1"
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {heroStats.map((stat) => (
                  <div key={stat.label} className="border border-white/10 bg-black/25 p-5">
                    <p className="font-display text-4xl text-champagne">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-limestone/78">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <MotionSection id="about" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32">
            <div>
              <SectionLabel number="01">About</SectionLabel>
              <h2 className="font-display text-4xl leading-tight text-parchment sm:text-6xl">
                An address for people who value discretion as much as design.
              </h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="self-end border border-white/12 bg-white/[0.05] p-6 backdrop-blur-lg">
                <p className="text-lg leading-8 text-limestone">
                  The vision is not to build more. It is to build with greater intention: 12 residences, each shaped around quiet arrival, generous light, efficient living, and privacy that is felt before it is seen.
                </p>
              </div>
              <ParallaxImage
                className="h-[420px] sm:h-[560px]"
                src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=88"
                alt="Minimal private residence interior with natural stone and warm timber"
              />
            </div>
          </MotionSection>

          <MotionSection id="residences" className="bg-soot py-24 lg:py-32">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
              <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                <div>
                  <SectionLabel number="02">Residences</SectionLabel>
                  <h2 className="font-display text-4xl leading-tight text-parchment sm:text-6xl">
                    Twelve homes, each with its own quiet rhythm.
                  </h2>
                </div>
                <p className="max-w-2xl text-lg leading-8 text-limestone">
                  Every Project 12 residence is treated as a distinct private house, not a repeated unit. Plans vary by light, garden exposure, entry sequence, and outdoor room.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {residences.map((residence, index) => (
                  <motion.article
                    key={residence.title}
                    className="group relative min-h-[520px] overflow-hidden border border-white/10 bg-charcoal"
                    initial={{ opacity: 0, y: 38 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      className="object-cover transition duration-700 group-hover:scale-105"
                      src={residence.image}
                      alt={`${residence.title} at Project 12`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 border border-white/16 bg-white/[0.08] p-5 backdrop-blur-xl transition duration-300 group-hover:bg-white/[0.12]">
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
                        Residence {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display text-3xl text-parchment">{residence.title}</h3>
                      <p className="mt-4 leading-7 text-limestone/86">{residence.detail}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </MotionSection>

          <section id="architecture" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-32">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionLabel number="03">Architecture Philosophy</SectionLabel>
              <h2 className="font-display text-5xl leading-none text-parchment sm:text-7xl lg:text-8xl">
                Minimal form, maximum privacy.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-8 text-limestone">
                The architecture is edited, tactile, and precise. Each choice supports a feeling: secure arrival, softened light, clear circulation, and rooms that open only when they should.
              </p>
            </div>

            <div className="grid gap-6">
              <ParallaxImage
                className="h-[440px] lg:h-[620px]"
                src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1500&q=88"
                alt="Architectural residence corridor with warm materials and precise geometry"
              />
              {architecturePrinciples.map((item) => (
                <motion.article
                  key={item.number}
                  className="grid gap-6 border border-white/12 bg-white/[0.045] p-6 backdrop-blur-xl sm:grid-cols-[110px_1fr] sm:p-8"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display text-5xl text-gold">{item.number}</p>
                  <div>
                    <h3 className="font-display text-3xl text-parchment">{item.title}</h3>
                    <p className="mt-4 leading-7 text-limestone/84">{item.copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <MotionSection id="lifestyle" className="bg-parchment py-24 text-ink lg:py-32">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
              <div className="mb-14 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                <div>
                  <p className="mb-7 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.32em] text-gold">
                    <span className="font-display text-xl text-charcoal">04</span>
                    <span className="h-px w-12 bg-gold" />
                    Lifestyle & Amenities
                  </p>
                  <h2 className="font-display text-4xl leading-tight sm:text-6xl">
                    Private spaces for a slower kind of luxury.
                  </h2>
                </div>
                <p className="max-w-2xl text-lg leading-8 text-charcoal/70">
                  Shared amenities are intentionally few, deeply resolved, and made for residents who prefer calm usefulness over spectacle.
                </p>
              </div>

              <div className="grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
                {amenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <article key={amenity.title} className="group min-h-64 bg-parchment p-7 transition hover:bg-[#e5dac5]">
                      <div className="mb-12 flex items-center justify-between">
                        <Icon className="h-7 w-7 text-gold" aria-hidden="true" />
                        <ChevronRight className="h-5 w-5 text-charcoal/35 transition group-hover:translate-x-1 group-hover:text-gold" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-3xl">{amenity.title}</h3>
                      <p className="mt-5 leading-7 text-charcoal/68">{amenity.copy}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </MotionSection>

          <MotionSection id="gallery" className="py-24 lg:py-32">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
              <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <SectionLabel number="05">Gallery</SectionLabel>
                  <h2 className="font-display text-4xl text-parchment sm:text-6xl">
                    A visual study in shadow, stone, and quiet light.
                  </h2>
                </div>
                <p className="max-w-md text-sm uppercase tracking-[0.24em] text-limestone/70">
                  Drag horizontally to explore
                </p>
              </div>
            </div>

            <div className="flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-10">
              {gallery.map((image, index) => (
                <figure
                  key={image.src}
                  className={`group relative h-[420px] shrink-0 snap-center overflow-hidden border border-white/10 bg-charcoal ${image.size} ${index % 2 === 0 ? "sm:h-[560px]" : "sm:h-[470px]"}`}
                >
                  <Image
                    className="object-cover transition duration-700 group-hover:scale-105"
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 620px, 82vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-transparent opacity-80 transition group-hover:opacity-45" />
                  <figcaption className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.26em] text-champagne">
                    View {String(index + 1).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </MotionSection>

          <MotionSection className="relative overflow-hidden py-24 lg:py-36">
            <ParallaxImage
              className="absolute inset-0"
              src="https://images.unsplash.com/photo-1600566752229-250ed79470d6?auto=format&fit=crop&w=2100&q=90"
              alt="Project 12 private residence courtyard with modern landscape design"
            />
            <div className="absolute inset-0 bg-ink/76" />
            <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_420px] lg:px-10">
              <div>
                <SectionLabel number="06">Availability</SectionLabel>
                <h2 className="font-display text-5xl leading-tight text-parchment sm:text-7xl">
                  Limited to 12. Released by private appointment.
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-limestone">
                  Availability is intentionally controlled to preserve the privacy of the collection. Register interest to receive the residence brief, pricing guidance, and appointment options.
                </p>
              </div>
              <div className="self-end border border-white/14 bg-white/[0.08] p-7 backdrop-blur-xl">
                <p className="font-display text-6xl text-champagne">
                  <Counter value={12} />
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.24em] text-limestone/78">
                  total residences
                </p>
                <div className="mt-8">
                  <ButtonLink href="#contact">Request The Private Brief</ButtonLink>
                </div>
              </div>
            </div>
          </MotionSection>

          <MotionSection id="contact" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-10 lg:py-32">
            <div>
              <SectionLabel number="07">Contact</SectionLabel>
              <h2 className="font-display text-4xl leading-tight text-parchment sm:text-6xl">
                Begin the Project 12 conversation.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-limestone">
                Register for private access, residence previews, and appointment availability with the Project 12 advisory team.
              </p>
              <div className="mt-10 grid gap-4 text-sm text-limestone/80">
                <p>12 Meridian Court, Toronto, ON</p>
                <p>private@project12residences.com</p>
                <p>Instagram / LinkedIn / Pinterest</p>
              </div>
            </div>

            <form
              className="grid gap-5 border border-white/12 bg-white/[0.055] p-5 shadow-glow backdrop-blur-xl sm:p-8"
              aria-label="Project 12 private inquiry form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-limestone">
                  Name
                  <input
                    className="min-h-12 border border-white/12 bg-black/25 px-4 text-parchment outline-none transition placeholder:text-stone focus:border-gold"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-limestone">
                  Email
                  <input
                    className="min-h-12 border border-white/12 bg-black/25 px-4 text-parchment outline-none transition placeholder:text-stone focus:border-gold"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium text-limestone">
                Phone
                <input
                  className="min-h-12 border border-white/12 bg-black/25 px-4 text-parchment outline-none transition placeholder:text-stone focus:border-gold"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 000 000 0000"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-limestone">
                Message
                <textarea
                  className="min-h-36 resize-y border border-white/12 bg-black/25 px-4 py-3 text-parchment outline-none transition placeholder:text-stone focus:border-gold"
                  name="message"
                  placeholder="Tell us which residence type or appointment window you are considering."
                />
              </label>
              <button
                type="submit"
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 bg-champagne px-6 text-sm font-bold text-ink transition hover:bg-parchment focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {submitted ? "Private Request Received" : "Send Private Request"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <p className="min-h-6 text-sm text-champagne" aria-live="polite">
                {submitted ? "Thank you. The advisory team will respond with private availability details." : ""}
              </p>
            </form>
          </MotionSection>
        </main>

        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 text-sm text-limestone/70 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
            <p className="font-display text-2xl text-parchment">Project 12</p>
            <p>12 Meridian Court, Toronto, ON</p>
            <p>(c) 2026 Project 12 Residences. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
