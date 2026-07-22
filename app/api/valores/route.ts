import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

async function readJson<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), "data", filename);
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("fail") === "1") {
    return NextResponse.json(
      { message: "Não foi possível carregar os valores." },
      { status: 500 },
    );
  }

  const valores = await readJson<unknown[]>("valores.json");
  return NextResponse.json(valores);
}
