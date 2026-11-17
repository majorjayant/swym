import type { DesignTokens } from '../schema';

/**
 * Brand Guidelines v1.0 (November 2026). Values are taken from the guideline:
 * palette p. 11, accessible pairings p. 12, type scale p. 16, corners p. 17.
 * Owner decision at Gate 1 (2026-11-17): this is the only theme.
 */
export const brandV1 = {
  name: 'brandV1',
  colour: {
    ink: '#111315',
    red: '#E30613',
    white: '#FFFFFF',
    lightGrey: '#DFE0E1',
    slate: '#3C4246',
  },
  font: { body: 'Montserrat' },
  // Guideline scale. Pages may use at most two weights in one layout (p. 16).
  scale: {
    display: { size: 64, weight: 800, lineHeight: 1.05, tracking: -0.01 },
    headline: { size: 40, weight: 700, lineHeight: 1.15, tracking: -0.01 },
    title: { size: 24, weight: 600, lineHeight: 1.25 },
    body: { size: 16, weight: 400, lineHeight: 1.5 },
    caption: { size: 12, weight: 500, lineHeight: 1.4 },
    label: { size: 12, weight: 700, lineHeight: 1.2, tracking: 0.18 },
  },
  spacing: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
  // Print cards are square (p. 17); the live site and app icon use rounded corners.
  radius: { card: 8, icon: 19, control: 6 },
  motion: { fast: 150, base: 250, slow: 450, easing: 'cubic-bezier(.22,.61,.36,1)' },
} satisfies DesignTokens;
