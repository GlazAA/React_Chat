import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://kfiimuxxtiautbmmhydj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaWltdXh4dGlhdXRibW1oeWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMzg2NTgsImV4cCI6MjA1ODkxNDY1OH0.z8o5zCgjfqZmuUqBHgklXEWddGX5pLmfd4xlqDXEwU0";


const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

