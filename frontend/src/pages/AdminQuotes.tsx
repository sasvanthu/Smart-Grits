import { useState, useEffect } from 'react';
import { Eye, Trash2 } from 'lucide-react';

interface QuoteItem {
  quantity: number;
  products: { name: string };
}

interface Quote {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  status: string;
  remarks: string;
  created_at: string;
  quote_items: QuoteItem[];
}

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/quotes');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch');
      setQuotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch quotes:', err);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`http://localhost:5000/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchQuotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this order?')) return;
    try {
      await fetch(`http://localhost:5000/api/quotes/${id}`, { method: 'DELETE' });
      fetchQuotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 text-gray-600 font-semibold">Date</th>
              <th className="text-left p-4 text-gray-600 font-semibold">Customer</th>
              <th className="text-left p-4 text-gray-600 font-semibold">Items</th>
              <th className="text-left p-4 text-gray-600 font-semibold">Status</th>
              <th className="text-left p-4 text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr>
            ) : quotes.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center">No orders found.</td></tr>
            ) : (
              quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-600">{new Date(quote.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-800">{quote.full_name}</div>
                    <div className="text-sm text-gray-500">{quote.company_name}</div>
                    <div className="text-xs text-blue-500">{quote.email}</div>
                  </td>
                  <td className="p-4">
                    <ul className="text-sm text-gray-600">
                      {quote.quote_items?.map((item, idx) => (
                        <li key={idx}>{item.quantity}x {item.products?.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4">
                    <select 
                      value={quote.status}
                      onChange={(e) => updateStatus(quote.id, e.target.value)}
                      className={`text-sm rounded-full px-3 py-1 border font-medium ${
                        quote.status === 'New' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        quote.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-green-100 text-green-700 border-green-200'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quotation Sent">Quotation Sent</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="p-4 flex gap-3 items-center h-full">
                    <button className="text-gray-500 hover:text-gray-700" title="View Details"><Eye size={18} /></button>
                    <button onClick={() => handleDelete(quote.id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuotes;
