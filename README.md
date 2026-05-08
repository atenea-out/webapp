# Atenea Outsourcing CMS

Sitio corporativo de Atenea Outsourcing construido con Next.js, Payload CMS y Tailwind CSS.

## Stack

- Next.js App Router
- Payload CMS
- SQLite para desarrollo local
- Neon Postgres para produccion
- Resend para email transaccional
- Playwright y Vitest para pruebas

## Desarrollo local

```bash
npm install
npm run dev -- --port 3001
```

Abrir:

- Sitio: `http://localhost:3001`
- Admin: `http://localhost:3001/admin`

## Variables

Usar `.env.example` como referencia.

En local se puede usar:

```env
PAYLOAD_SECRET=change-me-in-production
DATABASE_URI=file:./atenea.db
NEXT_PUBLIC_SITE_URL=http://localhost:3001
RESEND_API_KEY=
```

En produccion, `DATABASE_URI` debe ser una connection string Postgres de Neon.

## Scripts

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run test
npm run test:e2e
npm run test:all
npm run seed
```

## Deploy

El deploy recomendado es GitHub + Coolify sobre Hostinger VPS, usando Neon como base de datos y un volumen persistente para uploads.

Documentacion:

- `docs/github-workflow.md`
- `docs/deploy-coolify.md`
- `docs/release-checklist.md`
