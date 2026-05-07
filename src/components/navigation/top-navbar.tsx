import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

interface TopNavBarProps {}

export default function TopNavBar({}: TopNavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    if (navRef.current) {
      gsap.to(navRef.current, {
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power4.out",
      });
      if (menuLinksRef.current) {
        gsap.fromTo(
          menuLinksRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out",
          },
        );
      }
    } else {
      document.body.style.overflow = "auto";
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power4.in",
      });
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#hero", active: true },
    { name: "Services", href: "#services-sticky" },
    { name: "About Us", href: "#cta" },
    { name: "Meet the Team", href: "#cta" },
    { name: "Contact", href: "#cta" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav
        id="topnavbar"
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-400 opacity-0 ${
          isScrolled
            ? "bg-white/92 backdrop-blur-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <a
          id="logo"
          href="#"
          className="flex items-center gap-2.5 no-underline group z-110"
        >
          <img
            src="/logo.webp"
            alt="SN Logo"
            className="h-8 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-gray-600 group-hover:text-black transition-colors">
              International
            </span>
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-gray-600 group-hover:text-black transition-colors">
              Group
            </span>
          </div>
        </a>

        <div
          id="desktop-navlinks"
          className="hidden lg:flex items-center gap-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[13px] transition-colors relative group ${
                link.active
                  ? "text-black font-medium"
                  : "text-gray-600 font-normal hover:text-black"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-0.5 left-0 right-0 h-px bg-black transform origin-left transition-transform duration-250 ${
                  link.active
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            id="desktop-getstarted"
            onClick={() => {
              document
                .getElementById("cta")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hidden sm:block bg-black text-white rounded-[40px] px-[22px] py-2.5 text-[12px] font-medium font-body transition-all duration-200 hover:bg-gray-600 hover:scale-[0.97] tracking-[0.02em] cursor-pointer"
          >
            Get Started →
          </button>

          <button
            id="mobile-menu"
            onClick={toggleMenu}
            className="lg:hidden p-2 text-black z-110"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu-overlay"
        ref={menuRef}
        className="fixed inset-0 bg-white z-105 translate-x-full lg:hidden flex flex-col items-center justify-center p-8"
      >
        <div
          ref={menuLinksRef}
          className="flex flex-col items-center gap-8 text-center"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-display font-bold tracking-tight transition-colors ${
                link.active ? "text-black" : "text-gray-400 hover:text-black"
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              document
                .getElementById("cta")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-4 bg-black text-white rounded-[40px] px-8 py-4 text-sm font-medium font-body transition-all duration-200 hover:bg-gray-600 hover:scale-[0.97] tracking-[0.02em]"
          >
            Get Started →
          </button>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 opacity-50">
          <div className="w-12 h-px bg-gray-200"></div>
          <span className="text-[10px] uppercase tracking-widest text-gray-400">
            SN International Group
          </span>
        </div>
      </div>
    </>
  );
}
