"use client"

import { useEffect, useRef, useState } from "react";
import { motion, type Variants, type Transition } from "motion/react";
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
    "pointer-events-none absolute inset-0 rounded-sm bg-[linear-gradient(135deg,#8b5cf6_0%,#6b4bd4_45%,#4b2bbf_100%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100";
  const gradientGlow =
    "pointer-events-none absolute -inset-2 rounded-xl blur-3xl bg-[linear-gradient(135deg,rgba(53,240,153,0.25),rgba(119,65,234,0.2))] opacity-0 transition-opacity duration-400 group-hover:opacity-90";

  const easeHero: Transition["ease"] = [0.16, 1, 0.3, 1];
  const easeContent: Transition["ease"] = [0.22, 1, 0.36, 1];
  const easeSweep: Transition["ease"] = [0.25, 1, 0.3, 1];
  const easeBeam: Transition["ease"] = [0.42, 0, 0.58, 1];

  const heroEntrance: Variants = {
    hidden: { opacity: 0, scale: 1.08, rotateX: 6, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: easeHero },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: easeContent, staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeContent } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-visible z-0"
    >
      <motion.div
        className="absolute inset-0 z-0"
        variants={heroEntrance}
        initial="hidden"
        animate="visible"
      >
        <ShapeGridBackground
          scrollProgress={scrollProgress}
          hiddenPositions={[24]}
          className="z-0"
          style={{ aspectRatio: "9/6" }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: easeSweep }}
      >
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12),transparent_30%,rgba(53,240,153,0.08),transparent_70%,rgba(119,65,234,0.12))]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.01, 1, 1.02] }}
          transition={{ duration: 5, repeat: Infinity, ease: easeContent }}
          style={{
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0) 100%)",
          }}
        />
        <motion.div
          className="absolute left-[-30%] right-[-30%] top-1/3 h-[26%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)]"
          animate={{ x: ["-15%", "25%", "0%"], opacity: [0, 1, 0] }}
          transition={{ duration: 4.2, delay: 0.2, repeat: Infinity, repeatDelay: 2.3, ease: easeBeam }}
          style={{
            maskImage: "linear-gradient(180deg, transparent 0%, black 40%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 40%, black 70%, transparent 100%)",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-white/5 z-0 pointer-events-none" />
      <div className="h-full flex items-center justify-center relative z-10">
        <motion.div
          className="container px-4 md:px-6 relative"
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.05 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-6 text-center"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-4" variants={childVariants}>
              <motion.h1
                className="text-4xl font-bold tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl "
                variants={childVariants}
              >
                Diseño estratégico <br />
                para marcas con{" "}
                <motion.span
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#35F099] via-[#46c9ff] to-[#7741EA] drop-shadow-[0_10px_30px_rgba(119,65,234,0.18)]"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  ambición.
                </motion.span>
              </motion.h1>
              <motion.p className="mx-auto max-w-[700px] text-gray-500 md:text-xl" variants={childVariants}>
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
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-4 min-[400px]:flex-row"
              variants={childVariants}
              transition={{ staggerChildren: 0.06 }}
            >
              <motion.div variants={childVariants}>
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
              </motion.div>
              <motion.div variants={childVariants}>
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
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
