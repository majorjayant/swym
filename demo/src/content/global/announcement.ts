import type { AnnouncementBar } from '../schema';

export const announcement = {
  meta: { id: 'announcement', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  enabled: true,
  text: { en: 'Demo preview with sample data. Vehicles, prices, reviews and policies shown are examples.' },
  dismissible: true,
  theme: 'ink',
  dismissLabel: { en: 'Dismiss announcement' },
} satisfies AnnouncementBar;
