import { useEffect, useRef } from "react";
import gsap from "gsap";
import BriefForm from "../input/brief-form";


export default function SubmitBrief() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="bg-black py-18 px-6 md:px-12 gap-20 
       overflow-hidden items-center flex justify-center"
    >
      <div
        ref={contentRef}
        className="items-center justify-between flex flex-col md:flex-row lg:max-w-8xl"
      >
        <div className="z-10">
          <h2 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Ready to build your{" "}
            <span className="text-accent-mid italic font-bold">
              support team?
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
            Submit a brief and we'll match you with the right service track.
            Most teams are live within 7 days
          </p>
        </div>

        <BriefForm variant="dark" />
      </div>
    </section>
  );
}
