export const brandGradientStops = [
  { offset: 0, color: '#07BEFB' },
  { offset: 0.5, color: '#356CF6' },
  { offset: 1, color: '#5B28D6' }
] as const;

export const colors = {
  accent: '#5B46F6',
  accentHover: '#4A37E6',
  teal: '#10B6FB',
  violet: '#8B5CF6',
  ink: '#0B0D17',
  ink2: '#3A3D4D',
  muted: '#6B7280',
  paper: '#FAFAFB',
  surface: '#FFFFFF',
  surface2: '#F4F4F6',
  border: '#E8E8EC',
  borderStrong: '#D1D5DB',
  success: '#10B981',
  warning: '#F59E0B',
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
