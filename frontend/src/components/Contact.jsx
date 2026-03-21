import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiPhone } from 'react-icons/fi';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const socialLinks = [
  { icon: FaGithub, label: 'GitHub', url: 'https://github.com' },
  { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com' },
  { icon: FaEnvelope, label: 'Email', url: 'mailto:adarshsikarawar63@gmail.com' },
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone)) e.phone = 'Invalid phone number';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'At least 10 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${apiUrl}/api/contact`, form);

      toast.success('Message Sent! Thanks for reaching out 🎉', {
        style: { background: '#16a34a', color: '#fff', fontWeight: '500', borderRadius: '10px', padding: '12px 18px' },
        duration: 4000,
      });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error('Failed to send. Please try again.', {
        style: { background: '#111', color: '#fff', border: '1px solid #333' },
      });
    } finally { setLoading(false); }
  };

  return (
    <section id="contact" ref={ref} className="py-24">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Let&apos;s Talk</p>
          <h2 className="section-title text-white">Contact</h2>
          <div className="divider mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-3">Let&apos;s build something great.</h3>
            <p className="text-white/35 text-sm leading-relaxed mb-8">
              Whether you have a project idea, job opportunity, or just want to connect — my inbox is always open. I respond within 24–48 hours.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {socialLinks.map(({ icon: Icon, label, url }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-elevated rounded-xl p-4 flex items-center gap-3 hover:border-white/20 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/50">
                    <Icon size={15} />
                  </div>
                  <span className="text-white/60 text-sm font-medium">{label}</span>
                  <span className="ml-auto text-white/20 text-xs">→</span>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <div className="card rounded-xl p-4 flex items-center gap-3 border border-green-500/40">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-40" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-white/50 text-xs">Available for freelance &amp; full-time roles</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="card-elevated rounded-2xl p-7 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-white/35 text-xs font-medium mb-1.5">
                <FiUser size={11} /> Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={`form-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <p className="text-white/40 text-[11px] mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-1.5 text-white/35 text-xs font-medium mb-1.5">
                <FiMail size={11} /> Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <p className="text-white/40 text-[11px] mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-1.5 text-white/35 text-xs font-medium mb-1.5">
                <FiPhone size={11} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`form-input ${errors.phone ? 'error' : ''}`}
              />
              {errors.phone && <p className="text-white/40 text-[11px] mt-1">{errors.phone}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-1.5 text-white/35 text-xs font-medium mb-1.5">
                <FiMessageSquare size={11} /> Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                rows={5}
                className={`form-input ${errors.message ? 'error' : ''}`}
                style={{ resize: 'none' }}
              />
              {errors.message && <p className="text-white/40 text-[11px] mt-1">{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.99 } : {}}
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={14} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
