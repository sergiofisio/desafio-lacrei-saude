"use client";

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 1.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 2rem;
  }
`;

export const Section = styled.section`
  padding: 3rem 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 4rem 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 5rem 0;
  }
`;
