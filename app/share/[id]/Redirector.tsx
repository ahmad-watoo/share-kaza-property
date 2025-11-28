"use client";

import { useEffect } from "react";

export default function Redirector({ id }: { id: string }) {
  useEffect(() => {
    if (!id) return;

    // Clean ID: remove any query params WhatsApp adds
    const cleanId = id.split("?")[0].split("&")[0];

    window.location.href = `https://kazaswap.co/property/${cleanId}`;
  }, [id]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecting to property…</p>
    </div>
  );
}
