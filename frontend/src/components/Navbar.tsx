import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/applications', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Keep for any future scroll logic if needed, but not used for navbar styling anymore
  }, []);

  return (
    <>


      <header className="fixed top-0 w-full z-50 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 px-6 bg-white/90 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/20 rounded-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex flex-col">
                <img src="/smart_grits_logo.png" alt="SmartGrit Logo" className="h-12 w-auto object-contain" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex space-x-1 items-center">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-full ${
                      isActive ? 'bg-primary/10 text-primary' : 'hover:text-primary text-gray-700 hover:bg-gray-100/50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile: hamburger */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-primary focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 text-sm font-semibold uppercase tracking-wider border-l-2 transition-colors ${
                      isActive ? 'text-primary border-primary bg-primary/5' : 'text-gray-600 border-transparent hover:text-primary hover:border-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
