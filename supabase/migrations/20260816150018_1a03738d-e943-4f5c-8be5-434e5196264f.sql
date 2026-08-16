-- 1) Remove anon (signed-out) access to data tables
REVOKE ALL ON public.game_users FROM anon;
REVOKE ALL ON public.game_sessions FROM anon;
REVOKE ALL ON public.redemptions FROM anon;
REVOKE ALL ON public.admin_actions FROM anon;
REVOKE ALL ON public.user_roles FROM anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.game_users TO authenticated;
GRANT SELECT, INSERT ON public.game_sessions TO authenticated;
GRANT SELECT, INSERT ON public.redemptions TO authenticated;
GRANT SELECT, INSERT ON public.admin_actions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.game_users TO service_role;
GRANT ALL ON public.game_sessions TO service_role;
GRANT ALL ON public.redemptions TO service_role;
GRANT ALL ON public.admin_actions TO service_role;
GRANT ALL ON public.user_roles TO service_role;

-- 2) Revoke EXECUTE on SECURITY DEFINER functions from PUBLIC/anon
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.current_user_has_role(app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.award_coins(uuid, text, integer, integer) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.create_redemption(uuid, text, integer) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_adjust_user_coins(uuid, integer, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_all_users_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_staff_redemptions() FROM PUBLIC, anon;

-- Trigger-only function: not callable via API by anyone
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_user_has_role(app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.award_coins(uuid, text, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_redemption(uuid, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_adjust_user_coins(uuid, integer, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_users_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_staff_redemptions() TO authenticated;

-- 3) Explicit admin delete policy for user profiles
DROP POLICY IF EXISTS "Admins can delete user profiles" ON public.game_users;
CREATE POLICY "Admins can delete user profiles"
ON public.game_users
FOR DELETE
TO authenticated
USING (public.current_user_has_role('admin'::app_role));

-- 4) Make admin_actions audit trail explicitly immutable
DROP POLICY IF EXISTS "Audit records cannot be updated" ON public.admin_actions;
CREATE POLICY "Audit records cannot be updated"
ON public.admin_actions
AS RESTRICTIVE
FOR UPDATE
TO authenticated, anon
USING (false);

DROP POLICY IF EXISTS "Audit records cannot be deleted" ON public.admin_actions;
CREATE POLICY "Audit records cannot be deleted"
ON public.admin_actions
AS RESTRICTIVE
FOR DELETE
TO authenticated, anon
USING (false);
