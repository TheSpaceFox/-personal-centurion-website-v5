# Counsel knowledge library

Add or edit Markdown files in this folder to keep the site Counsel agent up to date.

Each article needs YAML frontmatter:

```yaml
---
title: Short title
slug: url-safe-id
updated: 2026-07-13
tags: [mission, product, objections]
priority: 5
---
```

- `tags` — comma-separated keywords for retrieval (mission, privacy, board, objections, product, closing, limited-edition, process)
- `priority` — optional boost (higher = more likely selected when scores tie)
- Prefer newer `updated` dates when product facts change
- After editing, commit and deploy — knowledge updates on the next Vercel deploy

Do not put secrets in these files. Sales methodologies should be written in operator voice for Centurion (mission-first), not branded as third-party systems.
