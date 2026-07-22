"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

const Results = styled.div`
  position: relative;
  min-height: 28rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  align-content: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(motion.article)`
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 10.5rem;
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

const Empty = styled.p`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
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

const SkeletonCard = styled.div`
  min-height: 10.5rem;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Hint = styled.p`
  margin: -0.5rem 0 1rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
`;

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function ProfessionalsExplorer() {
  const [query, setQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [items, setItems] = useState<Profissional[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const reduceMotion = useReducedMotion();

  const carregar = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const data = await buscarProfissionais();
      setItems(data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar profissionais.",
      );
    }
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const filtered = useMemo(() => {
    const term = normalize(query);

    return items.filter((item) => {
      if (onlineOnly && !item.atendeOnline) return false;
      if (!term) return true;
      return normalize(item.nome).includes(term);
    });
  }, [items, query, onlineOnly]);

  return (
    <section aria-labelledby="profissionais-heading">
      <Toolbar>
        <Search
          type="search"
          placeholder="Digite o nome do profissional"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar profissional pelo nome"
          autoComplete="off"
        />
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={onlineOnly}
            onChange={(e) => setOnlineOnly(e.target.checked)}
          />
          Só online
        </CheckboxLabel>
        <Button
          type="button"
          variant="secondary"
          onClick={() => void carregar()}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Carregando…" : "Atualizar lista"}
        </Button>
      </Toolbar>

      <Hint>A lista filtra automaticamente enquanto você digita.</Hint>

      <Results aria-live="polite">
        {status === "loading" ? (
          <>
            <Status role="status">Carregando profissionais…</Status>
            <Grid>
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonCard key={index} aria-hidden="true" />
              ))}
            </Grid>
          </>
        ) : null}

        {status === "error" ? (
          <Empty role="alert">
            {error}{" "}
            <Button type="button" variant="primary" onClick={() => void carregar()}>
              Tentar novamente
            </Button>
          </Empty>
        ) : null}

        {status === "ready" && filtered.length === 0 ? (
          <Empty>
            Nenhum profissional encontrado
            {query.trim() ? ` para “${query.trim()}”` : ""}.
          </Empty>
        ) : null}

        {status === "ready" && filtered.length > 0 ? (
          <Grid>
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((item) => (
                <Card
                  key={item.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  <Name>{item.nome}</Name>
                  <Meta>
                    {item.especialidade} · {item.cidade}
                  </Meta>
                  <p>{item.bio}</p>
                  {item.atendeOnline ? <Badge>Atende online</Badge> : null}
                </Card>
              ))}
            </AnimatePresence>
          </Grid>
        ) : null}
      </Results>
    </section>
  );
}
