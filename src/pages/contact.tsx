import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDownCircle, Mail } from "lucide-react";
import { IconPill } from "../components/ui/pill";
import BriefForm from "../components/input/brief-form";
import DiscoveryCall from "../components/sections/discovery-call";
import { useLocation } from "react-router-dom";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.from(headerRef.current, { opacity: 0, y: 30 })
        .from(pillsRef.current, { opacity: 0, y: 20 }, "-=0.5")
        .from(formRef.current, { opacity: 0, y: 20 }, "-=0.5");

      if (location.state?.scrollToBottom) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: { y: "max" },
          ease: "power4.inOut",
          delay: 0.8,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [location.state]);

  return (
    <div className="flex flex-col" ref={containerRef}>
      <div className="grow flex flex-col items-center justify-center gap-5 px-6 mt-32 mb-24">
        <div
          ref={headerRef}
          className="w-full max-w-4xl flex flex-col gap-6 text-black text-center items-center"
        >
          <h2 className="font-display font-extrabold text-4xl md:text-6xl ">
            Tell us what you want to{" "}
            <span className="text-accent italic font-bold"> delegate </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Share the role, workload, or workflow you need help with. We'll help
            shape the right support setup for your business.
          </p>
        </div>

        <div
          ref={pillsRef}
          className="flex flex-wrap gap-4 w-full max-w-4xl items-center justify-center"
        >
          <IconPill
            icon={Mail}
            label="info@sngroup.com.au"
            variant="light"
            onClick={() =>
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=info@sngroup.com.au",
                "_blank",
              )
            }
          />
          <IconPill
            icon={
              <img
                src="/linkedin-svgrepo-com.svg"
                className="w-full h-full"
                alt="LinkedIn"
              />
            }
            label="SN International Group"
            variant="light"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/sn-international-group/posts/?feedView=all",
                "_blank",
              )
            }
          />
        </div>

        <div ref={formRef} className="w-full max-w-4xl">
          <BriefForm variant="light" showContactLink={false} />
        </div>

        <div className="mb-3"></div>

        <ChevronDownCircle
          size={32}
          strokeWidth={1}
          className="text-black animate-bounce transition-colors hover:text-accent"
        />

        <div className="mb-5"></div>
        <DiscoveryCall />
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
    </div>
  );
}
