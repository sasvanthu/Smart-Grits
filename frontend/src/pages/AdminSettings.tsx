const AdminSettings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Settings dashboard placeholder. Admin configuration options will be implemented here.</p>
        
        <div className="mt-8 space-y-6 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" defaultValue="SmartGrit Industrial" className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input type="email" defaultValue="sales@smartgrit.com" className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-primary focus:border-primary" />
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
