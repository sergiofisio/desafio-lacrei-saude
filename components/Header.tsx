"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { Container } from "@/components/Layout";
import { ThemeToggle } from "@/components/ThemeToggle";

const HeaderBar = styled.header`
  position: relative;
  flex-shrink: 0;
  z-index: 50;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  gap: 1rem;
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.125rem;
`;

const Nav = styled.nav<{ $open: boolean }>`
  @media (max-width: 767px) {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.background};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textBody};
  padding: 0.5rem 0.25rem;
  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : "transparent")};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 767px) {
    padding: 0.75rem;
    border-bottom: none;
    border-radius: 8px;
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primaryLight : "transparent"};
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const links = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <HeaderBar>
      <Inner>
        <Brand href="/" aria-label="Lacrei Saúde — página inicial">
          <Image
            src="/logo-lacrei.png"
            alt=""
            width={140}
            height={40}
            priority
            style={{ width: "auto", height: 40 }}
          />
        </Brand>

        <Right>
          <ThemeToggle />
          <MenuButton
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Fechar" : "Menu"}
          </MenuButton>

          <Nav id={menuId} $open={open} aria-label="Principal">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                $active={pathname === link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </NavLink>
            ))}
          </Nav>
        </Right>
      </Inner>
    </HeaderBar>
  );
}
