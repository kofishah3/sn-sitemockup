import { useEffect, useRef } from "react";

import gsap from "gsap";
import { X, Info } from "lucide-react";
import { useModal } from "../../context/ModalContext";

export default function OutOfScopeModal() {
  const { isOutOfScopeOpen, closeOutOfScope } = useModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOutOfScopeOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        display: "flex",
      });

      tl.fromTo(
        contentRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
          rotateX: -10,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.2",
      );
    } else {
      document.body.style.overflow = "auto";

      const tl = gsap.timeline();

      tl.to(contentRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.98,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
        },
      });
    }
  }, [isOutOfScopeOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      closeOutOfScope();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-1000 items-center justify-center bg-black/40 backdrop-blur-md px-6 hidden"
      style={{ opacity: 0, perspective: "1000px" }}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-md overflow-hidden rounded-[24px] bg-white p-8 shadow-2xl md:p-10"
      >
        <button
          onClick={closeOutOfScope}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-gray-100 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
            <Info size={32} />
          </div>

          <h3 className="mb-3 font-display text-2xl font-bold tracking-tight text-black">
            Out of Scope
          </h3>

          <p className="mb-8 text-balance font-body text-gray-500 leading-relaxed">
            This feature has not been implemented as it is currently outside the
            scope of this redesign mockup.
          </p>

          <button
            onClick={closeOutOfScope}
            className="w-full rounded-[14px] bg-black py-4 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
          >
            Okay!
          </button>
        </div>
      </div>
    </div>
  );
}
