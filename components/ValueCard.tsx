"use client";

import styled from "styled-components";

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textBody};
  font-size: 1rem;
`;

type ValueCardProps = {
  titulo: string;
  descricao: string;
};

export function ValueCard({ titulo, descricao }: ValueCardProps) {
  return (
    <Card>
      <Title>{titulo}</Title>
      <Description>{descricao}</Description>
    </Card>
  );
}
