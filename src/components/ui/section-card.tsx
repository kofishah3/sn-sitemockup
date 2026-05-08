import { ArrowRight, type LucideIcon } from "lucide-react";
import Pill from "./pill";
import IconButton from "./iconbutton";

interface SectionCardProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  features?: string[];
  metrics?: Record<string, string>[];
  onAction?: () => void;
}

export default function SectionCard({
  icon: Icon,
  title = "Untitled Card",
  description = "Lorem Ipsum",
  features = [],
  metrics = [],
  onAction,
}: SectionCardProps) {
  return (
    <div
      className="
    
      group px-6 py-8 md:px-10 md:py-12 flex flex-col md:flex-row rounded-3xl bg-white border border-gray-100 hover:border-accent/10 
    transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px] overflow-hidden relative hover:scale-[1.02] hover:shadow-accent-light"
    >
      <div id="left-content" className="flex flex-col gap-3 flex-1">
        <div id="header" className="flex flex-row gap-5 items-center">
          <div
            id="header-icon"
            className="items-center flex justify-center rounded-xl border p-3
          hover:border-accent group-hover:text-accent group-hover:scale-105 transition-all transition-200 "
          >
            {Icon && <Icon size={25} strokeWidth={1} />}
          </div>
          <h3
            id="header-title"
            className="font-display text-xl md:text-3xl font-bold font-stretch-50% text-black group-hover:text-accent transition-colors transition-200 max-w-lg leading-tight"
          >
            {title}
          </h3>
        </div>
        <p className="text-gray-600 text-sm md:text-base leading-normal md:leading-relaxed max-w-2xl">
          {description}
        </p>
        <div
          id="pills-container"
          className="flex flex-row gap-2 py-2 overflow-x-auto no-scrollbar md:flex-wrap"
        >
          {features.map((feat, index) => (
            <Pill key={index} label={feat} />
          ))}
        </div>
      </div>

      <div
        id="divider"
        className="hidden md:block absolute right-[30%] inset-y-8 w-px bg-gray-200 rounded-full"
      ></div>

      <div
        id="right-content"
        className="flex flex-row md:pl-10 w-full md:w-[28%] items-center justify-between border-t border-gray-100 mt-6 pt-6 md:border-t-0 md:mt-0"
      >
        <div className="space-y-5 flex flex-col justify-center">
          {metrics.map((metric, i) => {
            const label = Object.keys(metric)[0];
            const value = Object.values(metric)[0];
            return (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] uppercase tracking-normal text-gray-400 font-bold mb-0.5">
                  {label}
                </span>
                <span className="text-xl font-display font-bold text-black leading-tight">
                  {value}
                </span>
              </div>
            );
          })}
        </div>
        <IconButton icon={ArrowRight} onClick={onAction} />
      </div>
    </div>
  );
}
