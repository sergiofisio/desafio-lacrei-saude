"use client";

import styled from "styled-components";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageTransition } from "@/components/PageTransition";
import { SkipToContent } from "@/components/SkipToContent";

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <Shell>
      <SkipToContent />
      <Header />
      <Main id="main-content" tabIndex={-1}>
        <PageTransition>{children}</PageTransition>
      </Main>
      <Footer />
    </Shell>
  );
}
