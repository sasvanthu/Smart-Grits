import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../data/brochureData';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '+91 ',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'phone') {
      let val = e.target.value;
      if (!val.startsWith('+91 ')) {
        val = '+91 ';
      }
      const digits = val.slice(4).replace(/\D/g, '').substring(0, 10);
      setFormData({ ...formData, phone: '+91 ' + digits });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: '+91 ',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="relative bg-dark text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/brochure-images/contact_engineer_bg.png"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 50, rotateX: 20, z: -100 }} animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }} transition={{ duration: 0.4, type: "spring", bounce: 0.4 }} style={{ transformStyle: "preserve-3d" }}>
            <p className="text-primary font-semibold uppercase tracking-widest mb-2 text-sm">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4">Contact Us</h1>
            <div className="w-24 h-1 bg-primary mb-6"></div>
            <p className="text-gray-300 max-w-2xl text-lg">
              Get in touch with our team for product inquiries, bulk orders, or technical support across India.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30, rotateY: 15, z: -50 }} animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} transition={{ duration: 0.4, type: "spring" }} className="space-y-8 transform-gpu" style={{ transformStyle: "preserve-3d" }}>
            <div className="bg-white rounded-3xl p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none"></div>
              <h3 className="text-2xl font-black text-dark mb-8 uppercase tracking-wider flex items-center gap-3 relative z-10">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                SmartGrit Polishing System
              </h3>
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-5 group/item">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 group-hover/item:scale-110 group-hover/item:-rotate-6 text-primary">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-dark text-sm uppercase tracking-wider mb-2">Address</h4>
                    <p className="text-gray-500 text-sm leading-loose font-medium">
                      {COMPANY_INFO.address.line1}<br />
                      {COMPANY_INFO.address.line2}<br />
                      {COMPANY_INFO.address.line3}<br />
                      {COMPANY_INFO.address.city} &ndash; {COMPANY_INFO.address.pincode}<br />
                      {COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group/item">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 group-hover/item:scale-110 group-hover/item:-rotate-6 text-primary">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-dark text-sm uppercase tracking-wider mb-2">Phone</h4>
                    {COMPANY_INFO.phone.map((p, i) => (
                      <p key={i} className="text-gray-500 text-sm font-medium mb-1">
                        <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">{p}</a>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-5 group/item">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 group-hover/item:scale-110 group-hover/item:-rotate-6 text-primary">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-dark text-sm uppercase tracking-wider mb-2">Email</h4>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-primary transition-colors">{COMPANY_INFO.email}</a>
                    </p>
                    <p className="text-gray-400 text-xs font-medium">For product inquiries, quotations and support</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group/item">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 group-hover/item:scale-110 group-hover/item:-rotate-6 text-primary">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-dark text-sm uppercase tracking-wider mb-2">Business Hours</h4>
                    <p className="text-gray-500 text-sm font-medium mb-1">Monday &ndash; Saturday: 9:00 AM &ndash; 6:00 PM IST</p>
                    <p className="text-gray-400 text-xs font-medium">Pan-India distribution and support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product categories quick nav */}
            <div className="bg-gradient-to-br from-primary to-green-600 rounded-3xl text-white p-10 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-colors duration-500"></div>
              <h4 className="font-black uppercase tracking-widest mb-6 text-lg drop-shadow-md relative z-10">Our Products</h4>
              <ul className="space-y-4 text-sm font-medium opacity-90 relative z-10">
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-white shadow-sm"></div> Concrete Polishing Systems (120cm, 90cm, 60cm)</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-white shadow-sm"></div> Chemicals: Densifiers &amp; Protecting Sealers</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-white shadow-sm"></div> Machines: Scrubber Dryers, Burnishing Machines</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-white shadow-sm"></div> Accessories: Edge Grinders, Floor Wipers, Sprayers</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30, rotateY: -15, z: -50 }} animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} transition={{ duration: 0.4, type: "spring" }} className="transform-gpu" style={{ transformStyle: "preserve-3d" }}>
            <div className="bg-white rounded-3xl p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group h-full flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none"></div>
              <h3 className="text-2xl font-black text-dark mb-8 uppercase tracking-wider flex items-center gap-3 relative z-10">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Send a Message
              </h3>

              {submitStatus === 'success' ? (
                <div className="bg-green-50/50 border-2 border-green-200 text-green-800 p-10 rounded-2xl text-center flex-1 flex flex-col justify-center items-center shadow-inner relative z-10">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_10px_20px_-5px_rgba(34,197,94,0.4)] text-white">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black mb-3 uppercase tracking-wide">Message Sent!</h4>
                  <p className="text-sm font-medium opacity-90 max-w-sm">Thank you for your inquiry. Our team has received your message and will get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-8 text-sm font-bold text-green-700 hover:text-white border-2 border-green-600 hover:bg-green-600 px-6 py-3 rounded-xl transition-all duration-300 uppercase tracking-wider"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-6 relative z-10 flex-1 flex flex-col" onSubmit={handleSubmit}>
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-bold flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                      Failed to send message. Please try again later.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-dark mb-2 uppercase tracking-widest opacity-80">First Name <span className="text-primary">*</span></label>
                      <input name="firstName" value={formData.firstName} onChange={handleChange} required type="text" className="w-full bg-gray-50 border-2 border-gray-100 px-5 py-4 rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-dark placeholder-gray-400" placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-dark mb-2 uppercase tracking-widest opacity-80">Last Name <span className="text-primary">*</span></label>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} required type="text" className="w-full bg-gray-50 border-2 border-gray-100 px-5 py-4 rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-dark placeholder-gray-400" placeholder="Your last name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-dark mb-2 uppercase tracking-widest opacity-80">Company Name</label>
                    <input name="company" value={formData.company} onChange={handleChange} type="text" className="w-full bg-gray-50 border-2 border-gray-100 px-5 py-4 rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-dark placeholder-gray-400" placeholder="Your company / organisation" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-dark mb-2 uppercase tracking-widest opacity-80">Email Address <span className="text-primary">*</span></label>
                    <input name="email" value={formData.email} onChange={handleChange} required type="email" pattern="^.+@.+$" title="Please include an '@' in the email address." className="w-full bg-gray-50 border-2 border-gray-100 px-5 py-4 rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-dark placeholder-gray-400" placeholder="your@email.com" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-dark mb-2 uppercase tracking-widest opacity-80">Phone <span className="text-primary">*</span></label>
                      <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" pattern="^\+91 \d{10}$" title="Please enter exactly 10 digits after +91 " className="w-full bg-gray-50 border-2 border-gray-100 px-5 py-4 rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-dark placeholder-gray-400" placeholder="+91 XXXXXXXXXX" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-dark mb-2 uppercase tracking-widest opacity-80">Subject <span className="text-primary">*</span></label>
                      <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-gray-50 border-2 border-gray-100 px-5 py-4 rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-dark cursor-pointer appearance-none">
                        <option value="">Select subject...</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="quotation">Request Quotation</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="partnership">Partnership / Distribution</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-1 min-h-[120px]">
                    <label className="block text-xs font-black text-dark mb-2 uppercase tracking-widest opacity-80">Message <span className="text-primary">*</span></label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full h-[calc(100%-28px)] bg-gray-50 border-2 border-gray-100 px-5 py-4 rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-dark placeholder-gray-400 resize-none" placeholder="Describe your requirements, project size, location..."></textarea>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white px-8 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-green-600 hover:shadow-[0_10px_25px_-5px_rgba(34,197,94,0.5)] transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 mt-auto"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <p className="text-gray-400 text-xs text-center mt-4 font-medium uppercase tracking-widest">
                      Your information is secure and encrypted
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
