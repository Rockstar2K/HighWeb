import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, Cookie, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type ConsentMode = "all" | "essential" | "custom";

type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
  experience: boolean;
};

type StoredConsent = {
  mode: ConsentMode;
  preferences: ConsentPreferences;
  timestamp: string;
};

const STORAGE_KEY = "highweb-cookie-consent";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const defaultPreferences: ConsentPreferences = {
  analytics: true,
  marketing: true,
  experience: true,
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasStoredConsent, setHasStoredConsent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(defaultPreferences);
  const gaLoadedRef = useRef(false);
  const legalHideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredConsent = JSON.parse(stored);
        if (parsed?.mode) {
          setPreferences(parsed.preferences ?? defaultPreferences);
          setHasStoredConsent(true);
          return;
        }
      }
    } catch {
      // ignore malformed localStorage values
    }

    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    setIsClosing(false);
    const id = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(id);
  }, [isVisible]);

  const persistConsent = (mode: ConsentMode, prefs: ConsentPreferences) => {
    if (typeof window === "undefined") return;

    const payload: StoredConsent = {
      mode,
      preferences: prefs,
      timestamp: new Date().toISOString(),
    };

    setPreferences(prefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setHasStoredConsent(true);
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 280);
  };

  const handleAcceptAll = () => persistConsent("all", {
    analytics: true,
    marketing: true,
    experience: true,
  });

  const handleSaveCustom = () => persistConsent("custom", preferences);

  const openLegal = () => {
    if (legalHideTimeout.current) {
      clearTimeout(legalHideTimeout.current);
      legalHideTimeout.current = null;
    }
    setShowLegal(true);
    requestAnimationFrame(() => setIsExpanded(true));
  };

  const closeLegal = () => {
    setIsExpanded(false);
    legalHideTimeout.current = setTimeout(() => setShowLegal(false), 420);
  };

  const togglePreference = (key: keyof ConsentPreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    openLegal();
  };

  const handleToggleLegal = () => {
    if (isExpanded) {
      closeLegal();
      return;
    }
    openLegal();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hasStoredConsent) return;
    if (!preferences.analytics) return;
    if (gaLoadedRef.current) return;
    if (!GA_MEASUREMENT_ID) return;

    gaLoadedRef.current = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args) {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
  }, [hasStoredConsent, preferences.analytics]);

  if (!isVisible) return null;

  const bannerMotion = isReady && !isClosing
    ? "translate-y-0 scale-100 opacity-100"
    : "translate-y-3 scale-[0.99] opacity-0";

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(820px,calc(100%-20px))] -translate-x-1/2 px-1">
      <div className={`relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-[0_16px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl ring-1 ring-white/30 transition-all duration-300 ease-out ${bannerMotion}`}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.16)_100%)]" />
        <div className="pointer-events-none absolute -left-8 -top-10 h-24 w-24 rounded-full bg-[#7741EA]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-[#35F099]/20 blur-3xl" />
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg text-[#7741EA]">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="space-y-1 text-left">
            <h3 className="text-lg font-semibold text-gray-900">Cookie Time!</h3>
            <p className="text-sm text-gray-700">
              Esenciales siempre activas. Las opcionales hacen tu experiencia en nuestra página aún más electrificante. Después de todo ¿Qué mejor que tener un sitio web que se adapte a ti? Ajusta cuando quieras.
            </p>
          </div>
        </div>

        {showLegal && (
          <div
            className={`origin-top rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700 overflow-hidden transition-[opacity,transform,max-height,filter] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              isExpanded
                ? "opacity-100 translate-y-0 scale-100 max-h-[520px] backdrop-blur-[0px]"
                : "opacity-0 -translate-y-2 scale-[0.97] max-h-0 pointer-events-none backdrop-blur-[0px]"
            }`}
          >
            <p className="mb-2 font-semibold text-gray-900 text-sm">Base legal y preferencias</p>
            <ul className="space-y-1">
              <li>• Interés legítimo para medición (GA4, Clarity); puedes desactivar.</li>
              <li>• Consentimiento para publicidad y remarketing en Meta.</li>
              <li>• Esenciales siempre activas para seguridad y funcionamiento.</li>
              <li>• Guardamos tu elección hasta que la restablezcas o borres las cookies.</li>
            </ul>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <PreferencePill
                label="Analytics (GA4)"
                active={preferences.analytics}
                visible={isExpanded}
                delay={40}
                onClick={() => togglePreference("analytics")}
              />
              <PreferencePill
                label="Publicidad (Meta)"
                active={preferences.marketing}
                visible={isExpanded}
                delay={100}
                onClick={() => togglePreference("marketing")}
              />
              <PreferencePill
                label="Experiencia (Clarity)"
                active={preferences.experience}
                visible={isExpanded}
                delay={160}
                onClick={() => togglePreference("experience")}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            className="text-xs font-semibold text-[#7741EA] underline underline-offset-4 hover:text-[#5b2bb9]"
            onClick={handleToggleLegal}
          >
            {isExpanded ? "Ocultar base legal" : "Base legal y personalizar"}
          </button>
          <div className="grid w-full gap-2 sm:grid-cols-3 md:w-auto md:grid-cols-3">
            <Button
              variant="purple"
              onClick={handleAcceptAll}
              className="w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-[0_8px_26px_rgba(119,65,234,0.25)]"
            >
              Aceptar todo
            </Button>
            <Button
              variant="ghost"
              onClick={() => (isExpanded ? handleSaveCustom() : handleToggleLegal())}
              className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-[#7741EA] hover:bg-[#7741EA]/10"
            >
              {isExpanded ? "Guardar prefs" : "Personalizar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type PreferencePillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  visible: boolean;
  delay: number;
};

function PreferencePill({ label, active, onClick, visible, delay }: PreferencePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ transitionDelay: `${visible ? delay : 0}ms` }}
      className={`flex items-center justify-between rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
      } ${
        active
          ? "border-[#7741EA] bg-[#7741EA]/10 text-[#552bc4] shadow-[0_10px_30px_rgba(119,65,234,0.18)]"
          : "border-gray-200 bg-white/60 text-gray-700 hover:border-[#7741EA]/60 hover:text-[#7741EA]"
      }`}
      aria-pressed={active}
    >
      {label}
      <span
        className={`ml-3 flex h-6 w-10 items-center rounded-full p-1 transition-all duration-300 ${
          active ? "bg-[#7741EA]" : "bg-gray-200"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${active ? "translate-x-4" : ""}`}
        />
      </span>
    </button>
  );
}
