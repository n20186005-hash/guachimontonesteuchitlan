'use client';

import { useEffect, useState } from 'react';

export default function NearbyRating({ slug, locale, mapUrl }: { slug: string; locale: string; mapUrl: string }) {
  const [value, setValue] = useState<{ rating: number; count: number } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/nearby-rating/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data?.available && typeof data.rating === 'number' && typeof data.count === 'number') setValue(data); })
      .catch(() => {});
    return () => controller.abort();
  }, [slug]);
  const label = locale === 'zh' ? 'Google 地图实时评分与评价' : locale === 'es' ? 'Valoración y reseñas en Google Maps' : 'Google Maps rating and reviews';
  return <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="underline" aria-label={label}>
    {value ? `★ ${value.rating.toFixed(1)}/5 · ${new Intl.NumberFormat(locale).format(value.count)} ${locale === 'zh' ? '条评价' : locale === 'es' ? 'reseñas' : 'reviews'} · Google Maps` : label}
  </a>;
}
