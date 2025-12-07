"use client"

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShapeGridBackground } from "@/components/decorations/shapeGridBackground";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const services = [
    { label: "Creación de marcas", to: "/branding" },
    { label: "Sitios Web", to: "/sitios-web" },
    { label: "Redes sociales", to: "/redes-sociales" },
    { label: "Animación", to: "/animaciones" },
  ];

  useEffect(() => {
    let frame: number | null = null;

    const updateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height || 1;
      const offset = Math.min(Math.max(-rect.top, 0), sectionHeight);
      const progress = offset / sectionHeight;
      setScrollProgress(progress);
    };

    const handleScroll = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  const hoverGlowBase =
    "group relative overflow-visible transition-all duration-400 hover:-translate-y-0.5 shadow-[0_12px_32px_rgba(53,240,153,0.15)] hover:shadow-[0_16px_50px_rgba(119,65,234,0.28)]";
  const gradientHoverLayer =
    "pointer-events-none absolute inset-0 rounded-md bg-[linear-gradient(135deg,#2EF2A8_0%,#46C9FF_45%,#7741EA_100%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100";
  const contactGradientHoverLayer =
    "pointer-events-none absolute inset-0 rounded-md bg-[linear-gradient(135deg,#8b5cf6_0%,#6b4bd4_45%,#4b2bbf_100%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100";
  const gradientGlow =
    "pointer-events-none absolute -inset-2 rounded-xl blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(53,240,153,0.35),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(119,65,234,0.35),transparent_55%)] opacity-0 transition-opacity duration-400 group-hover:opacity-90";

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-visible z-0"
    >
      <ShapeGridBackground
        scrollProgress={scrollProgress}
        hiddenPositions={[24]}
        style={{ aspectRatio: "9/6" }}
      />

      <div className="absolute inset-0 bg-white/5 z-0 pointer-events-none" />
      <div className="h-full flex items-center justify-center relative z-10">
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl ">
                Diseño estratégico <br/>
                para marcas con{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35F099] via-[#46c9ff] to-[#7741EA] drop-shadow-[0_10px_30px_rgba(119,65,234,0.18)]">
                  ambición.
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                {services.map((service, index) => (
                  <span key={service.to}>
                    {index > 0 && " - "}
                    <Link
                      to={service.to}
                      className="no-underline !text-gray-500 visited:!text-gray-500 transition-colors hover:!text-[#35F099]"
                    >
                      {service.label}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button
                size="lg"
                className={`${hoverGlowBase} bg-[#35F099]! text-black! border-none! ring-0!`}
                variant="green"
              >
                <span className={gradientGlow} aria-hidden />
                <span className={gradientHoverLayer} aria-hidden />
                <Link className="relative z-10 text-black! group-hover:text-white!" to="/servicios">
                  Servicios
                </Link>
              </Button>
              <Button
                size="lg"
                variant="white"
                className={`${hoverGlowBase} bg-white! text-[#7741EA]! border-[#7741EA]! hover:bg-transparent!`}
              >
                <span className={gradientGlow} aria-hidden />
                <span className={contactGradientHoverLayer} aria-hidden />
                <Link className="relative z-10 text-[#7741EA]! group-hover:text-white!" to="/contacto">
                  Contacto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
