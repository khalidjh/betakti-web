import type { Action } from 'svelte/action';

export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, params) => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    node.style.opacity = '1';
    node.style.transform = 'none';
    return {};
  }

  node.style.opacity = '0';
  node.style.transform = 'translateY(16px)';
  node.style.transition =
    'opacity var(--duration-large, 320ms) var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)), transform var(--duration-large, 320ms) var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1))';
  node.style.transitionDelay = `${params?.delay ?? 0}ms`;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'none';
          io.unobserve(node);
        }
      }
    },
    { threshold: 0.12 }
  );
  io.observe(node);

  return {
    destroy() {
      io.disconnect();
    }
  };
};
