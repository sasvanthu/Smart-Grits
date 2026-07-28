// Central data file derived from Kongrit/SmartGrit Brochure - 17-10-22
// All product data, descriptions, and company info extracted from the official brochure.
// Company name updated from "Kongrit" to "SmartGrit".

export const COMPANY_INFO = {
  name: 'SmartGrit Polishing System',
  tagline: 'Grinding Tools · Polishing Tools · Polishing Systems',
  phone: ['+91 73388 82034', '+91 94885 50706'],
  email: 'info@smartgrit.in',
  website: 'www.smartgrit.in',
  address: {
    line1: 'No.5, Jayam Industrial Estate,',
    line2: 'Chettyar Agaram 1st Street,',
    line3: 'Opp to Ishwarya Apartments, Vanagaram,',
    city: 'Chennai',
    pincode: '600095',
    state: 'Tamil Nadu',
    country: 'India',
  },
  madeIn: 'India',
  founded: '2012',
};

export const ABOUT_CONTENT = {
  heading: 'About SmartGrit Polishing System',
  description: `SmartGrit Polishing System is a joint venture company between Kleanmax, Concrete Polishing Tools Company and EM&TS, Industrial Flooring Consultants.

Kleanmax was founded in 2012 primarily as a traditional floor polishing tools manufacturing for Mosaic, Marble & Granite Flooring Industry. We ventured into concrete floor polishing tools making with our vast experience in polishing backed by our R&D. We are positioned to supply and distribute our material in all over India along with technical support.

The idea is to provide optimised concrete polishing system for Industrial Concrete Flooring such as Factories, Warehouse and Commercial Buildings. We offer Ride On Trowel - Wet Polishing Systems, which is faster and economical compared to traditional polishing systems.`,
  finishTypes: ['Matt Finishing', 'Semi Glossy', 'Full Glossy'],
  vision: 'To provide an economical and faster Polishing system for Industrial concrete Floor',
  highlights: [
    'Make in INDIA',
    'Produced by a team dedicated to prompt, accurate customer service',
    'Consistent, high-quality products',
    'On-time, error-free shipments',
    'Prompt, accurate information and answers',
  ],
  productNote: `SmartGrit products are the result of over 11 years of research and development in abrasive products. This revolutionary technology allows users to achieve an outstanding concrete finish in fewer steps — and therefore at a lower cost — than with traditional finishing methods.`,
  productMaterial: `SmartGrit concrete grinding & polishing tools are made from a high-quality hard resin bond and qualified diamonds. They deliver excellent result and has a high shine, long life & low cost. It can even be used for both dry and wet polishing.`,
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  gallery?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  systemOptions?: SystemOption[];
}

export interface SystemOption {
  name: string;
  subtitle: string;
  gritSequence: string[];
  description: string;
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────

export const CATEGORIES = [
  {
    id: 'polishing-systems',
    name: 'Concrete Polishing Systems',
    slug: 'polishing-systems',
    description: 'Diamond polishing pads and grinding tools for power trowel application. Designed for industrial concrete flooring in factories, warehouses and commercial buildings.',
    image: '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.21 AM (1).jpeg',
  },
  {
    id: 'chemicals',
    name: 'Chemicals & Densifiers',
    slug: 'chemicals',
    description: 'Premium concrete hardeners, densifiers and protecting sealers. Lithium silicate-based formulations that penetrate and react with concrete to harden and dustproof the surface.',
    image: '/brochure-images/ai_chemical_jug.png',
  },
  {
    id: 'accessories',
    name: 'Machines & Accessories',
    slug: 'accessories',
    description: 'Full range of industrial floor care machines including edge grinders, scrubber dryers, burnishing machines, vacuum cleaners and cleaning accessories.',
    image: '/brochure-images/ai_ride_on_scrubber.png',
  },
];

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  // ── Polishing Systems ─────────────────────────────────────────────────────
  {
    id: 'ps-1',
    name: 'Concrete Polishing System — 120cm',
    slug: 'concrete-polishing-system-120cm',
    category: 'Concrete Polishing Systems',
    categorySlug: 'polishing-systems',
    description: `The 120cm SmartGrit Concrete Polishing System is specially designed for concrete flooring professionals and for industrial use. The system utilizes conventional power trowels — the discs are easily attached, removed and replaced. Place the clip holder, make a small cut in the specially designed pad and pull the clip of the disc through the clip holder. The pad and both parts of the disc are now fixed together. Attach the pad to the floating pan with the velcro attachment system and place it underneath the power trowel and you are ready to begin the process.`,
    image: '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.21 AM (1).jpeg',
    gallery: [
      '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.21 AM.jpeg',
      '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.24 AM (1).jpeg',
    ],
    features: [
      'Power trowel application (Ride On / Walk Behind)',
      'Fast & easy installation — 1000+ m² per day',
      'Increases profit margins for contractors',
      'Cost-effective and durable solution',
      'Compatible with standard floating pans via velcro attachment',
    ],
    specifications: {
      'Disc Size': '120 cm',
      'Application Type': 'Ride On Trowel / Power Trowel',
      'Polishing Types': 'Matt, Semi-Glossy, Full Glossy',
      'Coverage': '1000+ m² per day',
      'Concrete Strength': 'Min. 3,500 psi (24 MPa)',
      'Concrete Age': 'Min. 28 days',
    },
    systemOptions: [
      {
        name: 'Matt Finishing',
        subtitle: 'Satin Finish that reflects images from side Lights',
        gritSequence: ['G200/G400', 'D', 'G400/G800'],
        description: 'Prepare Power Trowel / Ride On Trowel with G200. Sprinkle water and start the grinding process, two passes in each direction. Check the floor surface and the slurry which is generated. If slurry is thick, add more water. Remove the slurry completely then clean with water before starting the next step of grinding. Use Only Scrubber Dryer to clean the concrete surface for better results. Make sure the concrete floor surface is completely clean without any dirt, then apply densifier based on manufacturer\'s recommended dosage. Allow the chemical to penetrate without any disturbance.',
      },
      {
        name: 'Semi Glossy',
        subtitle: 'Reflects overhead and Side Images from 35–45 feet with increased Light Reflectivity',
        gritSequence: ['G100', 'G200', 'D', 'G400', 'G800'],
        description: 'Prepare Power Trowel / Ride On Trowel with G100. Sprinkle water and start the grinding process, two passes in each direction. Check the floor surface and the slurry. Remove the slurry completely then clean with water before the next step. Prepare Power Trowel / Ride On Trowel with G200. Make sure the floor surface is completely clean then apply water and start the next grinding step. Do the same cleaning process again before starting the next process. Start Polishing with G400 & G800, two passes in each direction then clean.',
      },
      {
        name: 'Full Glossy',
        subtitle: 'High Glossy Finish that will Look Wet and Show Mirror-Like Reflections',
        gritSequence: ['G50', 'G100', 'G200', 'D', 'G400', 'G800', 'G1500', 'S', 'G3000'],
        description: 'Prepare Power Trowel / Ride On Trowel with G100. Sprinkle water and start the grinding process, two passes in each direction. Clean & check the floor surface then grind with G200. Make sure the Concrete floor surface is completely clean without any dirt, apply densifier based on manufacturer\'s recommended dosage. Allow the chemical to penetrate without any disturbance. Start Polishing with G400, G800, G1500, then clean the floor surface, apply Sealer coat and start final polishing with G3000.',
      },
    ],
  },
  {
    id: 'ps-2',
    name: 'Concrete Polishing System — 90cm',
    slug: 'concrete-polishing-system-90cm',
    category: 'Concrete Polishing Systems',
    categorySlug: 'polishing-systems',
    description: 'The 90cm SmartGrit Concrete Polishing System brings the same professional-grade results as our larger models, optimised for mid-size industrial spaces and tighter working areas. Compatible with standard power trowels through the proven velcro attachment system.',
    image: '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.24 AM.jpeg',
    features: [
      'Compact 90cm form factor for mid-size areas',
      'Power trowel application (Walk Behind)',
      'Fast & easy installation',
      'Compatible with standard floating pans',
      'Suitable for all finish levels: Matt, Semi-Glossy, Full Glossy',
    ],
    specifications: {
      'Disc Size': '90 cm',
      'Application Type': 'Power Trowel / Walk Behind',
      'Polishing Types': 'Matt, Semi-Glossy, Full Glossy',
      'Concrete Strength': 'Min. 3,500 psi (24 MPa)',
      'Concrete Age': 'Min. 28 days',
    },
  },
  {
    id: 'ps-3',
    name: 'Concrete Polishing System — 60cm',
    slug: 'concrete-polishing-system-60cm',
    category: 'Concrete Polishing Systems',
    categorySlug: 'polishing-systems',
    description: 'The compact 60cm SmartGrit Concrete Polishing System is ideal for smaller commercial spaces, detailed work, and areas requiring precision finishing. Lightweight yet powerful, it delivers the same consistent diamond-quality finish as larger systems.',
    image: '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.22 AM (2).jpeg',
    features: [
      'Compact 60cm — ideal for smaller spaces and detail work',
      'Lightweight and maneuverable',
      'Same diamond quality as larger systems',
      'Cost-effective for smaller projects',
      'All finish levels supported',
    ],
    specifications: {
      'Disc Size': '60 cm',
      'Application Type': 'Walk Behind Trowel',
      'Polishing Types': 'Matt, Semi-Glossy, Full Glossy',
      'Concrete Strength': 'Min. 3,500 psi (24 MPa)',
      'Concrete Age': 'Min. 28 days',
    },
  },

  // ── Chemicals ─────────────────────────────────────────────────────────────
  {
    id: 'ch-1',
    name: 'SmartGrit Concrete Densifier',
    slug: 'concrete-densifier',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: `Lithium silicate is a chemical compound used on concrete surfaces to enhance durability, strength, and longevity. When applied to the floor, it penetrates the surface and reacts with free lime particles (through alkali-silica reaction) to help protect the concrete from damage.

SmartGrit densifier and chemical hardener compound is a proprietary, water-based, ready-to-use, clear silicate liquid, formulated with chemically reactive raw materials to harden and dustproof concrete.`,
    image: '/brochure-images/ai_chemical_jug.png',
    gallery: ['/brochure-images/ai_chemical_jug.png'],
    features: [
      'Penetrates concrete surface to react with free lime',
      'Reduces abrasion wear significantly',
      'Binds dust particles — dustproofs the floor',
      'Water-based, ready-to-use formulation',
      'Produces a denser, harder concrete surface',
      'Chemical reaction: Calcium Hydroxide → Calcium Silicate Hydrate (CSH)',
    ],
    specifications: {
      'Type': 'Lithium Silicate Densifier',
      'Form': 'Water-based clear liquid',
      'Application Method': 'Microfiber Mop / Sprayer',
      'Substrate': 'Concrete (min. 28 days old)',
      'Recommended Dosage': 'Per Manufacturer Specification',
    },
  },
  {
    id: 'ch-2',
    name: 'SmartGrit Protecting Sealer',
    slug: 'protecting-sealer',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: `Sealers are a film-forming topical application usually made up of acrylics, epoxies, urethanes, and waxes. Sealers can chip or peel off over time and will usually need to be re-applied.

Depending on your floor goals, requirements, and your Industry, SmartGrit will recommend the best type of sealer for your project. Softer, more porous concrete may require multiple additional coats of sealer.`,
    image: '/brochure-images/ai_chemical_jug.png',
    features: [
      'Film-forming protective topical coating',
      'Available in acrylics, epoxies, urethanes and wax formulations',
      'Recommended based on your industry and floor condition',
      'Provides extra protection from water penetration and staining',
      'Suitable for all finish levels (Matt, Semi-Glossy, Full Glossy)',
    ],
    specifications: {
      'Type': 'Protecting Sealer / Topical Coating',
      'Form': 'Liquid (clear)',
      'Application Method': 'Microfiber Mop / Sprayer',
      'Re-Application': 'As required',
      'Substrate': 'Polished Concrete',
    },
  },

  // ── Accessories / Machines ────────────────────────────────────────────────
  {
    id: 'ac-1',
    name: 'Edge Grinding Machine',
    slug: 'edge-grinding-machine',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'Edge Grinder is equipment to grind all around the columns, walls and machine foundation edges. It\'s a walk-behind machine with a small grinding head, so it can reach the edges that large ride-on equipment cannot access. Essential for achieving a uniform finish throughout the entire floor area.',
    image: '/brochure-images/ai_edge_grinding_machine.png',
    features: [
      'Grinds around columns, walls and machine foundation edges',
      'Walk-behind design for maximum maneuverability',
      'Small grinding head reaches tight corners and edges',
      'Essential companion to larger trowel systems',
      'Compatible with SmartGrit diamond tools',
    ],
    specifications: {
      'Type': 'Walk Behind Edge Grinder',
      'Application': 'Edges, columns, walls, machine foundations',
      'Operation': 'Walk Behind',
    },
  },
  {
    id: 'ac-2',
    name: 'Ride On Scrubber Dryer',
    slug: 'ride-on-scrubber-dryer',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'Scrubber dryer is a cleaning machine that can be used to efficiently and effectively clean floors, replacing traditional mops and buckets. They work to apply cleaning solution and aggressively scrub and dry surfaces in one pass. Operator sits on the machine for maximum coverage and speed across large industrial floor areas.',
    image: '/brochure-images/ai_ride_on_scrubber.png',
    features: [
      'Single-pass scrubbing and drying action',
      'Replaces traditional mops and buckets',
      'Operator seated for large area coverage',
      'Applies cleaning solution automatically',
      'Aggressively scrubs and dries simultaneously',
    ],
    specifications: {
      'Type': 'Ride On Scrubber Dryer',
      'Operation': 'Ride On (Seated Operator)',
      'Application': 'Industrial floor cleaning, slurry removal',
    },
  },
  {
    id: 'ac-3',
    name: 'Auto Scrubber Dryer',
    slug: 'auto-scrubber-dryer',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'These machines, also called pedestrian scrubber-dryers, are operated by the user who stands behind the unit and holds the handle to guide the scrubbing machine while walking along behind it. Available with and without traction options to suit different floor conditions.',
    image: '/brochure-images/ai_auto_scrubber.png',
    features: [
      'Walk-behind pedestrian operation',
      'Available with or without traction',
      'Handles guide machine with precision control',
      'Suitable for medium-sized areas',
      'Efficient floor scrubbing and drying',
    ],
    specifications: {
      'Type': 'Pedestrian / Auto Scrubber Dryer',
      'Operation': 'Walk Behind',
      'Traction': 'With or without traction options',
    },
  },
  {
    id: 'ac-4',
    name: 'Vacuum Cleaner',
    slug: 'vacuum-cleaner',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'Vacuum Cleaner Machine is a device that causes suction in order to remove slurry from Concrete floors. This is walk-behind machine which is having a suction head and hose which is connected to container for saving the slurry. An essential tool for clean, dust-free concrete floor preparation.',
    image: '/brochure-images/ai_industrial_vacuum.png',
    features: [
      'Powerful suction removes slurry from concrete floors',
      'Walk-behind design for full floor access',
      'Suction head and hose connected to collection container',
      'Saves slurry for proper disposal',
      'Essential for dust containment during dry polishing',
    ],
    specifications: {
      'Type': 'Industrial Vacuum Cleaner',
      'Operation': 'Walk Behind',
      'Application': 'Slurry removal from concrete floors',
    },
  },
  {
    id: 'ac-5',
    name: 'Floor Wiper',
    slug: 'floor-wiper',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'Heavy duty floor wipers are used to clean slurry. Its sharp rubber blade creates a tight grip on the surface that helps to easily move liquid and leave a dry surface. Designed for heavy industrial use in concrete polishing applications.',
    image: '/brochure-images/ai_floor_wiper.png',
    features: [
      'Heavy-duty construction for industrial use',
      'Sharp rubber blade creates tight surface grip',
      'Easily moves liquid leaving a dry surface',
      'Effective slurry removal tool',
      'Essential companion for wet polishing operations',
    ],
    specifications: {
      'Type': 'Heavy Duty Floor Wiper',
      'Blade': 'Sharp Rubber',
      'Application': 'Slurry & liquid removal',
    },
  },
  {
    id: 'ac-6',
    name: 'Chemical Sprayer',
    slug: 'chemical-sprayer',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'Chemical sprayers help you evenly disperse your necessary yard chemicals so you\'re not coming into direct skin-to-skin contact with these harmful substances. Designed for precise and even application of densifiers, sealers and other concrete treatment chemicals.',
    image: '/brochure-images/ai_chemical_sprayer.png',
    features: [
      'Even chemical dispersion for consistent application',
      'Protects operator from direct chemical contact',
      'Suitable for densifiers, sealers and other treatments',
      'Backpack design for comfortable extended use',
      'SmartGrit branded unit available',
    ],
    specifications: {
      'Type': 'Backpack Chemical Sprayer',
      'Application': 'Densifiers, sealers, cleaning chemicals',
      'Brand': 'SmartGrit',
    },
  },
  {
    id: 'ac-7',
    name: 'Microfiber Mop',
    slug: 'microfiber-mop',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'The wet microfiber mop is used to apply densifier or sealer on the concrete floor surface. A microfiber pad has the same surface area as a cotton cloth four times as large, it absorbs the liquids and helps to apply evenly on the surface of the floor.',
    image: '/brochure-images/ai_microfiber_mop.png',
    features: [
      'Ideal for applying densifiers and sealers',
      '4x surface area compared to cotton cloth',
      'Superior liquid absorption and even application',
      'Microfiber technology for lint-free results',
      'Reduces chemical waste through even spread',
    ],
    specifications: {
      'Type': 'Wet Microfiber Mop',
      'Application': 'Densifier / Sealer application on concrete',
      'Advantage': '4x surface area of cotton cloth',
    },
  },
  {
    id: 'ac-8',
    name: 'Burnishing Machine',
    slug: 'burnishing-machine',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: 'A burnisher is a high-speed machine that spins at 1,500 to 2,000 RPMs. These units are used for polishing your hard floors. Due to the faster rotations, the burnisher creates friction on your floor, which in turn produces the highly desirable "wet look" shine. The burnished concrete process involves utilizing a high-speed burnisher to fill the concrete\'s pores with an applied chemical, which then heats and buffs the topical coating into the concrete surface.',
    image: '/brochure-images/ai_burnishing_machine.png',
    features: [
      'High-speed operation at 1,500 to 2,000 RPMs',
      'Produces highly desirable "wet look" shine',
      'Creates friction to buff topical coating into surface',
      'Fills concrete pores with applied chemical',
      'Final step in achieving mirror-like reflections',
    ],
    specifications: {
      'Type': 'High-Speed Burnishing Machine',
      'Speed': '1,500 – 2,000 RPM',
      'Application': 'Final polishing and burnishing of hard floors',
    },
  },
];

// ─── CLIENTS ─────────────────────────────────────────────────────────────────

export const CLIENTS = [
  { name: 'KIA Motors', logo: '/brochure-images/page_08_img_2.jpeg' },
  { name: 'CEAT', logo: '/brochure-images/page_08_img_3.png' },
  { name: 'ESR', logo: '/brochure-images/page_08_img_4.jpeg' },
  { name: 'Peekay Steel', logo: '/brochure-images/page_08_img_5.jpeg' },
  { name: 'KisanKraft', logo: '/brochure-images/page_08_img_6.jpeg' },
  { name: 'POCL', logo: '/brochure-images/page_08_img_7.jpeg' },
  { name: 'IKEA', logo: '/brochure-images/page_08_img_8.jpeg' },
  { name: 'IRCC', logo: '/brochure-images/page_08_img_9.jpeg' },
  { name: 'Mourya Aquex', logo: '/brochure-images/page_08_img_10.jpeg' },
  { name: 'AKG', logo: '/brochure-images/page_08_img_11.jpeg' },
  { name: 'Sprint', logo: '/brochure-images/page_08_img_12.jpeg' },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: 'proj-1',
    name: 'KIA Motors India Pvt Ltd',
    location: 'Andhra Pradesh, India',
    description: 'Full Glossy polished concrete flooring for the KIA Motors manufacturing facility. A massive industrial project delivering mirror-like reflective floors across the entire factory floor area, enhancing both aesthetics and safety through superior slip resistance.',
    image: '/brochure-images/ai_polished_concrete_floor.png',
    finishType: 'Full Glossy',
    application: 'Automotive Manufacturing Plant',
  },
  {
    id: 'proj-2',
    name: 'Peekay Steels Castings Pvt Ltd',
    location: 'Hindupur, Andhra Pradesh, India',
    description: 'Semi-Glossy polished concrete flooring for the Peekay Steels Castings manufacturing and warehouse facility. The polished concrete reduces maintenance costs significantly while providing a durable, dust-free surface ideal for heavy steel manufacturing operations.',
    image: '/brochure-images/ai_ride_on_trowel_1.png',
    finishType: 'Semi Glossy',
    application: 'Steel Castings Manufacturing',
  },
];

// ─── POLISHED CONCRETE INFO ────────────────────────────────────────────────────

export const POLISHED_CONCRETE = {
  heading: 'Polished Concrete',
  description: 'Polished Concrete is a multi-step mechanical grinding & polishing process that utilizes industrial heavy-duty machines equipped with diamond segmented abrasives used to grind down concrete surfaces to the desired degree of shine and smoothness.',
  methods: [
    {
      name: 'Dry Polishing',
      description: 'Dry Polishing requires no water. Instead, contractors use machines equipped with dust containment systems that eliminate virtually all of the mess. Typically, dry polishing is used for the initial grinding steps, when more concrete is being removed.',
    },
    {
      name: 'Wet Polishing',
      description: 'Wet polishing uses water to cool the diamond abrasives and eliminate grinding dust. Because the water reduces friction and acts as a lubricant, it increases the life of the polishing abrasives.',
    },
  ],
  advantages: [
    { title: 'Elimination of Dusting', description: 'Due to free lime — Reduces the porosity of the floor in conjunction with densifier.' },
    { title: 'Better Lighting', description: 'Reflectivity of the floor — Can reduce lighting costs.' },
    { title: 'Slip Resistance', description: 'Higher degree of polish is not directly related to slip resistance — Polished may look as smooth as glass, but they are completely safe to walk.' },
    { title: 'Less Maintenance', description: 'Reduced penetration of contaminants, remain on surface — No sealing, waxing or stripping of floor required — No aggressive scrubbing required.' },
    { title: 'Reduced Tire Wear', description: 'Smoother concrete surface can significantly reduce tire wear.' },
    { title: 'Cost Effective', description: 'Low maintenance costs — No replacement costs as with specialty flooring systems — Minimal maintenance required to preserve the appearance of the floor.' },
  ],
  properties: ['Affordable', 'Durable', 'Lasting', 'Environmentally Friendly', 'Dust Free', 'Low Maintenance', 'Non-Slip', 'Reflective'],
  applications: ['Warehouses', 'Logistics Parks', 'Industrial Factory Buildings', 'Shopping Malls & Offices', 'Museums', 'Conventional Centres'],
};
