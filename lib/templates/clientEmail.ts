/**
 * Generates the HTML for the client confirmation email.
 */
export function getClientEmailTemplate(data: any) {
    return `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e8e0d4; background-color: #FAF7F2; color: #1a1a1a;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 24px; text-transform: uppercase; letter-spacing: 0.1em; color: #008080; border-bottom: 2px solid #008080; padding-bottom: 10px; margin-bottom: 30px;">
          Inquiry Received
        </h1>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          Hello ${data.name},<br><br>
          We've received your request for a <strong>${data.selectedPackage}</strong> scoping session. Our design desk is currently reviewing your project details.
        </p>
  
        <div style="background: #fff; padding: 25px; border: 1px solid #e8e0d4; margin-bottom: 30px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 18px; margin-top: 0; color: #5C45FF;">Next Steps</h2>
          <ul style="padding-left: 20px; line-height: 1.8;">
            <li>Internal feasibility review (24h)</li>
            <li>Custom project brief generation</li>
            <li>Scheduling of discovery call</li>
          </ul>
        </div>
  
        <p style="font-size: 14px; opacity: 0.7; line-height: 1.6;">
          You don't need to take any action at this time. We will reach out to you at <strong>${data.email}</strong> to move forward.
        </p>
  
        <div style="margin-top: 50px; border-top: 1px solid #e8e0d4; padding-top: 20px;">
          <p style="font-size: 12px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; margin: 0;">Metrina</p>
          <p style="font-size: 10px; opacity: 0.5; margin: 5px 0 0;">Bespoke technically sophisticated web experiences.</p>
        </div>
      </div>
    `;
  }
  