import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { ShapeGridBackground } from '@/components/decorations/shapeGridBackground';
import { ALL_BEHANCE_ASSETS, shuffleAssets, type BehanceAsset } from '@/data/behanceProjects';

// Local fallback images
const localModules = import.meta.glob('@/assets/trabajos/*.{png,jpg,jpeg,JPG}', { eager: true });
const localFallbacks: BehanceAsset[] = Object.entries(localModules).map(([path, mod], i) => ({
  id: `local-${i}`,
  src: (mod as { default: string }).default,
  alt: path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '',
  projectUrl: 'https://www.behance.net/natnortega',
  projectName: 'HighDesign',
}));

const EASE = [0.16, 1, 0.3, 1] as const;

/** Copies text using clipboard API with execCommand fallback */
function copyToClipboard(text: string): Promise<boolean> {
  // Modern async clipboard API (requires HTTPS or localhost)
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => legacyCopy(text));
  }
  return Promise.resolve(legacyCopy(text));
}

function legacyCopy(text: string): boolean {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(ta);
  return ok;
}

// ─── Curation panel ────────────────────────────────────────────────────────────
function CurationPanel({
  skipped,
  total,
  onClear,
}: {
  skipped: Set<string>;
  total: number;
  onClear: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showIds, setShowIds] = useState(false);

  const ids = [...skipped].join('\n');

  const handleCopy = async () => {
    const ok = await copyToClipboard(ids);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      // If copy fails, show the IDs in a text box so user can manually copy
      setShowIds(true);
    }
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-2xl text-sm font-medium"
      style={{
        background: '#1a1028',
        border: '1px solid rgba(119,65,234,0.5)',
        color: '#fff',
        minWidth: 360,
        maxWidth: 'calc(100vw - 2rem)',
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      {/* Main bar */}
      <div className="flex items-center gap-3 px-5 py-3">
        <div className="flex-1 min-w-0">
          <span style={{ color: '#a78bfa' }}>Modo curación</span>
          <span className="mx-2 text-white/30">·</span>
          {skipped.size > 0 ? (
            <span>
              <span style={{ color: '#f87171' }}>{skipped.size}</span> marcadas de {total}
            </span>
          ) : (
            <span className="text-white/50">Clic en una imagen para excluirla</span>
          )}
        </div>
        {skipped.size > 0 && (
          <>
            <button
              onClick={onClear}
              className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#d1d5db' }}
            >
              Limpiar
            </button>
            <button
              onClick={handleCopy}
              className="shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{
                background: copied ? '#16a34a' : '#7741EA',
                color: '#fff',
                boxShadow: copied ? '0 0 12px rgba(22,163,74,0.4)' : '0 0 12px rgba(119,65,234,0.4)',
              }}
            >
              {copied ? '¡Copiado!' : 'Copiar IDs'}
            </button>
          </>
        )}
      </div>

      {/* Expandable textarea fallback — shown when clipboard API fails */}
      {showIds && skipped.size > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs text-white/50 mb-1.5">Seleccioná todo y copiá manualmente (Ctrl+A → Ctrl+C):</p>
          <textarea
            readOnly
            value={ids}
            rows={Math.min(skipped.size + 1, 6)}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            className="w-full text-xs font-mono rounded-lg p-2 resize-none outline-none"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(119,65,234,0.4)',
              color: '#e2e8f0',
            }}
          />
          <button
            onClick={() => setShowIds(false)}
            className="mt-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function TrabajosPage() {
  const [searchParams] = useSearchParams();
  const curateMode = searchParams.get('curate') === 'true';

  // Stable shuffled list — same order across renders within a session
  const assets = useMemo(
    () =>
      ALL_BEHANCE_ASSETS.length
        ? shuffleAssets(ALL_BEHANCE_ASSETS)
        : shuffleAssets(localFallbacks),
    [],
  );

  // Images that failed to load from CDN
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  // Images the user has clicked to skip (curation mode only)
  const [skippedIds, setSkippedIds] = useState<Set<string>>(new Set());

  const toggleSkip = (id: string) => {
    setSkippedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visible = assets.filter((a) => !failedIds.has(a.id));

  return (
    <div className="relative z-0 min-h-screen w-full overflow-hidden">
      <ShapeGridBackground
        visibleRows={1}
        rowStart={1}
        className="opacity-70"
        style={{ top: 145, height: '10rem' }}
      />
      <div className="absolute inset-0 bg-white/40 pointer-events-none z-0" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 mt-[10vh]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col items-center text-center gap-3 mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold">Portafolio</p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900">Trabajo Destacado</h1>
          <p className="max-w-xl text-gray-500 text-base leading-relaxed">
            Una selección de proyectos reales de branding, identidad y diseño.
            Cada pieza, creada con propósito.
          </p>
          <a
            href="https://www.behance.net/natnortega"
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#7741EA] hover:text-[#5E48F2] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.051-1.858-5.051-5.04 0-3.11 1.08-5.08 5.051-5.08 3.579 0 4.56 2.368 4.56 5.04v.773H14.87c.07 1.683.758 2.56 2.091 2.56.95 0 1.54-.468 1.765-1.253zm-5.817-3.05h3.454c-.029-1.21-.545-1.97-1.668-1.97-1.094 0-1.672.772-1.786 1.97zM7.309 14h2.508c.8 0 1.29-.466 1.29-1.138 0-.643-.398-1.087-1.231-1.087H7.31V14zm.73-4.714h2.223c.71 0 1.107-.39 1.107-.998 0-.64-.43-.998-1.19-.998H8.039v1.996zM5 19h4.347c2.396 0 3.863-1.12 3.863-3.01 0-1.388-.857-2.343-2.177-2.622v-.044c1.096-.317 1.753-1.12 1.753-2.246C12.786 9.23 11.417 8 9.115 8H5v11z" />
            </svg>
            Ver perfil en Behance
          </a>
        </motion.div>

        {/* CSS columns masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: '1rem' }}>
          {visible.map((asset, index) => {
            const isSkipped = skippedIds.has(asset.id);

            return (
              <motion.div
                key={asset.id}
                className="relative block w-full break-inside-avoid mb-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.45), duration: 0.45, ease: EASE }}
              >
                {/* The card — either a link (normal) or a div (curate mode) */}
                {curateMode ? (
                  <button
                    type="button"
                    onClick={() => toggleSkip(asset.id)}
                    className="group relative block w-full overflow-hidden rounded-2xl bg-gray-100 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)] border-2 transition-all duration-200 text-left"
                    style={{
                      borderColor: isSkipped ? '#ef4444' : 'rgba(255,255,255,0.6)',
                      opacity: isSkipped ? 0.45 : 1,
                    }}
                  >
                    <img
                      src={asset.src}
                      alt={asset.alt}
                      className="block w-full h-auto"
                      onError={() => setFailedIds((prev) => new Set(prev).add(asset.id))}
                      loading={index < 12 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    {/* Curate overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 rounded-2xl"
                      style={{ background: isSkipped ? 'rgba(239,68,68,0.35)' : 'rgba(0,0,0,0)', pointerEvents: 'none' }}
                    >
                      {isSkipped && (
                        <span className="text-white font-black text-4xl drop-shadow-lg select-none">✕</span>
                      )}
                    </div>
                    {/* Project label always visible in curate mode */}
                    <div
                      className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded-lg text-[10px] font-semibold"
                      style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}
                    >
                      <span className="truncate">{asset.projectName}</span>
                      <span style={{ color: isSkipped ? '#f87171' : '#86efac' }} className="ml-2 shrink-0">
                        {isSkipped ? 'Excluir' : 'OK'}
                      </span>
                    </div>
                  </button>
                ) : (
                  <a
                    href={asset.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block w-full overflow-hidden rounded-2xl bg-gray-100 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)] border border-white/60"
                  >
                    <img
                      src={asset.src}
                      alt={asset.alt}
                      className="block w-full h-auto transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-105"
                      onError={() => setFailedIds((prev) => new Set(prev).add(asset.id))}
                      loading={index < 12 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 rounded-2xl" />
                    <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 translate-y-1 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="max-w-[76%]">
                        <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">Ver proyecto</p>
                        <p className="font-bold text-base text-white leading-tight line-clamp-2">{asset.projectName}</p>
                      </div>
                      <span className="shrink-0 ml-2 inline-flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-gray-900 shadow">
                        Behance
                      </span>
                    </div>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <a
            href="https://www.behance.net/natnortega"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #7741EA, #5E48F2)',
              boxShadow: '0 8px 32px rgba(119,65,234,0.3)',
            }}
          >
            Ver todos los proyectos en Behance
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Curation HUD — only visible in ?curate=true mode */}
      {curateMode && (
        <CurationPanel
          skipped={skippedIds}
          total={visible.length}
          onClear={() => setSkippedIds(new Set())}
        />
      )}
    </div>
  );
}
