import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in your .env.local file.'
  );
}

// Normalize URL to ensure valid protocol
const normalizedUrl = supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://')
  ? supabaseUrl
  : `https://${supabaseUrl}`;

export const supabase = createClient(normalizedUrl, supabasePublishableKey);
