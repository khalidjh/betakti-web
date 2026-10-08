// Mirrors the CSS custom properties in app.css (dark, the default theme) and
// the app's lib/core/theme/colors.dart. There is no brand gradient: electric
// blue is the brand, violet is for Pro and AI only.
export const colors = {
  accent: '#2D5FF0',
  accentHover: '#4673F3',
  accentSoft: '#6B93FF',
  violet: '#8B5CF6',
  logoField: '#030824',
  ink: '#FFFFFF',
  ink2: '#B3B3B3',
  muted: '#8A8A90',
  paper: '#0A0A0B',
  surface: '#141416',
  surface2: '#1E1E22',
  border: '#26262B',
  borderStrong: '#333333',
  success: '#22C55E',
  warning: '#FBBF24',
  danger: '#EF4444'
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999
} as const;

export const motion = {
  micro: 120,
  standard: 200,
  large: 320,
  celebrate: 480,
  easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
} as const;
