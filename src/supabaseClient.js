import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase project URL and Anon Key
const supabaseUrl = 'https://uezokzmlxlxqimnttfmf.supabase.co';
const supabaseAnonKey = 'sb_publishable_8Npx8r2ottOHnymeEG-1jQ_np2UtvhD';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
