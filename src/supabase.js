// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


export const supabase = createClient(
  "https://xphzrpcmlhwmhsciibld.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaHpycGNtbGh3bWhzY2lpYmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3Mzg1NzIsImV4cCI6MjA2OTMxNDU3Mn0.iLelrmn4YWg1fFOKD1sB7ZRbIbAF-5PZiHZW5BEnY1g"
);

