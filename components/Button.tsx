"use client";

import styled, { css } from "styled-components";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "critical";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
  asLink?: boolean;
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInvert};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryPressed};
      border-color: ${({ theme }) => theme.colors.primaryPressed};
    }
  `,
  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryLight};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.colors.border};
    }
  `,
  critical: css`
    background: ${({ theme }) => theme.colors.critical};
    color: ${({ theme }) => theme.colors.textInvert};
    border: 2px solid ${({ theme }) => theme.colors.critical};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.criticalHover};
      border-color: ${({ theme }) => theme.colors.criticalHover};
    }
  `,
};

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function Button({
  variant = "primary",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} type={type} {...props}>
      {children}
    </StyledButton>
  );
}

export const ButtonLink = styled(StyledButton).attrs({ as: "a" })``;