# Centurion v5 design tokens

Canonical palette extracted from the sales site [`app/globals.css`](../app/globals.css).

## Sync targets

| Surface | How to consume |
|---------|----------------|
| Sales website | Already SoT (`:root` CSS variables) |
| Help center | Same OKLCH variables in `app/globals.css`; keep in sync with this file |
| iOS Remote | Map `light.*` / `dark.*` hex into `ColorTheme` (`CenturionTheme.swift`) |
| Linux Desktop | Map into `desktop-native/resources/centurion.css` `@define-color` |

## Rules

1. Do not reintroduce forest/matrix/gold as **primary** product chrome.
2. Web marketing CTAs: near-ink filled buttons on cream.
3. Native apps may use `interactive` blue for tabs/links; keep canvas/ink from these tokens.
4. Dark palette is **derived** for OS appearance — not a second forest brand.
