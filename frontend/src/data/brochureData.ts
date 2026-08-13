// Central data file derived from SmartGrit Brochure - 17-10-22
// All product data, descriptions, and company info extracted from the official brochure.

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
  {
    id: 'ac-9',
    name: 'Densifier Chemical Applicator',
    slug: 'densifier-chemical-applicator',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: `The Densifier Chemical Applicator is a precision tool designed for the uniform and efficient application of concrete densifiers, hardeners, and sealers across industrial floor surfaces. Engineered for professional concrete polishing workflows, it ensures even chemical distribution with minimal waste and maximum penetration.

The applicator's ergonomic design reduces operator fatigue during large-area applications, while its controlled flow mechanism prevents pooling and over-saturation, which are common causes of uneven curing and surface residue.`,
    image: '/brochure-images/ai_chemical_applicator.png',
    gallery: ['/brochure-images/ai_chemical_applicator.png'],
    features: [
      'Precision flow control for uniform chemical distribution',
      'Ergonomic design reduces operator fatigue',
      'Compatible with lithium densifiers, sodium silicate, and sealers',
      'Prevents pooling and over-saturation',
      'Durable construction for heavy industrial use',
      'Suitable for large-area industrial floor applications',
    ],
    specifications: {
      'Type': 'Chemical Applicator / Spreader',
      'Application': 'Densifiers, Hardeners, Sealers',
      'Operation': 'Manual / Walk-Behind',
      'Substrate': 'Concrete Floors',
    },
  },
  {
    id: 'ac-10',
    name: 'Slurry Wiper SG-36',
    slug: 'slurry-wiper-sg36',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: `The SmartGrit Slurry Wiper SG-36 is a heavy-duty floor cleaning tool specifically engineered for the removal of concrete slurry generated during wet grinding and polishing operations. Its wide 36-inch blade ensures rapid clearance of large floor areas, significantly reducing cleaning time between polishing steps.

The SG-36 features a sharp, industrial-grade rubber blade that creates a firm vacuum seal against the floor surface, effectively channeling slurry into a manageable stream for collection. The robust frame and ergonomic handle provide maximum control and durability across intensive daily use in industrial environments.`,
    image: '/brochure-images/ai_slurry_squeegee.png',
    gallery: ['/brochure-images/ai_slurry_squeegee.png'],
    features: [
      '36-inch wide blade for fast, large-area slurry removal',
      'Industrial-grade rubber blade creates firm floor seal',
      'Robust frame for intensive daily industrial use',
      'Ergonomic handle for maximum operator control',
      'Essential for wet grinding and polishing operations',
      'Channels slurry efficiently for easy vacuum collection',
    ],
    specifications: {
      'Model': 'SG-36',
      'Blade Width': '36 inches',
      'Blade Type': 'Industrial-Grade Rubber',
      'Operation': 'Manual / Walk-Behind',
      'Application': 'Concrete slurry removal during wet polishing',
    },
  },
  {
    id: 'ac-11',
    name: 'SmartGrit Toolbox',
    slug: 'toolbox',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: `The SmartGrit Toolbox is a comprehensive, job-site-ready storage and carrying solution designed for concrete polishing professionals. It organizes and protects the essential hand tools, accessories, and small components required across every stage of a concrete polishing project — from surface preparation through final finishing.

Built with heavy-duty materials to withstand the demanding conditions of industrial job sites, the SmartGrit Toolbox keeps your team's critical tools secure, organized, and immediately accessible. Its structured internal layout accommodates diamond tools, applicator accessories, measuring instruments, and maintenance components.`,
    image: '/brochure-images/ai_toolbox.png',
    gallery: ['/brochure-images/ai_toolbox.png'],
    features: [
      'Heavy-duty construction for industrial job-site durability',
      'Structured internal layout for organized tool storage',
      'Accommodates diamond tools, applicators and accessories',
      'Secure locking mechanism protects valuable components',
      'Ergonomic carry handle for easy transport between job areas',
      'Keeps all essential polishing accessories immediately accessible',
    ],
    specifications: {
      'Type': 'Professional Tool Storage',
      'Build': 'Heavy-Duty Industrial Grade',
      'Application': 'Concrete polishing job-site accessory management',
    },
  },
  {
    id: 'ac-12',
    name: 'Microfiber Dry Mop',
    slug: 'microfiber-dry-mop',
    category: 'Machines & Accessories',
    categorySlug: 'accessories',
    description: `The SmartGrit Microfiber Dry Mop is an essential finishing and maintenance tool for polished concrete floors. Designed for dry application, it efficiently collects fine dust, loose particles, and surface debris without the need for water or chemical agents — making it perfect for both pre-polishing preparation and post-polishing maintenance.

The microfiber pad technology generates a static charge that actively attracts and traps fine particles, preventing them from being redistributed across the floor surface. With a surface area several times greater than conventional cotton mops, it covers large industrial floor areas in fewer passes, improving productivity and floor cleanliness.`,
    image: '/brochure-images/ai_microfiber_dry_mop.png',
    gallery: ['/brochure-images/ai_microfiber_dry_mop.png'],
    features: [
      'Microfiber technology generates static charge to trap fine dust',
      'Dry application — no water or chemicals required',
      'Large surface area for fast coverage of industrial floor areas',
      'Prevents dust redistribution across polished surfaces',
      'Ideal for pre-polishing prep and post-polishing maintenance',
      'Machine washable pad for long service life',
    ],
    specifications: {
      'Type': 'Microfiber Dry Mop',
      'Application': 'Dry dust collection on polished concrete',
      'Pad Material': 'High-density microfiber',
      'Operation': 'Manual / Walk-Behind',
    },
  },
  {
    id: 'ch-3',
    name: 'Lithium Densifier & Hardener',
    slug: 'lithium-densifier-hardener',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: `Lithium Silicate Densifier & Hardener is a premium, penetrating chemical treatment engineered to permanently increase the density, hardness, and abrasion resistance of concrete floors. When applied to the concrete surface, the lithium silicate solution penetrates deep into the substrate and reacts chemically with free lime (calcium hydroxide) to form Calcium Silicate Hydrate (C-S-H) — the same compound that gives concrete its structural strength.

Unlike sodium silicate-based products, lithium silicate formulations produce a significantly smaller molecular structure that penetrates deeper into the concrete, delivers faster chemical reactivity, and leaves minimal surface residue. The result is a permanently hardened, dust-free, and highly polishable concrete surface.`,
    image: '/brochure-images/ai_lithium_densifier.png',
    gallery: ['/brochure-images/ai_lithium_densifier.png'],
    features: [
      'Deep penetration: smaller molecular structure than sodium silicate',
      'Chemically reacts with free lime to form C-S-H — permanent hardening',
      'Eliminates concrete dusting and surface chalking',
      'Increases abrasion and impact resistance for heavy traffic',
      'Improves polishability — produces higher gloss and better shine retention',
      'Minimal surface residue compared to sodium silicate products',
      'Low maintenance — reduces wear and extends floor service life',
    ],
    specifications: {
      'Type': 'Lithium Silicate Densifier & Hardener',
      'Form': 'Water-based clear liquid',
      'Application Method': 'Low-pressure sprayer, microfiber pad or soft broom',
      'Reaction': 'Ca(OH)₂ + SiO₂ → C-S-H (Calcium Silicate Hydrate)',
      'Substrate': 'Concrete (min. 28 days old)',
      'Wet Time': '15–20 minutes',
    },
  },
  {
    id: 'ch-4',
    name: 'Sodium Silicate Densifier & Hardener',
    slug: 'sodium-silicate-densifier',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: `Sodium Silicate Densifier & Hardener, commonly known as water glass, is a proven, cost-effective chemical hardener used to improve the strength, durability, and dust resistance of concrete floors. It penetrates the concrete surface and reacts with free calcium hydroxide (lime) to form Calcium Silicate Hydrate (C-S-H) — the primary compound responsible for concrete's compressive strength.

The newly formed C-S-H crystals fill microscopic pores and capillary channels within the concrete matrix, creating a permanently denser, harder surface. Since the reaction occurs inside the concrete, the treatment becomes an integral part of the slab and will not peel, chip, or flake like surface coatings.`,
    image: '/brochure-images/ai_sodium_silicate.png',
    gallery: ['/brochure-images/ai_sodium_silicate.png'],
    features: [
      'Reacts with calcium hydroxide to form permanent C-S-H crystals',
      'Fills microscopic pores — creates a denser, harder surface',
      'Eliminates concrete dusting and surface chalking',
      'Increases abrasion resistance for heavy pedestrian and forklift traffic',
      'Reduces water absorption and improves oil/chemical resistance',
      'Permanent treatment — will not peel, chip or flake',
      'Cost-effective base treatment for polished concrete projects',
    ],
    specifications: {
      'Type': 'Sodium Silicate Densifier & Hardener',
      'Common Name': 'Water Glass',
      'Form': 'Liquid concentrate (dilute 1:3 or 1:4 with clean water)',
      'Application Method': 'Low-pressure sprayer, roller, or soft broom',
      'Substrate': 'Clean, dry concrete',
      'Residue Removal': 'Scrub and rinse before residue dries',
    },
  },
  {
    id: 'ch-5',
    name: 'Concrete Sealer',
    slug: 'concrete-sealer-pro',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: `SmartGrit Concrete Sealer is a high-performance protective treatment designed to safeguard concrete surfaces from moisture, water penetration, oils, chemicals, salts, and other contaminants. By sealing the surface pores or penetrating deep into the concrete structure, it significantly improves durability, reduces maintenance requirements, and extends the service life of concrete floors.

Concrete sealers help prevent cracking, dusting, staining, efflorescence, spalling, freeze-thaw damage, and chemical deterioration, while maintaining the appearance and structural integrity of the concrete.

SmartGrit offers two main sealer types — Penetrating Sealers (silane, siloxane, lithium silicate) that protect from within without forming a film, and Film-Forming Sealers (acrylic, polyurethane, epoxy) that create a surface coating for superior stain and chemical resistance with an enhanced gloss finish.`,
    image: '/brochure-images/ai_concrete_sealer.png',
    gallery: ['/brochure-images/ai_concrete_sealer.png'],
    features: [
      'Guards against moisture, oils, chemicals, and salts',
      'Prevents staining, efflorescence, spalling and freeze-thaw damage',
      'Penetrating type: breathable protection without surface film',
      'Film-forming type: enhanced gloss and stain resistance',
      'Available in water-based (low VOC) and solvent-based formulations',
      'Extends service life of polished concrete floors',
      'Easy to apply with sprayer, roller, or microfiber mop',
    ],
    specifications: {
      'Types Available': 'Penetrating (Silane/Siloxane) or Film-Forming (Acrylic/Polyurethane/Epoxy)',
      'Formulations': 'Water-based (low VOC) or Solvent-based',
      'Application Method': 'Low-pressure sprayer, roller, or microfiber mop',
      'Substrate': 'Polished or prepared concrete',
      'Finish': 'Satin to High-Gloss (depending on type)',
    },
  },
  {
    id: 'ch-6',
    name: 'Concrete Floor Cleaning Chemical',
    slug: 'floor-cleaning-chemical',
    category: 'Chemicals & Densifiers',
    categorySlug: 'chemicals',
    description: `SmartGrit Concrete Floor Cleaning Chemicals are a professionally formulated range of cleaning agents designed to address the specific types of contamination encountered on industrial and commercial concrete floors. Choosing the correct chemical for the specific type of dirt or stain is essential — routine cleaning requires alkaline or pH-neutral cleaners, grease requires degreasers, and rust or cement smears require mild acid cleaners.

The SmartGrit range covers all common cleaning requirements for concrete floor maintenance, from daily mopping through to heavy-duty industrial degreasing and stain removal. All formulations are engineered to be safe on sealed and polished concrete surfaces.`,
    image: '/brochure-images/ai_floor_cleaner.png',
    gallery: ['/brochure-images/ai_floor_cleaner.png'],
    features: [
      'pH-neutral cleaners safe for daily or weekly mopping on sealed surfaces',
      'Mild alkaline detergents for heavy-traffic unsealed concrete',
      'Alkaline degreasers for oil, petroleum and grease removal',
      'Oxalic/phosphoric acid cleaners for rust stains and efflorescence',
      'Citrus-based bio solvents for adhesive residue and light sealer stripping',
      'Complete range covers all common industrial floor cleaning needs',
      'Safe for use on polished and sealed concrete surfaces',
    ],
    specifications: {
      'Range': 'pH-Neutral, Alkaline, Acidic, and Bio-Based Solvents',
      'Application': 'Daily maintenance through heavy-duty stain removal',
      'Substrate': 'Sealed and unsealed concrete floors',
      'Dilution': 'As per product-specific manufacturer recommendations',
    },
  },
];

// ─── CLIENTS ─────────────────────────────────────────────────────────────────

export const CLIENTS = [
  { name: 'KIA Motors', logo: '/brochure-images/page_08_img_2.jpeg', url: 'https://www.kia.com' },
  { name: 'ESR', logo: '/brochure-images/page_08_img_3.png', url: 'https://www.esr.com' },
  { name: 'Peekay Steel', logo: '/brochure-images/page_08_img_4.jpeg', url: 'https://www.peekaysteel.com' },
  { name: 'KisanKraft', logo: '/brochure-images/page_08_img_5.jpeg', url: 'https://www.kisankraft.com' },
  { name: 'POCL', logo: '/brochure-images/page_08_img_6.jpeg', url: 'https://pocl.co.in' },
  { name: 'Ambika Cotton', logo: '/brochure-images/page_08_img_7.jpeg', url: 'http://www.acmills.in' },
  { name: 'IKEA', logo: '/brochure-images/page_08_img_8.jpeg', url: 'https://www.ikea.com' },
  { name: 'Mourya Aquex', logo: '/brochure-images/page_08_img_9.jpeg', url: 'https://www.mouryaaquex.com' },
  { name: 'IRCC', logo: '/brochure-images/page_08_img_10.jpeg', url: 'https://www.ircc.in' },
  { name: 'AKG', logo: '/brochure-images/page_08_img_11.jpeg', url: 'https://www.akg.com' },
  { name: 'Sprint', logo: '/brochure-images/page_08_img_12.jpeg', url: 'https://www.sprint.com' },
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
