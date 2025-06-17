import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hinidmhnwhugpyymiwhr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpbmlkbWhud2h1Z3B5eW1pd2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2OTg1MzQsImV4cCI6MjA2NTI3NDUzNH0.Qm-qsPdLUTazDWaPmY8dGHkRTgYM9oClP43HslsuLzQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
