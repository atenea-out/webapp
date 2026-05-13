# Flujo de GitHub

## Ramas

- `main`: producción. Coolify debe desplegar desde esta rama.
- `develop`: integración y pruebas antes de producción.
- `feature/<nombre>`: cambios puntuales.
- `fix/<nombre>`: correcciones puntuales.

## Flujo recomendado

1. Crear una rama desde `develop`.
2. Hacer cambios y validar localmente.
3. Abrir PR hacia `develop`.
4. Esperar CI verde.
5. Probar en local o ambiente de staging si aplica.
6. Merge de `develop` hacia `main` cuando se quiera desplegar.
7. Coolify despliega `main`.

## Protecciones recomendadas

En GitHub, proteger `main` con:

- Pull request obligatorio antes de merge.
- CI obligatorio en verde.
- Bloquear push directo a `main`.
- Require conversation resolution.

Para `develop`, conviene exigir CI verde pero permitir merges más ágiles.

## Coolify

Configurar Coolify para escuchar `main`. Si se quiere despliegue manual, desactivar auto-deploy y lanzar el deploy desde el panel.

## Secretos

No guardar secretos en GitHub. Las variables reales van en Coolify:

- `PAYLOAD_SECRET`
- `DATABASE_URI`
- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`

GitHub Actions usa SQLite local de CI para validar build y pruebas sin depender de Neon.
