import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://joqshpsimwnlbgkcycxg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcXNocHNpbXdubGJna2N5Y3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ3MTQsImV4cCI6MjA3NzU0MDcxNH0.6a18LgI2FGUelOjFyV77AV4HqKN-bI5E2u4JuGWR6Wk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
