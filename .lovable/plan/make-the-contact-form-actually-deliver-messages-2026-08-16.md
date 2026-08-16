# Make the contact form actually deliver messages

## What happens today
I tested the form in the preview: the fields work and it shows a confirmation toast, but it does not send anything. It only tries to open the visitor's own email app with a pre-filled message. If the visitor has no email app set up (common on desktop and many phones), nothing happens and you never learn they tried to contact you. Nothing is stored anywhere either.

## What I'll build
Every message a visitor sends will be saved and emailed to you, so it can never quietly disappear.

1. **Saved copy** — each submission is stored in the backend (name, email, subject, message, time sent). This is the safety net: even if email delivery ever fails, the message is recorded.
2. **Email to your inbox** — a small backend function emails you at blendberwari25@gmail.com right after each submission, with the visitor's address as reply-to so you can reply directly.
3. **Honest feedback in the UI** — a real success message once the message is actually sent, a clear error with your email address if something goes wrong, and a spinner while sending. No more "opening your email app".
4. **Basic abuse protection** — length limits on all fields and a hidden field that silently rejects bots.

## What you need to provide
One free API key from Resend (the email service). I'll ask for it as a secret when we build. Until a domain is verified there, emails go out from a Resend test sender, which is fine for reaching your own Gmail inbox.

## How I'll verify it works
After building, I'll submit a real test message from the preview and confirm two things: the row appears in the backend, and the email function reports a successful send. You then check your Gmail for the test message.

## Technical details
- Migration: new `contact_messages` table (name, email, subject, message, created_at) with grants, RLS enabled, an INSERT policy for `anon` and `authenticated`, and no public SELECT — nobody can read submissions through the API; you read them in the Supabase dashboard.
- Edge function `send-contact-email` (`verify_jwt = false`): validates and length-checks the payload, inserts the row with the service role, then sends the mail via Resend using `RESEND_API_KEY`, with `reply_to` set to the visitor's email. Returns the provider status and body on failure.
- `src/components/Contact.tsx`: `handleSubmit` calls `supabase.functions.invoke('send-contact-email')`, reads real errors via `FunctionsHttpError` context, resets the form on success, and keeps the mailto address only as a fallback hint in the error toast.
- New translation keys for the success/error toasts in both English and Arabic.
