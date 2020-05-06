CREATE TRIGGER "set_public_sessions_updatedAt"
BEFORE UPDATE ON "public"."sessions"
FOR EACH ROW EXECUTE FUNCTION "set_current_timestamp_updatedAt"();COMMENT ON TRIGGER "set_public_sessions_updatedAt" ON "public"."sessions"
IS E'trigger to set value of column "updatedAt" to current timestamp on row update';
