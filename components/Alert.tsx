"use client";

import styled from "styled-components";
import type { ReactNode } from "react";

const StyledAlert = styled.div`
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.textBody};
  font-size: 1rem;
`;

type AlertProps = {
  children: ReactNode;
};

export function Alert({ children }: AlertProps) {
  return <StyledAlert role="alert">{children}</StyledAlert>;
}
