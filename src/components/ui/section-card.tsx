import { ArrowRight, type LucideIcon } from "lucide-react";
import Pill from "./pill";
import IconButton from "./iconbutton";

interface SectionCardProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  features?: string[];
  metrics?: Record<string, string>[];
}

export default function SectionCard({
  icon: Icon,
  title = "Untitled Card",
  description = "Lorem Ipsum",
  features = [],
  metrics = [],
}: SectionCardProps) {
  return (
    <div
      className="group px-10 py-12 flex flex-row rounded-3xl bg-white border border-gray-100 hover:border-accent/10 
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
            className="font-display text-3xl font-bold font-stretch-50% text-black group-hover:text-accent transition-colors transition-200 max-w-lg leading-8"
          >
            {title}
          </h3>
        </div>
        <p className="text-gray-600 leading max-w-2xl">{description}</p>
        <div id="pills-container" className="flex flex-row gap-2 py-2">
          {features.map((feat, index) => (
            <Pill key={index} label={feat} />
          ))}
        </div>
      </div>

      <div
        id="divider"
        className="absolute right-[30%] inset-y-8 w-px bg-gray-200 rounded-full"
      ></div>

      <div
        id="right-content"
        className="flex flex-row pl-10 w-[28%] items-center justify-between"
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
        <IconButton icon={ArrowRight} />
      </div>
    </div>
  );
}
