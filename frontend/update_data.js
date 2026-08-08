const fs = require('fs');
let content = fs.readFileSync('src/data/brochureData.ts', 'utf8');

content = content.replace(
  /\{\s*id:\s*'ch-1'[\s\S]*?specifications:\s*\{[\s\S]*?\}\s*,\s*\}/g,
  \{
    id: 'ch-1',
    name: 'Lithium Densifier & Hardener',
    slug: 'lithium-densifier',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: 'A Concrete Lithium Densifier & Hardener is a premium water-based chemical treatment formulated with lithium silicate. It is applied to cured concrete floors, where it penetrates deep into the concrete pores and chemically reacts with free lime (calcium hydroxide) to form Calcium Silicate Hydrate (C-S-H). This permanent reaction strengthens the concrete from within, eliminates dusting, improves abrasion resistance, and enhances the floor\\\\'s ability to achieve a high-gloss polish.',
    image: '/brochure-images/ai_lithium_densifier.png',
    features: [
      'Deep Penetration: Nano-sized lithium molecules penetrate deeper into the concrete',
      'Permanent Chemical Bond: Reacts with free lime to form additional C-S-H',
      'Dust-Proof Surface: Permanently binds loose cement particles',
      'Superior Durability: Significantly increases abrasion and impact resistance',
      'Improved Polishability: Creates a denser, smoother surface',
      'No Efflorescence: Minimizes the risk of whitening',
    ],
    specifications: {
      'Type': 'Lithium Silicate Densifier',
      'Form': 'Water-based chemical',
      'Application Method': 'Low-pressure sprayer / Microfiber pad',
      'Substrate': 'Cured concrete floors',
    },
  }\
);

content = content.replace(
  /\{\s*id:\s*'ch-2'[\s\S]*?specifications:\s*\{[\s\S]*?\}\s*,\s*\}/g,
  \{
    id: 'ch-2',
    name: 'Concrete Sealer',
    slug: 'concrete-sealer',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: 'A concrete sealer is a high-performance protective treatment designed to safeguard concrete surfaces from moisture, water penetration, oils, chemicals, salts, and other contaminants. By sealing the surface pores or penetrating deep into the concrete structure, it significantly improves durability, reduces maintenance, and extends the service life of concrete floors and pavements.',
    image: '/brochure-images/ai_concrete_sealer.png',
    features: [
      'Penetrating Sealers: Deep penetration and long-lasting protection',
      'Film-Forming Sealers: Excellent stain and chemical resistance',
      'Prevents freeze-thaw damage and efflorescence',
      'Enhances concrete color and provides a wet look',
      'Easy to clean and maintain',
    ],
    specifications: {
      'Type': 'Penetrating or Film-Forming Sealer',
      'Form': 'Water-Based or Solvent-Based',
      'Application': 'Driveways, bridges, parking areas, warehouses',
    },
  },
  {
    id: 'ch-3',
    name: 'Sodium Silicate Concrete Densifier & Hardener',
    slug: 'sodium-silicate-densifier',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: 'Sodium silicate, commonly known as water glass, is a cost-effective chemical hardener and densifier used to improve the strength and durability of concrete floors. It penetrates the concrete surface, reacts with free lime (calcium hydroxide), and forms a hard mineral structure that permanently strengthens the concrete from within.',
    image: '/brochure-images/ai_sodium_silicate.png',
    features: [
      'Chemical Reaction: Forms Calcium Silicate Hydrate (C-S-H)',
      'Deep Penetration: Absorbs into pores and capillary channels',
      'Permanent Protection: Integral part of the slab, will not peel',
      'Cost-effective compared to many topical sealers',
      'Eliminates concrete dusting and surface chalking',
    ],
    specifications: {
      'Type': 'Sodium Silicate Densifier',
      'Application': 'Warehouses, manufacturing plants, industrial facilities',
    },
  },
  {
    id: 'ch-4',
    name: 'Concrete Floor Cleaning Chemical',
    slug: 'floor-cleaning-chemical',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: 'Choosing the right chemical for a concrete floor depends on the specific type of dirt or stain. Routine cleaning requires alkaline or pH-neutral cleaners, while grease needs degreasers and rust or cement smears require mild acids.',
    image: '/brochure-images/ai_floor_cleaner.png',
    features: [
      'pH-Neutral Cleaners: Safe for daily or weekly mopping',
      'Mild Alkaline Detergents: Great for scrubbing unsealed floors',
      'Alkaline Degreasers: Best for breaking down stubborn oil',
      'Acid Cleaners: Dissolves deep-set rust stains',
      'Citrus-Based Solvents: Safer bio-based strippers',
    ],
    specifications: {
      'Type': 'Routine Cleaners & Heavy-Duty Stain Removers',
      'Application': 'Routine cleaning, grease removal, rust removal',
    },
  }\
);

content = content.replace(
  /\{\s*id:\s*'ac-5'[\s\S]*?specifications:\s*\{[\s\S]*?\}\s*,\s*\}/g,
  \{
    id: 'ac-5',
    name: 'Slurry Wiper SG-36',
    slug: 'slurry-wiper-sg36',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'The Smart Grits SG-36 Heavy-Duty Slurry Recovery Rubber Squeegee is specially engineered for the efficient collection and recovery of slurry generated during concrete grinding, polishing, wet diamond grinding, and stone surface treatment.',
    image: '/brochure-images/ai_slurry_squeegee.png',
    features: [
      'Specially designed for professional slurry recovery',
      'High-density replaceable rubber blade',
      'Heavy-duty coated stainless-steel handle',
      'Thick and durable plastic body',
      'Front guiding wheels for easy control',
    ],
    specifications: {
      'Type': 'Heavy-Duty Slurry Squeegee',
      'Blade': 'High-Density Rubber',
      'Application': 'Concrete grinding, wet diamond grinding',
    },
  }\
);

content = content.replace(
  /\{\s*id:\s*'ac-6'[\s\S]*?specifications:\s*\{[\s\S]*?\}\s*,\s*\}/g,
  \{
    id: 'ac-6',
    name: 'Densifier Chemical Applicator',
    slug: 'chemical-applicator',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'The SMART GRITS Floor Chemical Application Machine is a rugged, high-performance machine designed for the fast, precise, and uniform application of floor finishes, concrete densifiers, hardeners, and sealers. It provides a significantly faster alternative to conventional mop-and-bucket application methods.',
    image: '/brochure-images/ai_chemical_applicator.png',
    features: [
      'High Productivity up to 35,000 sq. ft./hour',
      'Precision Chemical Application with battery-powered pump',
      'Reduced Chemical Consumption by up to 30%',
      'Optional Spray Wand for difficult-to-reach areas',
      'Cleaner application with reduced splash and puddling',
    ],
    specifications: {
      'Type': 'Professional Floor Chemical Application Machine',
      'Widths': 'Available in 24-inch and 36-inch',
      'Productivity': 'Up to 35,000 sq. ft./hour (3,252 m²/hour)',
    },
  }\
);

content = content.replace(
  /\{\s*id:\s*'ac-7'[\s\S]*?specifications:\s*\{[\s\S]*?\}\s*,\s*\}/g,
  \{
    id: 'ac-7',
    name: 'Microfiber Dry Mop',
    slug: 'microfiber-dry-mop',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'The Smart Grits Microfiber Chemical Application Mop is specially designed for the professional application of concrete floor treatment chemicals. Made with high-quality microfiber material, it helps spread chemical solutions smoothly and uniformly across concrete floor surfaces.',
    image: '/brochure-images/ai_microfiber_dry_mop.png',
    features: [
      'High-Quality reusable Microfiber Mop',
      'Provides Smooth & Uniform Chemical Distribution',
      'Lightweight and easy to operate',
      'Reduces operator fatigue',
      'Ideal for large concrete floor areas',
    ],
    specifications: {
      'Type': 'Microfiber Application Mop',
      'Application': 'Densifiers, Hardeners & Sealers',
    },
  }\
);

content = content.replace(
  /\];\s*$/,
  \,
  {
    id: 'ac-10',
    name: 'Toolbox',
    slug: 'toolbox',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'This instructable embodies the principle of \\"portable workstations\\" because a toolbox allows you to work about anywhere by bringing your tools along with you. With 8 metal corners, and weatherproof wood glue, this toolbox can stand up to rough handling and a tough environment.',
    image: '/brochure-images/ai_toolbox.png',
    features: [
      'Portable workstation for tools',
      'Versatile and sturdy construction',
      '8 metal corners for durability',
      'Weatherproof construction',
    ],
    specifications: {
      'Type': 'Professional Toolbox',
      'Application': 'Transporting equipment and tools',
    },
  }
];
\
);

fs.writeFileSync('src/data/brochureData.ts', content, 'utf8');
