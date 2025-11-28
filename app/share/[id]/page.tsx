import type { Metadata } from 'next';
import { supabaseServer } from '@/lib/supabaseServer';
import Redirector from './Redirector';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const { data: property } = await supabaseServer
    .from('properties')
    .select('title, description, main_image_url')
    .eq('id', id)
    .single();

  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kazaswap.co';

  const title = property?.title ?? 'KazaSwap Property';
  const description =
    property?.description ?? 'View this property on KazaSwap.';
  const ogImage = `${SITE}/api/og/${id}`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: `${SITE}/property/${id}`,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function SharePage({ params }: Props) {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kazaswap.co';
  const targetUrl = `${SITE}/property/${params.id}`;

  // Real HTML + meta tags handled by Next using generateMetadata()
  // This component just redirects humans via client JS.
  return <Redirector url={targetUrl} />;
}
