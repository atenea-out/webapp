# Checklist de release

## Antes del merge a main

- [ ] CI verde en GitHub.
- [ ] `npm audit --omit=dev` revisado.
- [ ] Cambios de Payload probados en `/admin`.
- [ ] Landing y páginas internas revisadas.
- [ ] Formulario de contacto probado.
- [ ] Uploads probados si hubo cambios en media.
- [ ] Variables de Coolify confirmadas.

## Antes del primer deploy

- [ ] Repo conectado en Coolify.
- [ ] Rama de deploy: `main`.
- [ ] Build command: `npm ci && npm run build`.
- [ ] Start command: `npm run start`.
- [ ] Volumen persistente montado en `/app/public/media`.
- [ ] `DATABASE_URI` apunta a Neon con `sslmode=require`.
- [ ] `PAYLOAD_SECRET` configurado y respaldado.
- [ ] Dominio y SSL activos.

## Despues del deploy

- [ ] Abrir home publica.
- [ ] Abrir `/admin`.
- [ ] Crear/verificar usuario admin.
- [ ] Probar edicion de contenido desde Payload.
- [ ] Probar formulario de contacto.
- [ ] Revisar logs de Coolify.
- [ ] Confirmar que uploads persisten despues de redeploy.
