import { Metadata } from "next";
import { supabaseServer } from "@/lib/supabaseServer";
export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    console.log(params)
  const { id } = params;

  // Fetch property from Supabase
  const { data: property } = await supabaseServer
    .from("properties")
    .select("title, description, main_image_url")
    .eq("id", id)
    .single();

  const title = property?.title || "Property Listing";
  const description = property?.description || "View property details";

  // Build thumbnail URL by appending "_thumbnail" before extension
  let imageUrl = property?.main_image_url || "";
  imageUrl = imageUrl.replace(/(\.[a-zA-Z0-9]+)$/, "_thumbnail$1");

  return {
    title,
    description,
    openGraph: {
        title,
        description,
        type: "website",
        url: `https://kazaswap.co/property/${id}`,
        images: [
            `https://share-kaza-property-io4q.vercel.app/property/${id}/opengraph-image`,
        ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function PropertyPage({ params }: Props) {
  return (
    <div>
      <h1>Property {params.id}</h1>
      {/* Your UI here */}
    </div>
  );
}
