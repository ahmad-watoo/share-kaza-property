import { ImageResponse } from "next/og";
import { supabaseServer } from "@/lib/supabaseServer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
console.log('supabse keys',supabaseServer)
export default async function OGImage({ params }: { params: { id: string }}) {
  const { data: property } = await supabaseServer
    .from("properties")
    .select("title, main_image_url")
    .eq("id", params.id)
    .single();

  const { title, main_image_url } = property || {};

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "#fff",
          width: "100%",
          height: "100%",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          src={main_image_url}
          width="1200"
          height="400"
          style={{ objectFit: "cover" }}
        />
        <h1 style={{ marginTop: "20px" }}>{title}</h1>
      </div>
    ),
    size
  );
}
