'use client';

import { useEffect } from 'react';

export default function Redirector({ url }: { url: string }) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecting to property…</p>
    </div>
  );
}
