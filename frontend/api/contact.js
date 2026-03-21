import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// Connect to MongoDB
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is missing. Proceeding without database save.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (err) {
    console.warn('MongoDB connection error. Proceeding without database save.', err.message);
  }
};

// Define Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Attempt to connect to DB
    await connectDB();

    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    // Basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // Save to DB
    if (isConnected) {
      try {
        await Contact.create({ name, email, phone, message });
        console.log('✅ Contact saved to DB');
      } catch (e) {
        console.warn('⚠️ Could not save to DB (still sending email):', e.message);
      }
    }

    // Send emails
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email to owner
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
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
    }

    return res.status(201).json({ success: true, message: "Message sent! I'll get back to you soon." });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
}
