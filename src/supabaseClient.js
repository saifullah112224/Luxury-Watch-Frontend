import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://gwgmrgprawryihtkacpq.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Z21yZ3ByYXdyeWlodGthY3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwOTg5MTYsImV4cCI6MjA5OTY3NDkxNn0.tm3bp-lgLoU_h12Ac2-SPG1_PXZ7fRpSDSyR2jSXPhs";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);