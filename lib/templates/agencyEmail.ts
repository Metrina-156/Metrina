/**
 * Generates the HTML for the internal agency notification email.
 */
export function getAgencyEmailTemplate(data: any) {
    return `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e8e0d4; background-color: #FAF7F2; color: #1a1a1a;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 24px; text-transform: uppercase; letter-spacing: 0.1em; color: #008080; border-bottom: 2px solid #008080; padding-bottom: 10px; margin-bottom: 30px;">
          New Scoping Session Request
        </h1>
        
        <div style="margin-bottom: 25px;">
          <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; color: #1a1a1a; opacity: 0.6; margin-bottom: 5px;">Selected Package</p>
          <p style="font-size: 18px; font-weight: 800; color: #5C45FF; margin: 0;">${data.selectedPackage}</p>
        </div>
  
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #fff; padding: 20px; border: 1px solid #e8e0d4;">
          <div>
            <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; opacity: 0.6; margin: 0;">Client Name</p>
            <p style="font-weight: 600; margin: 5px 0;">${data.name}</p>
          </div>
          <div>
            <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; opacity: 0.6; margin: 0;">Email</p>
            <p style="margin: 5px 0;">${data.email}</p>
          </div>
          ${data.phone ? `
          <div>
            <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; opacity: 0.6; margin: 0;">Phone</p>
            <p style="margin: 5px 0;">${data.phone}</p>
          </div>` : ''}
          ${data.company ? `
          <div>
            <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; opacity: 0.6; margin: 0;">Brand</p>
            <p style="margin: 5px 0;">${data.company}</p>
          </div>` : ''}
        </div>
  
        <div style="margin-bottom: 30px;">
          <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; opacity: 0.6; margin-bottom: 10px;">Project Overview</p>
          <p style="font-weight: bold; margin-bottom: 5px;">Context: ${data.businessType || 'N/A'}</p>
          <p style="line-height: 1.6; margin: 0;">${data.projectGoal}</p>
        </div>
  
        ${data.keyFeatures && data.keyFeatures.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; opacity: 0.6; margin-bottom: 10px;">Requested Features</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.keyFeatures.map((f: string) => `<span style="background: #5C45FF; color: #fff; padding: 4px 12px; font-size: 11px; border-radius: 20px;">${f}</span>`).join(' ')}
          </div>
        </div>` : ''}
  
        <div style="border-top: 1px solid #e8e0d4; padding-top: 20px; margin-top: 40px;">
          <p style="font-size: 12px; text-transform: uppercase; font-weight: bold; opacity: 0.5;">Target Launch: ${data.launchDate ? new Date(data.launchDate).toLocaleDateString() : 'TBD'}</p>
          <p style="font-size: 12px; text-transform: uppercase; font-weight: bold; opacity: 0.5;">Flexibility: ${data.budgetFlexibility}</p>
        </div>
      </div>
    `;
  }
  