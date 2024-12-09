import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jmxsoyvqkilzwlhobuqe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpteHNveXZxa2lsendsaG9idXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0NTA0OTQsImV4cCI6MjA0NjAyNjQ5NH0.t_pFIpz2-gbttBPI11WfFz8g4pcISRkiFac4UgOuD2w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
