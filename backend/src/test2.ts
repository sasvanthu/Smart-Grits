import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { data, error } = await supabase.from('products').select('image_url').limit(1);
  console.log('image_url error:', error?.message);

  const { data: d2, error: e2 } = await supabase.from('products').select('price').limit(1);
  console.log('price error:', e2?.message);
}
check();
