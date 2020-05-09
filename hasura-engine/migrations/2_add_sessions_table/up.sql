CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."sessions"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "provider" text NOT NULL, "token" text NOT NULL, "last_hit" timestamptz, "hit_count" int4 NOT NULL DEFAULT 0, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."increment_session_hit_count"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."hit_count" = _new."hit_count" + 1;
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "increment_session_hit_count_trigger"
BEFORE UPDATE ON "public"."sessions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."increment_session_hit_count"();
COMMENT ON TRIGGER "increment_session_hit_count_trigger" ON "public"."sessions"
IS 'trigger to increment `session.hit_count` by one when session is updated';
