REVOKE ALL ON public.contact_messages FROM anon;
REVOKE ALL ON public.contact_messages FROM authenticated;
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;
