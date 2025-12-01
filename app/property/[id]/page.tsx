export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { supabaseServer } from "@/lib/supabaseServer";

type Props = {
  params: Promise<{ id: string }>; // notice it's a Promise now
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ⬇⬇ REQUIRED FIX FOR NEXTJS 15
  const { id } = await params;

  console.log("metadata id:", id);

  const { data: property } = await supabaseServer
    .from("properties")
    .select("title, description, main_image_url")
    .eq("id", id)
    .single();
   console.log(`proeprty data:=> ${property}`)
  const title = property?.title || "Property Listing";
  const description = property?.description || "View property details";

  // Build thumbnail URL by appending "_thumbnail" before extension
  let imageUrl = property?.main_image_url || "";
  imageUrl = imageUrl.replace(/(\.[a-zA-Z0-9]+)$/, "_thumbnail$1");
  console.log(`image url,${imageUrl},title ${title}, ${description} `)
  return {
    title,
    description,
    openGraph: {
        title,
        description,
        type: "website",
        url: `https://kazaswap.co/property/${id}`,
        images: [
            // `https://share-kaza-property-io4q.vercel.app/property/${id}/opengraph-image`,
            `${imageUrl}` || `https://share-kaza-property-io4q.vercel.app/property/${id}/opengraph-image`,
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

export default async function PropertyPage({ params }: Props) {
  const { id } = await params; 
  
   return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=https://kazaswap.co/property/${id}`} />
      </head>
      <body>
        <p>Redirecting...</p>
        <script>
          {`window.location.href = "https://kazaswap.co/property/${id}";`}
        </script>
      </body>
    </html>
  );
}
