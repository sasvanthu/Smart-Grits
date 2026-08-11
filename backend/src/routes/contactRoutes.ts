import { Router } from 'express';
import nodemailer from 'nodemailer';
import { supabase } from '../config/supabase';

const router = Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, company, email, phone, subject, message } = req.body;

  try {
    // Create a transporter using SMTP
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
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.ADMIN_EMAIL || 'info@smartgrit.in',
      replyTo: email,
      subject: `New Website Inquiry: ${subject}`,
      text: `
You have received a new message from the SmartGrit Website.

Name: ${firstName} ${lastName}
Company: ${company || 'N/A'}
Email: ${email}
Phone: ${phone || 'N/A'}
Subject: ${subject}

Message:
${message}
      `,
    };

    // If SMTP is not configured, we'll log it and pretend it succeeded for local dev
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP_USER or SMTP_PASS is not configured in .env. Email was NOT sent, but simulating success.');
      console.log('Would have sent:', mailOptions);
      return res.status(200).json({ success: true, message: 'Simulated email sent (Missing SMTP credentials)' });
    }

    // Add to Customers CRM panel
    try {
      await supabase.from('customers').insert([{
        full_name: `${firstName} ${lastName}`.trim(),
        company_name: company || null,
        email: email,
        phone: phone || null,
        status: 'Lead',
        notes: `Contact Form Inquiry\nSubject: ${subject}\nMessage: ${message}`
      }]);
    } catch (dbError) {
      console.error('Failed to add contact inquiry to customers CRM:', dbError);
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email: ' + error.message });
  }
});

export default router;
