import React, { type ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeModeProvider } from "@/components/ThemeModeProvider";

function AllProviders({ children }: { children: ReactNode }) {
  return <ThemeModeProvider>{children}</ThemeModeProvider>;
}

export function renderWithTheme(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from "@testing-library/react";
