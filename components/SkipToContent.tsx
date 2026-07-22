"use client";

import styled from "styled-components";

const Link = styled.a`
  position: fixed;
  left: 1rem;
  top: -100px;
  z-index: 1000;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInvert};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: 8px;
  text-decoration: none;

  &:focus {
    top: 1rem;
  }
`;

export function SkipToContent() {
  return <Link href="#main-content">Ir para o conteúdo</Link>;
}
