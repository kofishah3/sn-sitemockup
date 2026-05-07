import { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";

const SERVICES = [
  "Executive Assistance",
  "Marketing Support",
  "Content Creation",
  "AI Operations",
  "Not sure yet — let's talk",
];

interface BriefFormProps {
  variant?: "light" | "dark";
}

export default function BriefForm({ variant = "dark" }: BriefFormProps) {
  const isLight = variant === "light";
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        listRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const labelClasses =
    "text-[10px] text-gray-400 uppercase tracking-[0.15em] font-bold";

  const inputClasses = isLight
    ? "bg-[#edf1f2] border border-transparent rounded-xl px-4 py-4 text-sm text-gray-900 outline-none focus:border-accent/30 focus:bg-[#e6ebed] transition-all placeholder:text-gray-400 w-full"
    : "bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white outline-none focus:border-accent/50 focus:bg-accent/5 transition-all w-full";

  const dropdownClasses = isLight
    ? `bg-[#edf1f2] border border-transparent rounded-xl px-4 py-4 text-sm ${
        selected ? "text-gray-900" : "text-gray-400"
      } cursor-pointer flex justify-between items-center transition-all hover:bg-[#e6ebed]`
    : `bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm ${
        selected ? "text-white" : "text-white/40"
      } cursor-pointer flex justify-between items-center transition-all hover:bg-white/10`;

  const listClasses = isLight
    ? "absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 py-2"
    : "absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-2 backdrop-blur-xl bg-opacity-90";

  const itemClasses = isLight
    ? "px-4 py-3 text-sm text-gray-700 hover:bg-accent hover:text-white cursor-pointer transition-colors"
    : "px-4 py-3 text-sm text-gray-300 hover:bg-accent hover:text-white cursor-pointer transition-colors";

  const footerLinkClasses = isLight
    ? "text-sm font-semibold text-gray-400 text-center cursor-pointer hover:text-accent underline decoration-gray-300 underline-offset-8"
    : "text-sm font-semibold text-gray-400 text-center cursor-pointer hover:text-accent-mid underline underline-offset-8";

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto">
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label className={labelClasses}>Your name</label>
            <input
              type="text"
              placeholder="Ceferino Jumao-as"
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className={labelClasses}>Email</label>
            <input
              type="email"
              placeholder="cef@company.com"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className={labelClasses}>Service track</label>
          <div className="relative" ref={dropdownRef}>
            <div className={dropdownClasses} onClick={() => setIsOpen(!isOpen)}>
              <span>{selected || "Select a service"}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isOpen && (
              <div className={listClasses} ref={listRef}>
                {SERVICES.map((service) => (
                  <div
                    key={service}
                    className={itemClasses}
                    onClick={() => {
                      setSelected(service);
                      setIsOpen(false);
                    }}
                  >
                    {service}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className={labelClasses}>Tell us what you need</label>
          <textarea
            placeholder="Describe your workflow, pain points, or what support looks like for you…"
            className={inputClasses + " h-32 resize-none"}
          />
        </div>

        <button
          id="submit-button"
          type="submit"
          className="mt-2 bg-accent hover:bg-accent/90 text-white font-bold py-4 px-6 rounded-2xl 
          transition-all transform active:scale-95 flex items-center justify-center gap-2 group shadow-xl shadow-accent/10 text-md"
        >
          Submit my brief
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div id="access-contact" className={footerLinkClasses}>
          Prefer to contact us directly?
        </div>
      </form>
    </div>
  );
}
