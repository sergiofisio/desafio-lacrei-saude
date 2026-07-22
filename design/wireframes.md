# Wireframes — Lacrei Saúde

Layouts mobile-first. Coluna em mobile; grid em tablet/desktop.

## Home (`/`)

### Mobile (~375)

```
┌─────────────────────────────┐
│ [Skip link — fora da tela]  │
├─────────────────────────────┤
│ Logo            [☰ Menu]    │
├─────────────────────────────┤
│                             │
│  Cuidado seguro e           │
│  inclusivo para a           │
│  comunidade LGBTQIAPN+      │
│                             │
│  Conectamos pessoas a       │
│  profissionais de saúde     │
│  qualificados.              │
│                             │
│  [Conhecer o projeto]       │
│  [Visitar site oficial]     │
│  [Mostrar aviso]            │
│                             │
│  (alerta se ativo)          │
│                             │
├─────────────────────────────┤
│  Inclusão                   │
│  texto…                     │
│  ─────────────────          │
│  Acolhimento                │
│  texto…                     │
│  ─────────────────          │
│  Segurança                  │
│  texto…                     │
├─────────────────────────────┤
│  Footer verde               │
│  Início · Sobre · Site      │
│  © Lacrei Saúde             │
└─────────────────────────────┘
```

### Desktop (~1280)

```
┌──────────────────────────────────────────────────────────┐
│ Logo          Início    Sobre                            │
├──────────────────────────────────────────────────────────┤
│  Hero (fundo primaryLight)                               │
│  H1 + parágrafo                                          │
│  [CTA1] [CTA2] [CTA3]   ← em linha                       │
│  alerta (se ativo)                                       │
├──────────────────────────────────────────────────────────┤
│  [Inclusão]     [Acolhimento]     [Segurança]            │
├──────────────────────────────────────────────────────────┤
│  Footer                                                  │
└──────────────────────────────────────────────────────────┘
```

### CTAs

1. Conhecer o projeto → `/sobre`
2. Visitar site oficial → https://lacreisaude.com.br (nova aba)
3. Mostrar/Esconder aviso → alerta na página

---

## Sobre (`/sobre`)

### Mobile / Desktop

```
┌─────────────────────────────┐
│ Header                      │
├─────────────────────────────┤
│ Sobre a Lacrei Saúde        │
│ texto de missão…            │
├─────────────────────────────┤
│ Nossos valores              │
│                             │
│  loading…                   │
│  — ou —                     │
│  erro + [Tentar novamente]  │
│  — ou —                     │
│  ┌─────────────────────┐    │
│  │ Valor 1             │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ Valor 2             │    │
│  └─────────────────────┘    │
│  …                          │
├─────────────────────────────┤
│ Footer                      │
└─────────────────────────────┘
```

No desktop, cards de valores em grid de 2–3 colunas.

---

## Interações de menu mobile

1. Clique em ☰ → `aria-expanded=true`, painel de nav visível
2. Escape ou clique em link → fecha menu
3. Foco permanece gerenciável (botão e links no painel)
