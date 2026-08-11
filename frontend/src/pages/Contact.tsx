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
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          phone: '',
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
      <div className="bg-dark text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <motion.div initial={{ opacity: 0, x: -30, rotateY: 15, z: -50 }} animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} transition={{ duration: 0.4, type: "spring" }} className="space-y-6 transform-gpu" style={{ transformStyle: "preserve-3d" }}>
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-dark mb-6 uppercase tracking-wider">SmartGrit Polishing System</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm uppercase tracking-wider mb-1">Address</h4>
                    <p className="text-gray-600 text-sm leading-loose">
                      {COMPANY_INFO.address.line1}<br />
                      {COMPANY_INFO.address.line2}<br />
                      {COMPANY_INFO.address.line3}<br />
                      {COMPANY_INFO.address.city} &ndash; {COMPANY_INFO.address.pincode}<br />
                      {COMPANY_INFO.address.state}, {COMPANY_INFO.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm uppercase tracking-wider mb-1">Phone</h4>
                    {COMPANY_INFO.phone.map((p, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">{p}</a>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm uppercase tracking-wider mb-1">Email</h4>
                    <p className="text-gray-600 text-sm">
                      <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-primary transition-colors">{COMPANY_INFO.email}</a>
                    </p>
                    <p className="text-gray-500 text-xs mt-1">For product inquiries, quotations and support</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm uppercase tracking-wider mb-1">Business Hours</h4>
                    <p className="text-gray-600 text-sm">Monday &ndash; Saturday: 9:00 AM &ndash; 6:00 PM IST</p>
                    <p className="text-gray-500 text-xs mt-1">Pan-India distribution and support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product categories quick nav */}
            <div className="bg-primary text-white p-6">
              <h4 className="font-bold uppercase tracking-wider mb-3 text-sm">Our Products</h4>
              <ul className="space-y-1 text-sm opacity-90">
                <li>• Concrete Polishing Systems (120cm, 90cm, 60cm)</li>
                <li>• Chemicals: Densifiers &amp; Protecting Sealers</li>
                <li>• Machines: Scrubber Dryers, Burnishing Machines</li>
                <li>• Accessories: Edge Grinders, Floor Wipers, Sprayers</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30, rotateY: -15, z: -50 }} animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} transition={{ duration: 0.4, type: "spring" }} className="transform-gpu" style={{ transformStyle: "preserve-3d" }}>
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-dark mb-6 uppercase tracking-wider">Send a Message</h3>

              {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Message Sent Successfully!</h4>
                  <p className="text-sm">Thank you for your inquiry. Our team will get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-6 text-sm font-semibold text-green-700 hover:text-green-900"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
                      Failed to send message. Please try again later.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1 uppercase tracking-wide">First Name *</label>
                      <input name="firstName" value={formData.firstName} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-primary" placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1 uppercase tracking-wide">Last Name *</label>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-primary" placeholder="Your last name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1 uppercase tracking-wide">Company Name</label>
                    <input name="company" value={formData.company} onChange={handleChange} type="text" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-primary" placeholder="Your company / organisation" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1 uppercase tracking-wide">Email Address *</label>
                    <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-primary" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1 uppercase tracking-wide">Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-primary" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1 uppercase tracking-wide">Subject *</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white text-gray-600">
                      <option value="">Select subject...</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="quotation">Request Quotation</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="partnership">Partnership / Distribution</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1 uppercase tracking-wide">Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none" placeholder="Describe your requirements, project size, location..."></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <p className="text-gray-500 text-xs text-center">
                    Submit your inquiry and our team will get back to you shortly.
                  </p>
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
