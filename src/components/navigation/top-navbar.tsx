import React, { useState, useEffect, useRef } from "react";

import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";


interface TopNavBarProps {}

export default function TopNavBar({}: TopNavBarProps) {
  const { openOutOfScope } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);

  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const ctaSection = document.getElementById("cta");
      if (ctaSection) {
        const rect = ctaSection.getBoundingClientRect();
        setIsDarkBg(rect.top <= 80);
      } else {
        setIsDarkBg(false);
      }

      if (location.pathname === "/") {
        const sectionIds = ["hero", "services-sticky", "cta"];
        let current = "hero";
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 150) {
              current = id;
            }
          }
        }
        setActiveSection(current);
      } else {
        setActiveSection("contact");
      }
    };

    const ctx = gsap.context(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
        );
      }
    }, navRef);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: offset },
        ease: "power4.inOut",
      });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent,
    href: string,
    sectionId?: string,
  ) => {
    if (location.pathname === "/" && sectionId) {
      e.preventDefault();
      scrollToSection(sectionId);
      if (isMenuOpen) setIsMenuOpen(false);
    } else if (href.startsWith("/#") && location.pathname !== "/") {
    }
  };

  const navLinks = [
    { name: "Home", href: "/", sectionId: "hero" },
    {
      name: "Services",
      href: "/#services-sticky",
      sectionId: "services-sticky",
    },
    { name: "About Us", href: "#", onClick: (e: React.MouseEvent) => { e.preventDefault(); openOutOfScope(); } },
    {
      name: "Meet the Team",
      href: "#",
      onClick: (e: React.MouseEvent) => { e.preventDefault(); openOutOfScope(); }
    },

    {
      name: "Contact",
      href: "/contact",
      sectionId: "contact",
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav
        id="topnavbar"
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ${
          isScrolled
            ? isDarkBg
              ? "bg-black/20 backdrop-blur-xl border-b border-white/10"
              : "bg-white/92 backdrop-blur-lg border-b border-gray-100"
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
            <span
              className={`text-xs font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                isDarkBg
                  ? "text-white/70 group-hover:text-white"
                  : "text-gray-600 group-hover:text-black"
              }`}
            >
              International
            </span>
            <span
              className={`text-xs font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                isDarkBg
                  ? "text-white/70 group-hover:text-white"
                  : "text-gray-600 group-hover:text-black"
              }`}
            >
              Group
            </span>
          </div>
        </a>

        <div
          id="desktop-navlinks"
          className="hidden lg:flex items-center gap-8"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;
            const isRoute = link.href === "/contact";

            if (isRoute) {
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-[13px] transition-all duration-300 relative group ${
                    isActive
                      ? isDarkBg
                        ? "text-white font-medium"
                        : "text-black font-medium"
                      : isDarkBg
                        ? "text-white/60 font-normal hover:text-white"
                        : "text-gray-600 font-normal hover:text-black"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-px transform origin-left transition-transform duration-250 ${
                      isDarkBg ? "bg-white" : "bg-black"
                    } ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick || ((e) => handleNavClick(e, link.href as string, link.sectionId))}

                className={`text-[13px] transition-all duration-300 relative group ${
                  isActive
                    ? isDarkBg
                      ? "text-white font-medium"
                      : "text-black font-medium"
                    : isDarkBg
                      ? "text-white/60 font-normal hover:text-white"
                      : "text-gray-600 font-normal hover:text-black"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-0.5 left-0 right-0 h-px transform origin-left transition-transform duration-250 ${
                    isDarkBg ? "bg-white" : "bg-black"
                  } ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-6">
          <button
            id="desktop-login"
            onClick={openOutOfScope}
            className={`hidden sm:block text-sm font-medium transition-colors duration-300 cursor-pointer ${
              isDarkBg
                ? "text-white/70 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Log In
          </button>


          <button
            id="desktop-getstarted"
            onClick={() => {
              if (location.pathname === "/") {
                scrollToSection("cta");
              } else {
                navigate("/#cta");
              }
            }}
            className={`hidden sm:block rounded-[40px] px-[22px] py-2.5 text-[12px] font-medium font-body transition-all duration-300 tracking-[0.02em] cursor-pointer ${
              isDarkBg
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-gray-800"
            } hover:scale-[0.97]`}
          >
            Get Started →
          </button>

          <button
            id="mobile-menu"
            onClick={toggleMenu}
            className={`lg:hidden p-2 z-110 transition-colors duration-300 ${
              isDarkBg ? "text-white" : "text-black"
            }`}
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
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;
            const isRoute = link.href === "/contact";

            if (isRoute) {
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-display font-bold tracking-tight transition-colors ${
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  }`}
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick || ((e) => handleNavClick(e, link.href as string, link.sectionId))}

                className={`text-2xl font-display font-bold tracking-tight transition-colors ${
                  isActive ? "text-black" : "text-gray-400 hover:text-black"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <button 
            onClick={() => { setIsMenuOpen(false); openOutOfScope(); }}
            className="text-2xl font-display font-bold tracking-tight text-gray-400 hover:text-black transition-colors cursor-pointer"
          >
            Log In
          </button>


          <button
            onClick={() => {
              if (location.pathname === "/") {
                scrollToSection("cta");
                setIsMenuOpen(false);
              } else {
                navigate("/#cta");
              }
            }}
            className="mt-2 bg-black text-white rounded-[40px] px-8 py-4 text-sm font-medium font-body transition-all duration-200 hover:bg-gray-600 hover:scale-[0.97] tracking-[0.02em]"
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
