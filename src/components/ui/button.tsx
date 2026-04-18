import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:opacity-90',
  secondary: 'bg-[color:var(--muted)] text-[color:var(--foreground)] hover:opacity-90',
  ghost: 'bg-transparent hover:bg-[color:var(--muted)]',
  outline:
    'border border-[color:var(--border)] bg-transparent hover:bg-[color:var(--muted)]',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-md',
  md: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-12 px-6 text-base rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', size = 'md', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});
