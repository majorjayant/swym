'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { HeroSection, HeroSlide } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { useReducedMotion } from '@/lib/use-media';
import { ButtonLink } from '../ui/button';
import { Icon } from '../ui/icon';
import { MediaImage, isPlaceholderImage } from '../ui/media';
import { PlaceholderBadge, RichInline } from '../ui/placeholder';
import { cn } from '../ui/cn';
import { asset } from '@/lib/base-path';

const ink = (x: number) => `rgb(17 19 21 / ${Math.min(Math.max(x, 0), 0.95).toFixed(2)})`;

/**
 * Minimum ink alpha behind white text so contrast stays >= 4.5:1 even over a pure white photo:
 * 255(1 - a) + 17a <= 118 (relative luminance 0.183)  =>  a >= 0.576. We use 0.6.
 */
export const MIN_TEXT_SCRIM = 0.6;

/** Desktop scrim: strong across the text column (left ~60%), fading toward the photo's subject on the right. */
function scrimDesktop(s: HeroSlide['scrim']): React.CSSProperties {
  const a = Math.max(s.opacity, MIN_TEXT_SCRIM);
  if (s.kind === 'solid') return { background: ink(a) };
  if (s.direction === 'centre') return { background: `radial-gradient(ellipse 70% 80% at center, ${ink(a + 0.05)} 0%, ${ink(a)} 60%, ${ink(a * 0.6)} 100%)` };
  if (s.direction === 'bottom') return { background: `linear-gradient(0deg, ${ink(a + 0.15)} 0%, ${ink(a + 0.05)} 55%, ${ink(a * 0.4)} 100%)` };
  return { background: `linear-gradient(90deg, ${ink(a + 0.2)} 0%, ${ink(a + 0.12)} 66%, ${ink(a * 0.35)} 100%)` };
}

/** Mobile scrim: text covers the full width, so the whole image is darkened evenly. */
function scrimMobile(s: HeroSlide['scrim']): React.CSSProperties {
  const a = Math.max(s.opacity, MIN_TEXT_SCRIM) + 0.1;
  return { background: `linear-gradient(0deg, ${ink(a + 0.1)} 0%, ${ink(a)} 100%)` };
}

/** On-brand stand-in for a missing lot photo: ink, the supplied sedan mark large and cropped, the corner wedge. */
function HeroPlaceholderMedia({ markSrc }: { markSrc?: string }) {
  return (
    <div className="wedge absolute inset-0 bg-ink" aria-hidden="true">
      {markSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(markSrc)}
          alt=""
          className="pointer-events-none absolute bottom-[8%] left-[38%] w-[150%] max-w-none select-none opacity-[0.08] md:left-[42%] md:w-[95%] lg:bottom-[12%] lg:left-[46%] lg:w-[70%]"
        />
      ) : null}
    </div>
  );
}

/** Full-bleed hero: image or muted video, scrim for contrast, up to 5 slides. h1 only on slide 1. */
export function Hero({ section }: { section: HeroSection }) {
  const { content } = useContent();
  const t = useT();
  const reduced = useReducedMotion();
  const slides = section.slides.filter((s) => s.enabled);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  const playing = section.autoplay && !reduced && !paused && !hovered && count > 1;
  useEffect(() => {
    if (!playing) return;
    const ms = Math.min(Math.max(section.intervalMs, 4000), 10000);
    const id = window.setTimeout(() => go(index + 1), ms);
    return () => window.clearTimeout(id);
  }, [playing, index, go, section.intervalMs]);

  if (!count) return null;
  const titleId = `${section.id}-title`;

  return (
    <section
      id={section.anchor}
      data-theme="dark"
      aria-roledescription="carousel"
      aria-labelledby={titleId}
      className="relative isolate overflow-hidden bg-ink text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(false);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      {/* All slides share one grid cell, so the hero grows to the tallest slide instead of clipping it. */}
      <div className="grid">
        {slides.map((s, i) => {
          const active = i === index;
          const Title = i === 0 ? 'h1' : 'h2';
          const placeholder = isPlaceholderImage(s.media.image) && !(s.media.kind === 'video' && s.media.video);
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                'relative [grid-area:1/1] transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-brand)]',
                active ? 'z-10 opacity-100' : 'z-0 opacity-0',
              )}
            >
              {placeholder ? (
                <HeroPlaceholderMedia markSrc={(content.site.logo.markOnDark ?? content.site.logo.mark)?.src} />
              ) : s.media.kind === 'video' && s.media.video && !reduced ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={asset(s.media.video.src)}
                  poster={isPlaceholderImage(s.media.image) ? undefined : asset(s.media.image.src)}
                  autoPlay={active}
                  muted
                  loop={s.media.video.loop}
                  playsInline
                  preload={i === 0 ? 'metadata' : 'none'}
                  aria-hidden="true"
                />
              ) : (
                <MediaImage image={s.media.image} fill priority={i === 0} sizes="100vw" className="h-full w-full" showBadge={false} />
              )}
              {!placeholder ? (
                <>
                  <div className="absolute inset-0 lg:hidden" style={scrimMobile(s.scrim)} aria-hidden="true" />
                  <div className="absolute inset-0 hidden lg:block" style={scrimDesktop(s.scrim)} aria-hidden="true" />
                </>
              ) : null}
              <div className="relative z-10 flex min-h-[min(72svh,44rem)] items-start md:items-center lg:min-h-[min(calc(100svh-6rem),52rem)]">
                <div className={cn('container-page w-full pb-28 pt-8 md:pt-16 lg:pb-28 lg:pt-20', s.align === 'centre' && 'text-center')}>
                  <div
                    className={cn(
                      'max-w-[38rem] transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-brand)]',
                      s.align === 'centre' && 'mx-auto',
                      active ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-4 opacity-0',
                    )}
                  >
                    {s.eyebrow ? <p className="label mb-4 text-grey">{t(s.eyebrow)}</p> : null}
                    <Title id={i === 0 ? titleId : undefined} className="text-display-fluid font-bold">
                      {t(s.headline)}
                    </Title>
                    {s.subhead ? (
                      <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-grey md:mt-5 md:text-lead">
                        <RichInline text={t(s.subhead)} />
                      </p>
                    ) : null}
                    <div className={cn('mt-6 flex flex-wrap gap-3 md:mt-8', s.align === 'centre' && 'justify-center')}>
                      <ButtonLink link={s.primaryCta} size="lg" tone="dark" />
                      {s.secondaryCta ? <ButtonLink link={s.secondaryCta} size="lg" tone="dark" /> : null}
                    </div>
                    {s.textLink ? (
                      <div className="mt-5">
                        <ButtonLink link={s.textLink} variant="text" tone="dark" iconAfter="arrow-right" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {placeholder || isPlaceholderImage(s.media.image) ? (
                <span className="absolute bottom-[4.75rem] right-4 z-10 text-white/80 md:right-8 lg:bottom-6 xl:right-10">
                  <PlaceholderBadge note={t(s.media.image.alt)} />
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      {count > 1 ? (
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="container-page flex items-center justify-between gap-4 pb-5 lg:justify-start lg:gap-6">
            <div className="flex items-center gap-1" role="group">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={t(section.controls.goTo, { n: i + 1 })}
                  aria-current={i === index ? 'true' : undefined}
                  className="group inline-flex size-11 items-center justify-center"
                >
                  <span
                    className={cn(
                      'block h-1 rounded-full transition-[width,background-color] duration-[var(--duration-base)]',
                      i === index ? 'w-8 bg-red' : 'w-4 bg-white/50 group-hover:bg-white',
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => go(index - 1)} aria-label={t(section.controls.previous)} className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-ink">
                <Icon name="chevron-left" size={18} />
              </button>
              <button type="button" onClick={() => go(index + 1)} aria-label={t(section.controls.next)} className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-ink">
                <Icon name="chevron-right" size={18} />
              </button>
              {section.autoplay && !reduced ? (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={t(paused ? section.controls.play : section.controls.pause)}
                  aria-pressed={paused}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-ink"
                >
                  <Icon name={paused ? 'play' : 'pause'} size={16} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <p className="sr-only" aria-live={playing ? 'off' : 'polite'}>
        {`${index + 1} / ${count}: ${t(slides[index].headline)}`}
      </p>
    </section>
  );
}
