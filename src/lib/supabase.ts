import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
  }
  return client;
}

export type Enquiry = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  event_date: string | null;
  city: string;
  message: string | null;
  status: "new" | "contacted" | "closed";
};
