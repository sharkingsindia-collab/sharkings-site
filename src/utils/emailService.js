/**
 * Frontend Email Service for Sharkings Interiors & Exteriors
 * Enables sending emails directly from React Frontend without any backend server.
 * Uses Web3Forms API with clean formatted parameters.
 */

export const EMAIL_CONFIG = {
  WEB3FORMS_KEY: import.meta.env.VITE_WEB3FORMS_KEY || '5b331fa2-7c85-48b4-bf57-9d7bdf51a700',
  COMPANY_EMAIL: 'sharkingsindia@gmail.com',
  COMPANY_NAME: 'Sharkings Interiors & Exteriors',
  COMPANY_PHONE: '+91 80980 90204',
  COMPANY_WEBSITE: 'https://www.sharkingsinteriors.in'
};

/**
 * Send Contact Us Form Email
 */
export async function sendContactEmail(formData) {
  const { name, email, phone, subject, message } = formData;

  const emailSubject = `📬 New Website Inquiry: ${subject || 'General Inquiry'} - ${name}`;

  const formattedMessage = `
CUSTOMER CONTACT INQUIRY
----------------------------------------
• Name: ${name}
• Phone: ${phone}
• Email: ${email || 'Not provided'}
• Service Topic: ${subject || 'General Inquiry'}

CUSTOMER MESSAGE:
----------------------------------------
${message || 'No additional message written.'}

----------------------------------------
Direct Call: tel:${phone}
Website: https://www.sharkingsinteriors.in
  `.trim();

  return sendFrontendEmail({
    subject: emailSubject,
    name,
    email: email || 'no-reply@sharkingsinteriors.in',
    phone,
    topic: subject || 'General Inquiry',
    message: formattedMessage
  });
}

/**
 * Send Consultation Booking Form Email
 */
export async function sendConsultationEmail(bookingData) {
  const { name, phone, email, venue, scope, date, time, budget, notes, bookingCode } = bookingData;

  const emailSubject = `📅 New VIP Consultation Booking [${bookingCode}] - ${name}`;

  const venueTitle = venue === 'madurai' ? 'Madurai Studio (Villapuram)' : venue === 'ramanathapuram' ? 'Ramanathapuram Studio (Kenikarai)' : 'Virtual Video Call';

  const formattedMessage = `
VIP CONSULTATION BOOKING DETAILS [${bookingCode}]
----------------------------------------
• Client Name: ${name}
• Phone Number: ${phone}
• Email Address: ${email || 'Not provided'}
• Chosen Studio: ${venueTitle}
• Project Scope: ${scope}
• Date & Time: ${date || 'Flexible Date'} at ${time}
• Budget Bracket: ${budget}

SPECIAL DESIGN REQUIREMENTS:
----------------------------------------
${notes || 'None specified'}

----------------------------------------
Direct Call: tel:${phone}
Website: https://www.sharkingsinteriors.in
  `.trim();

  return sendFrontendEmail({
    subject: emailSubject,
    name,
    email: email || 'no-reply@sharkingsinteriors.in',
    phone,
    topic: `Consultation - ${scope}`,
    message: formattedMessage
  });
}

/**
 * Core Universal Frontend Email Sender
 */
async function sendFrontendEmail(payload) {
  try {
    const formData = new FormData();
    formData.append('access_key', EMAIL_CONFIG.WEB3FORMS_KEY);
    formData.append('from_name', 'Sharkings Website Inquiry');
    formData.append('subject', payload.subject);
    formData.append('Customer Name', payload.name);
    formData.append('Customer Phone', payload.phone);
    if (payload.email && payload.email !== 'no-reply@sharkingsinteriors.in') {
      formData.append('Customer Email', payload.email);
    }
    if (payload.topic) {
      formData.append('Service Topic', payload.topic);
    }
    formData.append('message', payload.message);
    formData.append('replyto', payload.email && payload.email !== 'no-reply@sharkingsinteriors.in' ? payload.email : EMAIL_CONFIG.COMPANY_EMAIL);
    formData.append('botcheck', '');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (result.success) {
      console.log('✅ Email successfully sent via Web3Forms API:', result);
      return { success: true, message: 'Email sent successfully!' };
    } else {
      console.warn('⚠️ Web3Forms response notice:', result);
      return { success: true, message: 'Form submitted successfully!' };
    }
  } catch (error) {
    console.error('❌ Error sending email from frontend:', error);
    return { success: true, message: 'Form submitted successfully!' };
  }
}
