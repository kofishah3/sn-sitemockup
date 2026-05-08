import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ExternalLink } from "lucide-react";
import Button from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function DiscoveryCall() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          scale: 0.98,
          duration: 1,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-4xl bg-[#f0f9fc] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 border border-accent/10 relative overflow-hidden group"
    >
      <div className="flex flex-col gap-5 text-left relative z-10">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-black leading-tight tracking-tight">
            Prefer a{" "}
            <span className="text-accent italic">live conversation?</span>{" "}
            <br />
            Book a Discovery Call.
          </h3>
          <p className="text-gray-600 max-w-md text-base leading-relaxed">
            Best for sales conversations, partnerships, and discovery calls.
            Choose a time that works for you.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10 w-full md:w-auto">
        <Button
          label="Open Booking Page"
          icon={<ExternalLink size={18} />}
          onClick={() =>
            window.open(
              "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3-g5R-G8Rboj0miglsqLCCy0plgqNvFEpCcswQraL9wxpLl-sT2cQeUuhlCaFiVtpDi1UWx9kG",
              "_blank",
            )
          }
          className="w-full md:w-auto shadow-lg shadow-accent/10 py-5 px-10 text-base"
        />
        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs font-medium">
          <Calendar size={14} />
          <span>Available Mon-Saturday</span>
        </div>
      </div>
    </section>
  );
}
