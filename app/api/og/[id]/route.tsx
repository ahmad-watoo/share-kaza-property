import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { supabaseServer } from '@/lib/supabaseServer';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) return new Response('Missing id', { status: 400 });

  const { data: property, error } = await supabaseServer
    .from('properties')
    .select('title, main_image_url')
    .eq('id', id)
    .single();

  if (error || !property) {
    return new Response('Not found', { status: 404 });
  }

  const title = property.title ?? 'Property';
  const imageUrl = property.main_image_url;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'stretch',
          fontFamily: 'Inter, system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {imageUrl ? (
          <img
            alt={title}
            src={imageUrl}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
            left: 0,
            bottom: 0,
            width: '100%',
            padding: 32,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
            color: 'white',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 48,
              lineHeight: 1.05,
              fontWeight: 700,
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    ),
    size
  );
}
