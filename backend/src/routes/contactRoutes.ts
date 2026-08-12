import { Router } from 'express';
import nodemailer from 'nodemailer';
import { supabase } from '../config/supabase';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

// GET all contact messages (for admin dashboard)
router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error: any) {
    // If table doesn't exist yet, return empty array gracefully
    console.error('Error fetching contact messages:', error.message);
    res.json([]);
  }
});

// PATCH – mark a contact message as read
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST – submit contact form
router.post('/', async (req, res) => {
  const { firstName, lastName, company, email, phone, subject, message } = req.body;

  // 1. Save to contact_messages table in Supabase
  try {
    await supabase.from('contact_messages').insert([{
      first_name: firstName,
      last_name: lastName,
      company: company || null,
      email,
      phone: phone || null,
      subject,
      message,
      status: 'New'
    }]);
  } catch (dbError: any) {
    console.error('Failed to save contact message to DB:', dbError.message);
    // Don't fail the whole request if DB write fails — still try email
  }

  // 2. Also add/update customer CRM record
  try {
    await supabase.from('customers').insert([{
      full_name: `${firstName} ${lastName}`.trim(),
      company_name: company || null,
      email,
      phone: phone || null,
      status: 'Lead',
      notes: `Contact Form Inquiry\nSubject: ${subject}\nMessage: ${message}`
    }]);
  } catch (dbError: any) {
    // Ignore duplicate email errors silently
    if (!dbError.message?.includes('duplicate')) {
      console.error('Failed to add contact inquiry to customers CRM:', dbError.message);
    }
  }

  // 3. Send email notification to admin
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      // 'from' MUST be the SMTP user's address for deliverability
      from: `"SmartGrits Website" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'info@smartgrit.in',
      replyTo: email, // Reply goes directly to the visitor
      subject: `New Website Inquiry: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 120px;">Name:</td><td style="padding: 8px;">${firstName} ${lastName}</td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${company || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;">${subject}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 12px; background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 4px;">
            <strong>Message:</strong>
            <p style="margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">You can reply directly to this email to respond to the visitor. View full details in your <a href="http://localhost:5173/admin/contacts">Admin Dashboard</a>.</p>
        </div>
      `,
    };

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP credentials not configured. Email not sent.');
    } else {
      await transporter.sendMail(mailOptions);
      console.log(`Contact notification sent to ${process.env.ADMIN_EMAIL}`);
    }
  } catch (emailError: any) {
    console.error('Failed to send contact notification email:', emailError.message);
  }

  res.status(200).json({ success: true, message: 'Your message has been received!' });
});

export default router;
