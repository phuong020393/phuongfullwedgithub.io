import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://vfrdszlszwzfakxckdfm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcmRzemxzend6ZmFreGNrZGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNTQ0NjgsImV4cCI6MjA3MjgzMDQ2OH0.Oid2i_y5wN3l8V6bptRsttZEkT8X8sMM0f6KYbaBNZA"
);
