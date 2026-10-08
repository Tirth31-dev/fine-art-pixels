import { createFileRoute } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Menu,
  MoveUpRight,
  X,
} from "lucide-react";
import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

import founderPortrait from "@/assets/founder-portrait.jpg";
import projectAera from "@/assets/project-aera.jpg";
import projectKinetic from "@/assets/project-kinetic.jpg";
import projectNoir from "@/assets/project-noir.jpg";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mindful Designer — Graphic Design Agency" },
      {
        name: "description",
        content:
          "A Fine Art–led graphic design agency creating meaningful brands, packaging, campaigns, and digital experiences.",
      },
      { property: "og:title", content: "Mindful Designer — Graphic Design Agency" },
      {
        property: "og:description",
        content: "Thoughtful ideas, refined visuals, and modern graphic design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const projects = [
  {
    title: "Aera Rituals",
    category: "Packaging",
    year: "2026",
    image: projectAera,
    size: "tall",
    description:
      "A quiet skincare identity balancing clinical clarity with the tactility of a daily ritual.",
  },
  {
    title: "River / Beyond",
    category: "Creative Direction",
    year: "2026",
    image: projectKinetic,
    size: "wide",
    description:
      "A modular identity for a contemporary arts festival, designed to move between stage, street, and screen.",
  },
  {
    title: "Noir Origins",
    category: "Brand Identity",
    year: "2025",
    image: projectNoir,
    size: "tall",
    description:
      "An expressive luxury system rooted in cacao provenance, material depth, and restrained storytelling.",
  },
];

const services = [
  ["01", "Brand Identity", "Distinctive systems that turn strategy into a memorable visual world."],
  ["02", "Logo Design", "Original marks built for recognition, longevity, and every scale."],
  [
    "03",
    "Packaging Design",
    "Tactile, shelf-ready experiences that make products feel considered.",
  ],
  [
    "04",
    "Social Media",
    "Flexible campaign systems with a consistent, unmistakable point of view.",
  ],
  ["05", "Poster Design", "Bold compositions that earn attention and reward a closer look."],
  ["06", "Typography", "Type-led identities, custom treatments, and editorial systems."],
  ["07", "Creative Direction", "A clear visual language across photography, print, and campaigns."],
  ["08", "UI/UX Design", "Useful digital experiences shaped with clarity and character."],
];

const delay = (seconds: number): CSSProperties =>
  ({
    "--reveal-delay": `${seconds.toFixed(2)}s`,
    transitionDelay: `${seconds.toFixed(2)}s`,
    animationDelay: `${seconds.toFixed(2)}s`,
  }) as CSSProperties;

function SectionLabel({
  children,
  light = false,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={cn(
        "flex items-center gap-3 text-[11px] font-bold uppercase",
        light ? "text-hero" : "text-primary",
        className,
      )}
    >
      <span aria-hidden="true">✦</span>
      {children}
    </div>
  );
}

function Crosshair({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute z-20 grid size-4 place-items-center text-sm font-light text-hero-ink/60",
        className,
      )}
    >
      +
    </span>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [sent, setSent] = useState(false);
  useSmoothScroll(menuOpen || contactOpen || Boolean(activeProject));
  const filtered =
    filter === "All" ? projects : projects.filter((project) => project.category === filter);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const windowHeight = window.innerHeight;
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
        element.classList.add("is-visible");
        element.classList.remove("is-above", "is-below");
      } else if (rect.bottom <= 0) {
        element.classList.add("is-above");
        element.classList.remove("is-visible", "is-below");
      } else {
        element.classList.add("is-below");
        element.classList.remove("is-visible", "is-above");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const rect = entry.boundingClientRect;
          const rootTop = entry.rootBounds ? entry.rootBounds.top : 0;

          if (entry.isIntersecting) {
            target.classList.add("is-visible");
            target.classList.remove("is-above", "is-below");
          } else {
            target.classList.remove("is-visible");
            if (rect.bottom < rootTop) {
              target.classList.add("is-above");
              target.classList.remove("is-below");
            } else {
              target.classList.add("is-below");
              target.classList.remove("is-above");
            }
          }
        }
      },
      {
        threshold: [0, 0.15],
        rootMargin: "-20px 0px -40px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filter]);

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
  };

  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-hero-ink/15 bg-hero/95 text-hero-ink backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#home" className="text-sm font-extrabold">
            Mindful Designer<sup>®</sup>
          </a>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-9 text-xs font-semibold md:flex"
          >
            {["About", "Portfolio", "Services", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="border-b border-transparent py-2 transition-colors hover:border-current"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </header>

      <section
        id="home"
        className="editorial-grid relative min-h-[760px] overflow-hidden bg-hero pt-16 text-hero-ink lg:min-h-[880px]"
      >
        <Crosshair className="left-[6%] top-24" />
        <Crosshair className="right-[5%] top-24" />
        <Crosshair className="bottom-10 left-[6%]" />
        <Crosshair className="bottom-10 right-[5%]" />
        <div className="relative mx-auto min-h-[696px] max-w-[1440px] px-5 md:px-10 lg:min-h-[816px]">
          <p
            data-reveal
            style={delay(0.1)}
            className="absolute left-5 top-16 z-20 max-w-[220px] text-xs font-bold uppercase leading-relaxed md:left-10 md:top-[40%]"
          >
            We shape thoughtful ideas into refined, visually powerful identities.
          </p>
          <p
            aria-hidden="true"
            className="display-type animate-fade-in absolute inset-x-0 top-12 text-center text-[clamp(4.2rem,15vw,14rem)] leading-none text-hero-ink/10"
          >
            Mindful
          </p>
          <div
            data-reveal
            style={delay(0.2)}
            className="absolute inset-x-[12%] bottom-0 top-20 z-10 md:inset-x-[28%] md:top-12"
          >
            <img
              src={founderPortrait}
              alt="Founder and creative designer of Mindful Designer"
              width={1200}
              height={1600}
              className="size-full object-cover object-[50%_18%] mix-blend-multiply"
            />
          </div>
          <div data-reveal style={delay(0.35)} className="absolute bottom-9 left-5 z-30 md:left-10">
            <p className="mb-2 text-xs font-bold">©2026 / Independent studio</p>
            <h1 className="display-type max-w-[13ch] text-[clamp(3.2rem,8.7vw,8.7rem)] leading-[.82] text-background">
              <span className="scroll-text-line">
                <span>Mindful</span>
              </span>
              <span className="scroll-text-line" style={delay(0.08)}>
                <span>Designer</span>
              </span>
            </h1>
          </div>
          <div
            data-reveal
            style={delay(0.5)}
            className="absolute bottom-40 right-5 z-30 hidden bg-hero-ink p-2 text-background shadow-[6px_6px_0_var(--background)] md:flex md:w-64 md:items-center md:gap-3 lg:bottom-28"
          >
            <img
              src={founderPortrait}
              alt=""
              width={1200}
              height={1600}
              className="size-14 object-cover object-top"
            />
            <div className="min-w-0 flex-1">
              <span className="block text-[9px] text-background/65">
                Founder / Creative Designer
              </span>
              <strong className="text-xs">Let&apos;s make it matter.</strong>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 border border-background/20"
              aria-label="Start a project"
              onClick={() => setContactOpen(true)}
            >
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-border border-x border-border md:grid-cols-4">
          {[
            ["07+", "Years refining ideas"],
            ["98%", "Client satisfaction"],
            ["42", "Identities launched"],
            ["12", "Global awards"],
          ].map(([value, label], index) => (
            <div key={label} data-reveal style={delay(index * 0.08)} className="p-6 md:p-9">
              <strong className="display-type block text-4xl md:text-5xl">{value}</strong>
              <span className="mt-2 block text-[10px] uppercase text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-background px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1280px]">
          <SectionLabel>Studio / 01</SectionLabel>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_.7fr] lg:items-end">
            <h2 data-reveal className="display-type text-[clamp(2.7rem,6vw,6.6rem)] leading-[.94]">
              <span className="scroll-text-line">
                <span>Art-trained.</span>
              </span>
              <span className="scroll-text-line" style={delay(0.08)}>
                <span>Strategy-led.</span>
              </span>
              <span className="scroll-text-line text-muted-foreground" style={delay(0.16)}>
                <span>Always mindful.</span>
              </span>
            </h2>
            <div
              data-reveal
              style={delay(0.15)}
              className="space-y-6 border-l border-primary pl-6 text-base leading-7 text-muted-foreground"
            >
              <p>
                Mindful Designer is an independent graphic design agency combining Fine Art
                instincts with the clarity of modern design.
              </p>
              <p>
                We use typography, composition, color, and material with intent—creating work that
                looks beautiful because every choice has a reason.
              </p>
              <Button variant="outline" onClick={() => setContactOpen(true)}>
                Meet the studio <ArrowDownRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-hero-ink px-5 py-24 text-background md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div
            data-reveal
            className="flex flex-col gap-8 border-b border-background/20 pb-8 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <SectionLabel light>Selected work / 02</SectionLabel>
              <h2 className="display-type mt-5 text-5xl md:text-8xl">
                <span className="scroll-text-line">
                  <span>Work that</span>
                </span>
                <span className="scroll-text-line" style={delay(0.08)}>
                  <span>holds attention.</span>
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-background/60">
              A curated selection of identities, objects, and experiences created to stay relevant
              beyond the launch.
            </p>
          </div>
          <div data-reveal className="flex gap-2 overflow-x-auto py-7" aria-label="Filter projects">
            {["All", "Brand Identity", "Packaging", "Creative Direction"].map((item) => (
              <Button
                key={item}
                variant={filter === item ? "primary" : "ghost"}
                size="small"
                onClick={() => setFilter(item)}
                className={cn(
                  "whitespace-nowrap rounded-full border-background/20",
                  filter !== item && "text-background",
                )}
              >
                {item}
              </Button>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((project, index) => (
              <article
                key={project.title}
                data-reveal
                style={delay(index * 0.08)}
                className={cn(
                  "reveal-lift group relative overflow-hidden bg-background text-foreground",
                  project.size === "wide" && "md:col-span-2",
                )}
              >
                <button
                  type="button"
                  className="block w-full cursor-pointer text-left"
                  onClick={() => setActiveProject(project)}
                  aria-label={`View ${project.title} case study`}
                >
                  <div
                    className={cn(
                      "overflow-hidden",
                      project.size === "wide" ? "aspect-[16/8]" : "aspect-[4/5]",
                    )}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} design project`}
                      width={
                        project.size === "wide"
                          ? 1600
                          : project.title === "Aera Rituals"
                            ? 1200
                            : 1104
                      }
                      height={
                        project.size === "wide"
                          ? 1104
                          : project.title === "Aera Rituals"
                            ? 1200
                            : 1504
                      }
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="text-lg font-extrabold">{project.title}</h3>
                      <p className="mt-1 text-[10px] uppercase text-muted-foreground">
                        {project.category} / {project.year}
                      </p>
                    </div>
                    <span className="grid size-11 place-items-center border border-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <MoveUpRight size={18} />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-background px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <SectionLabel>Capabilities / 03</SectionLabel>
          <div
            data-reveal
            className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <h2 className="display-type text-5xl md:text-8xl">
              <span className="scroll-text-line">
                <span>What we</span>
              </span>
              <span className="scroll-text-line" style={delay(0.08)}>
                <span>bring to form.</span>
              </span>
            </h2>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              From first mark to full expression, every engagement is shaped around what your idea
              needs.
            </p>
          </div>
          <div className="mt-16 border-t border-foreground">
            {services.map(([number, title, description], index) => (
              <div
                key={number}
                data-reveal
                style={delay(index * 0.05)}
                className="group grid gap-3 border-b border-border py-7 transition-colors hover:bg-hero md:grid-cols-[80px_1fr_1fr_50px] md:items-center md:px-4"
              >
                <span className="text-xs text-muted-foreground">{number}</span>
                <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
                <p className="max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
                <ArrowDownRight className="hidden transition-transform group-hover:rotate-[-45deg] md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-cobalt px-5 py-24 text-background md:px-10 md:py-36">
        <div className="mx-auto max-w-[1280px]">
          <SectionLabel light>Our philosophy / 04</SectionLabel>
          <p
            data-reveal
            className="display-type mt-14 max-w-[12ch] text-[clamp(3.3rem,8vw,8.5rem)] leading-[.88]"
          >
            <span className="scroll-text-line">
              <span>Nothing is added</span>
            </span>
            <span className="scroll-text-line" style={delay(0.08)}>
              <span>without a reason.</span>
            </span>
          </p>
          <div
            data-reveal
            style={delay(0.15)}
            className="mt-16 grid gap-8 border-t border-background/30 pt-8 md:grid-cols-3"
          >
            <p className="text-sm leading-6 text-background/70">
              We begin by looking closely—at context, culture, material, and what needs to be said.
            </p>
            <p className="text-sm leading-6 text-background/70">
              Then we subtract until every type choice, image, and gesture earns its place.
            </p>
            <p className="text-sm leading-6 text-background/70">
              The result is less noise, more meaning, and work with the confidence to last.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:items-center">
          <div data-reveal className="relative">
            <img
              src={founderPortrait}
              alt="Founder of Mindful Designer in the studio"
              width={1200}
              height={1600}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute -bottom-5 -right-2 bg-primary px-5 py-4 text-primary-foreground md:-right-5">
              <span className="block text-[10px] uppercase">Fine Art / Graphic Design</span>
              <strong className="mt-1 block">Founder & Creative Designer</strong>
            </div>
          </div>
          <div data-reveal style={delay(0.15)} className="lg:pl-12">
            <SectionLabel>Behind the work / 05</SectionLabel>
            <h2 className="display-type mt-7 text-5xl leading-[.95] md:text-7xl">
              <span className="scroll-text-line">
                <span>Trained to see.</span>
              </span>
              <span className="scroll-text-line" style={delay(0.08)}>
                <span>Driven to clarify.</span>
              </span>
            </h2>
            <div className="mt-8 max-w-lg space-y-5 text-base leading-7 text-muted-foreground">
              <p>
                A Fine Art education taught our founder to look beyond the surface—to understand
                rhythm, tension, material, and meaning.
              </p>
              <p>
                That way of seeing now shapes brand systems with both artistic depth and commercial
                focus. The studio stays intentionally independent, close to every idea and every
                detail.
              </p>
            </div>
            <Button className="mt-9" onClick={() => setContactOpen(true)}>
              Work with the founder <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1280px]">
          <p
            data-reveal
            className="text-center text-[10px] font-bold uppercase text-muted-foreground"
          >
            Trusted by curious teams at
          </p>
          <div
            data-reveal
            style={delay(0.1)}
            className="mt-10 grid grid-cols-2 gap-8 text-center text-lg font-extrabold uppercase text-muted-foreground md:grid-cols-5"
          >
            <span>Forme</span>
            <span>Kindred</span>
            <span>Northline</span>
            <span>Serein</span>
            <span>Newmatter</span>
          </div>
          <blockquote data-reveal className="mx-auto mt-24 max-w-4xl text-center">
            <p className="text-2xl font-semibold leading-snug md:text-4xl">
              “Mindful Designer found the one clear idea inside a complex brief—and turned it into a
              world people instantly wanted to enter.”
            </p>
            <footer className="mt-7 text-xs uppercase text-muted-foreground">
              Amelia Rhodes / Founder, Aera Rituals
            </footer>
          </blockquote>
        </div>
      </section>

      <section id="contact" className="bg-hero px-5 py-24 text-hero-ink md:px-10 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <SectionLabel>Start a conversation / 06</SectionLabel>
          <h2
            data-reveal
            className="display-type mt-8 max-w-[11ch] text-[clamp(3.5rem,9vw,9rem)] leading-[.86]"
          >
            <span className="scroll-text-line">
              <span>Let&apos;s create</span>
            </span>
            <span className="scroll-text-line" style={delay(0.08)}>
              <span>something meaningful.</span>
            </span>
          </h2>
          <div
            data-reveal
            style={delay(0.15)}
            className="mt-14 flex flex-col gap-4 border-t border-hero-ink/30 pt-8 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex flex-wrap gap-3">
              <Button
                variant="inverse"
                className="transition-transform active:scale-[.98]"
                onClick={() => setContactOpen(true)}
              >
                Project inquiry <ArrowRight size={16} />
              </Button>
              <Button variant="ghost" asChild className="border border-hero-ink/25">
                <a href="mailto:hello@mindfuldesigner.studio">
                  Email us <ExternalLink size={15} />
                </a>
              </Button>
              <Button variant="ghost" asChild className="border border-hero-ink/25">
                <a href="https://wa.me/" target="_blank" rel="noreferrer">
                  WhatsApp <ExternalLink size={15} />
                </a>
              </Button>
            </div>
            <p className="text-xs font-bold uppercase">Available for select projects / 2026</p>
          </div>
        </div>
      </section>

      <footer className="bg-hero-ink px-5 py-8 text-background md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 text-[10px] uppercase text-background/60 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Mindful Designer</span>
          <span>Thoughtful ideas / Refined visuals</span>
          <a href="#home" className="inline-flex items-center gap-2 text-background">
            Back to top <ArrowLeft className="rotate-90" size={13} />
          </a>
        </div>
      </footer>

      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-hero-ink/60" />
          <Dialog.Content className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-hero p-6 text-hero-ink data-[state=open]:animate-slide-in-right">
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-extrabold">Mindful Designer®</Dialog.Title>
              <Dialog.Close asChild>
                <Button variant="icon" size="icon" aria-label="Close menu">
                  <X />
                </Button>
              </Dialog.Close>
            </div>
            <nav className="my-auto flex flex-col">
              {["Home", "About", "Portfolio", "Services", "Contact"].map((item, i) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="display-type flex items-center justify-between border-b border-hero-ink/25 py-5 text-4xl"
                >
                  <span>{item}</span>
                  <small className="font-sans text-[10px]">0{i + 1}</small>
                </a>
              ))}
            </nav>
            <p className="text-xs uppercase">Graphic Design Agency / Independent studio</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        open={Boolean(activeProject)}
        onOpenChange={(open) => !open && setActiveProject(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-hero-ink/80 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-3 z-[71] overflow-y-auto bg-background md:inset-8">
            <Dialog.Title className="sr-only">
              {activeProject?.title ?? "Project details"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant="icon"
                size="icon"
                className="fixed right-6 top-6 z-10 bg-background md:right-12 md:top-12"
                aria-label="Close project"
              >
                <X />
              </Button>
            </Dialog.Close>
            {activeProject && (
              <div className="grid min-h-full lg:grid-cols-[1.25fr_.75fr]">
                <img
                  src={activeProject.image}
                  alt={`${activeProject.title} case study`}
                  className="h-[50vh] w-full object-cover lg:h-full lg:min-h-[calc(100vh-4rem)]"
                />
                <div className="flex flex-col justify-between p-7 md:p-12">
                  <div>
                    <SectionLabel>Case study / {activeProject.year}</SectionLabel>
                    <h2 className="display-type mt-8 text-5xl lg:text-7xl">
                      {activeProject.title}
                    </h2>
                    <p className="mt-3 text-xs uppercase text-muted-foreground">
                      {activeProject.category}
                    </p>
                    <p className="mt-10 max-w-md text-lg leading-8 text-muted-foreground">
                      {activeProject.description}
                    </p>
                    <div className="mt-12 grid grid-cols-2 gap-5 border-t border-border pt-6 text-xs uppercase">
                      <div>
                        <span className="text-muted-foreground">Scope</span>
                        <strong className="mt-2 block">Strategy / Design</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Outcome</span>
                        <strong className="mt-2 block">A complete visual world</strong>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="mt-14 w-fit"
                    onClick={() => {
                      setActiveProject(null);
                      setContactOpen(true);
                    }}
                  >
                    Create something together <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        open={contactOpen}
        onOpenChange={(open) => {
          setContactOpen(open);
          if (!open) setSent(false);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-hero-ink/80 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-y-0 right-0 z-[81] w-full max-w-xl overflow-y-auto bg-background p-6 md:p-12">
            <div className="flex items-start justify-between">
              <div>
                <SectionLabel>Project inquiry</SectionLabel>
                <Dialog.Title className="display-type mt-5 text-4xl md:text-6xl">
                  Tell us what you&apos;re imagining.
                </Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <Button variant="icon" size="icon" aria-label="Close inquiry">
                  <X />
                </Button>
              </Dialog.Close>
            </div>
            {sent ? (
              <div className="grid min-h-[60vh] place-items-center text-center">
                <div>
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check />
                  </span>
                  <h3 className="display-type mt-6 text-3xl">Thank you.</h3>
                  <p className="mt-3 text-muted-foreground">
                    Your project note is ready. We’ll be in touch soon.
                  </p>
                  <Dialog.Close asChild>
                    <Button className="mt-7">Close</Button>
                  </Dialog.Close>
                </div>
              </div>
            ) : (
              <form className="mt-12 space-y-7" onSubmit={submitInquiry}>
                <label className="block text-xs font-bold uppercase">
                  Your name
                  <input
                    required
                    maxLength={100}
                    name="name"
                    autoComplete="name"
                    className="mt-2 h-12 w-full border-b border-foreground bg-transparent text-base outline-none focus:border-primary"
                    placeholder="Name"
                  />
                </label>
                <label className="block text-xs font-bold uppercase">
                  Email address
                  <input
                    required
                    type="email"
                    maxLength={255}
                    name="email"
                    autoComplete="email"
                    className="mt-2 h-12 w-full border-b border-foreground bg-transparent text-base outline-none focus:border-primary"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="block text-xs font-bold uppercase">
                  What do you need?
                  <select
                    required
                    name="service"
                    defaultValue=""
                    className="mt-2 h-12 w-full border-b border-foreground bg-transparent text-base outline-none focus:border-primary"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map(([, title]) => (
                      <option key={title}>{title}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs font-bold uppercase">
                  About the project
                  <textarea
                    required
                    minLength={20}
                    maxLength={1000}
                    name="message"
                    rows={5}
                    className="mt-3 w-full resize-none border border-border bg-transparent p-4 text-base font-normal normal-case outline-none focus:border-primary"
                    placeholder="Share the ambition, timing, and what success looks like…"
                  />
                </label>
                <Button type="submit" className="w-full">
                  Send inquiry <ArrowRight size={16} />
                </Button>
                <p className="text-center text-[10px] uppercase text-muted-foreground">
                  We usually reply within two working days.
                </p>
              </form>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
