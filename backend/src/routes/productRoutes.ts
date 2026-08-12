import { Router } from 'express';
import { supabase } from '../config/supabase';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name), product_images(image_url)');

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by slug
router.get('/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name), product_images(image_url, is_primary)')
      .eq('slug', req.params.slug)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
router.post('/', requireAuth, async (req, res) => {
  try {
    const { category_id, name, slug, description, features, advantages, is_featured, image_url } = req.body;
    
    const { data, error } = await supabase
      .from('products')
      .insert([{ category_id, name, slug, description, features, advantages, is_featured }])
      .select()
      .single();

    if (error) throw error;
    
    if (image_url) {
      await supabase.from('product_images').insert({
        product_id: data.id,
        image_url,
        is_primary: true
      });
    }
    
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, slug, description, features, advantages, is_featured, image_url } = req.body;
    
    const { data, error } = await supabase
      .from('products')
      .update({ category_id, name, slug, description, features, advantages, is_featured })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (image_url) {
      await supabase.from('product_images').delete().eq('product_id', id);
      await supabase.from('product_images').insert({
        product_id: id,
        image_url,
        is_primary: true
      });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
