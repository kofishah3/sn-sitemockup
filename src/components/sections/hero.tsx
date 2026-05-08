import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/button";
import Pill from "../ui/pill";
import { ChevronDownCircle } from "lucide-react";
import { useSelection } from "../../context/SelectionContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { setSelectedService } = useSelection();
  const sectionRef = useRef<HTMLElement>(null);

  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      tl.to(h1Ref.current, { opacity: 1, y: 0 })
        .to(subRef.current, { opacity: 1, y: 0 }, "-=0.7")
        .to(ctaRef.current, { opacity: 1, y: 0 }, "-=0.7")
        .to(pillsRef.current, { opacity: 1, y: 0 }, "-=0.7")
        .to(scrollRef.current, { opacity: 1, y: 0 }, "-=0.7");

      const words = ["content.", "team.", "operations.", "support."];
      let currentIndex = 3;

      const rotateText = () => {
        const nextIndex = (currentIndex + 1) % words.length;

        const textTl = gsap.timeline({
          onComplete: () => {
            currentIndex = nextIndex;
            gsap.delayedCall(2.5, rotateText);
          },
        });

        textTl
          .to(wordRef.current, {
            y: -10,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.4,
            ease: "power2.in",
          })
          .set(wordRef.current, {
            innerText: words[nextIndex],
            y: 10,
            filter: "blur(8px)",
          })
          .to(wordRef.current, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.out",
          });
      };

      gsap.delayedCall(3, rotateText);

      if (pillsRef.current) {
        const pills = pillsRef.current.children;
        Array.from(pills).forEach((pill, i) => {
          gsap.to(pill, {
            y: "random(-5, 5)",
            x: "random(-2, 2)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-24 pb-24 relative overflow-hidden"
    >
      <div
        id="heroBg"
        className="absolute inset-[-10%] pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(45,91,227,0.07)_0%,transparent_70%)] bg-transparent"
      />

      <div className="relative z-10 flex flex-col items-center">
        <h1
          id="heroH1"
          ref={h1Ref}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight text-black max-w-[780px] mb-7 opacity-0 translate-y-5"
        >
          You're one brief away
          <br />
          from the right <br />
          <em
            ref={wordRef}
            className="italic font-bold text-accent inline-block min-w-[120px]"
          >
            support.
          </em>
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
          className="flex flex-wrap justify-center gap-2 opacity-0 translate-y-2 relative z-1"
        >
          {[
            "Executive Assistance",
            "Marketing Support",
            "Content Creation",
            "AI Operations",
          ].map((label, index) => (
            <Pill
              key={label}
              id={`pill${index + 1}`}
              label={label}
              onClick={() => {
                setSelectedService(label);
                document
                  .getElementById("cta")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </div>

      <div
        id="heroScrollBtn"
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer opacity-0 z-10"
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
    </section>
  );
}
