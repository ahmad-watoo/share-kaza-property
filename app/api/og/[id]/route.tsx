import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  if (!id) {
    return new Response('Missing id', { status: 400 });
  }

  const { data: property, error } = await supabaseServer
    .from('properties')
    .select('title, main_image_url')
    .eq('id', id)
    .single();

  if (error || !property) {
    return new Response('Not found', { status: 404 });
  }

  const title = property.title ?? 'KazaSwap Property';
  const imageUrl = property.main_image_url;

  const OGComponent = () => (
    <div
      style={{
        width: '1200px',
        height: '630px',
        position: 'relative',
        display: 'flex',
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#e5e7eb',
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: 32,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
          color: '#ffffff',
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        {title}
      </div>
    </div>
  );

  return new ImageResponse(<OGComponent />, size);
}
