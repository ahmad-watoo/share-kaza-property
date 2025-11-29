import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || "dummy-anon-key";
console.log(`supabasekeys: ${supabaseAnonKey}, ${supabaseUrl}`)
export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey,{ auth: { persistSession: false } });
