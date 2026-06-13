import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wlbpqnbkbonbbuodmfcq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsYnBxbmJrYm9uYmJ1b2RtZmNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzODExMjIsImV4cCI6MjA5Njk1NzEyMn0.SUgQ3j1o96rAvJjT9roCKPLllq-KkCSDCorq9cz2a1c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
