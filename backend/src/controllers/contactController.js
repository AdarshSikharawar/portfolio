const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
let Contact;
try { Contact = require('../models/Contact'); } catch (e) { Contact = null; }

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, phone, and message.',
      });
    }

    // Basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // Save to MongoDB (optional — works without DB too)
    if (Contact && mongoose.connection.readyState === 1) {
      try {
        await Contact.create({ name, email, phone, message });
        console.log('✅ Contact saved to DB');
      } catch (dbErr) {
        console.warn('⚠️ Could not save to DB (still sending email):', dbErr.message);
      }
    }

    // Send email notification
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `📬 New Contact from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0f1a;color:#e2e8f0;border-radius:12px;">
            <h2 style="color:#a855f7;">New Portfolio Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <div style="background:#1e1b4b;padding:16px;border-radius:8px;border-left:4px solid #6366f1;">
              ${message}
            </div>
            <p style="color:#64748b;font-size:12px;margin-top:20px;">Sent on ${new Date().toLocaleString()}</p>
          </div>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: `"Adarsh Sikharawar" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '✅ Thanks for reaching out!',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0f0f1a;color:#e2e8f0;border-radius:12px;">
            <h2 style="color:#a855f7;">Hey ${name}! 👋</h2>
            <p>Thanks for reaching out. I've received your message and will get back to you within 24–48 hours.</p>
            <p style="background:#1e1b4b;padding:16px;border-radius:8px;">Your message: "${message}"</p>
            <p>Best,<br/><strong>Adarsh Sikharawar</strong></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.warn('⚠️ Email send failed:', emailError.message);
      // Still return success if we at least got here (message was valid)
      return res.status(500).json({
        success: false,
        message: 'Could not send email. Check EMAIL_USER and EMAIL_PASS in .env',
      });
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};


// @desc    Get all messages (admin)
// @route   GET /api/contact
// @access  Private (future auth)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { submitContact, getContacts };
