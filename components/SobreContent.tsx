"use client";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/Button";
import { Container, Section } from "@/components/Layout";
import { ProfessionalsExplorer } from "@/components/ProfessionalsExplorer";
import { ValueCard } from "@/components/ValueCard";
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

const Grid = styled.div`
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

const Status = styled.p`
  color: ${({ theme }) => theme.colors.textBody};
  margin-bottom: 1rem;
`;

const ErrorBox = styled.div`
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

type StatusState = "idle" | "loading" | "success" | "error";

export function SobreContent() {
  const [valores, setValores] = useState<Valor[]>([]);
  const [status, setStatus] = useState<StatusState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const carregar = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");

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
            <Button type="button" variant="secondary" onClick={() => void carregar()}>
              Atualizar
            </Button>
          </Actions>

          {status === "loading" ? (
            <Status role="status">Carregando valores…</Status>
          ) : null}

          {status === "error" ? (
            <ErrorBox role="alert">
              <p>{errorMessage || "Não foi possível carregar os valores."}</p>
              <Button variant="primary" onClick={() => void carregar()}>
                Tentar novamente
              </Button>
            </ErrorBox>
          ) : null}

          {status === "success" ? (
            <Grid>
              {valores.map((valor) => (
                <ValueCard
                  key={valor.id}
                  titulo={valor.titulo}
                  descricao={valor.descricao}
                />
              ))}
            </Grid>
          ) : null}
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
