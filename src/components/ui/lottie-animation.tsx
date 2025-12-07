import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/lib/utils";

interface LottieAnimationProps {
  path: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  ariaLabel?: string;
  startOnView?: boolean;
  scrollSync?: boolean;
}

/**
 * Lazy loads and renders a Lottie animation stored in /public/lottie.
 * This keeps JSON files out of the bundle while still enabling reuse.
 */
export function LottieAnimation({
  path,
  className,
  loop = true,
  autoplay = true,
  speed = 1,
  ariaLabel,
  startOnView = false,
  scrollSync = false,
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(() => scrollSync || !startOnView);

  useEffect(() => {
    setHasStarted(scrollSync || !startOnView);
  }, [scrollSync, startOnView]);

  useEffect(() => {
    let isMounted = true;

    async function loadAnimation() {
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        const data = await response.json();
        if (isMounted) {
          setAnimationData(data);
        }
      } catch (error) {
        console.error(`Failed to load Lottie animation from ${path}`, error);
      }
    }

    setAnimationData(null);
    loadAnimation();

    return () => {
      isMounted = false;
    };
  }, [path]);

  useEffect(() => {
    if (animationData && lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [animationData, speed]);

  useEffect(() => {
    if (scrollSync || !startOnView) {
      return;
    }

    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [startOnView, scrollSync]);

  useEffect(() => {
    if (scrollSync) {
      return;
    }
    if (!startOnView || !hasStarted || !lottieRef.current) {
      return;
    }

    const timeout = setTimeout(() => {
      lottieRef.current?.goToAndPlay(0, true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [startOnView, hasStarted, scrollSync]);

  useEffect(() => {
    if (!scrollSync || !animationData || !lottieRef.current) {
      return;
    }

    const lottie = lottieRef.current;
    const totalFrames = lottie.getDuration(true);
    if (!totalFrames || totalFrames <= 0) return;

    let rafId: number | null = null;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    const updateFrame = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const viewport = window.innerHeight || 1;
      const rawProgress = 1 - (rect.top + rect.height) / (viewport + rect.height);
      const progress = clamp(rawProgress, 0, 1);

      lottie.goToAndStop(progress * totalFrames, true);
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateFrame);
    };

    updateFrame();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollSync, animationData]);

  const content = animationData ? (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={scrollSync ? false : loop}
      autoplay={scrollSync ? false : startOnView ? false : autoplay}
      className="w-full h-full"
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    />
  ) : (
    <div
      className="bg-gray-100/60 rounded-2xl animate-pulse w-full h-full"
      aria-hidden="true"
    />
  );

  return (
    <div ref={containerRef} className={cn("inline-block", className)}>
      {content}
    </div>
  );
}
