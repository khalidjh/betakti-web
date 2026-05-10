export type OccasionId =
  | 'ramadan'
  | 'eid_fitr'
  | 'eid_adha'
  | 'national_day'
  | 'foundation_day'
  | 'new_year'
  | 'hijri_new_year';

export interface OccasionWindow {
  id: OccasionId;
  startMonth: number; // 1-12
  startDay: number;
  endMonth: number;
  endDay: number;
  category: string;
}

export const DEFAULT_OCCASIONS: OccasionWindow[] = [
  { id: 'new_year', startMonth: 12, startDay: 28, endMonth: 1, endDay: 3, category: 'new-year' },
  { id: 'foundation_day', startMonth: 2, startDay: 18, endMonth: 2, endDay: 24, category: 'foundation-day' },
  { id: 'ramadan', startMonth: 2, startDay: 25, endMonth: 3, endDay: 30, category: 'ramadan' },
  { id: 'eid_fitr', startMonth: 3, startDay: 29, endMonth: 4, endDay: 5, category: 'eid' },
  { id: 'eid_adha', startMonth: 6, startDay: 5, endMonth: 6, endDay: 12, category: 'eid' },
  { id: 'hijri_new_year', startMonth: 6, startDay: 26, endMonth: 7, endDay: 2, category: 'hijri-new-year' },
  { id: 'national_day', startMonth: 9, startDay: 20, endMonth: 9, endDay: 25, category: 'national-day' }
];

function inWindow(date: Date, w: OccasionWindow): boolean {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const start = w.startMonth * 100 + w.startDay;
  const end = w.endMonth * 100 + w.endDay;
  const cur = m * 100 + d;
  if (start <= end) return cur >= start && cur <= end;
  return cur >= start || cur <= end;
}

export function detectOccasion(
  date: Date = new Date(),
  windows: OccasionWindow[] = DEFAULT_OCCASIONS
): OccasionWindow | null {
  for (const w of windows) if (inWindow(date, w)) return w;
  return null;
}
