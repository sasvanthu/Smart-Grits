import { useState, useEffect } from 'react';
import { Users, FileText, Package, Eye, X, Mail, Phone, Building, MessageSquare, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteItem {
  quantity: number;
  products: {
    name: string;
  };
}

interface QuoteRequest {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  remarks: string;
  created_at: string;
  status: string;
  quote_items: QuoteItem[];
}

interface Stats {
  totalProducts: number;
  newRequests: number;
  totalCustomers: number;
  websiteVisitors: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const [statsRes, quotesRes] = await Promise.all([
          fetch(`${apiUrl}/api/quotes/stats`),
          fetch(`${apiUrl}/api/quotes`)
        ]);
        const statsData = await statsRes.json();
        const quotesData = await quotesRes.json();
        
        setStats(statsData);
        setQuotes(quotesData);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      // Update local state
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote({ ...selectedQuote, status: newStatus });
      }
      
      // Update stats if it was 'New'
      if (newStatus !== 'New') {
         setStats(prev => prev ? ({...prev, newRequests: Math.max(0, prev.newRequests - 1)}) : prev);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-green-100 text-green-700';
      case 'Contacted': return 'bg-blue-100 text-blue-700';
      case 'Quotation Sent': return 'bg-purple-100 text-purple-700';
      case 'Confirmed': return 'bg-indigo-100 text-indigo-700';
      case 'Completed': return 'bg-teal-100 text-teal-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  const statCards = [
    { title: 'Total Products', value: stats?.totalProducts || 0, icon: Package, color: 'bg-blue-500' },
    { title: 'New Quote Requests', value: stats?.newRequests || 0, icon: FileText, color: 'bg-primary' },
    { title: 'Total Customers', value: stats?.totalCustomers || 0, icon: Users, color: 'bg-indigo-500' },
    { title: 'Website Visitors (M)', value: stats?.websiteVisitors || '0', icon: Eye, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark">Dashboard Overview</h2>
        <p className="text-gray-500">Summary of website activity and quote requests.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center">
            <div className={`${stat.color} w-14 h-14 rounded-full flex items-center justify-center text-white mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-dark">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotes.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-dark">{req.full_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{req.company_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(req.created_at)}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={req.status}
                      onChange={(e) => handleUpdateStatus(req.id, e.target.value)}
                      disabled={isUpdating}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border border-transparent hover:border-gray-200 cursor-pointer outline-none transition-colors ${getStatusColor(req.status)}`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quotation Sent">Quotation Sent</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedQuote(req)}
                      className="text-primary hover:text-green-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No quote requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Details Modal */}
      <AnimatePresence>
        {selectedQuote && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedQuote(null)}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-10">
                <div>
                  <h3 className="text-xl font-bold text-dark">Quote Request Details</h3>
                  <p className="text-sm text-gray-500">{formatDate(selectedQuote.created_at)}</p>
                </div>
                <button 
                  onClick={() => setSelectedQuote(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-8">
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 gap-4">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-700">Current Status:</span>
                  </div>
                  <select 
                    value={selectedQuote.status}
                    onChange={(e) => handleUpdateStatus(selectedQuote.id, e.target.value)}
                    disabled={isUpdating}
                    className={`px-3 py-1.5 text-sm font-bold rounded-lg border-none shadow-sm cursor-pointer outline-none ${getStatusColor(selectedQuote.status)}`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Quotation Sent">Quotation Sent</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Customer Info */}
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Customer Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0"><Users className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Full Name</p>
                        <p className="font-bold text-dark">{selectedQuote.full_name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0"><Building className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Company</p>
                        <p className="font-bold text-dark">{selectedQuote.company_name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-50 text-green-600 rounded-lg shrink-0"><Mail className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Email</p>
                        <a href={`mailto:${selectedQuote.email}`} className="font-bold text-primary hover:underline break-all">{selectedQuote.email}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0"><Phone className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Phone</p>
                        <a href={`tel:${selectedQuote.phone}`} className="font-bold text-dark hover:text-primary transition-colors">{selectedQuote.phone}</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                {selectedQuote.remarks && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Message / Remarks</h4>
                    <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex gap-3">
                      <MessageSquare className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selectedQuote.remarks}</p>
                    </div>
                  </div>
                )}

                {/* Requested Products */}
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Requested Products ({selectedQuote.quote_items?.length || 0})</h4>
                  {selectedQuote.quote_items && selectedQuote.quote_items.length > 0 ? (
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right w-24">Qty</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {selectedQuote.quote_items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-4 py-3 text-sm font-bold text-dark">{item.products?.name || 'Unknown Product'}</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-600 text-right">
                                <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-md">{item.quantity}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic bg-gray-50 p-4 rounded-xl text-center">No products requested in this quote.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
