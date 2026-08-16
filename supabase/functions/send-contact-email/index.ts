import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const OWNER_EMAIL = 'blendberwari25@gmail.com';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type Payload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
};

function validate(input: unknown): { data?: Payload; error?: string } {
  if (typeof input !== 'object' || input === null) return { error: 'Invalid request body' };
  const raw = input as Record<string, unknown>;

  const str = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '');
  const name = str('name');
  const email = str('email');
  const subject = str('subject');
  const message = str('message');
  const honeypot = str('honeypot');

  if (name.length < 1 || name.length > 100) return { error: 'Name must be between 1 and 100 characters' };
  if (email.length < 3 || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'A valid email address is required' };
  }
  if (subject.length < 1 || subject.length > 200) return { error: 'Subject must be between 1 and 200 characters' };
  if (message.length < 1 || message.length > 5000) return { error: 'Message must be between 1 and 5000 characters' };

  return { data: { name, email, subject, message, honeypot } };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data, error: validationError } = validate(body);
    if (!data) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Bots fill hidden fields; pretend success so they do not retry.
    if (data.honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!supabaseUrl || !serviceKey) {
      throw new Error('Supabase environment is not configured');
    }
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    // 1) Persist the message first, so it is never lost even if email fails.
    const supabase = createClient(supabaseUrl, serviceKey);
    const { error: insertError } = await supabase.from('contact_messages').insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    if (insertError) {
      console.error('Failed to store contact message:', insertError.message);
      return new Response(JSON.stringify({ error: 'Could not save your message', details: insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2) Email the site owner.
    const html = `
      <h2>New message from your portfolio</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <hr />
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    `;

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [OWNER_EMAIL],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject}`,
        html,
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text();
      console.error(`Resend request failed [${emailResponse.status}]: ${errorBody}`);
      return new Response(
        JSON.stringify({
          error: 'Message saved but email delivery failed',
          status: emailResponse.status,
          details: errorBody,
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const emailResult = await emailResponse.json();
    console.log('Contact email sent:', emailResult?.id ?? 'unknown id');

    return new Response(JSON.stringify({ success: true, id: emailResult?.id ?? null }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const messageText = err instanceof Error ? err.message : String(err);
    console.error('send-contact-email error:', messageText);
    return new Response(JSON.stringify({ error: messageText }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});