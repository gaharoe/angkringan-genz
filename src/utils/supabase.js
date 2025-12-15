import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://isdniwfopojkawjutvjy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzZG5pd2ZvcG9qa2F3anV0dmp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTc5OTc3NCwiZXhwIjoyMDgxMzc1Nzc0fQ.F25WwPkp8OtRQhKkA2Iqms1mO72KZk46jei8_Pbe9jw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase 