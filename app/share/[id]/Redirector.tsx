"use client";

import { useEffect } from "react";

export default function Redirector({ id }: { id: string }) {
  useEffect(() => {
    window.location.href = `https://kazaswap.co/property/${id}`;
  }, [id]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecting to property…</p>
    </div>
  );
}
