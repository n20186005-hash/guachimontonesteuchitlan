import { NextResponse } from 'next/server';
import { nearbyPlaceIds, nearbySlugs, type NearbySlug } from '@/lib/nearby';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!nearbySlugs.includes(slug as NearbySlug)) return NextResponse.json({ error: 'Unknown attraction' }, { status: 404 });
  const placeId = nearbyPlaceIds[slug as NearbySlug];
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!placeId || !apiKey) return NextResponse.json({ available: false }, { headers: { 'Cache-Control': 'public, max-age=300' } });

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': 'id,rating,userRatingCount' },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return NextResponse.json({ available: false }, { headers: { 'Cache-Control': 'public, max-age=300' } });
    const data = await response.json() as { rating?: number; userRatingCount?: number };
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') return NextResponse.json({ available: false });
    return NextResponse.json({ available: true, rating: data.rating, count: data.userRatingCount }, { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=3600' } });
  } catch {
    return NextResponse.json({ available: false }, { headers: { 'Cache-Control': 'public, max-age=300' } });
  }
}
