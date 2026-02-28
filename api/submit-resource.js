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
function row(label, value, isLink = false) {
  if (!value) return "";
  const content = isLink
    ? `<a href="${escapeHtml(value)}" target="_blank" style="color:#0284c7;">${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return `
    <tr>
      <td style="padding:8px 0;color:#64748b;width:140px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:8px 0;color:#0f172a;">
        ${content}
      </td>
    </tr>
  `;
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
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color:#f4f6f8;
                padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;
                  border-radius:12px;
                  box-shadow:0 10px 25px rgba(0,0,0,0.06);
                  overflow:hidden;">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#0f172a,#0284c7);
                    padding:20px 24px;
                    color:white;">
          <h1 style="margin:0;font-size:20px;">📬 New Resource Suggestion</h1>
          <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">
            Louisville Together
          </p>
        </div>

        <!-- Body -->
        <div style="padding:24px;color:#0f172a;">
          <h2 style="margin-top:0;font-size:18px;">${escapeHtml(resourceName)}</h2>

          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row("Category", category)}
            ${row("Description", description)}
            ${row("Address", address)}
            ${row("Phone", phone)}
            ${row("Website", website, true)}
            ${row("Additional Notes", additionalNotes)}
          </table>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

          <p style="font-size:13px;color:#475569;">
            <strong>Submitted by:</strong><br />
            ${escapeHtml(yourName || "Anonymous")}
            ${userIsEmail ? ` &lt;${escapeHtml(yourEmail)}&gt;` : ""}
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#f1f5f9;
                    padding:16px 24px;
                    font-size:12px;
                    color:#64748b;
                    text-align:center;">
          This message was automatically generated by Louisville Together.
        </div>

      </div>
    </div>
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
          <div style="font-family:system-ui;background:#f8fafc;padding:24px;">
            <div style="max-width:600px;margin:auto;background:white;
                        border-radius:12px;padding:24px;
                        box-shadow:0 8px 20px rgba(0,0,0,0.06);">

              <h2 style="margin-top:0;">Thanks for your submission 🙌</h2>

              <p>
                Hi ${escapeHtml(yourName || "there")},
              </p>

              <p>
                We’ve received your resource suggestion for
                <strong>${escapeHtml(resourceName)}</strong>.
                Our team will review it shortly.
              </p>

              <div style="background:#f1f5f9;padding:16px;border-radius:8px;margin:20px 0;">
                <strong>Category:</strong> ${escapeHtml(category)}<br />
                ${description ? `<strong>Description:</strong> ${escapeHtml(description)}` : ""}
              </div>

              <p style="font-size:14px;color:#475569;">
                If we need more information, we’ll reach out.
                Thanks for helping improve Louisville’s community resources 💙
              </p>

              <p style="margin-top:32px;font-size:13px;color:#64748b;">
                — Louisville Together
              </p>

            </div>
          </div>
        `
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