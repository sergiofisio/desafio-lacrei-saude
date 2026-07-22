"use client";

import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 140px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

const Bone = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width ?? "100%"};
  height: ${({ $height }) => $height ?? "1rem"};
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.primaryLight} 45%,
    ${({ theme }) => theme.colors.border} 90%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

type ValueCardSkeletonProps = {
  count?: number;
};

export function ValueCardSkeleton({ count = 4 }: ValueCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Card key={index} aria-hidden="true">
          <Bone $width="42%" $height="1.25rem" />
          <Bone $width="100%" $height="0.9rem" />
          <Bone $width="92%" $height="0.9rem" />
          <Bone $width="70%" $height="0.9rem" />
        </Card>
      ))}
    </>
  );
}
