import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type Profissional = {
  id: string;
  nome: string;
  especialidade: string;
  cidade: string;
  atendeOnline: boolean;
  bio: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").toLowerCase().trim();
  const online = searchParams.get("online");

  const filePath = path.join(process.cwd(), "data", "profissionais.json");
  const raw = await readFile(filePath, "utf-8");
  let results = JSON.parse(raw) as Profissional[];

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

  return NextResponse.json(results);
}
