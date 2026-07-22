import { http, HttpResponse, delay } from "msw";
import valores from "@/data/valores.json";
import profissionais from "@/data/profissionais.json";
import faq from "@/data/faq.json";

const API = "/api";

export const handlers = [
  http.get(`${API}/valores`, async ({ request }) => {
    const url = new URL(request.url);
    const fail = url.searchParams.get("fail") === "1";

    await delay(500);

    if (fail) {
      return HttpResponse.json(
        { message: "Não foi possível carregar os valores." },
        { status: 500 },
      );
    }

    return HttpResponse.json(valores);
  }),

  http.get(`${API}/profissionais`, async ({ request }) => {
    const url = new URL(request.url);
    const q = (url.searchParams.get("q") ?? "").toLowerCase().trim();
    const online = url.searchParams.get("online");

    await delay(400);

    let results = [...profissionais];

    if (q) {
      results = results.filter(
        (p) =>
          p.nome.toLowerCase().includes(q) ||
          p.especialidade.toLowerCase().includes(q) ||
          p.cidade.toLowerCase().includes(q),
      );
    }

    if (online === "1") {
      results = results.filter((p) => p.atendeOnline);
    }

    return HttpResponse.json(results);
  }),

  http.get(`${API}/faq`, async () => {
    await delay(300);
    return HttpResponse.json(faq);
  }),

  http.post(`${API}/interesse`, async ({ request }) => {
    await delay(600);
    const body = (await request.json()) as {
      nome?: string;
      email?: string;
      mensagem?: string;
    };

    if (!body.nome?.trim() || !body.email?.trim() || !body.mensagem?.trim()) {
      return HttpResponse.json(
        { message: "Preencha nome, e-mail e mensagem." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return HttpResponse.json(
        { message: "Informe um e-mail válido." },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      ok: true,
      message: "Recebemos seu interesse. Obrigado por querer fazer parte!",
    });
  }),
];
