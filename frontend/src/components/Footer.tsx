import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/brochureData';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-6 block bg-white p-2 inline-block rounded max-w-fit">
              <img src="/smart_grits_logo.png" alt="SmartGrit Logo" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Premium Industrial Concrete Grinding & Polishing Solutions for global manufacturing and construction needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/applications" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/downloads" className="text-gray-400 hover:text-primary transition-colors">Download Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li>{COMPANY_INFO.address.line1}</li>
              <li>{COMPANY_INFO.address.line2}</li>
              <li>{COMPANY_INFO.address.line3}</li>
              <li>{COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}</li>
              <li>Phone: {COMPANY_INFO.phone.join(' / ')}</li>
              <li>Email: {COMPANY_INFO.email}</li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and products.</p>
            <form className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 sm:py-2 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary rounded-lg sm:rounded-none sm:rounded-l-lg"
              />
              <button 
                type="submit"
                className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-primary text-white font-semibold hover:bg-green-600 transition-colors rounded-lg sm:rounded-none sm:rounded-r-lg whitespace-nowrap"
              >
                Go
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SmartGrit Industrial Solutions. All rights reserved.</p>
          <p className="mt-2 text-xs">Formerly Kongrit Polishing System</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
