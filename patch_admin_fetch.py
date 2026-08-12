import os
import re

admin_dir = r"c:\Users\sasva\Downloads\Smart-Grits\frontend\src\pages"
files_to_patch = [
    "AdminDashboard.tsx",
    "AdminProducts.tsx",
    "AdminCategories.tsx",
    "AdminCustomers.tsx",
    "AdminQuotes.tsx",
    "AdminContacts.tsx"
]

for filename in files_to_patch:
    filepath = os.path.join(admin_dir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Check if already patched
    if "useFetchWithAuth" in content:
        continue

    # Add import at the top
    content = "import { useFetchWithAuth } from '../hooks/useFetchWithAuth';\n" + content
    
    # Add const fetchWithAuth = useFetchWithAuth(); at the beginning of the component
    # We find the component declaration: const Admin... = () => {
    component_pattern = rf"(const {filename.split('.')[0]} = \([^)]*\) => {{)"
    replacement = r"\1\n  const fetchWithAuth = useFetchWithAuth();\n"
    content = re.sub(component_pattern, replacement, content)
    
    # Replace fetch(...) with fetchWithAuth(...)
    # We need to make sure we don't match something else.
    # We match: await fetch( or just fetch(
    content = content.replace("await fetch(", "await fetchWithAuth(")
    content = content.replace("fetch(", "fetchWithAuth(")
    
    # Fix the duplicate fetchWithAuth we just created when we replaced fetchCategories() etc, no wait
    # fetchCategories() doesn't contain '(' after fetch!
    # "fetch(" only matches the fetch API.
    # Ah, but fetchCategories() will become fetchWithAuthCategories() ? No, "fetch(" requires the open parenthesis immediately after "fetch".
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Patched {filename}")
