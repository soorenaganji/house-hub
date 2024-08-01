import { createClient } from '@supabase/supabase-js';

// Access environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;



// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  // Optionally, you can remove `mode: 'no-cors'` if it is not necessary
  // and `no-cors` mode is not recommended for production.
  mode: 'no-cors',
});

export default supabase;
