import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const CATEGORIES = [
  {
    name: 'Concrete Polishing Systems',
    slug: 'polishing-systems',
    description: 'Diamond polishing pads and grinding tools for power trowel application.',
  },
  {
    name: 'Chemicals & Densifiers',
    slug: 'chemicals',
    description: 'Premium concrete hardeners, densifiers and protecting sealers.',
  },
  {
    name: 'Machines & Accessories',
    slug: 'accessories',
    description: 'Full range of industrial floor care machines including edge grinders, scrubber dryers, etc.',
  },
];

const PRODUCTS = [
  {
    name: 'Concrete Polishing System — 120cm',
    slug: 'concrete-polishing-system-120cm',
    categorySlug: 'polishing-systems',
    description: 'The 120cm SmartGrit Concrete Polishing System is specially designed for concrete flooring professionals and for industrial use.',
    image_url: '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.21 AM (1).jpeg',
    features: [
      'Power trowel application (Ride On / Walk Behind)',
      'Fast & easy installation — 1000+ m² per day',
      'Increases profit margins for contractors',
    ]
  },
  {
    name: 'Concrete Polishing System — 90cm',
    slug: 'concrete-polishing-system-90cm',
    categorySlug: 'polishing-systems',
    description: 'The 90cm SmartGrit Concrete Polishing System brings the same professional-grade results as our larger models, optimised for mid-size industrial spaces.',
    image_url: '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.24 AM.jpeg',
    features: [
      'Compact 90cm form factor for mid-size areas',
      'Power trowel application (Walk Behind)',
      'Fast & easy installation',
    ]
  },
  {
    name: 'Concrete Polishing System — 60cm',
    slug: 'concrete-polishing-system-60cm',
    categorySlug: 'polishing-systems',
    description: 'The compact 60cm SmartGrit Concrete Polishing System is ideal for smaller commercial spaces, detailed work, and areas requiring precision finishing.',
    image_url: '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.22 AM (2).jpeg',
    features: [
      'Compact 60cm — ideal for smaller spaces and detail work',
      'Lightweight and maneuverable',
      'Same diamond quality as larger systems',
    ]
  },
  {
    name: 'SmartGrit Concrete Densifier',
    slug: 'concrete-densifier',
    categorySlug: 'chemicals',
    description: 'Lithium silicate is a chemical compound used on concrete surfaces to enhance durability, strength, and longevity.',
    image_url: '/brochure-images/ai_chemical_jug.png',
    features: [
      'Penetrates concrete surface to react with free lime',
      'Reduces abrasion wear significantly',
      'Binds dust particles — dustproofs the floor',
    ]
  },
  {
    name: 'SmartGrit Protecting Sealer',
    slug: 'protecting-sealer',
    categorySlug: 'chemicals',
    description: 'Sealers are a film-forming topical application usually made up of acrylics, epoxies, urethanes, and waxes.',
    image_url: '/brochure-images/ai_chemical_jug.png',
    features: [
      'Film-forming protective topical coating',
      'Available in acrylics, epoxies, urethanes and wax formulations',
      'Recommended based on your industry and floor condition',
    ]
  },
  {
    name: 'Edge Grinding Machine',
    slug: 'edge-grinding-machine',
    categorySlug: 'accessories',
    description: 'Edge Grinder is equipment to grind all around the columns, walls and machine foundation edges.',
    image_url: '/brochure-images/ai_edge_grinding_machine.png',
    features: [
      'Grinds around columns, walls and machine foundation edges',
      'Walk-behind design for maximum maneuverability',
      'Small grinding head reaches tight corners and edges',
    ]
  },
  {
    name: 'Ride On Scrubber Dryer',
    slug: 'ride-on-scrubber-dryer',
    categorySlug: 'accessories',
    description: 'Scrubber dryer is a cleaning machine that can be used to efficiently and effectively clean floors, replacing traditional mops and buckets.',
    image_url: '/brochure-images/ai_ride_on_scrubber.png',
    features: [
      'Single-pass scrubbing and drying action',
      'Replaces traditional mops and buckets',
      'Operator seated for large area coverage',
    ]
  },
  {
    name: 'Vacuum Cleaner',
    slug: 'vacuum-cleaner',
    categorySlug: 'accessories',
    description: 'Vacuum Cleaner Machine is a device that causes suction in order to remove slurry from Concrete floors.',
    image_url: '/brochure-images/ai_industrial_vacuum.png',
    features: [
      'Powerful suction removes slurry from concrete floors',
      'Walk-behind design for full floor access',
      'Suction head and hose connected to collection container',
    ]
  }
];

async function seed() {
  console.log('Starting seed...');

  // 1. Insert Categories
  for (const cat of CATEGORIES) {
    const { error } = await supabase.from('categories').upsert({
      name: cat.name,
      slug: cat.slug,
      description: cat.description
    }, { onConflict: 'slug' });
    
    if (error) console.error('Error inserting category:', cat.slug, error);
  }
  console.log('Categories seeded.');

  // 2. Fetch categories to get IDs
  const { data: catData } = await supabase.from('categories').select('*');
  const catMap: Record<string, string> = {};
  if (catData) {
    catData.forEach(c => catMap[c.slug] = c.id);
  }

  // 3. Insert Products
  for (const prod of PRODUCTS) {
    const category_id = catMap[prod.categorySlug];
    if (!category_id) {
      console.error('Category not found for product:', prod.name);
      continue;
    }

    const { data: productData, error } = await supabase.from('products').upsert({
      name: prod.name,
      slug: prod.slug,
      category_id: category_id,
      description: prod.description,
      features: prod.features,
      is_featured: true
    }, { onConflict: 'slug' }).select().single();

    if (error) {
      console.error('Error inserting product:', prod.slug, error);
    } else if (productData) {
      console.log('Seeded product:', prod.name);
      
      // Insert product_images
      await supabase.from('product_images').delete().eq('product_id', productData.id); // clear existing
      
      const { error: imgError } = await supabase.from('product_images').insert({
        product_id: productData.id,
        image_url: prod.image_url,
        is_primary: true
      });
      
      if (imgError) console.error('Error inserting image for', prod.slug, imgError);
    }
  }

  console.log('Seed complete!');
}

seed().catch(console.error);
