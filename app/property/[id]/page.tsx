import { redirect } from "next/navigation";
import { Metadata } from "next";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data: property } = await supabaseServer
    .from("properties")
    .select("title, description, main_image_url")
    .eq("id", id)
    .single();
  const title = property?.title || "Property Listing";
  const description = property?.description || "View property details";

  let imageUrl = property?.main_image_url || "";
  imageUrl = imageUrl.replace(/(\.[a-zA-Z0-9]+)$/, "_thumbnail$1");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://kazaswap.co/property/${id}`, // correct canonical URL
      images: [imageUrl],
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

  // USER REDIRECT
  redirect(`https://kazaswap.co/property/${id}`);
}
