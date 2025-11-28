import { ImageResponse } from 'next/og';
import { supabaseServer } from '@/lib/supabaseServer';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const id = ctx.params.id;

  const { data: property, error } = await supabaseServer
    .from('properties')
    .select('title, main_image_url')
    .eq('id', id)
    .single();

  if (error || !property) {
    return new Response('Not found', { status: 404 });
  }

  const title = property.title || 'KazaSwap Property';
  const img = property.main_image_url;

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
          src={img}
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
            padding: '36px',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))',
            color: 'white',
            fontSize: 54,
            fontWeight: 700,
            textShadow: '0 3px 6px rgba(0,0,0,0.4)',
          }}
        >
          {title}
        </div>
      </div>
    ),
    size
  );
}
