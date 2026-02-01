# NEXUS – Crisis Intelligence

**Challenge:** AI for Social Signal Intelligence in Banking (Mashreq / Responsible AI)  
**Domain:** Banking, brand trust, operational resilience – no live social data, no PII.

NEXUS is a prototype that helps a bank **detect**, **interpret**, and **responsibly respond** to public social signals (synthetic only) with human-in-the-loop and clear guardrails.

---

## What this prototype covers

- **Service / incident signals** – API downtime, app crashes, billing issues (clusters, 5 Whys, narrative chain).
- **Misinformation / false claims** – Claim verification (SIGMA), confidence, human review for uncertain cases.
- **Executive briefing** – C-Suite dashboard, strategy approval/reject, AI-assisted summary.
- **Network & narrative** – Influencer graph, narrative chain (origin → amplification → misinfo → critical), cascade prediction, prevention controls.

All data is **synthetic or team-created**; no real social feeds or personal data.

---

## Responsible AI & governance

### AI guardrails (system boundaries)

- **This system does not:** post on social media, change accounts, process refunds, or take any action without human approval.
- **Human oversight:** All recommendations require analyst review and C-Suite approval before any action. The AI supports decisions; it does not execute them.
- **Guardrails UI:** Use the **Guardrails** button in the app header to open the full “AI guardrails” panel.

### Audit trail (documented design)

In a production deployment, **every decision is recorded in the audit database** for compliance and review:

- **What is recorded:** Verification outcomes (confirm / deny / investigate), C-Suite approvals and rejections, analyst notes, timestamps.
- **Who / when:** User or role ID and timestamp for each decision.
- **Purpose:** Auditability, governance, and regulatory alignment. The prototype UI does not implement the audit log view; the production system would persist these records (e.g. in a database) and expose them via an audit log UI or export.

---

## How to use this prototype

1. **Clusters** – Pick a crisis cluster (e.g. API Downtime). Everything else (posts, RCA, brief, network, customers) is scoped to that cluster.
2. **Posts** – See synthetic posts; open "View Analysis" for claim verification (SIGMA) and human review when needed.
3. **RCA** – Expand 5 Whys, pick a response strategy, run simulation, then submit for C-Suite approval.
4. **Executive Brief** – Review the strategy and approve/reject (or request AI assistance).
5. **Network** – Inspect the influencer graph (orange ring = narrative path) and narrative chain with "Why this matters" and intervention points.
6. **Customers** – View at-risk VIPs and priority/explainability.

Use the **Guardrails** button in the header to see system boundaries and audit design.

---

## Run the app

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

- **Demo mode:** No API key required; AI responses use built-in demo data.
- **With Claude:** Set `VITE_ANTHROPIC_API_KEY` in `.env` for live AI simulation/priority/recovery.

---

## Tech stack

- React 18, TypeScript, Vite
- Zustand (state), Framer Motion (UI), Tailwind CSS
- React Flow (network graph), Recharts (charts)

---

## Project structure (high level)

- `src/components/sections/` – Clusters, Posts, RCA, Exec Brief, Network, Customers.
- `src/components/shared/` – Guardrails panel, Verification panel, AI explainability, Bottom nav.
- `src/data/` – Synthetic clusters, posts, narrative chain, verification, demo AI responses.
- `src/services/` – AI service (Claude + demo fallback).
- `src/store/` – Global state (cluster selection, approvals, post status).

---

## License

See repository license.
