import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

// ─── Official Behance logo (Simple Icons — simpleicons.org/icons/behance.svg) ──
function BehanceLogo({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      aria-label="Behance"
    >
      <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
    </svg>
  );
}

// ─── Bento grid layout constants ───────────────────────────────────────────────
const ROW_H = 1;     // px — grid-auto-rows base unit (1px = ≤1px rounding error, no visible gap)
const GAP   = 12;    // px — gap between cells
const COLS_LG = 3;
const COLS_SM = 2;

/**
 * Compute how many grid row units an image needs to display at its natural
 * aspect ratio when placed in a column of `colSpan` width inside `containerW`.
 * Formula: N × ROW_H + (N-1) × GAP = displayHeight  →  N = ⌈(H + GAP) / (ROW_H + GAP)⌉
 */
function calcSpan(
  natW: number,
  natH: number,
  colSpan: number,
  containerW: number,
  numCols: number,
): number {
  if (!natW || !containerW) return 22; // ~square placeholder
  const colW    = (containerW - (numCols - 1) * GAP) / numCols;
  const displayW = colSpan * colW + (colSpan - 1) * GAP;
  const displayH = (natH / natW) * displayW;
  return Math.max(2, Math.ceil((displayH + GAP) / (ROW_H + GAP)));
}

// ─── IDs that span 2 columns ───────────────────────────────────────────────────
const WIDE_IDS: Set<string> = new Set([
  '204820493-0',
  '209088035-5',
  '204820493-1',
  '209088035-7',
  '209075645-8',
  '204820493-2',
  '209075645-20',
  '209088035-0',
  '164479665-2',
  '209073881-8',
]);

// ─── Clipboard helpers ─────────────────────────────────────────────────────────
function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText)
    return navigator.clipboard.writeText(text).then(() => true).catch(() => Promise.resolve(legacyCopy(text)));
  return Promise.resolve(legacyCopy(text));
}
function legacyCopy(text: string): boolean {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(ta);
  return ok;
}

// ─── Reusable HUD panel ────────────────────────────────────────────────────────
function HudPanel({
  label, labelColor, borderColor,
  count, total, ids,
  onClear,
}: {
  label: string; labelColor: string; borderColor: string;
  count: number; total: number; ids: string;
  onClear: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showIds, setShowIds] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(ids);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2500); }
    else setShowIds(true);
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-2xl text-sm font-medium"
      style={{ background: '#0f0f1a', border: `1px solid ${borderColor}`, color: '#fff', minWidth: 360, maxWidth: 'calc(100vw - 2rem)', borderRadius: 20, overflow: 'hidden' }}
    >
      <div className="flex items-center gap-3 px-5 py-3">
        <div className="flex-1 min-w-0">
          <span style={{ color: labelColor }}>{label}</span>
          <span className="mx-2 text-white/30">·</span>
          {count > 0
            ? <span><span style={{ color: labelColor }}>{count}</span> de {total}</span>
            : <span className="text-white/50">Clic en una imagen para marcarla</span>}
        </div>
        {count > 0 && (
          <>
            <button onClick={onClear} className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: '#d1d5db' }}>Limpiar</button>
            <button onClick={handleCopy} className="shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-all" style={{ background: copied ? '#16a34a' : labelColor, color: labelColor === '#35F099' ? '#0d1a28' : '#fff', boxShadow: `0 0 12px ${labelColor}55` }}>
              {copied ? '¡Copiado!' : 'Copiar IDs'}
            </button>
          </>
        )}
      </div>
      {showIds && count > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs text-white/50 mb-1.5">Ctrl+A → Ctrl+C para copiar:</p>
          <textarea readOnly value={ids} rows={Math.min(count + 1, 6)} onClick={(e) => (e.target as HTMLTextAreaElement).select()} className="w-full text-xs font-mono rounded-lg p-2 resize-none outline-none" style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${borderColor}`, color: '#e2e8f0' }} />
          <button onClick={() => setShowIds(false)} className="mt-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">Cerrar</button>
        </div>
      )}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function TrabajosPage() {
  const [searchParams] = useSearchParams();
  const curateMode = searchParams.get('curate') === 'true';
  const wideMode   = searchParams.get('wide')   === 'true';

  const assets = useMemo(
    () => ALL_BEHANCE_ASSETS.length ? shuffleAssets(ALL_BEHANCE_ASSETS) : shuffleAssets(localFallbacks),
    [],
  );

  // ── Bento grid state ─────────────────────────────────────────────────────────
  const gridRef   = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [numCols,    setNumCols]    = useState(COLS_LG);
  const [rowSpans,   setRowSpans]   = useState<Record<string, number>>({});
  const naturalDims = useRef<Record<string, [number, number]>>({});

  // Observe grid width changes
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const update = (w: number) => {
      setContainerW(w);
      setNumCols(w < 768 ? COLS_SM : COLS_LG);
    };
    const ro = new ResizeObserver(([e]) => update(e.contentRect.width));
    ro.observe(el);
    update(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // ── Curation / wide-select state ─────────────────────────────────────────────
  const [failedIds,      setFailedIds]      = useState<Set<string>>(new Set());
  const [skippedIds,     setSkippedIds]     = useState<Set<string>>(new Set());
  const [wideSelectedIds, setWideSelectedIds] = useState<Set<string>>(new Set());

  const toggleSkip = (id: string) =>
    setSkippedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const toggleWideSelect = (id: string) =>
    setWideSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // Determine whether an asset is "wide" at render time
  const isWideId = useCallback(
    (id: string) => wideMode ? wideSelectedIds.has(id) : WIDE_IDS.has(id),
    [wideMode, wideSelectedIds],
  );

  // Recompute all spans when layout changes (resize or wide-selection toggle)
  useEffect(() => {
    if (!containerW) return;
    const next: Record<string, number> = {};
    for (const [id, [natW, natH]] of Object.entries(naturalDims.current)) {
      const colSpan = isWideId(id) ? 2 : 1;
      next[id] = calcSpan(natW, natH, colSpan, containerW, numCols);
    }
    setRowSpans(prev => ({ ...prev, ...next }));
  }, [containerW, numCols, isWideId]);

  // Called when each image finishes loading
  const handleLoad = useCallback((id: string, img: HTMLImageElement) => {
    const { naturalWidth: natW, naturalHeight: natH } = img;
    if (!natW) return;
    // Always store dims so the resize effect can pick them up even if containerW isn't ready yet
    naturalDims.current[id] = [natW, natH];
    if (!containerW) return;
    const colSpan = isWideId(id) ? 2 : 1;
    setRowSpans(prev => ({ ...prev, [id]: calcSpan(natW, natH, colSpan, containerW, numCols) }));
  }, [containerW, numCols, isWideId]);

  const visible = assets.filter(a => !failedIds.has(a.id));

  return (
    <div className="relative z-0 min-h-screen w-full overflow-hidden">
      <ShapeGridBackground visibleRows={1} rowStart={1} className="opacity-70" style={{ top: 145, height: '10rem' }} />
      <div className="absolute inset-0 bg-white/40 pointer-events-none z-0" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 mt-[10vh]">

        {/* ── Header + CTA ──────────────────────────────────────────────────── */}
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
            <BehanceLogo className="w-4 h-4" />
            Ver perfil en Behance
          </a>
        </motion.div>

        {/* ── Bento masonry grid ─────────────────────────────────────────────── */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 1fr)`,
            gridAutoRows: `${ROW_H}px`,
            gridAutoFlow: 'row dense',
            gap: `${GAP}px`,
          }}
        >
          {visible.map((asset, index) => {
            const isSkipped     = skippedIds.has(asset.id);
            const isWide        = isWideId(asset.id);
            const span          = rowSpans[asset.id] ?? 22;
            const colSpan       = isWide ? 2 : 1;
            const isWideSelected = wideSelectedIds.has(asset.id);

            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(index * 0.012, 0.35), duration: 0.4, ease: EASE }}
                style={{
                  gridColumn: `span ${colSpan}`,
                  gridRow: `span ${span}`,
                  overflow: 'hidden',
                  borderRadius: 16,
                  position: 'relative',
                  minHeight: 0,
                }}
              >
                {curateMode ? (
                  /* ── Curate mode ── */
                  <button
                    type="button"
                    onClick={() => toggleSkip(asset.id)}
                    className="block w-full h-full text-left"
                    style={{ outline: 'none', border: isSkipped ? '3px solid #ef4444' : '3px solid transparent', borderRadius: 16, opacity: isSkipped ? 0.45 : 1 }}
                  >
                    <img
                      src={asset.src}
                      alt={asset.alt}
                      className="w-full h-auto"
                      style={{ display: 'block' }}
                      onError={() => setFailedIds(p => new Set(p).add(asset.id))}
                      onLoad={e => handleLoad(asset.id, e.currentTarget)}
                      loading={index < 12 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: isSkipped ? 'rgba(239,68,68,0.35)' : 'transparent', pointerEvents: 'none', borderRadius: 16 }}>
                      {isSkipped && <span className="text-white font-black text-4xl drop-shadow-lg select-none">✕</span>}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded-lg text-[10px] font-semibold" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}>
                      <span className="truncate">{asset.projectName}</span>
                      <span style={{ color: isSkipped ? '#f87171' : '#86efac' }} className="ml-2 shrink-0">{isSkipped ? 'Excluir' : 'OK'}</span>
                    </div>
                  </button>

                ) : wideMode ? (
                  /* ── Wide-select mode ── */
                  <button
                    type="button"
                    onClick={() => toggleWideSelect(asset.id)}
                    className="block w-full h-full text-left"
                    style={{ outline: 'none', border: isWideSelected ? '3px solid #35F099' : '3px solid transparent', borderRadius: 16 }}
                  >
                    <img
                      src={asset.src}
                      alt={asset.alt}
                      className="w-full h-auto"
                      style={{ display: 'block' }}
                      onError={() => setFailedIds(p => new Set(p).add(asset.id))}
                      onLoad={e => handleLoad(asset.id, e.currentTarget)}
                      loading={index < 12 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: isWideSelected ? 'rgba(53,240,153,0.2)' : 'transparent', pointerEvents: 'none', borderRadius: 16 }}>
                      {isWideSelected && <span className="text-white font-black text-3xl drop-shadow-lg select-none">⟷</span>}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded-lg text-[10px] font-semibold" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}>
                      <span className="truncate">{asset.projectName}</span>
                      <span style={{ color: isWideSelected ? '#35F099' : '#9ca3af' }} className="ml-2 shrink-0">{isWideSelected ? 'Ancha ⟷' : 'Normal'}</span>
                    </div>
                  </button>

                ) : (
                  /* ── Normal mode ── */
                  <a
                    href={asset.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group block w-full h-full"
                  >
                    <img
                      src={asset.src}
                      alt={asset.alt}
                      className="w-full h-full transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-105"
                      style={{ display: 'block' }}
                      onError={() => setFailedIds(p => new Set(p).add(asset.id))}
                      onLoad={e => handleLoad(asset.id, e.currentTarget)}
                      loading={index < 12 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
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

      </div>

      {/* ── HUDs ──────────────────────────────────────────────────────────────── */}
      {curateMode && (
        <HudPanel
          label="Modo curación" labelColor="#a78bfa" borderColor="rgba(119,65,234,0.5)"
          count={skippedIds.size} total={visible.length} ids={[...skippedIds].join('\n')}
          onClear={() => setSkippedIds(new Set())}
        />
      )}
      {wideMode && (
        <HudPanel
          label="Modo ancho" labelColor="#35F099" borderColor="rgba(53,240,153,0.4)"
          count={wideSelectedIds.size} total={visible.length} ids={[...wideSelectedIds].join('\n')}
          onClear={() => setWideSelectedIds(new Set())}
        />
      )}
    </div>
  );
}
