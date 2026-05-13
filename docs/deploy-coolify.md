# Deploy con Coolify, Hostinger VPS y Neon

## Arquitectura

- Runtime: Coolify en el VPS de Hostinger.
- Aplicación: Next.js + Payload CMS.
- Base de datos: Neon Postgres mediante `DATABASE_URI`.
- Uploads de Payload: volumen persistente montado en `/app/public/media`.
- Email transaccional: Resend mediante `RESEND_API_KEY`.

## Variables en Coolify

```env
NODE_ENV=production
PORT=3000
PAYLOAD_SECRET=<long-random-secret>
DATABASE_URI=postgresql://USER:PASSWORD@HOST/neondb?sslmode=require
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
RESEND_API_KEY=<resend-api-key>
```

`PAYLOAD_SECRET` debe ser largo, aleatorio y estable. Si cambia después de tener usuarios/sesiones, puede invalidar comportamiento relacionado con autenticación.

## Configuración recomendada en Coolify

- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Persistent storage: montar un volumen en `/app/public/media`
- Dominio: configurar el dominio publico y dejar que Coolify gestione SSL.

## Neon

1. Crear un proyecto Postgres en Neon.
2. Copiar la connection string de producción.
3. Usar `sslmode=require` en la URI.
4. Pegarla en Coolify como `DATABASE_URI`.

Para desarrollo local se puede seguir usando SQLite con `DATABASE_URI=file:./atenea.db`. En producción el proyecto exige una URI Postgres.

Nota: `next build` puede ejecutarse localmente con SQLite para validar el sitio antes de tener Neon. El servidor de producción sí exige Postgres al arrancar.

## Primer despliegue

1. Desplegar desde Coolify.
2. Abrir `/admin`.
3. Crear el primer usuario administrador.
4. Ejecutar `npm run seed` desde la terminal de Coolify solo si se quiere poblar contenido inicial.
5. Probar landing, páginas internas, formulario de contacto y uploads desde Payload.

## Backups

- Neon: activar/confirmar backups del proyecto.
- VPS/Coolify: respaldar el volumen montado en `/app/public/media`.
- Antes de cambios grandes de schema, tomar snapshot en Neon.
