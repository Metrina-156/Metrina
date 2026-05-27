/**
 * Generates the HTML layout for the Agency Notification Email for "Request Info" submissions.
 * Lighter, more conversational tone than the InquiryForm agency email.
 * @param {Object} data - { name, email, phone, message }
 * @returns {string} HTML string
 */
export function getRequestInfoAgencyEmailTemplate(data: any) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Info Request — Metrina</title>
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
    .type-badge {
      display: inline-block;
      border: 1px solid #008080;
      color: #008080;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      padding: 6px 16px;
      margin-bottom: 25px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    h1 {
      font-size: 22px;
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-align: center;
      margin: 0 0 30px 0;
      color: #1a1a1a;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    tr {
      border-bottom: 1px solid #e8e0d4;
    }
    tr:last-child {
      border-bottom: none;
    }
    td {
      padding: 14px 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      vertical-align: top;
    }
    .label {
      width: 35%;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 10px;
      color: #1a1a1a;
      opacity: 0.6;
    }
    .val {
      color: #1a1a1a;
    }
    .message-text {
      font-style: italic;
      font-family: 'Times New Roman', Times, serif;
      font-size: 14px;
      line-height: 1.6;
    }
    .footer {
      border-top: 1px solid #e8e0d4;
      padding-top: 20px;
      margin-top: 30px;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #1a1a1a;
      opacity: 0.4;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">METRINA</div>
      <div class="subtitle">Info Request</div>
    </div>

    <div style="text-align: center;">
      <span class="type-badge">Info Request</span>
    </div>

    <h1>New Information Request</h1>

    <table>
      <tr>
        <td class="label">Name</td>
        <td class="val"><strong>${data.name}</strong></td>
      </tr>
      <tr>
        <td class="label">Email Address</td>
        <td class="val">${data.email}</td>
      </tr>
      <tr>
        <td class="label">Phone Number</td>
        <td class="val">${data.phone}</td>
      </tr>
      <tr>
        <td class="label">Message</td>
        <td class="val message-text">${data.message}</td>
      </tr>
      <tr>
        <td class="label">Submitted On</td>
        <td class="val">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
      </tr>
    </table>

    <div class="footer">
      METRINA DESIGN PORTAL • CONFIDENTIAL
    </div>
  </div>
</body>
</html>
  `;
}
