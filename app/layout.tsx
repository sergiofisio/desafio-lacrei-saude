import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import StyledComponentsRegistry from "@/lib/registry";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lacrei Saúde",
    template: "%s | Lacrei Saúde",
  },
  description:
    "Experiências digitais inclusivas, acessíveis e seguras para a comunidade LGBTQIAPN+.",
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('lacrei-color-mode');
    var mode = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={nunito.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AppShell>{children}</AppShell>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
