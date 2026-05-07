import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../ui/button";
import Pill from "../ui/pill";
import { ChevronDownCircle } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.to(h1Ref.current, { opacity: 1, y: 0 }, "-=0.7")
      .to(subRef.current, { opacity: 1, y: 0 }, "-=0.7")
      .to(ctaRef.current, { opacity: 1, y: 0 }, "-=0.7")
      .to(pillsRef.current, { opacity: 1, y: 0 }, "-=0.7")
      .to(scrollRef.current, { opacity: 1, y: 0 }, "-=0.7");
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-24 pb-24 relative overflow-hidden"
    >
      <div
        id="heroBg"
        className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(45,91,227,0.07)_0%,transparent_70%)] bg-white"
      />

      <h1
        id="heroH1"
        ref={h1Ref}
        className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight text-black max-w-[780px] mb-7 opacity-0 translate-y-5"
      >
        You're one brief away
        <br />
        from the right <br />
        <em className="italic font-bold text-accent inline-block">support.</em>
      </h1>

      <p
        id="heroSub"
        ref={subRef}
        className="text-md text-gray-600 max-w-[500px] leading-relaxed mb-11 opacity-0 translate-y-3"
      >
        We build dependable offshore support around your workflow, from
        executive assistance and marketing support to content creation and AI
        operations.
      </p>

      <div
        id="heroCta"
        ref={ctaRef}
        className="flex flex-wrap justify-center gap-3 mb-5 opacity-0 translate-y-3"
      >
        <Button
          id="heroPrimaryBtn"
          label="Submit a brief →"
          variant="primary"
          onClick={() =>
            document
              .getElementById("cta")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <Button
          id="heroSecondaryBtn"
          label="Explore services"
          variant="secondary"
          onClick={() =>
            document
              .getElementById("services-sticky")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </div>

      <div
        id="heroPills"
        ref={pillsRef}
        className="flex flex-wrap justify-center gap-2 opacity-0 translate-y-2"
      >
        <Pill id="pill1" label="Executive Assistance" />
        <Pill id="pill2" label="Marketing Support" />
        <Pill id="pill3" label="Content Creation" />
        <Pill id="pill4" label="AI Operations" />
      </div>

      <div
        id="heroScrollBtn"
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer opacity-0"
        onClick={() =>
          document
            .getElementById("services-sticky")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDownCircle
          size={32}
          strokeWidth={1}
          className="text-black animate-bounce transition-colors hover:text-accent"
        />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
