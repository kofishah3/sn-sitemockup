import React, { useEffect, useRef } from "react";

const InteractiveBackground: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const { clientX, clientY } = e;

      // Smoothly follow the mouse
      blobRef.current.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards", easing: "ease-out" },
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply">
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--gray-400) 1px, transparent 1px),
            linear-gradient(to bottom, var(--gray-400) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        ref={blobRef}
        className="absolute w-[800px] h-[800px] rounded-full bg-accent/3 blur-[140px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000"
        style={{ left: "50%", top: "50%" }}
      />

      <div
        className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-mid/5 blur-[120px] animate-pulse"
        style={{ animationDuration: "15s" }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] animate-pulse"
        style={{ animationDuration: "20s" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(247,246,242,0.4)_100%)]" />
    </div>
  );
};

export default InteractiveBackground;
