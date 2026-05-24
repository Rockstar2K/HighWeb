import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ShapeGridBackground } from '@/components/decorations/shapeGridBackground';
import { ALL_BEHANCE_ASSETS, shuffleAssets, type BehanceAsset } from '@/data/behanceProjects';

// Local fallback images (used if a CDN image fails to load)
const localModules = import.meta.glob('@/assets/trabajos/*.{png,jpg,jpeg,JPG}', { eager: true });
const localFallbacks: BehanceAsset[] = Object.entries(localModules).map(([path, mod], i) => {
  const name = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
  return {
    id: `local-${i}`,
    src: (mod as { default: string }).default,
    alt: name,
    projectUrl: 'https://www.behance.net/natnortega',
    projectName: 'HighDesign',
  };
});

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TrabajosPage() {
  const assets = useMemo(
    () => (ALL_BEHANCE_ASSETS.length ? shuffleAssets(ALL_BEHANCE_ASSETS) : shuffleAssets(localFallbacks)),
    [],
  );

  const [rowSpans, setRowSpans] = useState<Record<string, number>>({});
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  const handleLoad = (id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    if (rowSpans[id]) return;
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (!naturalWidth || !naturalHeight) return;
    const span = Math.max(Math.round((naturalHeight / naturalWidth) * 28), 18);
    setRowSpans((prev) => ({ ...prev, [id]: span }));
  };

  const handleError = (id: string) => {
    setFailedIds((prev) => new Set(prev).add(id));
  };

  const getSpan = (asset: BehanceAsset) => rowSpans[asset.id] ?? 26;

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
            Una selección de proyectos reales de branding, identidad y diseño. Cada pieza,
            creada con propósito.
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

        {/* Masonry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[10px]">
          {visible.map((asset, index) => (
            <motion.a
              key={asset.id}
              href={asset.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.2)] border border-white/60"
              style={{ gridRow: `span ${getSpan(asset)}` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.025, 0.5), duration: 0.5, ease: EASE }}
            >
              <img
                src={asset.src}
                alt={asset.alt}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
                onLoad={(e) => handleLoad(asset.id, e)}
                onError={() => handleError(asset.id)}
                loading={index < 9 ? 'eager' : 'lazy'}
                decoding="async"
              />

              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <div className="max-w-[78%]">
                  <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">
                    Ver proyecto
                  </p>
                  <p className="font-bold text-base text-white leading-tight line-clamp-2">
                    {asset.projectName}
                  </p>
                </div>
                <span className="shrink-0 ml-2 inline-flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-gray-900 shadow">
                  Behance
                </span>
              </div>
            </motion.a>
          ))}
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
    </div>
  );
}
