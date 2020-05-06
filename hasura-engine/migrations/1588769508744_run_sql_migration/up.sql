CREATE OR REPLACE FUNCTION "public"."increment_session_hits"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."hits" = _new."hits" + 1;
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "increment_session_hits_trigger"
BEFORE UPDATE ON "public"."sessions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."increment_session_hits"();
COMMENT ON TRIGGER "increment_session_hits_trigger" ON "public"."sessions" 
IS 'trigger to increment `session.hits` by one when session is updated';
