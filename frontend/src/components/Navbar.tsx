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


      <header className="fixed top-0 w-full z-50 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex justify-between items-center h-16 px-6 bg-gradient-to-r from-white/95 via-neutral-100/90 to-white/80 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/20 rounded-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col">
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
                  onClick={() => {
                    if (link.to === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
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
          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="px-4 py-3 space-y-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.exact}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-xl transition-colors ${
                        isActive ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
