// supabase/functions/send-notifications/index.ts

// Fix: Use a more specific and stable URL for Supabase function types to resolve Deno globals.
/// <reference types="https://unpkg.com/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
// Fix: Use a Deno-compatible URL import for the 'resend' library.
import { Resend } from 'https://esm.sh/resend@3.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- IMPORTANT ---
// This is the testing email address provided by Resend.
// To send emails from your own domain in production, you must:
// 1. Verify your domain on resend.com
// 2. Replace this address with something like 'notifications@your-verified-domain.com'
const RESEND_FROM_EMAIL = 'Auralis <onboarding@resend.dev>';


serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const adminEmail = Deno.env.get('ADMIN_EMAIL');

    if (!resendApiKey) throw new Error("RESEND_API_KEY is not set in Supabase secrets.");
    if (!adminEmail) throw new Error("ADMIN_EMAIL is not set in Supabase secrets.");
    
    const resend = new Resend(resendApiKey);
    const payload = await req.json();
    const record = payload.record;

    if (payload.type !== 'INSERT') {
        return new Response(JSON.stringify({ message: "Not an insert event, skipping." }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    }

    if (payload.table === 'appointments') {
      const { name, email, date, time } = record;
      const formattedDate = new Date(`${date}T${time}`).toLocaleString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      // 1. Send notification to the admin
      await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: [adminEmail],
        subject: `New Appointment Booking: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
            <h2>New Appointment Booking</h2>
            <p>A new appointment has been scheduled through the Auralis website.</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Date & Time:</strong> ${formattedDate}</li>
            </ul>
          </div>
        `,
      });

      // 2. Send confirmation to the customer
      await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: [email],
        subject: `Your Auralis Appointment is Confirmed!`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
            <h2>Appointment Confirmed!</h2>
            <p>Hello ${name},</p>
            <p>Thank you for booking a session with Auralis. Your appointment is confirmed for:</p>
            <p><strong>${formattedDate}</strong></p>
            <p>If you need to reschedule, please reply to this email.</p>
            <p>Warmly,<br>Alice at Auralis</p>
          </div>
        `,
      });

    } else if (payload.table === 'contacts') {
      const { name, email, message } = record;

      // Send notification to the admin for the contact message
      await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: [adminEmail],
        subject: `New Contact Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
            <h2>New Contact Form Message</h2>
            <p>You have received a new message from the Auralis website contact form.</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            </ul>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        `,
      });
    }

    return new Response(JSON.stringify({ message: "Emails sent successfully!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});