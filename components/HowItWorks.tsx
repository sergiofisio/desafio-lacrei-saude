"use client";

import { useState } from "react";
import styled from "styled-components";

const steps = [
  {
    id: 1,
    title: "Cadastre-se",
    text: "Crie sua conta gratuitamente na plataforma Lacrei Saúde.",
  },
  {
    id: 2,
    title: "Busque profissionais",
    text: "Encontre profissionais qualificados com uma busca descomplicada.",
  },
  {
    id: 3,
    title: "Valide seu contato",
    text: "Confirme o telefone por SMS para mais segurança no atendimento.",
  },
  {
    id: 4,
    title: "Marque a consulta",
    text: "Entre em contato com a pessoa profissional e agende seu cuidado.",
  },
];

const Layout = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 240px 1fr;
    align-items: start;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primaryLight : theme.colors.surface};
  color: ${({ theme }) => theme.colors.textHeading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  cursor: pointer;
`;

const Badge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.textInvert : theme.colors.textHeading};
  font-size: 0.875rem;
`;

const Panel = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  min-height: 140px;
`;

const PanelTitle = styled.h3`
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
`;

export function HowItWorks() {
  const [active, setActive] = useState(1);
  const current = steps.find((step) => step.id === active) ?? steps[0];

  return (
    <Layout>
      <Tabs role="tablist" aria-label="Etapas do fluxo">
        {steps.map((step) => (
          <Tab
            key={step.id}
            role="tab"
            type="button"
            id={`step-tab-${step.id}`}
            aria-selected={active === step.id}
            aria-controls={`step-panel-${step.id}`}
            $active={active === step.id}
            onClick={() => setActive(step.id)}
          >
            <Badge $active={active === step.id}>{step.id}</Badge>
            {step.title}
          </Tab>
        ))}
      </Tabs>

      <Panel
        role="tabpanel"
        id={`step-panel-${current.id}`}
        aria-labelledby={`step-tab-${current.id}`}
      >
        <PanelTitle>
          Passo {current.id}: {current.title}
        </PanelTitle>
        <p>{current.text}</p>
      </Panel>
    </Layout>
  );
}
