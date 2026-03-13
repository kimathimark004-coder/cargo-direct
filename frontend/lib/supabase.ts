import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
  );
}

try {
  const url = new URL(supabaseUrl);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error();
  }
} catch {
  throw new Error(
    `Invalid NEXT_PUBLIC_SUPABASE_URL: "${supabaseUrl}". It must be the full HTTP or HTTPS URL from your Supabase project settings, e.g. https://YOUR_PROJECT_REF.supabase.co`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)