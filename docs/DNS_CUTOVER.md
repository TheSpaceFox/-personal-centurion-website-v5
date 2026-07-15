# DNS & API continuity — Centurion website v5 cutover

> Ownership map: [REPO_OWNERSHIP.md](./REPO_OWNERSHIP.md). Design tokens: [`../design-tokens/`](../design-tokens/).

## Goal

Point marketing/commerce traffic at **personal-centurion-website-v5** without breaking Linux Brain
or CLI integrations that call product APIs on `www.personal-centurion.com`.

## Keep on product host (do not replace with v5)

| Path / host | Consumer | Purpose |
|-------------|----------|---------|
| `POST /api/v1/fleet/checkin` | Centurion CLI / Brain | Fleet check-in |
| `GET /api/v1/centurions/[id]/config` | Brain | Platform config |
| `POST /api/v1/keys/validate` | CLI | Subscription key validate |
| `/api/v1/swarm/**` | Gateway / Swarm MC | Mission Control sync |
| `portal.personal-centurion.com` OAuth | CLI | Device auth |
| `help.personal-centurion.com` | iPhone / Desktop / Help UI | Adrian + docs |

## Safe on v5 marketing host

| Path | Purpose |
|------|---------|
| `/` | Marketing + Counsel |
| `/order` | Build-slot configurator |
| `/auth`, `/account/**` | Thin buyer account |
| `/admin/quotes` | Staff quote inbox |
| `/privacy`, `/terms` | Legal |
| `/api/counsel` | Sales counsel |
| `/api/leads`, `/api/admin/quotes` | Leads + staff |

## Recommended cutover

1. Deploy v5 to a preview host (e.g. Vercel project for website-v5).
2. Keep Centurion-website-v3 (or a dedicated API deployment) serving `/api/v1/*` on the
   production API origin.
3. If `www.personal-centurion.com` DNS moves to v5, configure **edge rewrites / reverse proxy**:
   - `/api/v1/:path*` → existing product API origin
   - Optionally `/account/billing`, `/manage-subscription` → product portal if Brain deep-links remain
4. Point marketing CTAs and Counsel soft-close to v5 `/order`.
5. Leave Help at `help.personal-centurion.com` unchanged.

## Env vars for v5 commerce

```
XAI_API_KEY=
ADMIN_STAFF_TOKEN=
ORDER_NOTIFY_EMAIL=
RESEND_API_KEY=
RESEND_FROM=
RESEND_TO=
# Optional later:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Quotes and leads persist under `.data/` on the deployment filesystem (ephemeral on many serverless
hosts — attach durable storage or Supabase before production scale).
