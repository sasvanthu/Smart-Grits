import { useFetchWithAuth } from '../hooks/useFetchWithAuth';
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Mail } from 'lucide-react';

interface Customer {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

const AdminCustomers = () => {
  const fetchWithAuth = useFetchWithAuth();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetchWithAuth(`${apiUrl}/api/customers`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch');
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer record?')) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await fetchWithAuth(`${apiUrl}/api/customers/${id}`, { method: 'DELETE' });
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customers CRM</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
          <Plus size={20} />
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 text-gray-600 font-semibold">Name & Company</th>
              <th className="text-left p-4 text-gray-600 font-semibold">Contact</th>
              <th className="text-left p-4 text-gray-600 font-semibold">Status</th>
              <th className="text-left p-4 text-gray-600 font-semibold">Added On</th>
              <th className="text-left p-4 text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr>
            ) : customers.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center">No customers found.</td></tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-800">{c.full_name}</div>
                    <div className="text-sm text-gray-500">{c.company_name || '-'}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1"><Mail size={14} /> {c.email}</div>
                    <div>{c.phone || '-'}</div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-3 items-center">
                    <button className="text-blue-500 hover:text-blue-700" title="Edit"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 size={18} /></button>
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

export default AdminCustomers;
