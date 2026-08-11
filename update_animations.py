import os
import glob

pages_dir = r"C:\Users\sasva\Downloads\Smart-Grits\frontend\src\pages"
tsx_files = glob.glob(os.path.join(pages_dir, "*.tsx"))

replacements = {
    # Speed up transitions
    'duration: 0.8': 'duration: 0.4',
    'duration: 0.5': 'duration: 0.3',
    'delay: idx * 0.1': 'delay: idx * 0.05',
    'delay: idx * 0.08': 'delay: idx * 0.04',
    'delay: idx * 0.05': 'delay: idx * 0.03',
    'delay: i * 0.1': 'delay: i * 0.05',
    'delay: i * 0.08': 'delay: i * 0.04',
    'delay: i * 0.07': 'delay: i * 0.04',
    'delay: i * 0.05': 'delay: i * 0.03',
    
    # Trigger earlier
    'margin: "-50px"': 'margin: "0px"',
    'margin: "-100px"': 'margin: "-20px"',
    
    # Increase interactivity (hover scale and rotation)
    'scale: 1.05': 'scale: 1.08',
    'rotateX: 5, rotateY: -5': 'rotateX: 12, rotateY: -12',
    'rotateX: 10, rotateY: -10': 'rotateX: 15, rotateY: -15',
    'z: 20': 'z: 40',
    'z: 30': 'z: 50'
}

for filepath in tsx_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for old_str, new_str in replacements.items():
        content = content.replace(old_str, new_str)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(filepath)}")

print("Animation updates complete.")
