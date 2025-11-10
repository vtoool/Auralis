// supabase/functions/send-notifications/index.ts

// FIX: The previous type reference was not resolving correctly. Replaced with the recommended `npm:` specifier and a pinned version to ensure Deno types are loaded, which fixes the "Cannot find name 'Deno'" errors.
/// <reference types="npm:@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />

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
    
    const formatDate = (dateStr: string, timeStr: string) => {
        return new Date(`${dateStr}T${timeStr}`).toLocaleString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    if (payload.table === 'appointments') {
        if (payload.type === 'INSERT') {
            const { name, email, date, time } = payload.record;
            const formattedDate = formatDate(date, time);

            // 1. Send notification to the admin for new booking
            await resend.emails.send({
                from: RESEND_FROM_EMAIL,
                to: [adminEmail],
                subject: `New Appointment Booking: ${name}`,
                html: `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;"><h2>New Appointment Booking</h2><p>A new appointment has been scheduled through the Auralis website.</p><ul><li><strong>Name:</strong> ${name}</li><li><strong>Email:</strong> ${email}</li><li><strong>Date & Time:</strong> ${formattedDate}</li></ul></div>`,
            });

            // 2. Send confirmation to the customer
            await resend.emails.send({
                from: RESEND_FROM_EMAIL,
                to: [email],
                subject: `Your Auralis Appointment is Confirmed!`,
                html: `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;"><h2>Appointment Confirmed!</h2><p>Hello ${name},</p><p>Thank you for booking a session with Auralis. Your appointment is confirmed for:</p><p><strong>${formattedDate}</strong></p><p>If you need to reschedule, please reply to this email.</p><p>Warmly,<br>Alice at Auralis</p></div>`,
            });

        } else if (payload.type === 'UPDATE') {
            const { record: newRecord, old_record: oldRecord } = payload;
            
            // Check if it's a reschedule event
            if (newRecord.date !== oldRecord.date || newRecord.time !== oldRecord.time) {
                const { name, email, date, time } = newRecord;
                const oldFormattedDate = formatDate(oldRecord.date, oldRecord.time);
                const newFormattedDate = formatDate(date, time);

                // Send reschedule notification to the customer
                await resend.emails.send({
                    from: RESEND_FROM_EMAIL,
                    to: [email],
                    subject: `Update: Your Auralis Appointment has been Rescheduled`,
                    html: `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;"><h2>Appointment Rescheduled</h2><p>Hello ${name},</p><p>This is a notification that your appointment with Auralis has been rescheduled by your instructor.</p><p><strong>Previous Time:</strong> ${oldFormattedDate}</p><p><strong>New Time:</strong> ${newFormattedDate}</p><p>If you have any questions, please reply to this email.</p><p>Warmly,<br>Alice at Auralis</p></div>`,
                });
            }
        }
    } else if (payload.table === 'contacts' && payload.type === 'INSERT') {
        const { name, email, message } = payload.record;

        // Send notification to the admin for the contact message
        await resend.emails.send({
            from: RESEND_FROM_EMAIL,
            to: [adminEmail],
            subject: `New Contact Message from ${name}`,
            html: `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;"><h2>New Contact Form Message</h2><p>You have received a new message from the Auralis website contact form.</p><ul><li><strong>Name:</strong> ${name}</li><li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li></ul><hr><p><strong>Message:</strong></p><p>${message}</p></div>`,
        });
    }

    return new Response(JSON.stringify({ message: "Emails sent successfully!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in notification function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});