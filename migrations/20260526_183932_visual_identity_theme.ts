import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "theme_navy" varchar DEFAULT '#023044';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "theme_navy_mid" varchar DEFAULT '#034060';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "theme_coral" varchar DEFAULT '#ef625e';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "theme_coral_light" varchar DEFAULT '#f2837f';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "theme_background" varchar DEFAULT '#F0F5FA';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "theme_cream" varchar DEFAULT '#ebe6e2';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "theme_text" varchar DEFAULT '#334155';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "theme_text_muted" varchar DEFAULT '#475569';
    ALTER TABLE "site_settings" ALTER COLUMN "theme_text_muted" SET DEFAULT '#475569';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "theme_text_muted";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "theme_text";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "theme_cream";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "theme_background";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "theme_coral_light";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "theme_coral";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "theme_navy_mid";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "theme_navy";
  `)
}
