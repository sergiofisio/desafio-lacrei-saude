"use client";

import Link from "next/link";
import styled from "styled-components";
import { Container } from "@/components/Layout";

const FooterBar = styled.footer`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInvert};
`;

const Inner = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
`;

const Brand = styled.p`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textInvert};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    text-decoration-thickness: 2px;
  }
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.textInvert};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    text-decoration-thickness: 2px;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textInvert};
  font-size: 0.875rem;
`;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterBar>
      <Inner>
        <div>
          <Brand>Lacrei Saúde</Brand>
          <Copyright>
            © {year} Lacrei Saúde. Cuidado com inclusão e segurança.
          </Copyright>
        </div>

        <Nav aria-label="Rodapé">
          <FooterLink href="/">Início</FooterLink>
          <FooterLink href="/sobre">Sobre</FooterLink>
          <ExternalLink
            href="https://lacreisaude.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Site oficial
          </ExternalLink>
        </Nav>
      </Inner>
    </FooterBar>
  );
}
