'use client';

import { useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import {
  Type,
  Square,
  Circle,
  Triangle,
  Star,
  Smile,
  Image as ImageIcon,
  Palette,
  Sparkles,
} from 'lucide-react';
import { useEditor } from '@/lib/editor/store';
import {
  createShape,
  createSticker,
  createText,
  createImage,
} from '@/lib/editor/factories';
import type { ShapeType } from '@/lib/types/canvas';
import { PexelsPicker } from './pexels-picker';

const EMOJIS = ['❤️', '⭐', '🌙', '✨', '🎉', '🌸', '🔥', '💎', '🌹', '👑'];
const SHAPES: { type: ShapeType; Icon: typeof Square }[] = [
  { type: 'rectangle', Icon: Square },
  { type: 'circle', Icon: Circle },
  { type: 'triangle', Icon: Triangle },
  { type: 'star', Icon: Star },
];
const COLORS = [
  '#ffffff',
  '#000000',
  '#6d28d9',
  '#f59e0b',
  '#ef4444',
  '#10b981',
  '#3b82f6',
  '#ec4899',
];
const GRADIENTS: { colors: [string, string]; start: string; end: string }[] = [
  { colors: ['#6d28d9', '#ec4899'], start: 'topLeft', end: 'bottomRight' },
  { colors: ['#f59e0b', '#ef4444'], start: 'topLeft', end: 'bottomRight' },
  { colors: ['#10b981', '#3b82f6'], start: 'topLeft', end: 'bottomRight' },
  { colors: ['#000000', '#6d28d9'], start: 'top', end: 'bottom' },
];

export function LeftPanel() {
  const locale = useLocale();
  const addElement = useEditor((s) => s.addElement);
  const setBackground = useEditor((s) => s.setBackground);
  const fileRef = useRef<HTMLInputElement>(null);
  const [showPexels, setShowPexels] = useState(false);
  const [pexelsTarget, setPexelsTarget] = useState<'element' | 'bg'>('element');

  return (
    <aside className="w-64 border-e border-[color:var(--border)] p-3 overflow-y-auto space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)] mb-2 flex items-center gap-2">
          <Type size={14} /> {locale === 'ar' ? 'نص' : 'Text'}
        </p>
        <button
          onClick={() => addElement(createText(locale === 'ar' ? 'اكتب هنا' : 'Type here'))}
          className="w-full text-start p-3 rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--muted)]"
        >
          {locale === 'ar' ? 'أضف عنواناً' : 'Add a heading'}
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)] mb-2">
          {locale === 'ar' ? 'أشكال' : 'Shapes'}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {SHAPES.map(({ type, Icon }) => (
            <button
              key={type}
              onClick={() => addElement(createShape(type))}
              className="aspect-square rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--muted)] flex items-center justify-center"
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)] mb-2 flex items-center gap-2">
          <Smile size={14} /> {locale === 'ar' ? 'ملصقات' : 'Stickers'}
        </p>
        <div className="grid grid-cols-5 gap-2">
          {EMOJIS.map((em) => (
            <button
              key={em}
              onClick={() => addElement(createSticker(em))}
              className="aspect-square rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--muted)] text-xl"
            >
              {em}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)] mb-2 flex items-center gap-2">
          <ImageIcon size={14} /> {locale === 'ar' ? 'صورة' : 'Image'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="p-3 rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--muted)] text-xs"
          >
            {locale === 'ar' ? 'رفع' : 'Upload'}
          </button>
          <button
            onClick={() => {
              setPexelsTarget('element');
              setShowPexels(true);
            }}
            className="p-3 rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--muted)] text-xs flex items-center gap-1 justify-center"
          >
            <Sparkles size={12} /> Pexels
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => addElement(createImage(reader.result as string));
            reader.readAsDataURL(file);
            e.target.value = '';
          }}
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)] mb-2 flex items-center gap-2">
          <Palette size={14} /> {locale === 'ar' ? 'الخلفية' : 'Background'}
        </p>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setBackground({ type: 'color', color: c })}
              className="aspect-square rounded-lg border border-[color:var(--border)]"
              style={{ backgroundColor: c }}
              aria-label={c}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {GRADIENTS.map((g, i) => (
            <button
              key={i}
              onClick={() =>
                setBackground({
                  type: 'gradient',
                  colors: g.colors,
                  start: g.start,
                  end: g.end,
                })
              }
              className="aspect-video rounded-lg border border-[color:var(--border)]"
              style={{
                background: `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})`,
              }}
            />
          ))}
        </div>
        <button
          onClick={() => {
            setPexelsTarget('bg');
            setShowPexels(true);
          }}
          className="w-full p-2 rounded-lg border border-[color:var(--border)] text-xs"
        >
          {locale === 'ar' ? 'صورة خلفية من Pexels' : 'Pexels background'}
        </button>
      </div>

      {showPexels && (
        <PexelsPicker
          onClose={() => setShowPexels(false)}
          onPick={(url) => {
            if (pexelsTarget === 'bg') {
              setBackground({ type: 'image', src: url, fit: 'cover' });
            } else {
              addElement(createImage(url));
            }
          }}
        />
      )}
    </aside>
  );
}
