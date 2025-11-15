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
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

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

  if (!animationData) {
    return (
      <div
        className={cn("bg-gray-100/60 rounded-2xl animate-pulse", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    />
  );
}
