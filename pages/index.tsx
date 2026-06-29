import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";

const PROJECT_NAME = "Project 12";
const DESIGNER_NAME = "Niroyan";
const DESIGNER_URL = "https://n12oyan.vercel.app/";

const floatingTags = ["Landing Page", "UI/UX Design", "Desktop 1920"];

const navItems = [
  { label: "Concept", href: "#concept" },
  { label: "Showcase", href: "#showcase" },
  { label: "System", href: "#system" },
  { label: "Gallery", href: "#gallery" },
  { label: "Responsive", href: "#responsive" },
];

const projectStats = [
  { label: "Screens", value: "12" },
  { label: "System", value: "01" },
  { label: "Launch", value: "2026" },
];

const showcaseItems = [
  {
    label: "01 / Cinematic Entry",
    title: "A landing page that opens like a film frame.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=90",
  },
  {
    label: "02 / Product Scene",
    title: "3D device mockup staged as a premium object.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "03 / Editorial System",
    title: "Swiss typography, floating labels, and strict rhythm.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90",
  },
];

const systemRows = [
  ["Typeface", "Satoshi / General Sans direction", "Oversized, tight, confident"],
  ["Motion", "GSAP + Framer Motion + Lenis", "Blur reveals and scroll parallax"],
  ["Mood", "#000, #fff, #A78BFA", "Brutalist luxury with glass layers"],
  ["Output", "Desktop 1920 / responsive", "Built for portfolio-grade presentation"],
];

const galleryImages = [
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1300&q=90",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1300&q=90",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1300&q=90",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1300&q=90",
  "https://images.unsplash.com/photo-1600566752229-250ed79470d6?auto=format&fit=crop&w=1300&q=90",
];

const responsiveNotes = [
  "Desktop-first composition with controlled overlaps",
  "Tablet spacing keeps the device mockup cinematic",
  "Mobile stacks preserve hierarchy without shrinking the idea",
];

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.86,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  useLenis();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.11]);
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const headlineBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".hero-word");
      const labels = gsap.utils.toArray<HTMLElement>(".floating-label");
      const revealItems = gsap.utils.toArray<HTMLElement>(".reveal-blur");

      gsap.set([laptopRef.current, detailsRef.current], { autoAlpha: 0 });
      gsap.set(letters, { yPercent: 112, rotate: 4, autoAlpha: 0 });
      gsap.set(labels, { y: 18, autoAlpha: 0, filter: "blur(12px)" });

      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      timeline
        .to(letters, {
          yPercent: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 1.15,
          stagger: 0.08,
        })
        .to(
          laptopRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.25,
          },
          "-=0.72"
        )
        .to(
          labels,
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.78,
            stagger: 0.09,
          },
          "-=0.72"
        )
        .to(
          detailsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
          },
          "-=0.64"
        );

      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 54, filter: "blur(16px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
            },
          }
        );
      });
    });

    return () => context.revert();
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    setTilt({
      x: Number((-y * 7).toFixed(2)),
      y: Number((x * 10).toFixed(2)),
    });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <>
      <Head>
        <title>Project 12 | A New Era of Digital Experience</title>
        <meta
          name="description"
          content="A cinematic luxury hero page for Project 12, blending architectural storytelling, oversized Swiss typography, parallax motion, and a premium 3D laptop showcase."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-black text-white">
        <header className="fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-black/52 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-10">
          <nav className="mx-auto grid max-w-[1500px] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]" aria-label="Primary navigation">
            <a href="#" className="text-xs font-black uppercase tracking-[0.28em] text-white">
              Project 12
            </a>

            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="border border-white/10 bg-white/[0.045] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/62 transition hover:border-[#A78BFA]/60 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href={DESIGNER_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden justify-self-end text-right text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48 transition hover:text-white lg:block"
            >
              Designed by {DESIGNER_NAME}
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center justify-self-end border border-white/14 bg-white/[0.05] text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? "X" : "M"}
            </button>
          </nav>

          {menuOpen && (
            <div className="mx-auto mt-4 grid max-w-[1500px] gap-2 border-t border-white/10 pt-4 lg:hidden">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/42">
                UI/UX Design Website / {DESIGNER_NAME}
              </p>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="border border-white/10 bg-white/[0.055] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/74 backdrop-blur-xl"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#launch"
                className="bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.24em] text-black"
                onClick={() => setMenuOpen(false)}
              >
                Start Project
              </a>
            </div>
          )}
        </header>

        <section
          ref={heroRef}
          className="relative isolate min-h-[760px] overflow-hidden bg-black px-4 pb-5 pt-24 sm:min-h-screen sm:px-6 lg:px-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="pointer-events-none absolute inset-0 z-40 opacity-[0.13] mix-blend-screen [background-image:radial-gradient(circle_at_center,white_0.75px,transparent_0.75px)] [background-size:4px_4px]" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_66%_40%,rgba(167,139,250,0.22),transparent_25%),radial-gradient(circle_at_42%_72%,rgba(245,158,11,0.15),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="relative z-50 hidden grid-cols-3 gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/82 md:grid">
            <p>UI/UX Design Website</p>
            <p className="text-center text-white/50">Architectural Digital Showcase</p>
            <a
              href={DESIGNER_URL}
              target="_blank"
              rel="noreferrer"
              className="text-right text-white/70 transition hover:text-white"
            >
              Designed by {DESIGNER_NAME}
            </a>
          </div>

          <motion.h1
            ref={titleRef}
            className="pointer-events-none absolute left-4 right-4 top-[16vh] z-30 max-w-[1760px] text-[20vw] font-black uppercase leading-[0.82] tracking-[-0.075em] text-white sm:left-6 sm:right-6 sm:top-[13vh] md:top-[12vh] lg:left-10 lg:right-10 lg:top-[10vh] lg:text-[12.2vw]"
            style={{ y: headlineY, filter: headlineBlur }}
            aria-label={`${PROJECT_NAME} - A New Era of Digital Experience`}
          >
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">{PROJECT_NAME}</span>
            </span>
            <span className="block overflow-hidden pl-[5vw] text-[14vw] text-white/92 sm:pl-[14vw] sm:text-[12vw] lg:text-[7.8vw]">
              <span className="hero-word inline-block">A New Era</span>
            </span>
            <span className="block overflow-hidden text-[13vw] text-white/84 sm:text-[11.8vw] lg:text-[7.4vw]">
              <span className="hero-word inline-block">of Digital Experience</span>
            </span>
          </motion.h1>

          <motion.div
            className="absolute left-1/2 top-[49%] z-20 w-[132vw] max-w-[1180px] -translate-x-1/2 -translate-y-1/2 sm:top-[50%] sm:w-[98vw] md:w-[90vw] lg:top-[52%] lg:w-[78vw]"
            style={{ y: laptopY, scale: heroScale }}
          >
            <div
              ref={laptopRef}
              className="relative mx-auto aspect-[1.48] w-full"
              style={{
                transform: `perspective(1400px) rotateX(${58 + tilt.x}deg) rotateZ(${-10 + tilt.y * 0.18}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 420ms cubic-bezier(.22,1,.36,1)",
              }}
            >
              <div className="absolute left-1/2 top-[52%] h-[18%] w-[86%] -translate-x-1/2 rounded-[50%] bg-black blur-3xl" />

              <div className="absolute inset-x-[9%] bottom-[12%] h-[28%] rounded-[50%] bg-[linear-gradient(90deg,rgba(60,42,32,0.35),rgba(244,171,82,0.28),rgba(18,18,18,0.7))] blur-2xl" />

              <div className="absolute inset-x-[8%] bottom-[13%] z-0 h-[20%] overflow-hidden rounded-[50%] border border-white/5 bg-stone-950 shadow-[0_44px_160px_rgba(0,0,0,0.95)]">
                <Image
                  className="object-cover opacity-75 saturate-75"
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1700&q=88"
                  alt="Dark rocky surface supporting the Project 12 laptop mockup"
                  fill
                  sizes="80vw"
                  priority
                />
              </div>

              <div className="absolute inset-x-[12%] bottom-[30%] z-20 aspect-[1.63] rounded-[1.2vw] border border-white/18 bg-zinc-950 p-[0.72vw] shadow-[0_50px_150px_rgba(0,0,0,0.88),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                <div className="relative h-full overflow-hidden rounded-[0.78vw] bg-black">
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.045, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      className="object-cover"
                      src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=92"
                      alt="Premium architectural residence displayed inside laptop screen"
                      fill
                      sizes="70vw"
                      priority
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/48 via-transparent to-orange-300/24" />
                  <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.16)_42%,transparent_58%)] opacity-70" />
                  <div className="absolute left-4 top-4 border border-white/14 bg-black/28 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur-md sm:left-6 sm:top-6">
                    Project Preview
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-[4%] bottom-[20%] z-10 h-[14%] rounded-[0_0_2vw_2vw] border-x border-b border-white/12 bg-[linear-gradient(180deg,#d7d7d7_0%,#717171_34%,#171717_100%)] shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]" />
              <div className="absolute inset-x-[29%] bottom-[19.2%] z-30 h-[1.3%] rounded-full bg-white/30 blur-[1px]" />
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-50">
            {floatingTags.map((tag, index) => (
              <span
                key={tag}
                className={`floating-label absolute border border-white/14 bg-white/[0.075] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82 shadow-[0_18px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl ${
                  index === 0
                    ? "left-[5%] top-[38%] sm:left-[7%] sm:top-[35%]"
                    : index === 1
                      ? "right-[5%] top-[39%] sm:right-[8%] sm:top-[32%]"
                      : "bottom-[30%] right-[8%] hidden sm:block lg:right-[12%] lg:bottom-[28%]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            ref={detailsRef}
            className="absolute bottom-5 left-4 right-4 z-50 grid gap-4 md:grid-cols-[1fr_auto] md:items-end lg:left-10 lg:right-10"
          >
            <p className="max-w-[19rem] text-xs leading-5 text-white/62 sm:max-w-sm sm:text-base sm:leading-7">
              A cinematic hero system for premium real-estate storytelling, designed with brutalist restraint, soft glass overlays, responsive hierarchy, and a floating product-grade device scene.
            </p>
            <p className="text-right text-[24vw] font-black leading-none tracking-[-0.08em] text-white md:text-[9rem] lg:text-[11rem]">
              2026
            </p>
          </div>
        </section>

        <section id="overview" className="relative scroll-mt-24 bg-black px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="reveal-blur">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#A78BFA]">Scroll System</p>
              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
                Luxury interface. Built like an architectural object.
              </h2>
            </div>
            <div className="grid gap-px bg-white/12 md:grid-cols-3">
              {projectStats.map((stat) => (
                <article key={stat.label} className="reveal-blur min-h-56 bg-black p-6">
                  <p className="text-6xl font-black tracking-[-0.08em] text-white">{stat.value}</p>
                  <p className="mt-20 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="concept" className="relative scroll-mt-24 overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1500px] gap-14 border-t border-white/10 pt-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="reveal-blur lg:sticky lg:top-10 lg:self-start">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-white/42">01 / Concept</p>
              <h2 className="text-[16vw] font-black uppercase leading-[0.78] tracking-[-0.08em] text-white lg:text-[8.6vw]">
                Digital
                <span className="block pl-[10vw] text-white/50 lg:pl-[5vw]">Estate</span>
                System
              </h2>
            </div>
            <div className="grid gap-10">
              <p className="reveal-blur max-w-3xl text-2xl leading-tight tracking-[-0.04em] text-white/76 sm:text-4xl lg:text-5xl">
                Project 12 is presented as a premium architectural interface: less decoration, more atmosphere, with the laptop mockup treated like a luxury object inside a cinematic black set.
              </p>
              <div className="reveal-blur grid gap-px bg-white/10 sm:grid-cols-2">
                <div className="min-h-60 bg-black p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A78BFA]">Visual Tone</p>
                  <p className="mt-24 text-xl leading-snug text-white/66">Dark, quiet, sharp, spatial, and intentionally over-scaled.</p>
                </div>
                <div className="min-h-60 bg-black p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A78BFA]">Experience</p>
                  <p className="mt-24 text-xl leading-snug text-white/66">Parallax movement, glass labels, editorial reveals, and a controlled sense of depth.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="showcase" className="scroll-mt-24 bg-black px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1500px]">
            <div className="reveal-blur mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#A78BFA]">02 / Showcase</p>
                <h2 className="max-w-5xl text-6xl font-black uppercase leading-[0.82] tracking-[-0.07em] text-white sm:text-8xl lg:text-[10rem]">
                  Image-heavy storytelling.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/46">
                Large architectural visuals carry the page, while typography breaks the grid and glass UI tags act like interface artifacts.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {showcaseItems.map((item, index) => (
                <article
                  key={item.label}
                  className={`reveal-blur group relative min-h-[520px] overflow-hidden border border-white/10 bg-zinc-950 ${
                    index === 1 ? "lg:mt-20" : index === 2 ? "lg:mt-40" : ""
                  }`}
                >
                  <Image
                    className="object-cover opacity-78 saturate-75 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 border border-white/14 bg-black/28 p-5 backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A78BFA]">{item.label}</p>
                    <h3 className="mt-5 text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="system" className="scroll-mt-24 bg-black px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1500px] border-y border-white/10">
            {systemRows.map((row, index) => (
              <div key={row[0]} className="reveal-blur grid gap-6 border-b border-white/10 py-8 last:border-b-0 lg:grid-cols-[120px_1fr_1fr] lg:items-center">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/35">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-white sm:text-6xl">{row[0]}</h3>
                <div>
                  <p className="text-xl font-semibold tracking-[-0.03em] text-white">{row[1]}</p>
                  <p className="mt-2 text-sm leading-6 text-white/45">{row[2]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" className="scroll-mt-24 overflow-hidden bg-black py-20 lg:py-32">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
            <p className="reveal-blur mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#A78BFA]">03 / Gallery</p>
            <h2 className="reveal-blur max-w-6xl text-6xl font-black uppercase leading-[0.82] tracking-[-0.07em] text-white sm:text-8xl lg:text-[10rem]">
              Dark visual archive.
            </h2>
          </div>
          <div className="mt-12 flex snap-x gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-10">
            {galleryImages.map((src, index) => (
              <figure
                key={src}
                className={`reveal-blur relative shrink-0 snap-center overflow-hidden border border-white/10 bg-zinc-950 ${
                  index % 2 === 0 ? "h-[560px] w-[82vw] sm:w-[620px]" : "h-[460px] w-[76vw] self-end sm:w-[500px]"
                }`}
              >
                <Image className="object-cover opacity-80 transition duration-700 hover:scale-105 hover:opacity-100" src={src} alt={`Project 12 gallery frame ${index + 1}`} fill sizes="620px" />
                <figcaption className="absolute bottom-5 left-5 border border-white/12 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 backdrop-blur-xl">
                  Frame {String(index + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="responsive" className="relative scroll-mt-24 overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
          <div className="absolute inset-0 opacity-25">
            <Image
              className="object-cover"
              src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1800&q=90"
              alt="Architectural dark background for responsive design section"
              fill
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black/78" />
          <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_520px] lg:items-end">
            <div className="reveal-blur">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#A78BFA]">04 / Responsive</p>
              <h2 className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.07em] text-white sm:text-8xl lg:text-[10rem]">
                Scales without losing drama.
              </h2>
            </div>
            <div className="grid gap-3">
              {responsiveNotes.map((note) => (
                <div key={note} className="reveal-blur border border-white/12 bg-white/[0.06] p-5 text-lg font-semibold tracking-[-0.03em] text-white/75 backdrop-blur-xl">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="launch" className="scroll-mt-24 bg-black px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[1500px]">
            <div className="reveal-blur border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-10 lg:p-14">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-[#A78BFA]">05 / Launch</p>
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <h2 className="max-w-5xl text-6xl font-black uppercase leading-[0.82] tracking-[-0.07em] text-white sm:text-8xl lg:text-[9.4rem]">
                  Ready for the next digital reveal.
                </h2>
                <a
                  href="mailto:hello@project12.studio"
                  className="inline-flex min-h-14 items-center justify-center border border-white/18 bg-white px-7 text-sm font-black uppercase tracking-[0.22em] text-black transition hover:bg-[#A78BFA]"
                >
                  Start Project
                </a>
              </div>
              <div className="mt-16 grid gap-6 text-xs font-semibold uppercase tracking-[0.26em] text-white/42 sm:grid-cols-3">
                <p>Project 12</p>
                <p>Architectural Showcase Website</p>
                <p className="sm:text-right">2026 / Digital Experience</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
