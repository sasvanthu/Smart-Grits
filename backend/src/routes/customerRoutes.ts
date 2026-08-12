import { Router } from 'express';
import { supabase } from '../config/supabase';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

// GET all customers
router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new customer
router.post('/', requireAuth, async (req, res) => {
  try {
    const { full_name, company_name, email, phone, status, notes } = req.body;
    
    const { data, error } = await supabase
      .from('customers')
      .insert([{ full_name, company_name, email, phone, status, notes }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a customer
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, company_name, email, phone, status, notes } = req.body;
    
    const { data, error } = await supabase
      .from('customers')
      .update({ full_name, company_name, email, phone, status, notes })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a customer
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
