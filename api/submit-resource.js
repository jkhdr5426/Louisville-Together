import sgMail from "@sendgrid/mail";

sgMail.setApiKey("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");

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
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

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
  } = req.body || {};

  if (!resourceName || !category) {
    return res.status(400).json({ message: "resourceName and category are required" });
  }

  const ADMIN_EMAIL = "coderman09@gmail.com"; // your inbox (set in Vercel env)
  const FROM_EMAIL = "louisvilletogether@gmail.com"; // verified sender in SendGrid
  const COPY_TO = "louisvilletogether@gmail.com"; // explicit copy address requested

  if (!ADMIN_EMAIL) {
    return res.status(500).json({ message: "Server not configured: ADMIN_EMAIL missing" });
  }
  if (!process.env.SENDGRID_API_KEY) {
    return res.status(500).json({ message: "Server not configured: SENDGRID_API_KEY missing" });
  }

  const userIsEmail = isEmail(yourEmail);

  const htmlContent = `
    <h2>New Resource Suggestion</h2>
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
    <p>This is the raw submission payload (automated).</p>
  `;

  try {
    // Send a single message to both admin and the explicit copy address.
    const msg = {
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL, COPY_TO],
      subject: `New Resource Suggestion — ${resourceName}`,
      html: htmlContent,
      replyTo: userIsEmail ? yourEmail : FROM_EMAIL,
    };

    await sgMail.send(msg);

    // Also send a confirmation email to the user (non-blocking but awaited to report errors)
    if (userIsEmail) {
      await sgMail.send({
        from: FROM_EMAIL,
        to: yourEmail,
        subject: `We received your resource suggestion: ${resourceName}`,
        html: `
          <p>Hi ${escapeHtml(yourName || "")},</p>
          <p>Thanks for submitting <strong>${escapeHtml(resourceName)}</strong>. We received your suggestion and will review it shortly.</p>
          <hr/>
          ${htmlContent}
        `,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("submit-resource error:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}