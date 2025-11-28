import { supabaseServer } from '@/lib/supabaseServer';

export async function GET(req: Request, ctx: { params: { id: string } }) {
  const id = ctx.params.id;

  const { data: property } = await supabaseServer
    .from('properties')
    .select('title, description')
    .eq('id', id)
    .single();

  const title = property?.title || 'KazaSwap Property';
  const desc = property?.description || 'View property';

  const SITE = process.env.NEXT_PUBLIC_SITE_URL!;
  const ogImage = `${SITE}/api/og/${id}`;
  const redirectUrl = `${SITE}/property/${id}`;

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>

  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(desc)}" />
  <meta property="og:image" content="${ogImage}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${ogImage}" />

  <meta http-equiv="refresh" content="0;url=${redirectUrl}">
</head>
<body>
  Redirecting...
  <script>location.href="${redirectUrl}"</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public,max-age=60',
    },
  });
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
