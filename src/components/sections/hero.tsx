import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../ui/button";
import Pill from "../ui/pill";
import { ChevronDownCircle, Eye, EyeOff } from "lucide-react";
import { useSelection } from "../../context/SelectionContext";
import { useModal } from "../../context/ModalContext";
import { useTheme } from "../../context/ThemeContext";

export default function Hero() {
  const { setSelectedService } = useSelection();
  const { openOutOfScope } = useModal();
  const { showHeroBg: showBgImage, setShowHeroBg: setShowBgImage } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);

  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: el, offsetY: 80 },
        ease: "power4.inOut",
      });
    }
  };

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

  useEffect(() => {
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        opacity: showBgImage ? 1 : 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, [showBgImage]);

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

      <div
        ref={bgImageRef}
        className="absolute inset-0 z-[-1] overflow-hidden opacity-0 pointer-events-none"
      >
        <img
          src="/pexels-tima-miroshnichenko-5686014.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover scale-105"
        />
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            showBgImage
              ? "bg-linear-to-b from-black/60 via-black/20 to-black/70 backdrop-blur-[1px]"
              : "bg-linear-to-b from-white/80 via-white/65 to-white/95 backdrop-blur-[2px]"
          }`}
        />
      </div>

      <button
        onClick={() => setShowBgImage(!showBgImage)}
        className={`absolute top-20 right-6 md:top-32 md:right-10 z-50 p-3 rounded-full backdrop-blur-2xl border transition-all duration-500 shadow-xl group ${
          showBgImage
            ? "bg-white/10 border-white/20 text-white/70 hover:text-white hover:bg-white/20"
            : "bg-white/60 border-black/10 text-black/70 hover:text-black hover:bg-white/90"
        } hover:scale-110`}
        title={showBgImage ? "Hide background image" : "Show background image"}
      >
        <div className="relative">
          {showBgImage ? (
            <Eye
              size={18}
              className="transition-transform duration-500 group-hover:rotate-12"
            />
          ) : (
            <EyeOff
              size={18}
              className="transition-transform duration-500 group-hover:-rotate-12"
            />
          )}
        </div>
      </button>

      <div className="relative z-10 flex flex-col items-center">
        <h1
          id="heroH1"
          ref={h1Ref}
          className={`font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight max-w-[780px] mb-7 opacity-0 translate-y-5 relative transition-colors duration-500 ${
            showBgImage
              ? "text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.3)]"
              : "text-black drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]"
          }`}
        >
          You're one brief away
          <br />
          from the right <br />
          <em
            ref={wordRef}
            className="italic font-bold text-accent-mid inline-block min-w-[120px]"
          >
            support.
          </em>
        </h1>

        <p
          id="heroSub"
          ref={subRef}
          className={`text-md font-medium max-w-[500px] leading-relaxed mb-11 opacity-0 translate-y-3 transition-colors duration-500 ${
            showBgImage
              ? "text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
              : "text-gray-800 drop-shadow-[0_1px_5px_rgba(255,255,255,0.8)]"
          }`}
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
            onClick={openOutOfScope}
          />

          <Button
            id="heroSecondaryBtn"
            label="Explore services"
            variant="secondary"
            className={
              showBgImage
                ? "text-white border-white/30 hover:bg-white/10 hover:border-white/50"
                : ""
            }
            onClick={() => scrollToElement("services-sticky")}
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
              variant={showBgImage ? "dark" : "light"}
              onClick={() => {
                setSelectedService(label);
                scrollToElement("cta");
              }}
            />
          ))}
        </div>
      </div>

      <div
        id="heroScrollBtn"
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer opacity-0 z-10"
        onClick={() => scrollToElement("services-sticky")}
      >
        <ChevronDownCircle
          size={32}
          strokeWidth={1}
          className={`animate-bounce transition-colors duration-500 hover:text-accent ${
            showBgImage ? "text-white/80" : "text-black"
          }`}
        />
      </div>
    </section>
  );
}
