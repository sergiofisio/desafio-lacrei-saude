export type Valor = {
  id: string;
  titulo: string;
  descricao: string;
};

export type Profissional = {
  id: string;
  nome: string;
  especialidade: string;
  cidade: string;
  atendeOnline: boolean;
  bio: string;
};

export type FaqItem = {
  id: string;
  pergunta: string;
  resposta: string;
};

async function parseError(response: Response) {
  try {
    const data = (await response.json()) as { message?: string };
    return data.message ?? "Falha na requisição.";
  } catch {
    return "Falha na requisição.";
  }
}

export async function buscarValores(options?: {
  fail?: boolean;
}): Promise<Valor[]> {
  const query = options?.fail ? "?fail=1" : "";
  const response = await fetch(`/api/valores${query}`);

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<Valor[]>;
}

export async function buscarProfissionais(options?: {
  q?: string;
  online?: boolean;
}): Promise<Profissional[]> {
  const params = new URLSearchParams();
  if (options?.q) params.set("q", options.q);
  if (options?.online) params.set("online", "1");

  const query = params.toString() ? `?${params.toString()}` : "";
  const response = await fetch(`/api/profissionais${query}`);

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<Profissional[]>;
}

export async function buscarFaq(): Promise<FaqItem[]> {
  const response = await fetch("/api/faq");

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<FaqItem[]>;
}

export async function enviarInteresse(payload: {
  nome: string;
  email: string;
  mensagem: string;
}): Promise<{ ok: boolean; message: string }> {
  const response = await fetch("/api/interesse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as { ok?: boolean; message: string };

  if (!response.ok) {
    throw new Error(data.message || "Não foi possível enviar.");
  }

  return { ok: true, message: data.message };
}
