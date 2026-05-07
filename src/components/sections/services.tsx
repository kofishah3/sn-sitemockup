import {
  BotMessageSquare,
  Folder,
  icons,
  Megaphone,
  Pencil,
} from "lucide-react";
import SectionCard from "../ui/section-card";

export default function Services() {
  const services = [
    {
      icon: Folder,
      id: "executive",
      title: "Executive Assistance",
      description:
        "Dedicated executive assistants who manage inboxes, calendars, reporting, travel coordination, SOP upkeep, and recurring admin so founders and operators can stay focused on growth.",
      features: [
        "Inbox & Calendar",
        "Reporting & Documentation",
        "Research & Coordination",
        "Executive Suppport",
      ],
    },
    {
      icon: Megaphone,
      id: "marketing",
      title: "Marketing Support",
      description:
        "Flexible support for marketing teams that need help with campaign coordination, CRM updates, social scheduling, reporting, research, and recurring execution work.",
      features: [
        "Campaign Coordination",
        "Social & Email",
        "Marketing Admin",
        "Marketing Reporting",
        "Research Preparation",
      ],
    },
    {
      icon: Pencil,
      id: "content",
      title: "Content Creation",
      description:
        "Content support for founders and teams that need writing assistance, asset preparation, publishing help, repurposing, and dependable production follow-through.",
      features: ["Drafting", "Asset Preparation", "Repurposing", "Publishing"],
    },
    {
      icon: BotMessageSquare,
      id: "ai",
      title: "AI Operations",
      description:
        "Operational support for teams adopting AI into day-to-day work, including prompt libraries, workflow documentation, QA checks, knowledge-base upkeep, and tool coordination.",
      features: [
        "Prompt & SOP Libraries",
        "AI Workflow",
        "Research & Synthesis",
        "QA Checks",
      ],
    },
  ];

  return (
    <div
      id="services-sticky"
      className="h-screen bg-bg flex items-center justify-center pt-80"
    >
      <div
        id="services-container"
        className="flex flex-col gap-3 w-full h-auto"
      >
        {services.map((service) => (
          <SectionCard
            icon={service.icon}
            title={service.title}
            description={service.description}
            features={service.features}
          />
        ))}
      </div>
    </div>
  );
}
