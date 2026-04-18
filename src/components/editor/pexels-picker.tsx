'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface PexelsPhoto {
  id: number;
  src: { large: string; medium: string; original: string };
  alt: string;
}

const CATEGORIES_AR = ['طبيعة', 'تجريدي', 'زهور', 'طعام', 'مدن', 'تقنية', 'سفر'];
const CATEGORIES_EN = ['nature', 'abstract', 'flowers', 'food', 'city', 'technology', 'travel'];

export function PexelsPicker({
  onPick,
  onClose,
}: {
  onPick: (url: string) => void;
  onClose: () => void;
}) {
  const locale = useLocale();
  const [q, setQ] = useState('nature');
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(query: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/pexels/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setPhotos(data.photos ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    search('nature');
  }, []);

  const cats = locale === 'ar' ? CATEGORIES_AR : CATEGORIES_EN;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-[color:var(--background)] rounded-2xl p-5 w-full max-w-3xl max-h-[85vh] flex flex-col gap-3 relative">
        <button onClick={onClose} className="absolute top-3 end-3 p-1 rounded hover:bg-[color:var(--muted)]">
          <X size={18} />
        </button>
        <h2 className="text-lg font-bold">Pexels</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search(q);
          }}
          className="flex gap-2"
        >
          <Input value={q} onChange={(e) => setQ(e.target.value)} />
          <Button type="submit">🔍</Button>
        </form>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {cats.map((c, i) => (
            <button
              key={c}
              onClick={() => {
                setQ(CATEGORIES_EN[i]);
                search(CATEGORIES_EN[i]);
              }}
              className="px-3 py-1 rounded-full text-xs border border-[color:var(--border)] whitespace-nowrap"
            >
              {c}
            </button>
          ))}
        </div>
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <p className="text-sm text-[color:var(--muted-foreground)] p-6 text-center">…</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {photos.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.id}
                  src={p.src.medium}
                  alt={p.alt}
                  className="aspect-square object-cover rounded-md cursor-pointer hover:opacity-80"
                  onClick={() => {
                    onPick(p.src.large);
                    onClose();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
