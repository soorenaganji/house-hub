// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://buasqibyaroyxebuqtsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1YXNxaWJ5YXJveXhlYnVxdHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NDg5NzAsImV4cCI6MjAzNDIyNDk3MH0.tPPR98AjAzonft_bBai9TaOH9sm8u4CStkA4afrtusQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
