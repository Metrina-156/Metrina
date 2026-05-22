/**
 * Generates the HTML layout for the Agency Notification Email using Metrina's light cream brand palette.
 * @param {Object} data - The inquiry data.
 * @returns {string} HTML string
 */
export function getAgencyEmailTemplate(data) {
  const formattedDate = data.launchDate
    ? new Date(data.launchDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not Specified';

  const featuresList = data.keyFeatures && data.keyFeatures.length > 0
    ? data.keyFeatures.join(', ')
    : 'None';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Scoping Session Inquiry</title>
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
    h1 {
      font-size: 22px;
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-align: center;
      margin: 0 0 30px 0;
      color: #1a1a1a;
    }
    .package-badge {
      display: inline-block;
      border: 1px solid #c9a84c;
      color: #c9a84c;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      padding: 6px 16px;
      margin-bottom: 25px;
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
    .goal-text {
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
      <div class="subtitle">Client Scoping Sessions</div>
    </div>
    
    <div style="text-align: center;">
      <span class="package-badge">${data.selectedPackage} Inquiry</span>
    </div>

    <h1>New Project Brief</h1>

    <table>
      <tr>
        <td class="label">Client Name</td>
        <td class="val"><strong>${data.name}</strong></td>
      </tr>
      <tr>
        <td class="label">Email Address</td>
        <td class="val">${data.email}</td>
      </tr>
      <tr>
        <td class="label">Phone Number</td>
        <td class="val">${data.phone || 'Not provided'}</td>
      </tr>
      <tr>
        <td class="label">Company / Brand</td>
        <td class="val">${data.company || 'Not provided'}</td>
      </tr>
      <tr>
        <td class="label">Business Type</td>
        <td class="val">${data.businessType || 'Not provided'}</td>
      </tr>
      <tr>
        <td class="label">Project Scoping Goal</td>
        <td class="val goal-text">${data.projectGoal || 'None provided'}</td>
      </tr>
      <tr>
        <td class="label">Required Modules</td>
        <td class="val">${featuresList}</td>
      </tr>
      <tr>
        <td class="label">Launch Date</td>
        <td class="val">${formattedDate}</td>
      </tr>
      <tr>
        <td class="label">Budget Scope</td>
        <td class="val">${data.budgetFlexibility || 'Flexible'}</td>
      </tr>
      <tr>
        <td class="label">Referral Source</td>
        <td class="val">${data.referralSource || 'Unknown'}</td>
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
