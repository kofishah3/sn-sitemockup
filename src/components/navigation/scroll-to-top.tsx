import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Kill all ScrollTriggers to prevent ghost pins or layout locks from previous page
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Reset scroll position to top
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger after a tiny delay to ensure new page DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
