import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

type SubLink = {
  to: string;
  label: string;
  subItems?: { to: string; label: string }[];
};

type NavItem = {
  to?: string;
  label: string;
  exact?: boolean;
  subLinks?: SubLink[];
};

const NAV_LINKS: NavItem[] = [
  { to: '/', label: 'Home', exact: true },
  { to: '/about', label: 'About' },
  { 
    label: 'Products', 
    subLinks: [
      { 
        to: '/products?category=accessories', 
        label: 'Accessories',
        subItems: [
          { to: '/products?category=accessories&item=densifier-applicator', label: 'Densifier Applicator' },
          { to: '/products?category=accessories&item=slurry-wiper', label: 'Slurry Wiper' },
          { to: '/products?category=accessories&item=tools-box', label: 'Tools Box' },
          { to: '/products?category=accessories&item=micro-fiber-mop', label: 'Micro Fiber Mop' },
          { to: '/products?category=accessories&item=velcro-holders', label: 'Velcro Holders' },
          { to: '/products?category=accessories&item=safty-shoes', label: 'Safty Shoes' },
          { to: '/products?category=accessories&item=safety-jocket', label: 'Safety Jocket' },
          { to: '/products?category=accessories&item=safety-helmet', label: 'Safety Helmet' },
        ]
      },
      { 
        to: '/products?category=chemicals', 
        label: 'Chemicals',
        subItems: [
          { to: '/products?category=chemicals&item=lithium-densifier', label: 'Lithium Densifier' },
          { to: '/products?category=chemicals&item=sodium-densifier', label: 'Sodium Densifier' },
          { to: '/products?category=chemicals&item=strine-proof-sealer', label: 'Strine Proof Sealer' },
          { to: '/products?category=chemicals&item=floor-cleaning-chemicals', label: 'Floor Cleaning Chemicals' },
          { to: '/products?category=chemicals&item=concrete-cleaner', label: 'Concrete Cleaner' },
          { to: '/products?category=chemicals&item=scrubbing-pad', label: 'Scrubbing Pad' },
          { to: '/products?category=chemicals&item=scrubbing-brush', label: 'Scrubbing Brush' },
        ]
      },
      { 
        to: '/products?category=polishing-tools', 
        label: 'Polishing Tools',
        subItems: [
          { to: '/products?category=polishing-tools&item=diamond-3-mm', label: 'Diamond 3 MM' },
          { to: '/products?category=polishing-tools&item=diamond-5-mm', label: 'Diamond 5 MM' },
          { to: '/products?category=polishing-tools&item=diamond-8-mm', label: 'Diamond 8 MM' },
          { to: '/products?category=polishing-tools&item=diamond-10-mm', label: 'Diamond 10 MM' },
          { to: '/products?category=polishing-tools&item=metal-tools', label: 'Metal Tools' },
        ]
      }
    ] 
  },
  { to: '/applications', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const location = useLocation();

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
              {NAV_LINKS.map((link) => {
                if (link.subLinks) {
                  const isActive = location.pathname.startsWith('/products');
                  return (
                    <div 
                      key={link.label} 
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-full ${isActive ? 'bg-primary/10 text-primary' : 'hover:text-primary text-gray-700 hover:bg-gray-100/50'}`}
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Desktop Dropdown Wrapper to prevent hover gap */}
                      <div className={`absolute top-full left-0 pt-2 w-56 transition-all duration-300 origin-top-left ${activeDropdown === link.label ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
                        <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl py-2">
                          {link.subLinks.map(sub => (
                          <div key={sub.label} className="relative group/sub">
                            <div className="flex items-center justify-between px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors uppercase tracking-wider">
                              <Link to={sub.to} onClick={() => setActiveDropdown(null)} className="flex-1">
                                {sub.label}
                              </Link>
                              {sub.subItems && (
                                <ChevronDown className="w-4 h-4 -rotate-90 group-hover/sub:rotate-0 transition-transform" />
                              )}
                            </div>
                            
                            {/* Nested Dropdown */}
                            {sub.subItems && (
                              <div className="absolute top-0 left-full pl-1 w-56 transition-all duration-300 opacity-0 scale-95 invisible pointer-events-none group-hover/sub:opacity-100 group-hover/sub:scale-100 group-hover/sub:visible group-hover/sub:pointer-events-auto origin-top-left -mt-2">
                                <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl py-2">
                                  {sub.subItems.map(item => (
                                    <Link
                                      key={item.label}
                                      to={item.to}
                                      onClick={() => setActiveDropdown(null)}
                                      className="block px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors uppercase tracking-wider"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={link.to}
                    to={link.to!}
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
                );
              })}
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
                {NAV_LINKS.map((link) => {
                  if (link.subLinks) {
                    const isActive = location.pathname.startsWith('/products');
                    const isExpanded = activeDropdown === link.label;
                    return (
                      <div key={link.label} className="space-y-1">
                        <button 
                          onClick={() => setActiveDropdown(isExpanded ? null : link.label)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-xl transition-colors ${isActive ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}
                        >
                          {link.label}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isExpanded && (
                          <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-50/50 rounded-xl mt-1">
                            {link.subLinks.map(sub => (
                              <div key={sub.label} className="space-y-1">
                                <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors uppercase tracking-wider">
                                  <Link to={sub.to} onClick={() => setIsOpen(false)} className="flex-1">
                                    {sub.label}
                                  </Link>
                                  {sub.subItems && (
                                    <button 
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setActiveSubDropdown(activeSubDropdown === sub.label ? null : sub.label);
                                      }}
                                      className="p-1"
                                    >
                                      <ChevronDown className={`w-4 h-4 transition-transform ${activeSubDropdown === sub.label ? 'rotate-180' : ''}`} />
                                    </button>
                                  )}
                                </div>
                                
                                {sub.subItems && activeSubDropdown === sub.label && (
                                  <div className="pl-4 pr-2 py-1 space-y-1 bg-white rounded-lg mt-1 shadow-inner">
                                    {sub.subItems.map(item => (
                                      <Link
                                        key={item.label}
                                        to={item.to}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2 text-xs font-semibold text-gray-500 hover:text-primary hover:bg-primary/5 rounded-md transition-colors uppercase tracking-wider"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to!}
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
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
