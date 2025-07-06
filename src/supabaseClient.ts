// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tyhrhczwgqxhqjihocvh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aHJoY3p3Z3F4aHFqaWhvY3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MTk4MjgsImV4cCI6MjA2NzI5NTgyOH0._OPalmR_DtLIiwJ6shR5a1zhizj-rwySKQ46NU2nh3c'; // ✅ wrap in quotes

export const supabase = createClient(supabaseUrl, supabaseKey);
