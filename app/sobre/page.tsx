import type { Metadata } from "next";
import { SobreContent } from "@/components/SobreContent";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a missão e os valores da Lacrei Saúde: inclusão, acolhimento e segurança.",
};

export default function SobrePage() {
  return <SobreContent />;
}
