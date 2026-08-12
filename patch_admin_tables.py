import os
import glob

admin_dir = r"c:\Users\sasva\Downloads\Smart-Grits\frontend\src\pages"
files_to_patch = glob.glob(os.path.join(admin_dir, "Admin*.tsx"))

for filepath in files_to_patch:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace the typical wrapper
    # `<div className="bg-white rounded-lg shadow overflow-hidden">`
    # Also in AdminDashboard: `<div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">`
    # Also in AdminContacts: `<div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-200px)] flex flex-col">`

    # Instead of replacing all overflow-hidden, I'll target the ones near tables.
    # Actually, we can just replace 'overflow-hidden' with 'overflow-hidden overflow-x-auto' if it wraps a table.
    
    # Let's manually replace the common patterns
    content = content.replace('className="bg-white rounded-lg shadow overflow-hidden"', 'className="bg-white rounded-lg shadow overflow-x-auto"')
    content = content.replace('className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"', 'className="bg-white border border-gray-100 rounded-xl overflow-x-auto shadow-sm"')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Patched tables in {os.path.basename(filepath)}")
