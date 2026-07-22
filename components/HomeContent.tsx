"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Alert } from "@/components/Alert";
import { Button, ButtonLink } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HowItWorks } from "@/components/HowItWorks";
import { InterestForm } from "@/components/InterestForm";
import { Container, Section } from "@/components/Layout";
import { buscarFaq, type FaqItem } from "@/lib/mockApi";

const Hero = styled.section`
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: 3rem 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 4.5rem 0;
  }
`;

const Title = styled.h1`
  max-width: 18ch;
  color: ${({ theme }) => theme.colors.textHeading};
  font-size: 2rem;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.75rem;
  }
`;

const Lead = styled.p`
  max-width: 42rem;
  margin-top: 1rem;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textBody};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const PillarsGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Pillar = styled.article<{ $expanded: boolean }>`
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid
    ${({ theme, $expanded }) =>
      $expanded ? theme.colors.primary : theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PillarTitle = styled.h3`
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
`;

const PillarHint = styled.p`
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textHeading};
  font-size: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const pillars = [
  {
    title: "Inclusão",
    text: "Atendimento digital acessível para toda a comunidade LGBTQIAPN+.",
    detail:
      "Interfaces com contraste adequado, navegação por teclado e linguagem afirmativa em todos os fluxos.",
  },
  {
    title: "Acolhimento",
    text: "Profissionais preparados para ouvir, respeitar e cuidar sem julgamento.",
    detail:
      "Equipes sensibilizadas para identidades de gênero, orientação sexual e saúde mental.",
  },
  {
    title: "Segurança",
    text: "Dados protegidos e validação de pacientes e profissionais de saúde.",
    detail:
      "Validação por SMS, proteção de dados pessoais e experiência pensada para reduzir riscos.",
  },
];

export function HomeContent() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [faqStatus, setFaqStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    void buscarFaq()
      .then((items) => {
        setFaq(items);
        setFaqStatus("ready");
      })
      .catch(() => setFaqStatus("error"));
  }, []);

  return (
    <>
      <Hero>
        <Container>
          <Title>Cuidado seguro e inclusivo para quem mais precisa</Title>
          <Lead>
            A Lacrei Saúde conecta a comunidade LGBTQIAPN+ a profissionais de
            saúde qualificados, com experiências digitais acessíveis, acolhedoras
            e seguras.
          </Lead>

          <Actions>
            <Button
              variant="primary"
              onClick={() => router.push("/sobre")}
              aria-label="Conhecer o projeto — ir para a página Sobre"
            >
              Conhecer o projeto
            </Button>

            <ButtonLink
              $variant="secondary"
              href="https://lacreisaude.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar site oficial
            </ButtonLink>

            <Button
              variant="critical"
              onClick={() => setShowAlert((value) => !value)}
              aria-expanded={showAlert}
              aria-controls="home-alert"
            >
              {showAlert ? "Esconder aviso" : "Mostrar aviso"}
            </Button>
          </Actions>

          {showAlert ? (
            <div id="home-alert">
              <Alert>
                Em caso de emergência, procure o serviço de saúde mais próximo.
                A Lacrei Saúde conecta cuidados de rotina e acompanhamento, sem
                substituir atendimento de urgência.
              </Alert>
            </div>
          ) : null}
        </Container>
      </Hero>

      <Section aria-labelledby="pilares-heading">
        <Container>
          <SectionTitle id="pilares-heading">
            O jeito Lacrei Saúde de cuidar
          </SectionTitle>
          <PillarsGrid>
            {pillars.map((pillar) => {
              const expanded = expandedPillar === pillar.title;
              return (
                <Pillar
                  key={pillar.title}
                  $expanded={expanded}
                  tabIndex={0}
                  role="button"
                  aria-expanded={expanded}
                  onClick={() =>
                    setExpandedPillar(expanded ? null : pillar.title)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setExpandedPillar(expanded ? null : pillar.title);
                    }
                  }}
                >
                  <PillarTitle>{pillar.title}</PillarTitle>
                  <p>{pillar.text}</p>
                  {expanded ? <p>{pillar.detail}</p> : null}
                  <PillarHint>
                    {expanded ? "Clique para recolher" : "Clique para saber mais"}
                  </PillarHint>
                </Pillar>
              );
            })}
          </PillarsGrid>
        </Container>
      </Section>

      <Section aria-labelledby="como-heading">
        <Container>
          <SectionTitle id="como-heading">Como funciona</SectionTitle>
          <HowItWorks />
        </Container>
      </Section>

      <Section aria-labelledby="faq-heading">
        <Container>
          <SectionTitle id="faq-heading">Dúvidas frequentes</SectionTitle>
          {faqStatus === "loading" ? (
            <p role="status">Carregando FAQ…</p>
          ) : null}
          {faqStatus === "error" ? (
            <p role="alert">Não foi possível carregar o FAQ agora.</p>
          ) : null}
          {faqStatus === "ready" ? <FaqAccordion items={faq} /> : null}
        </Container>
      </Section>

      <Section aria-labelledby="interesse-heading">
        <Container>
          <SectionTitle id="interesse-heading">
            Quer fazer parte da missão?
          </SectionTitle>
          <InterestForm />
        </Container>
      </Section>
    </>
  );
}
