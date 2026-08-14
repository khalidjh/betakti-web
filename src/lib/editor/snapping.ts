/**
 * Alignment snapping ("smart guides").
 *
 * Given the axis-aligned box of whatever is being dragged and the boxes of
 * everything it could align to, find the smallest nudge that lands one of the
 * dragged box's edges or centers exactly on one of theirs, then report the
 * guide lines to draw for the alignments that ended up exact.
 *
 * Everything here is in world (artboard) units and free of Fabric/DOM, so the
 * threshold has to be converted from screen pixels by the caller — that's what
 * keeps the snap feeling identical at 25% and 400% zoom.
 */

export interface SnapBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Guide {
  /** 'x' is a vertical line (constant x); 'y' is a horizontal one. */
  axis: 'x' | 'y';
  /** World coordinate of the line itself. */
  pos: number;
  /** Extent of the line along the other axis, in world units. */
  start: number;
  end: number;
}

export interface SnapResult {
  dx: number;
  dy: number;
  guides: Guide[];
}

/** Two lines closer than this are treated as the same line. */
const EPSILON = 0.01;

function linesX(b: SnapBox): number[] {
  return [b.left, b.left + b.width / 2, b.left + b.width];
}

function linesY(b: SnapBox): number[] {
  return [b.top, b.top + b.height / 2, b.top + b.height];
}

/**
 * Smallest delta along one axis that puts any moving line on any target line,
 * or 0 if nothing is within `threshold`.
 */
function bestDelta(
  moving: number[],
  targets: SnapBox[],
  pick: (b: SnapBox) => number[],
  threshold: number
): number {
  let best = 0;
  let bestDist = Infinity;
  for (const t of targets) {
    for (const tl of pick(t)) {
      for (const ml of moving) {
        const dist = Math.abs(tl - ml);
        if (dist < bestDist) {
          bestDist = dist;
          best = tl - ml;
        }
      }
    }
  }
  return bestDist <= threshold ? best : 0;
}

/**
 * Guides for the alignments that are exact *after* the nudge has been applied.
 * Several targets can share one line, so spans are merged by position — a guide
 * always stretches far enough to touch the dragged box and every target it
 * lines up with.
 */
function collectGuides(moved: SnapBox, targets: SnapBox[], axis: 'x' | 'y'): Guide[] {
  const movingLines = axis === 'x' ? linesX(moved) : linesY(moved);
  const mStart = axis === 'x' ? moved.top : moved.left;
  const mEnd = axis === 'x' ? moved.top + moved.height : moved.left + moved.width;

  const byPos = new Map<number, { start: number; end: number }>();
  for (const t of targets) {
    const tLines = axis === 'x' ? linesX(t) : linesY(t);
    const tStart = axis === 'x' ? t.top : t.left;
    const tEnd = axis === 'x' ? t.top + t.height : t.left + t.width;
    for (const tl of tLines) {
      if (!movingLines.some((ml) => Math.abs(ml - tl) < EPSILON)) continue;
      // Round so lines that agree to within EPSILON land in the same bucket.
      const key = Math.round(tl / EPSILON) * EPSILON;
      const cur = byPos.get(key);
      byPos.set(key, {
        start: Math.min(mStart, tStart, cur?.start ?? Infinity),
        end: Math.max(mEnd, tEnd, cur?.end ?? -Infinity)
      });
    }
  }

  return [...byPos.entries()].map(([pos, span]) => ({ axis, pos, start: span.start, end: span.end }));
}

export function computeSnap(moving: SnapBox, targets: SnapBox[], threshold: number): SnapResult {
  if (threshold <= 0 || targets.length === 0) return { dx: 0, dy: 0, guides: [] };

  const dx = bestDelta(linesX(moving), targets, linesX, threshold);
  const dy = bestDelta(linesY(moving), targets, linesY, threshold);
  const moved: SnapBox = {
    left: moving.left + dx,
    top: moving.top + dy,
    width: moving.width,
    height: moving.height
  };

  return {
    dx,
    dy,
    guides: [...collectGuides(moved, targets, 'x'), ...collectGuides(moved, targets, 'y')]
  };
}
