import type { AnnouncementBar } from '../schema';

export const announcement = {
  meta: { id: 'announcement', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  enabled: false,
  text: { en: '[PLACEHOLDER: short announcement, for example holiday hours or a new arrival]' },
  dismissible: true,
  theme: 'ink',
  dismissLabel: { en: 'Dismiss announcement' },
} satisfies AnnouncementBar;
