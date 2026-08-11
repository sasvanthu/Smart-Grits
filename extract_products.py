import docx
import json

doc = docx.Document(r'C:\Users\sasva\Downloads\Smart-Grits\product content.docx')

# Product boundaries based on headings
products = {
    "1. Densifier chemical applicator": {"start": 0},
    "2. Slurry wiper: SG-36": {"start": 67},
    "3. Toolbox": {"start": 120},
    "4. Microfiber Dry Mop": {"start": 126},
    "5. Lithium Densifier & Hardener": {"start": 156},
    "6. Sodium Silicate Concrete Densifier & Hardener": {"start": 184},
    "7. Concrete Sealer": {"start": 225},
    "8. Concrete floor cleaning chemical": {"start": 252},
}

paras = [p.text.strip() for p in doc.paragraphs]

starts = [0, 67, 120, 126, 156, 184, 225, 252, len(paras)]
names = [
    "Densifier Chemical Applicator",
    "Slurry Wiper SG-36",
    "Toolbox",
    "Microfiber Dry Mop",
    "Lithium Densifier & Hardener",
    "Sodium Silicate Concrete Densifier & Hardener",
    "Concrete Sealer",
    "Concrete Floor Cleaning Chemical",
]

for i, name in enumerate(names):
    section_paras = [p for p in paras[starts[i]:starts[i+1]] if p]
    print(f"\n{'='*60}")
    print(f"PRODUCT {i+1}: {name}")
    print('='*60)
    for j, p in enumerate(section_paras[:30]):
        print(f"  [{j}] {p[:200]}")
