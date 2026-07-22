"use client";

import { useEffect, type ReactNode } from "react";

async function enableMocking() {
  if (typeof window === "undefined") return;

  const { worker } = await import("@/lib/msw/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
    quiet: true,
  });
}

export function MSWProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    void enableMocking();
  }, []);

  return <>{children}</>;
}
