CREATE OR REPLACE FUNCTION public.protect_game_users_sensitive_columns()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow trusted contexts (security definer functions running as table owner,
  -- service_role, or admins) to change balance/limit columns.
  IF current_user IN ('authenticated', 'anon') AND NOT public.current_user_has_role('admin'::app_role) THEN
    NEW.coin_balance := OLD.coin_balance;
    NEW.total_coins_earned := OLD.total_coins_earned;
    NEW.coins_earned_today := OLD.coins_earned_today;
    NEW.daily_coin_limit := OLD.daily_coin_limit;
    NEW.last_daily_reset := OLD.last_daily_reset;
    NEW.last_game_played := OLD.last_game_played;
    NEW.auth_id := OLD.auth_id;
    NEW.id := OLD.id;
    NEW.created_at := OLD.created_at;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_game_users_sensitive_columns ON public.game_users;
CREATE TRIGGER protect_game_users_sensitive_columns
BEFORE UPDATE ON public.game_users
FOR EACH ROW
EXECUTE FUNCTION public.protect_game_users_sensitive_columns();