CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."users"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "createdBy" uuid, "updatedBy" uuid, "email" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "googleId" text, "facebookId" text, "isAdmin" boolean NOT NULL DEFAULT false, "picture" text, "locale" text NOT NULL DEFAULT 'en', PRIMARY KEY ("id") , UNIQUE ("googleId"), UNIQUE ("email"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updatedAt"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updatedAt" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_users_updatedAt"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_users_updatedAt" ON "public"."users" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
