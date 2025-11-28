import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabaseServer";
import Redirector from "./Redirector";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {

  const { id } = params;

  const { data: property } = await supabaseServer
    .from("properties")
    .select("title, description")
    .eq("id", id)
    .single();

  const title = property?.title ?? "KazaSwap Property";
  const description = property?.description ?? "View this property on KazaSwap";

  const SITE = "https://share-kaza-property-io4q.vercel.app";
  const FRONTEND = "https://kazaswap.co";

  const ogImage = `${SITE}/api/og/${id}`;
  const propertyUrl = `${FRONTEND}/property/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: propertyUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <Redirector id={params.id} />;
}
