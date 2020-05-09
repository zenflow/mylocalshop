CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."users"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "email" text NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "google_id" text, "facebook_id" text, "is_admin" boolean NOT NULL DEFAULT false, "picture" text, "locale" text NOT NULL DEFAULT 'en', PRIMARY KEY ("id"), UNIQUE ("email"), UNIQUE ("google_id"), UNIQUE ("facebook_id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_users_updated_at"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_users_updated_at" ON "public"."users"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE "public"."users"
    ADD CONSTRAINT "users_created_by_fkey"
        FOREIGN KEY ("created_by")
        REFERENCES "public"."users" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT;

ALTER TABLE "public"."users"
    ADD CONSTRAINT "users_updated_by_fkey"
        FOREIGN KEY ("updated_by")
        REFERENCES "public"."users" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT;
