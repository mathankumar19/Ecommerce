import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://jmzfirqeebplfbpultsi.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptemZpcnFlZWJwbGZicHVsdHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NzY4MzYsImV4cCI6MjA4NjM1MjgzNn0.Ha95sbkI2LKJv9_ympagHoG4AqA7JhD4CyScqU2ibTI';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;