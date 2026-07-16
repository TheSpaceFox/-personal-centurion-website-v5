# Repository ownership & host cutover (Centurion v5)

## Owns what

| Capability | Owning repo / host | Notes |
|------------|-------------------|-------|
| Marketing, Counsel, order configurator, buyer account, quotes admin | **`-personal-centurion-website-v5`** → `www.1human1ai.com` | Commerce + sales AI |
| Fleet / keys / swarm REST, portal control plane | **Product API host** (legacy `Centurion-website-v3` deployment or split API) | Do **not** reimplement on v5 |
| Support Library + Adrian chat API | **`personal-centurion-help-center`** → `help.1human1ai.com` | Sole Adrian knowledge host |
| Brain CLI, Desktop, iPhone Remote, LAN crypto | **`Centurion-AI-OS`** monorepo | Device product; no in-app checkout |

## Hosts

| Host | Role |
|------|------|
| `www.1human1ai.com` / `1human1ai.com` | Sales + commerce (v5) |
| `help.1human1ai.com` | Docs + `/api/v1/chat` (Adrian) |
| Product API origin (may share historical www deployment) | `/api/v1` fleet, keys, swarm, portal OAuth |

## Cross-repo links

| From → To | Mechanism |
|-----------|-----------|
| Counsel → `/order` | Session handoff + deep link |
| Website ↔ Help | Footer/nav Support; Help “Build your Centurion” → `/order` |
| iPhone / Desktop → Help | `CenturionHelp.baseURL` / `CENTURION_ADRIAN_BASE_URL` = `https://help.1human1ai.com` |
| Brain → Product API | `billing.fleet_api_url` / swarm base — must survive www DNS moves |

## Explicit non-goals for the v5 sales repo

- Mission Control / Swarm web UIs
- Hosting Adrian as a second knowledge store
- LAN pairing or encryption

See also [DNS_CUTOVER.md](./DNS_CUTOVER.md).
