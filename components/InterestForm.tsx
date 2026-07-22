"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { enviarInteresse } from "@/lib/mockApi";

const Form = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 36rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textHeading};
`;

const Input = styled.input`
  min-height: 48px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textBody};

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  min-height: 120px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textBody};
  resize: vertical;

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Hint = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
`;

export function InterestForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const result = await enviarInteresse({ nome, email, mensagem });
      setStatus("success");
      setFeedback(result.message);
      setNome("");
      setEmail("");
      setMensagem("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : "Não foi possível enviar.",
      );
    }
  }

  return (
    <Form onSubmit={onSubmit} noValidate>
      <Hint>
        Conta pra gente por que você quer caminhar com a Lacrei Saúde. Responderemos
        pelo e-mail informado.
      </Hint>

      <Field>
        <Label htmlFor="interesse-nome">Nome</Label>
        <Input
          id="interesse-nome"
          name="nome"
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </Field>

      <Field>
        <Label htmlFor="interesse-email">E-mail</Label>
        <Input
          id="interesse-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Field>

      <Field>
        <Label htmlFor="interesse-mensagem">Mensagem</Label>
        <TextArea
          id="interesse-mensagem"
          name="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        />
      </Field>

      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Enviando…" : "Enviar interesse"}
      </Button>

      {feedback ? (
        <Alert>
          {status === "error" ? `Erro: ${feedback}` : feedback}
        </Alert>
      ) : null}
    </Form>
  );
}
