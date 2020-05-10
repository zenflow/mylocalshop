CREATE OR REPLACE FUNCTION get_user_full_name(user_row users)
RETURNS TEXT AS $$
BEGIN
  RETURN user_row.first_name || ' ' || user_row.last_name;
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION get_user_role(user_row users)
RETURNS TEXT AS $$
BEGIN
  IF user_row.is_admin THEN
    RETURN 'admin';
  ELSE
    RETURN 'user';
  END IF;
END;
$$ LANGUAGE plpgsql STABLE;
