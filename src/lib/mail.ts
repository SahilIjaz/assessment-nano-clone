import nodemailer from "nodemailer";
import { db } from "./db";

export type MailDelivery = "email" | "outbox";

/**
 * Sends an e-mail with nodemailer over SMTP (SMTP_*) or through Resend (RESEND_API_KEY), selected by MAIL_PROVIDER (smtp | resend | auto).
 * A copy is always kept in the local outbox (/dev/inbox) so the flow can be tested without a provider.
 */
export async function sendMail(to: string, subject: string, text: string, html?: string): Promise<MailDelivery> {
  await (await db()).prepare("INSERT INTO outbox (to_email,subject,body) VALUES (?,?,?)").run(to, subject, text);
  const from = process.env.MAIL_FROM || "Naano <no-reply@naano.local>";
  const want = (process.env.MAIL_PROVIDER || "auto").toLowerCase();
  const useSmtp = want === "smtp" ? !!process.env.SMTP_HOST : want === "auto" && !!process.env.SMTP_HOST;
  const useResend = want === "resend" ? !!process.env.RESEND_API_KEY : want === "auto" && !useSmtp && !!process.env.RESEND_API_KEY;
  try {
    if (useResend) {
      const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ from, to, subject, text, html }) });
      if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
      return "email";
    }
    if (useSmtp) {
      const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === "1", auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined });
      await transport.sendMail({ from, to, subject, text, html });
      return "email";
    }
  } catch (e) {
    console.error("[mail] delivery failed, kept in local outbox", e);
  }
  return "outbox";
}

export const mailConfigured = () => !!(process.env.SMTP_HOST || process.env.RESEND_API_KEY);

export function codeEmail(code: string, purpose: "signup" | "recovery") {
  const title = purpose === "signup" ? "Confirm your email" : "Reset your password";
  const lead = purpose === "signup" ? "Welcome to Naano! Use the code below to verify your email and finish setting up your account." : "Use the code below to set a new password for your Naano account.";
  const text = `${title}\n\n${lead}\n\n${code}\n\nThis code expires in 15 minutes. If you didn't request it, you can safely ignore this email.\n\nnaano · Paris, France`;
  const html = `<div style="font-family:Inter,-apple-system,sans-serif;max-width:520px;margin:0 auto;padding:32px;color:#0F1220"><img src="https://naano.com/lp/naano-logo-nav.png" alt="naano" style="height:26px"><h1 style="font-size:22px;margin:24px 0 8px">${title}</h1><p style="color:#4B5563;line-height:1.6">${lead}</p><div style="font-size:36px;font-weight:800;letter-spacing:8px;margin:24px 0;padding:18px;background:#F3F5F9;border-radius:14px;text-align:center">${code}</div><p style="color:#6B7280;font-size:13px">This code expires in 15 minutes. If you didn't request it, you can safely ignore this email.</p><p style="color:#9CA3AF;font-size:12px;margin-top:32px">naano · Paris, France</p></div>`;
  return { subject: purpose === "signup" ? "Your Naano verification code" : "Reset your Naano password", text, html };
}
