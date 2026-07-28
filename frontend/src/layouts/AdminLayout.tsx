import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Folders, FileText, Image, Users, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g. Supabase auth signout)
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white flex flex-col">
        <div className="p-6">
          <div className="bg-white p-2 rounded max-w-fit mb-1">
            <img src="/smart_grits_logo.png" alt="SmartGrit Logo" className="h-8 w-auto object-contain" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded hover:bg-gray-800 transition-colors">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link to="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded hover:bg-gray-800 transition-colors">
            <Folders className="w-5 h-5" /> Categories
          </Link>
          <Link to="/admin/quotes" className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded hover:bg-gray-800 transition-colors relative">
            <FileText className="w-5 h-5" /> Orders
            <span className="absolute right-4 bg-primary text-white text-xs px-2 py-0.5 rounded-full">3</span>
          </Link>
          <Link to="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded hover:bg-gray-800 transition-colors">
            <Users className="w-5 h-5" /> Customers
          </Link>
          <Link to="/admin/gallery" className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded hover:bg-gray-800 transition-colors">
            <Image className="w-5 h-5" /> Gallery
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded hover:bg-gray-800 transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 rounded hover:bg-red-900/50 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-dark">Welcome back, Admin</h1>
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
            A
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
