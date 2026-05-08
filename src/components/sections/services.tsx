import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BotMessageSquare, Folder, Megaphone, Pencil } from "lucide-react";
import SectionCard from "../ui/section-card";
import { useSelection } from "../../context/SelectionContext";


export default function Services() {
  const { setSelectedService } = useSelection();
  const containerRef = useRef<HTMLDivElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToCTA = () => {
    const el = document.getElementById("cta");
    if (el) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: el, offsetY: 80 },
        ease: "power4.inOut",
      });
    }
  };

  const services = [
    {
      icon: Folder,
      id: "executive",
      title: "Executive Assistance",
      description:
        "Dedicated executive assistants who manage inboxes, calendars, reporting, travel coordination, SOP upkeep, and recurring admin so founders and operators can stay focused on growth.",
      features: [
        "Inbox & Calendar",
        "Reporting & Documentation",
        "Research & Coordination",
        "Executive Suppport",
      ],
      metrics: [
        { "Coverage Windows": "AU/US" },
        { "Typical Launch": "7 days" },
      ],
    },
    {
      icon: Megaphone,
      id: "marketing",
      title: "Marketing Support",
      description:
        "Flexible support for marketing teams that need help with campaign coordination, CRM updates, social scheduling, reporting, research, and recurring execution work.",
      features: [
        "Campaign Coordination",
        "Social & Email",
        "Marketing Admin & Reporting",
        "Research Preparation",
      ],
      metrics: [{ "Campaign Rhythm": "Weekly" }, { "Ramp Time": "2 weeks" }],
    },
    {
      icon: Pencil,
      id: "content",
      title: "Content Creation",
      description:
        "Content support for founders and teams that need writing assistance, asset preparation, publishing help, repurposing, and dependable production follow-through.",
      features: ["Drafting", "Asset Preparation", "Repurposing", "Publishing"],
      metrics: [
        { "Output Types": "Copy / Visuals" },
        { "Use Cases": "B2B / Agency" },
      ],
    },
    {
      icon: BotMessageSquare,
      id: "ai",
      title: "AI Operations",
      description:
        "Operational support for teams adopting AI into day-to-day work, including prompt libraries, workflow documentation, QA checks, knowledge-base upkeep, and tool coordination.",
      features: [
        "Prompt & SOP Libraries",
        "AI Workflow",
        "Research & Synthesis",
        "QA Checks",
      ],
      metrics: [
        { "Workflow Type": "Ops / Research" },
        { "Team Fit": "Founders / Ops" },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }

      if (cardsContainerRef.current && cardsRef.current.length > 0) {
        const cards = cardsRef.current.filter((el) => el !== null);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${services.length * 100}%`,
            pin: true,
            scrub: 1,
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) {
            gsap.set(card, { zIndex: 10 + index, y: 0, opacity: 1, scale: 1 });
          } else {
            gsap.set(card, {
              zIndex: 10 + index,
              y: "150%",
              opacity: 0,
              scale: 0.9,
            });
          }
        });

        cards.forEach((card, index) => {
          if (index > 0) {
            const prevCard = cards[index - 1];

            tl.to(
              card,
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.inOut",
              },
              `card-${index}`,
            );

            tl.to(
              prevCard,
              {
                scale: 0.9,
                opacity: 0,
                y: "-20%",
                duration: 1,
                ease: "power2.inOut",
              },
              `card-${index}`,
            );
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [services.length]);

  return (
    <div
      id="services-sticky"
      ref={containerRef}
      className="min-h-screen bg-transparent flex flex-col items-center overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12 flex flex-col items-center">
        <div
          id="header"
          ref={headerRef}
          className="w-full min-h-[20vh] flex flex-col items-center justify-center gap-5 pt-20 pb-3 md:pt-32 md:pb-20"
        >
          <h2 className="font-extrabold text-3xl md:text-5xl lg:text-6xl max-w-4xl text-center leading-[1.1]">
            <span className="text-accent italic"> Service </span> tracks built
            for modern teams
          </h2>
          <p className="text-sm md:text-lg max-w-2xl text-center text-gray-600">
            Start with the function you need most. We shape support around the
            workflow, coverage window, and communication style your team already
            runs on.
          </p>
        </div>

        <div
          id="services-cards-wrapper"
          ref={cardsContainerRef}
          className="relative w-full min-h-[60vh] md:min-h-[50vh] flex items-start justify-center"
          style={{ perspective: "1200px" }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="absolute inset-x-0 mx-auto w-full max-w-6xl px-4 will-change-transform"
            >
              <SectionCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                metrics={service.metrics as Record<string, string>[]}
                onAction={() => {
                  setSelectedService(service.title);
                  scrollToCTA();
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
