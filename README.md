# Lacrei Saúde

Projeto Front-end para o processo seletivo de voluntariado da [Lacrei Saúde](https://lacreisaude.com.br), com base no design system Marsha.

**Site:** [https://desafio-lacrei-saude-nine.vercel.app](https://desafio-lacrei-saude-nine.vercel.app)

## O que tem no projeto

- Páginas Início e Sobre, com Header e Footer
- Tema claro e escuro (preferência salva no navegador)
- Formulário de interesse, FAQ, busca de profissionais
- API mockada com JSON local, Route Handlers e MSW
- Testes unitários com Jest e Testing Library

## Stack

- Next.js (App Router) + TypeScript
- Styled-Components
- Nunito (`next/font`)
- MSW
- Jest + Testing Library
- Deploy na Vercel

## Como rodar

```bash
git clone https://github.com/sergiofisio/desafio-lacrei-saude.git
cd desafio-lacrei-saude
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
npm test
```

## API mock

Dados em `data/`. Endpoints:

- `GET /api/valores`
- `GET /api/profissionais?q=&online=1`
- `GET /api/faq`
- `POST /api/interesse`

No browser, o MSW pode interceptar essas rotas. Os Route Handlers respondem normalmente quando o worker não está ativo.

## Testes

Cobertura mínima em `Button`, `Header`, `Alert`, `ThemeToggle` e `FaqAccordion`.

## Deploy e rollback

Deploy: `npx vercel --prod` ou integração GitHub ↔ Vercel.

Para voltar uma versão: no painel da Vercel, abra **Deployments**, escolha um deploy estável e use **Promote to Production**. Alternativa: `git revert` + push.

## Decisões

- Tokens de cor e tipografia centralizados em `styles/theme.ts` (light/dark)
- Registry de Styled-Components para SSR sem flash de CSS
- Script leve no `layout` para aplicar o tema antes da hidratação
- Componentes client só onde há estado ou eventos
- HTML semântico, skip link, foco visível e ARIA onde faz diferença

Notas de layout e tokens: [`design/`](design/).

## Entrega

Repositório e deploy públicos. Contato do processo: `desenvolvimento.humano@lacreisaude.com.br`.
