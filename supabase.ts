import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jyplpbblvidtnavhleuu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cGxwYmJsdmlkdG5hdmhsZXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNjUxMzUsImV4cCI6MjAzMDg0MTEzNX0.uNIQQEHaNkOynXZ998Lw4ZdrV8FE1R9wamak3SCxeBg";
export const supabase = createClient(supabaseUrl, supabaseKey);
