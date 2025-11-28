import { headers } from 'next/headers'
import { supabaseServer } from '../../lib/supabaseServer'
import React from 'react'
import Head from 'next/head'

// server component
export default async function SharePage({ params }: { params: { id: string } }) {
  const { id } = params
  if (!id) {
    return new Response('Missing id', { status: 400 })
  }

  const { data: property, error } = await supabaseServer
    .from('properties')
    .select('title, description, main_image_url')
    .eq('id', id)
    .single()

  if (error || !property) {
    // 404 minimal page
    return new Response('<html><body>Property not found</body></html>', {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    })
  }

  const title = property.title ?? 'Property Listing'
  const description = property.description ?? 'View property details'
  // point og:image to your Next.js OG generator
  const ogImage = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og/${id}`

  // Final frontend property URL to redirect users (client-side)
  const frontendUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/property/${id}`

  // render HTML string with proper og tags (crawlers consume this)
  const html = `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:secure_url" content="${ogImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />

    <meta http-equiv="refresh" content="0; url=${frontendUrl}" />
  </head>
  <body>
    <p>Redirecting to property...</p>
    <script>window.location.href="${frontendUrl}"</script>
  </body>
  </html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // small TTL for changes (you can make this longer: e.g., max-age=3600 if images won't change)
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
    }
  })
}

// small helper
function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
