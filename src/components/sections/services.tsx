import { BotMessageSquare, Folder, Megaphone, Pencil } from "lucide-react";
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
      metrics: [
        { "Coverage Windows": "AU/US" },
        { "Typical Launch": "7 days" },
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
      metrics: [{ "Campaign Rhythm": "Weekly" }, { "Ramp Time": "2 weeks" }],
    },
    {
      icon: Pencil,
      id: "content",
      title: "Content Creation",
      description:
        "Content support for founders and teams that need writing assistance, asset preparation, publishing help, repurposing, and dependable production follow-through.",
      features: ["Drafting", "Asset Preparation", "Repurposing", "Publishing"],
      metrics: [
        { "Output Types": "Copy / Visuals" },
        { "Use Cases": "B2B / Agency" },
      ],
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
      metrics: [
        { "Workflow Type": "Ops / Research" },
        { "Team Fit": "Founders / Ops" },
      ],
    },
  ];

  return (
    <div
      id="services-sticky"
      className="h-screen bg-bg flex flex-col items-center justify-center mt-60"
    >
      <div
        id="header"
        className="w-fill h-auto py-10 items-center justify-center flex flex-col gap-5 mb-10"
      >
        <h2 className="font-extrabold text-5xl max-w-3xl text-center">
          <span className="text-accent">Service</span> tracks built for modern
          teams
        </h2>
        <p className="text-lg max-w-3xl text-center">
          Start with the function you need most. We shape support around the
          workflow, coverage window, and communication style your team already
          runs on.
        </p>
      </div>
      <div
        id="services-container"
        className="flex flex-col gap-5 w-full h-auto max-w-6xl"
      >
        {services.map((service) => (
          <SectionCard
            icon={service.icon}
            title={service.title}
            description={service.description}
            features={service.features}
            metrics={service.metrics}
          />
        ))}
      </div>
    </div>
  );
}
