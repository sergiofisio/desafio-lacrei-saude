"use client";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/Button";
import {
  buscarProfissionais,
  type Profissional,
} from "@/lib/mockApi";

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
  }
`;

const Search = styled.input`
  flex: 1;
  min-height: 48px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textBody};
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textBody};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.article`
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Name = styled.h3`
  color: ${({ theme }) => theme.colors.textHeading};
  font-size: 1.125rem;
`;

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 0.95rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-self: flex-start;
  margin-top: 0.35rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Status = styled.p`
  color: ${({ theme }) => theme.colors.textBody};
  margin-bottom: 1rem;
`;

export function ProfessionalsExplorer() {
  const [query, setQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [items, setItems] = useState<Profissional[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const carregar = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const data = await buscarProfissionais({
        q: query,
        online: onlineOnly,
      });
      setItems(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar profissionais.",
      );
    }
  }, [query, onlineOnly]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void carregar();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [carregar]);

  return (
    <section aria-labelledby="profissionais-heading">
      <Toolbar>
        <Search
          type="search"
          placeholder="Buscar por nome, especialidade ou cidade"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar profissionais"
        />
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={onlineOnly}
            onChange={(e) => setOnlineOnly(e.target.checked)}
          />
          Só online
        </CheckboxLabel>
        <Button type="button" variant="secondary" onClick={() => void carregar()}>
          Atualizar
        </Button>
      </Toolbar>

      {status === "loading" ? (
        <Status role="status">Carregando profissionais…</Status>
      ) : null}

      {status === "error" ? (
        <Status role="alert">
          {error}{" "}
          <Button type="button" variant="primary" onClick={() => void carregar()}>
            Tentar novamente
          </Button>
        </Status>
      ) : null}

      {status === "success" && items.length === 0 ? (
        <Status>Nenhum profissional encontrado para esses filtros.</Status>
      ) : null}

      {status === "success" && items.length > 0 ? (
        <Grid>
          {items.map((item) => (
            <Card key={item.id}>
              <Name>{item.nome}</Name>
              <Meta>
                {item.especialidade} · {item.cidade}
              </Meta>
              <p>{item.bio}</p>
              {item.atendeOnline ? <Badge>Atende online</Badge> : null}
            </Card>
          ))}
        </Grid>
      ) : null}
    </section>
  );
}
