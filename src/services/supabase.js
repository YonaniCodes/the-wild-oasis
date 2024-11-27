import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qrpuyoynljbtbpdjptdz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFycHV5b3lubGpidGJwZGpwdGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NDM2NTIsImV4cCI6MjA0MzUxOTY1Mn0.Ym4Zi009R_P2lKj3fPIeh_nRW9ovcLRqxxFfGR44srE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
