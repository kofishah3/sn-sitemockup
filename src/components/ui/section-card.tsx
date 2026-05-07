import { type LucideIcon } from "lucide-react";
import Pill from "./pill";

interface SectionCardProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  features?: string[];
}

export default function SectionCard({
  icon: Icon,
  title = "Untitled Card",
  description = "Lorem Ipsum",
  features,
}: SectionCardProps) {
  return (
    <div
      className="mx-80 group p-8 flex flex-row rounded-2xl bg-white border border-gray-100 hover:border-accent/20 
    transition-all duration-300 hover:shadow-[0_20px_50px_rgba(45,91,227,0.05)] overflow-hidden relative"
    >
      <div id="left-content" className="flex flex-col gap-3">
        <div id="header" className="flex flex-row gap-5 items-center">
          <div
            id="header-icon"
            className="items-center flex justify-center rounded-xl border p-3
          hover:border-accent group-hover:text-accent "
          >
            <Icon size={25} strokeWidth={1} />
          </div>
          <h3
            id="header-title"
            className="font-display text-3xl font-black text-black group-hover:text-accent transition-colors max-w-lg leading-8"
          >
            {title}
          </h3>
        </div>
        <p className="text-gray-600 leading max-w-2xl">{description}</p>
        <div id="pills-container" className="flex flex-row gap-2 py-2">
          {features.map((feat) => (
            <Pill label={feat} />
          ))}
        </div>
      </div>

      <div
        id="divider"
        className="absolute right-[30%] inset-y-8 w-px bg-gray-100 rounded-full"
      ></div>

      <div id="right-content" className="flex flex-col"></div>
    </div>
  );
}
