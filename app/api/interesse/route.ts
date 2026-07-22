import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    nome?: string;
    email?: string;
    mensagem?: string;
  };

  if (!body.nome?.trim() || !body.email?.trim() || !body.mensagem?.trim()) {
    return NextResponse.json(
      { message: "Preencha nome, e-mail e mensagem." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { message: "Informe um e-mail válido." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Recebemos seu interesse. Obrigado por querer fazer parte!",
  });
}
