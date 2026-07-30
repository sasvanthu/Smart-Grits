import { Router } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// GET summary stats for dashboard
router.get('/stats', async (req, res) => {
  try {
    const { count: totalProducts, error: err1 } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (err1) throw err1;

    const { count: newRequests, error: err2 } = await supabase
      .from('quote_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'New');
      
    if (err2) throw err2;

    const { data: uniqueCustomers, error: err3 } = await supabase
      .from('quote_requests')
      .select('email');

    if (err3) throw err3;

    // Calculate unique emails for "Total Customers" approximation
    const customersSet = new Set(uniqueCustomers?.map((c: any) => c.email));
    res.json({
      totalProducts: totalProducts || 0,
      newRequests: newRequests || 0,
      totalCustomers: customersSet.size
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET all quote requests
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('quote_requests')
      .select(`
        *,
        quote_items (
          quantity,
          products (name)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new quote request
router.post('/', async (req, res) => {
  try {
    const { fullName, companyName, email, phone, remarks, items } = req.body;

    // 1. Insert into quote_requests
    const { data: quoteData, error: quoteError } = await supabase
      .from('quote_requests')
      .insert([
        {
          full_name: fullName,
          company_name: companyName,
          email,
          phone,
          remarks,
          status: 'New'
        }
      ])
      .select('id')
      .single();

    if (quoteError) throw quoteError;

    const quoteId = quoteData.id;

    // 2. Insert into quote_items
    if (items && items.length > 0) {
      const quoteItems = items.map((item: any) => ({
        quote_id: quoteId,
        product_id: item.productId,
        quantity: item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(quoteItems);

      if (itemsError) throw itemsError;
    }

    // Add to Customers CRM panel
    try {
      await supabase.from('customers').insert([{
        full_name: fullName,
        company_name: companyName || null,
        email: email,
        phone: phone || null,
        status: 'Lead',
        notes: `Product Quote Request\nRemarks: ${remarks || 'None'}`
      }]);
    } catch (dbError) {
      console.error('Failed to add quote inquiry to customers CRM:', dbError);
    }

    res.status(201).json({ success: true, quoteId });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH a quote request status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('quote_requests')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a quote request
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('quote_requests')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
