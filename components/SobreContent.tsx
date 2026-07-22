"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import styled from "styled-components";
import { Button } from "@/components/Button";
import { Container, Section } from "@/components/Layout";
import { ProfessionalsExplorer } from "@/components/ProfessionalsExplorer";
import { ValueCard } from "@/components/ValueCard";
import { ValueCardSkeleton } from "@/components/ValueCardSkeleton";
import { buscarValores, type Valor } from "@/lib/mockApi";

const Intro = styled.div`
  max-width: 44rem;
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textHeading};
  font-size: 2rem;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.75rem;
  }
`;

const Lead = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textBody};
`;

const ValuesTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textHeading};
  font-size: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  gap: 1.25rem;
  margin-bottom: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CardMotion = styled(motion.div)`
  height: 100%;
`;

const Status = styled.p`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const ErrorBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.critical};
  background: ${({ theme }) => theme.colors.criticalSurface};
  color: ${({ theme }) => theme.colors.textBody};
  margin-bottom: 2rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const ValuesBlock = styled.div`
  position: relative;
  min-height: 160px;
`;

type StatusState = "idle" | "loading" | "success" | "error";

export function SobreContent() {
  const [valores, setValores] = useState<Valor[]>([]);
  const [status, setStatus] = useState<StatusState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadKey, setLoadKey] = useState(0);
  const reduceMotion = useReducedMotion();

  const carregar = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");
    setLoadKey((key) => key + 1);

    try {
      const data = await buscarValores();
      setValores(data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado ao carregar os valores.",
      );
    }
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  return (
    <Section>
      <Container>
        <Intro>
          <Title>Sobre a Lacrei Saúde</Title>
          <Lead>
            Nosso papel é construir a conexão entre pessoas da comunidade
            LGBTQIAPN+ e profissionais de saúde, com segurança, inclusão e
            representatividade. Surgimos da esperança de um atendimento clínico
            qualificado, seguro e empático para todas as pessoas.
          </Lead>
        </Intro>

        <section
          aria-labelledby="valores-heading"
          aria-busy={status === "loading"}
        >
          <ValuesTitle id="valores-heading">Nossos valores</ValuesTitle>

          <Actions>
            <Button
              type="button"
              variant="secondary"
              onClick={() => void carregar()}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Atualizando…" : "Atualizar"}
            </Button>
          </Actions>

          <ValuesBlock>
            {status === "loading" ? (
              <Status role="status">Carregando valores…</Status>
            ) : null}

            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <Grid
                  key={`skeleton-${loadKey}`}
                  initial={reduceMotion ? false : { opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ValueCardSkeleton count={4} />
                </Grid>
              ) : null}

              {status === "error" ? (
                <ErrorBox
                  key={`error-${loadKey}`}
                  role="alert"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                >
                  <p>{errorMessage || "Não foi possível carregar os valores."}</p>
                  <Button variant="primary" onClick={() => void carregar()}>
                    Tentar novamente
                  </Button>
                </ErrorBox>
              ) : null}

              {status === "success" ? (
                <Grid
                  key={`values-${loadKey}`}
                  initial="hidden"
                  animate="show"
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: reduceMotion
                        ? undefined
                        : { staggerChildren: 0.08, delayChildren: 0.04 },
                    },
                  }}
                >
                  {valores.map((valor) => (
                    <CardMotion
                      key={valor.id}
                      variants={
                        reduceMotion
                          ? undefined
                          : {
                              hidden: { opacity: 0, y: 18, scale: 0.97 },
                              show: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                  duration: 0.35,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                              },
                            }
                      }
                    >
                      <ValueCard
                        titulo={valor.titulo}
                        descricao={valor.descricao}
                      />
                    </CardMotion>
                  ))}
                </Grid>
              ) : null}
            </AnimatePresence>
          </ValuesBlock>
        </section>

        <section aria-labelledby="profissionais-heading">
          <ValuesTitle id="profissionais-heading">
            Profissionais parceiros
          </ValuesTitle>
          <Lead style={{ marginBottom: "1.5rem" }}>
            Busque por nome, especialidade ou cidade. Dá para filtrar quem atende
            online.
          </Lead>
          <ProfessionalsExplorer />
        </section>
      </Container>
    </Section>
  );
}
