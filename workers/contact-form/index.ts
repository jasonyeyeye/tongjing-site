/**
 * Cloudflare Worker for Contact Form - Resend Email Integration
 */

const RESEND_API_KEY = 're_ECLuFW9Z_9P7L7XpJMespLocNXLoncZnx';
const TO_EMAIL = 'jason@chinanewchip.com';
const FROM_EMAIL = 'noreply@chinanewchip.com';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  type?: string;
  message: string;
}

const inquiryTypeLabels: Record<string, string> = {
  product: 'Product Inquiry',
  technical: 'Technical Support',
  pricing: 'Pricing Request',
  cooperation: 'Business Cooperation',
  other: 'Other',
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendEmail(data: FormData): Promise<{ success: boolean; error?: string }> {
  const inquiryType = data.type ? (inquiryTypeLabels[data.type] || data.type) : 'Not specified';

  const htmlContent = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold; width: 120px;">Full Name</td>
        <td style="padding: 12px;">${data.name}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">Company</td>
        <td style="padding: 12px;">${data.company}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">Email</td>
        <td style="padding: 12px;"><a href="mailto:${data.email}">${data.email}</a></td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">Phone</td>
        <td style="padding: 12px;">${data.phone || 'Not provided'}</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold;">Inquiry Type</td>
        <td style="padding: 12px;">${inquiryType}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-weight: bold; vertical-align: top;">Message</td>
        <td style="padding: 12px;">${data.message.replace(/\n/g, '<br>')}</td>
      </tr>
    </table>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
    <p style="color: #666; font-size: 12px;">
      This email was sent from the contact form on chinanewchip.com<br>
      Submission time: ${new Date().toISOString()}
    </p>
  `;

  const textContent = `
New Contact Form Submission
==========================

Full Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Inquiry Type: ${inquiryType}

Message:
${data.message}

---
Submitted from chinanewchip.com at ${new Date().toISOString()}
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `[Website Inquiry] ${data.name} - ${inquiryType}`,
        html: htmlContent,
        text: textContent,
        reply_to: data.email,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `Resend API error: ${error}` };
    }

    const result = await response.json();
    return { success: true };
  } catch (error) {
    return { success: false, error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const contentType = request.headers.get('content-type') || '';

      let formData: FormData;

      if (contentType.includes('application/json')) {
        formData = await request.json();
      } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
        const rawData = await request.formData();
        formData = {
          name: rawData.get('name') as string,
          company: rawData.get('company') as string,
          email: rawData.get('email') as string,
          phone: rawData.get('phone') as string || undefined,
          type: rawData.get('type') as string || undefined,
          message: rawData.get('message') as string,
        };
      } else {
        return new Response(JSON.stringify({ error: 'Invalid content type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Validate required fields
      if (!formData.name || !formData.company || !formData.email || !formData.message) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Validate email format
      if (!validateEmail(formData.email)) {
        return new Response(JSON.stringify({ error: 'Invalid email format' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Send email via Resend
      const result = await sendEmail(formData);

      if (result.success) {
        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } else {
        return new Response(JSON.stringify({ error: result.error || 'Failed to send email' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
