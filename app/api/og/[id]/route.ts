import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { supabaseServer } from '@/lib/supabaseServer';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { data: property, error } = await supabaseServer
    .from('properties')
    .select('title, main_image_url')
    .eq('id', id)
    .single();
  console.log(`property data: ${property}`)
  if (error || !property) {
    return new Response('Not found', { status: 404 });
  }

  const title = property.title ?? 'Property';
  const imageUrl = property.main_image_url;
  console.log(`title: ${title}, imageUrl: ${imageUrl}`)

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
        }}
      >
        <img
          src={imageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: 32,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
            color: 'white',
            fontSize: 48,
            fontWeight: 'bold',
          }}
        >
          {title}
        </div>
      </div>
    ),
    size
  );
}
