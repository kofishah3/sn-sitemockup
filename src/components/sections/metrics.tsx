import { useRef } from "react";

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);

  const metrics = [
    {
      id: "launch",
      value: "7d",
      label: "Average team launch from brief to live",
    },
    {
      id: "coverage",
      value: "AU/US",
      label: "Primary coverage windows for your time zone",
    },
    {
      id: "tracks",
      value: "4",
      label: "Specialist service tracks shaped to your workflow",
    },
  ];

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="w-full bg-cream border-gray-200 grid grid-cols-1 md:grid-cols-3 border-y"
    >
      {metrics.map((metric, idx) => (
        <div
          key={metric.id}
          id={`${metric.id}-cell`}
          className={`flex flex-col p-12 md:p-16 border-gray-200 items-center justify-center ${
            idx !== metrics.length - 1
              ? "border-b md:border-b-0 md:border-r"
              : ""
          }`}
        >
          <h2
            id={`${metric.id}-value`}
            className="font-display text-4xl md:text-7xl font-extrabold text-black leading-none mb-4 text-center"
          >
            {metric.value}
          </h2>
          <p
            id={`${metric.id}-label`}
            className="text-md text-gray-600 leading-relaxed max-w-md text-center"
          >
            {metric.label}
          </p>
        </div>
      ))}
    </section>
  );
}
