// File: /api/submit-resource.js
// Place this at the PROJECT ROOT inside an `api/` folder so Vercel (and `vercel dev`) exposes it as /api/submit-resource
//
// Secure / convenient behavior:
// - Reads SENDGRID_API_KEY, FROM_EMAIL, ADMIN_EMAIL from environment variables.
// - For local testing, it will load .env (or .env.local) via dotenv if env vars are not already set.
// - DOES NOT hardcode API keys. If you want a quick local test and don't want env vars, temporarily add them to .env.local.
// - Sends the raw JSON form to ADMIN_EMAIL and also sends a copy to COPY_TO (louisvilletogether@gmail.com).
// - If the user provided an email, sends a confirmation email to that address and sets reply-to to the user.

import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

// try to load local env for local dev (safe: dotenv no-op if vars already set)
dotenv.config();

// read config from environment
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL; // must be verified in SendGrid
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // where you want submissions
const COPY_TO = "louisvilletogether@gmail.com"; // explicit copy as requested

// Fail early if API key missing
if (!SENDGRID_API_KEY) {
  // Note: throwing at module level will break function import; instead we will handle inside the handler
  // but still set sgMail if key exists.
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(s) {
  return typeof s === "string" && /\S+@\S+\.\S+/.test(s);
}

export default async function handler(req, res) {
  // Basic method check
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  // Ensure SendGrid key available at runtime
  if (!SENDGRID_API_KEY) {
    console.error("Missing SENDGRID_API_KEY (set in .env.local or Vercel env vars).");
    return res.status(500).json({
      ok: false,
      message:
        "Server misconfigured: missing SENDGRID_API_KEY. For local testing put SENDGRID_API_KEY in .env.local, and for production add it in Vercel Environment Variables.",
    });
  }

  // parse body safely
  const {
    resourceName,
    category,
    description,
    address,
    phone,
    website,
    additionalNotes,
    yourName,
    yourEmail,
  } = (req.body && typeof req.body === "object") ? req.body : {};

  if (!resourceName || !category) {
    return res.status(400).json({ ok: false, message: "resourceName and category are required" });
  }

  const userIsEmail = isEmail(yourEmail);

  // Build an HTML representation of the raw submission
  const htmlContent = `
    <h2>New Resource Suggestion (raw)</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      <tr><td><strong>Resource Name:</strong></td><td>${escapeHtml(resourceName)}</td></tr>
      <tr><td><strong>Category:</strong></td><td>${escapeHtml(category)}</td></tr>
      <tr><td><strong>Description:</strong></td><td>${escapeHtml(description || "")}</td></tr>
      <tr><td><strong>Address:</strong></td><td>${escapeHtml(address || "")}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>${escapeHtml(phone || "")}</td></tr>
      <tr><td><strong>Website:</strong></td><td>${escapeHtml(website || "")}</td></tr>
      <tr><td><strong>Additional Notes:</strong></td><td>${escapeHtml(additionalNotes || "")}</td></tr>
      <tr><td><strong>Submitted by:</strong></td><td>${escapeHtml(yourName || "Anonymous")} ${userIsEmail ? `(${escapeHtml(yourEmail)})` : ""}</td></tr>
    </table>
    <pre style="background:#f4f6f8;padding:12px;border-radius:6px;">${escapeHtml(JSON.stringify(req.body, null, 2))}</pre>
    <p style="color:#666;font-size:12px;">This is the raw submission payload (automated).</p>
  `;

  // Plain text fallback
  const textContent = `New Resource Suggestion\n\n${JSON.stringify(req.body, null, 2)}`;

  // Construct the admin message. We send to both ADMIN_EMAIL and COPY_TO in one request.
  // @sendgrid/mail accepts arrays for 'to' but some accounts prefer single recipient per send.
  // We'll send a single message with multiple recipients (to: array).
  const adminMsg = {
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL, COPY_TO],
    subject: `New Resource Suggestion — ${resourceName}`,
    text: textContent,
    html: htmlContent,
    replyTo: userIsEmail ? yourEmail : FROM_EMAIL,
  };

  try {
    
    // send admin + copy
    await sgMail.send(adminMsg);

    // If user provided email, send a confirmation email to them as well
    if (userIsEmail) {
      const userMsg = {
        from: FROM_EMAIL,
        to: yourEmail,
        subject: `Thanks — we received your resource suggestion: ${resourceName}`,
        text: `Hi ${yourName || ""},\n\nThanks for submitting "${resourceName}". We received the following:\n\n${JSON.stringify(req.body, null, 2)}\n\nWe will review it shortly.`,
        html: `
          <p>Hi ${escapeHtml(yourName || "")},</p>
          <p>Thanks for submitting <strong>${escapeHtml(resourceName)}</strong>. We received your suggestion and will review it shortly.</p>
          <hr />
          ${htmlContent}
        `,
      };

      await sgMail.send(userMsg);
    }

    return res.status(200).json({ ok: true, message: "Emails sent" });
  } catch (err) {
    // log full error for debugging (visible in vercel dev console or Vercel logs)
    console.error("submit-resource send error:", err);
    // try to extract useful info for response
    const message = (err && (err.message || (err.response && err.response.body && JSON.stringify(err.response.body)))) || "Failed to send email";
    return res.status(500).json({ ok: false, message });
  }
}