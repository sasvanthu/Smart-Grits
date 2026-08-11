import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRODUCTS = [
  {
    name: 'Concrete Polishing System - 120cm',
    slug: 'concrete-polishing-system-120cm',
    categorySlug: 'polishing-systems',
    description: '120cm power trowel concrete polishing system for large industrial floors.',
    image: '/brochure-images/WhatsApp Image 2026-07-25 at 11.18.21 AM (1).jpeg',
  },
  {
    name: 'Densifier Chemical Applicator',
    slug: 'concrete-densifier',
    categorySlug: 'chemicals',
    description: 'Lithium silicate densifier and hardener for concrete floors.',
    image: '/brochure-images/ai_chemical_jug.png',
  },
  {
    name: 'Edge Grinding Machine',
    slug: 'edge-grinding-machine',
    categorySlug: 'accessories',
    description: 'Heavy duty edge grinder for concrete floors and corners.',
    image: '/brochure-images/ai_edge_grinding_machine.png',
  },
  {
    name: 'Ride-On Scrubber Dryer',
    slug: 'ride-on-scrubber-dryer',
    categorySlug: 'accessories',
    description: 'Industrial ride-on scrubber dryer for cleaning large concrete areas.',
    image: '/brochure-images/ai_ride_on_scrubber.png',
  },
  {
    name: 'Industrial Vacuum Cleaner',
    slug: 'vacuum-cleaner',
    categorySlug: 'accessories',
    description: 'High suction wet/dry industrial vacuum for concrete dust.',
    image: '/brochure-images/ai_industrial_vacuum.png',
  },
  {
    name: 'Burnishing Machine',
    slug: 'burnishing-machine',
    categorySlug: 'accessories',
    description: 'High speed burnisher for achieving high gloss concrete finish.',
    image: '/brochure-images/ai_burnishing_machine.png',
  },
  {
    name: 'Chemical Sprayer',
    slug: 'chemical-sprayer',
    categorySlug: 'accessories',
    description: 'Professional grade sprayer for applying densifiers and sealers.',
    image: '/brochure-images/ai_chemical_sprayer.png',
  },
  {
    name: 'Auto Scrubber Dryer',
    slug: 'auto-scrubber-dryer',
    categorySlug: 'accessories',
    description: 'Walk-behind auto scrubber for daily maintenance of polished concrete.',
    image: '/brochure-images/ai_auto_scrubber.png',
  }
];

async function seed() {
  try {
    console.log('Fetching categories...');
    const { data: categories, error: catError } = await supabase.from('categories').select('*');
    if (catError) throw catError;

    if (!categories || categories.length === 0) {
      console.log('No categories found. Adding them first...');
      const cats = [
        { name: 'Concrete Polishing Systems', slug: 'polishing-systems' },
        { name: 'Chemicals & Densifiers', slug: 'chemicals' },
        { name: 'Machines & Accessories', slug: 'accessories' }
      ];
      await supabase.from('categories').insert(cats);
    }
    
    // refetch categories
    const { data: cats2 } = await supabase.from('categories').select('*');
    if (!cats2) throw new Error("Failed to get categories");

    console.log('Seeding products...');
    for (const prod of PRODUCTS) {
      const cat = cats2.find(c => c.slug === prod.categorySlug);
      
      const { data: insertedProduct, error: prodErr } = await supabase.from('products').upsert({
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        category_id: cat?.id,
        is_featured: true
      }, { onConflict: 'slug' }).select().single();
      
      if (prodErr) {
        console.error('Error inserting product:', prodErr.message);
        continue;
      }
      
      if (insertedProduct) {
        // Insert product image
        await supabase.from('product_images').upsert({
          product_id: insertedProduct.id,
          image_url: prod.image,
          is_primary: true
        });
        console.log(`Seeded: ${prod.name}`);
      }
    }
    console.log('Seeding complete!');
  } catch (err: any) {
    console.error('Seeding error:', err.message);
  }
}

seed();
