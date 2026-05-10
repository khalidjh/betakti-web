import { m } from '$lib/i18n';

export function relativeTime(ms: number, now: number = Date.now()): string {
  const diff = Math.max(0, now - ms);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return m.time_just_now();
  if (mins < 60) return `${mins} ${m.time_minutes_ago()}`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ${m.time_hours_ago()}`;
  const days = Math.floor(hours / 24);
  return `${days} ${m.time_days_ago()}`;
}
