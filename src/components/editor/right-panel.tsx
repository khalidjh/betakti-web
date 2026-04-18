'use client';

import { useLocale } from 'next-intl';
import { Eye, EyeOff, Lock, LockOpen, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useEditor } from '@/lib/editor/store';
import type {
  CanvasElement,
  TextElement,
  ShapeElement,
  ImageElement,
  ElementAnimation,
  ElementShadow,
} from '@/lib/types/canvas';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { FONTS } from '@/lib/editor/fonts';

export function RightPanel() {
  const locale = useLocale();
  const elements = useEditor((s) => s.elements);
  const selectedIds = useEditor((s) => s.selectedIds);
  const updateElement = useEditor((s) => s.updateElement);
  const removeElement = useEditor((s) => s.removeElement);
  const toggleLocked = useEditor((s) => s.toggleLocked);
  const toggleVisible = useEditor((s) => s.toggleVisible);
  const reorderLayer = useEditor((s) => s.reorderLayer);
  const select = useEditor((s) => s.select);

  const selected = elements.find((e) => e.id === selectedIds[0]);

  return (
    <aside className="w-72 border-s border-[color:var(--border)] flex flex-col">
      <div className="p-3 border-b border-[color:var(--border)] flex-1 overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)] mb-3">
          {locale === 'ar' ? 'الخصائص' : 'Properties'}
        </p>
        {selected ? <ElementProps el={selected} onChange={(p) => updateElement(selected.id, p)} /> : (
          <p className="text-xs text-[color:var(--muted-foreground)]">
            {locale === 'ar' ? 'اختر عنصراً' : 'Select an element'}
          </p>
        )}
      </div>

      <div className="p-3 max-h-64 overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)] mb-2">
          {locale === 'ar' ? 'الطبقات' : 'Layers'}
        </p>
        <div className="space-y-1">
          {[...elements]
            .sort((a, b) => b.zIndex - a.zIndex)
            .map((el) => (
              <div
                key={el.id}
                onClick={() => select([el.id])}
                className={cn(
                  'flex items-center gap-1.5 p-1.5 rounded text-xs cursor-pointer',
                  selectedIds.includes(el.id) ? 'bg-[color:var(--muted)]' : 'hover:bg-[color:var(--muted)]',
                )}
              >
                <span className="flex-1 truncate">{labelFor(el)}</span>
                <IconBtn onClick={() => reorderLayer(el.id, 'forward')}>
                  <ChevronUp size={12} />
                </IconBtn>
                <IconBtn onClick={() => reorderLayer(el.id, 'backward')}>
                  <ChevronDown size={12} />
                </IconBtn>
                <IconBtn onClick={() => toggleVisible(el.id)}>
                  {el.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                </IconBtn>
                <IconBtn onClick={() => toggleLocked(el.id)}>
                  {el.isLocked ? <Lock size={12} /> : <LockOpen size={12} />}
                </IconBtn>
                <IconBtn onClick={() => removeElement(el.id)}>
                  <Trash2 size={12} />
                </IconBtn>
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
}

function IconBtn({ children, onClick }: { children: React.ReactNode; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className="p-1 rounded hover:bg-[color:var(--border)]"
    >
      {children}
    </button>
  );
}

function labelFor(el: CanvasElement): string {
  if (el.type === 'text') return (el as TextElement).text.slice(0, 24) || 'Text';
  if (el.type === 'shape') return (el as ShapeElement).shapeType;
  if (el.type === 'sticker') return el.content;
  return el.type;
}

function ElementProps({
  el,
  onChange,
}: {
  el: CanvasElement;
  onChange: (patch: Partial<CanvasElement>) => void;
}) {
  if (el.type === 'text') {
    const t = el as TextElement;
    return (
      <div className="space-y-3">
        <Input value={t.text} onChange={(e) => onChange({ text: e.target.value } as Partial<TextElement>)} />
        <Row label="Font">
          <select
            value={t.fontFamily}
            onChange={(e) => onChange({ fontFamily: e.target.value } as Partial<TextElement>)}
            className="w-full h-9 rounded-lg border border-[color:var(--border)] bg-transparent px-2 text-sm"
          >
            {FONTS.map((f) => (
              <option key={f.family} value={f.family}>
                {f.label}{f.free ? '' : ' (Pro)'}
              </option>
            ))}
          </select>
        </Row>
        <Row label="Size">
          <Input
            type="number"
            value={t.fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) } as Partial<TextElement>)}
          />
        </Row>
        <Row label="Color">
          <input
            type="color"
            value={t.color}
            onChange={(e) => onChange({ color: e.target.value } as Partial<TextElement>)}
            className="w-full h-8"
          />
        </Row>
        <div className="flex gap-2">
          <Toggle active={t.isBold} onClick={() => onChange({ isBold: !t.isBold } as Partial<TextElement>)}>
            B
          </Toggle>
          <Toggle active={t.isItalic} onClick={() => onChange({ isItalic: !t.isItalic } as Partial<TextElement>)}>
            I
          </Toggle>
          <Toggle
            active={t.isUnderline}
            onClick={() => onChange({ isUnderline: !t.isUnderline } as Partial<TextElement>)}
          >
            U
          </Toggle>
        </div>
        <ShadowEditor el={el} onChange={onChange} />
        <AnimationEditor el={el} onChange={onChange} />
      </div>
    );
  }
  if (el.type === 'image') {
    const im = el as ImageElement;
    return (
      <div className="space-y-3">
        <Row label="Brightness">
          <input
            type="range"
            min={-1}
            max={1}
            step={0.05}
            value={im.brightness}
            onChange={(e) =>
              onChange({ brightness: Number(e.target.value) } as Partial<ImageElement>)
            }
            className="w-full"
          />
        </Row>
        <Row label="Contrast">
          <input
            type="range"
            min={-1}
            max={1}
            step={0.05}
            value={im.contrast}
            onChange={(e) =>
              onChange({ contrast: Number(e.target.value) } as Partial<ImageElement>)
            }
            className="w-full"
          />
        </Row>
        <Row label="Saturation">
          <input
            type="range"
            min={-1}
            max={1}
            step={0.05}
            value={im.saturation}
            onChange={(e) =>
              onChange({ saturation: Number(e.target.value) } as Partial<ImageElement>)
            }
            className="w-full"
          />
        </Row>
        <ShadowEditor el={el} onChange={onChange} />
        <AnimationEditor el={el} onChange={onChange} />
      </div>
    );
  }
  if (el.type === 'shape') {
    const s = el as ShapeElement;
    return (
      <div className="space-y-3">
        <Row label="Fill">
          <input
            type="color"
            value={s.fillColor}
            onChange={(e) => onChange({ fillColor: e.target.value } as Partial<ShapeElement>)}
            className="w-full h-8"
          />
        </Row>
        <Row label="Radius">
          <Input
            type="number"
            value={s.cornerRadius}
            onChange={(e) =>
              onChange({ cornerRadius: Number(e.target.value) } as Partial<ShapeElement>)
            }
          />
        </Row>
        <ShadowEditor el={el} onChange={onChange} />
        <AnimationEditor el={el} onChange={onChange} />
      </div>
    );
  }
  return (
    <div className="space-y-2 text-xs">
      <p>{el.type}</p>
      <Row label="Opacity">
        <input
          type="range"
          min={0}
          max={100}
          value={(el as { opacity?: number }).opacity != null ? ((el as { opacity: number }).opacity) * 100 : 100}
          onChange={(e) =>
            onChange({ opacity: Number(e.target.value) / 100 } as unknown as Partial<CanvasElement>)
          }
          className="w-full"
        />
      </Row>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] uppercase text-[color:var(--muted-foreground)]">{label}</label>
      {children}
    </div>
  );
}

const ANIM_TYPES: ElementAnimation['type'][] = [
  'fadeIn',
  'fadeOut',
  'slideInLeft',
  'slideInRight',
  'slideInTop',
  'slideInBottom',
  'scaleIn',
  'scaleOut',
  'bounceIn',
  'rotateIn',
  'pulse',
  'shake',
  'typewriter',
];

function ShadowEditor({
  el,
  onChange,
}: {
  el: CanvasElement;
  onChange: (patch: Partial<CanvasElement>) => void;
}) {
  const s: ElementShadow = el.shadow ?? {
    color: '#00000066',
    blurRadius: 10,
    offsetX: 4,
    offsetY: 4,
  };
  const enabled = !!el.shadow;
  return (
    <div className="space-y-2 border-t border-[color:var(--border)] pt-3">
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) =>
            onChange({ shadow: e.target.checked ? s : undefined } as Partial<CanvasElement>)
          }
        />
        Shadow
      </label>
      {enabled && (
        <>
          <Row label="Color">
            <input
              type="color"
              value={s.color.slice(0, 7)}
              onChange={(e) =>
                onChange({ shadow: { ...s, color: e.target.value } } as Partial<CanvasElement>)
              }
              className="w-full h-8"
            />
          </Row>
          <Row label="Blur">
            <input
              type="range"
              min={0}
              max={50}
              value={s.blurRadius}
              onChange={(e) =>
                onChange({
                  shadow: { ...s, blurRadius: Number(e.target.value) },
                } as Partial<CanvasElement>)
              }
              className="w-full"
            />
          </Row>
          <Row label="X">
            <input
              type="range"
              min={-40}
              max={40}
              value={s.offsetX}
              onChange={(e) =>
                onChange({
                  shadow: { ...s, offsetX: Number(e.target.value) },
                } as Partial<CanvasElement>)
              }
              className="w-full"
            />
          </Row>
          <Row label="Y">
            <input
              type="range"
              min={-40}
              max={40}
              value={s.offsetY}
              onChange={(e) =>
                onChange({
                  shadow: { ...s, offsetY: Number(e.target.value) },
                } as Partial<CanvasElement>)
              }
              className="w-full"
            />
          </Row>
        </>
      )}
    </div>
  );
}

function AnimationEditor({
  el,
  onChange,
}: {
  el: CanvasElement;
  onChange: (patch: Partial<CanvasElement>) => void;
}) {
  const a: ElementAnimation = el.animation ?? {
    type: 'fadeIn',
    duration: 800,
    delay: 0,
    easing: 'easeOut',
    loop: false,
  };
  const enabled = !!el.animation;
  return (
    <div className="space-y-2 border-t border-[color:var(--border)] pt-3">
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) =>
            onChange({
              animation: e.target.checked ? a : undefined,
            } as Partial<CanvasElement>)
          }
        />
        Animation
      </label>
      {enabled && (
        <>
          <Row label="Type">
            <select
              value={a.type}
              onChange={(e) =>
                onChange({
                  animation: { ...a, type: e.target.value as ElementAnimation['type'] },
                } as Partial<CanvasElement>)
              }
              className="w-full h-8 rounded border border-[color:var(--border)] bg-transparent text-xs"
            >
              {ANIM_TYPES.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </Row>
          <Row label={`Duration (${a.duration}ms)`}>
            <input
              type="range"
              min={100}
              max={3000}
              step={50}
              value={a.duration}
              onChange={(e) =>
                onChange({
                  animation: { ...a, duration: Number(e.target.value) },
                } as Partial<CanvasElement>)
              }
              className="w-full"
            />
          </Row>
          <Row label={`Delay (${a.delay}ms)`}>
            <input
              type="range"
              min={0}
              max={3000}
              step={50}
              value={a.delay}
              onChange={(e) =>
                onChange({
                  animation: { ...a, delay: Number(e.target.value) },
                } as Partial<CanvasElement>)
              }
              className="w-full"
            />
          </Row>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={a.loop}
              onChange={(e) =>
                onChange({
                  animation: { ...a, loop: e.target.checked },
                } as Partial<CanvasElement>)
              }
            />
            Loop
          </label>
        </>
      )}
    </div>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-8 w-8 rounded border text-sm font-bold',
        active ? 'bg-[color:var(--primary)] text-[color:var(--primary-foreground)] border-transparent' : 'border-[color:var(--border)]',
      )}
    >
      {children}
    </button>
  );
}
