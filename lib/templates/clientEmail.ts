/**
 * Generates the HTML layout for the Client Confirmation Email using Metrina's light cream brand palette.
 * @param {Object} data - The inquiry data.
 * @returns {string} HTML string
 */
export function getClientEmailTemplate(data: any) {
  // Extract first name
  const firstName = data.name ? data.name.split(' ')[0] : 'there';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Inquiry Received — Metrina</title>
  <style>
    body {
      background-color: #FAF7F2;
      color: #1a1a1a;
      font-family: 'Times New Roman', Times, serif;
      margin: 0;
      padding: 40px 20px;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FAF7F2;
      border: 1px solid #e8e0d4;
      padding: 40px;
    }
    .header {
      border-bottom: 1px solid #e8e0d4;
      padding-bottom: 20px;
      margin-bottom: 30px;
      text-align: center;
    }
    .logo {
      font-size: 24px;
      letter-spacing: 0.15em;
      font-weight: 800;
      text-transform: uppercase;
      color: #008080;
      margin: 0 0 5px 0;
    }
    .subtitle {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #1a1a1a;
      opacity: 0.5;
      margin: 0;
    }
    .content {
      font-family: 'Times New Roman', Times, serif;
      font-size: 16px;
      line-height: 1.6;
      color: #1a1a1a;
      margin-bottom: 30px;
    }
    .salutation {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .highlight-box {
      border-left: 2px solid #c9a84c;
      padding: 15px 20px;
      background-color: #faf7f2;
      margin: 25px 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
    }
    .highlight-box strong {
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #c9a84c;
      display: block;
      margin-bottom: 4px;
    }
    .footer {
      border-top: 1px solid #e8e0d4;
      padding-top: 25px;
      margin-top: 40px;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #1a1a1a;
      opacity: 0.5;
    }
    .contact-link {
      color: #c9a84c;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">METRINA</div>
      <div class="subtitle">Bespoke Web Development</div>
    </div>

    <div class="content">
      <p class="salutation">Hello ${firstName},</p>
      
      <p>Thank you for initiating a project scoping session with METRINA. We have successfully registered your design requirements on our system.</p>
      
      <div class="highlight-box">
        <strong>Selected Tier</strong>
        ${data.selectedPackage} Package Scoping Session
      </div>

      <p>Our engineering and design desk is currently reviewing your brief. One of our lead developers will reach out to you within 24 hours to align on the next phases of design and implementation.</p>

      <p>In the meantime, if you have any additional thoughts, assets, or references you would like to append to this request, feel free to reply directly to this thread or reach out to us at <a href="mailto:hello@metrina.dev" class="contact-link">hello@metrina.dev</a>.</p>

      <p style="margin-top: 30px;">Warm regards,<br>
      <strong>METRINA Design Team</strong><br>
      <span style="font-size: 13px; opacity: 0.7;"><a href="https://metrina.tech" style="color: #1a1a1a; text-decoration: none;">metrina.tech</a></span></p>
    </div>

    <div class="footer">
      © 2026 METRINA. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;
}
