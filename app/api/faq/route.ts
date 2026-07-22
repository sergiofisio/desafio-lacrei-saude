import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "faq.json");
  const raw = await readFile(filePath, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}
