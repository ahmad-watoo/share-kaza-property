import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const { data: property } = await supabaseServer
    .from("properties")
    .select("title, description")
    .eq("id", id)
    .single();

  const title = property?.title ?? "KazaSwap Property";
  const description = property?.description ?? "View this property on KazaSwap";

  const SITE = "https://share-kaza-property-io4q.vercel.app";
  const FRONTEND = "https://kazaswap.co";

  const redirectUrl = `${FRONTEND}/property/${id}`;
  const ogImage = `${SITE}/api/og/${id}`;

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:type" content="website" />
<meta property="og:image" content="${ogImage}" />
<meta name="twitter:card" content="summary_large_image" />
<meta http-equiv="refresh" content="0;url=${redirectUrl}" />
</head>
<body>
Redirecting...
<script>location.href="${redirectUrl}"</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });
}
