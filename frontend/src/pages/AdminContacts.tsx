import { useFetchWithAuth } from '../hooks/useFetchWithAuth';
import { useState, useEffect } from 'react';
import { Mail, CheckCircle, Trash2 } from 'lucide-react';

interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminContacts = () => {
  const fetchWithAuth = useFetchWithAuth();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetchWithAuth(`${apiUrl}/api/contact`);
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await fetchWithAuth(`${apiUrl}/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Read' })
      });
      // Update local state
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'Read' } : m));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark">Contact Messages</h2>
        <p className="text-gray-500">Inquiries received from the website contact form.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-200px)] flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50 font-semibold text-gray-700 flex justify-between items-center">
            Inbox
            <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
              {messages.filter(m => m.status === 'New').length} New
            </span>
          </div>
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No contact messages yet.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {messages.map(msg => (
                  <li 
                    key={msg.id} 
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (msg.status === 'New') markAsRead(msg.id);
                    }}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === msg.id ? 'bg-green-50 border-l-4 border-primary' : 'border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-medium ${msg.status === 'New' ? 'text-dark font-bold' : 'text-gray-700'}`}>
                        {msg.first_name} {msg.last_name}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 truncate mb-1">{msg.subject}</p>
                    <p className="text-xs text-gray-500 truncate">{msg.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Message Detail View */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-[calc(100vh-200px)] overflow-y-auto">
          {selectedMessage ? (
            <div>
              <div className="border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-dark">{selectedMessage.subject}</h3>
                  {selectedMessage.status === 'Read' && (
                    <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                      <CheckCircle className="w-4 h-4" /> Read
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p><span className="font-semibold text-gray-800">From:</span> {selectedMessage.first_name} {selectedMessage.last_name}</p>
                    <p><span className="font-semibold text-gray-800">Email:</span> <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">{selectedMessage.email}</a></p>
                  </div>
                  <div>
                    <p><span className="font-semibold text-gray-800">Phone:</span> {selectedMessage.phone || 'N/A'}</p>
                    <p><span className="font-semibold text-gray-800">Company:</span> {selectedMessage.company || 'N/A'}</p>
                  </div>
                  <div className="col-span-2 text-xs text-gray-400 mt-2">
                    Received on {new Date(selectedMessage.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>

              <div className="mt-12 pt-6 border-t border-gray-100">
                <a 
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" /> Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Mail className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a message from the inbox to read it.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
