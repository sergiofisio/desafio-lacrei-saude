# Design — Lacrei Saúde (Marsha)

Referência visual alinhada ao Marsha Design System.

## Cores

### Light

| Token | Hex |
|-------|-----|
| `primary` | `#018762` |
| `primaryLight` | `#DFF2ED` |
| `background` | `#FFFFFF` |
| `surface` | `#F7FBFA` |
| `textHeading` | `#131313` |
| `textBody` | `#2D2D2D` |
| `border` | `#B2DFD0` |
| `critical` | `#BC1C1C` |

### Dark

| Token | Hex |
|-------|-----|
| `primary` | `#3DDBA8` |
| `primaryLight` | `#143D32` |
| `background` | `#0F1412` |
| `surface` | `#1A2420` |
| `textHeading` | `#F5F5F5` |
| `textBody` | `#D6D6D6` |
| `border` | `#2F4F44` |
| `critical` | `#FF6B6B` |

Tema salvo em `localStorage` (`lacrei-color-mode`), com fallback para `prefers-color-scheme`.

## Tipografia

- Nunito, pesos 400 e 700
- H1: `2rem` / `2.75rem`
- H2: `1.5rem` / `2rem`
- Body: `1rem`, line-height `1.6`

## Layout

- Container máximo: `1120px`
- Gutters: `1rem` (mobile), `1.5–2rem` (tablet+)
- Breakpoints: 375 / 768 / 1280

## Componentes

- **Button:** `primary`, `secondary`, `critical` (hover, focus-visible, disabled)
- **Header:** logo, nav, menu mobile, toggle de tema
- **Footer:** fundo `primary`, texto sem opacidade reduzida
- **Alert:** `role="alert"`

## Acessibilidade

Skip link, HTML semântico, foco visível e contraste AA.
