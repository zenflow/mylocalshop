CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."sessions"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "provider" text NOT NULL, "token" text NOT NULL, "lastHit" timestamptz, "hitCount" int4 NOT NULL DEFAULT 0, PRIMARY KEY ("id") , FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."increment_session_hitCount"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."hitCount" = _new."hitCount" + 1;
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "increment_session_hitCount_trigger"
BEFORE UPDATE ON "public"."sessions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."increment_session_hitCount"();
COMMENT ON TRIGGER "increment_session_hitCount_trigger" ON "public"."sessions"
IS 'trigger to increment `session.hitCount` by one when session is updated';
