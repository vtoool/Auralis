
import { createClient } from '@supabase/supabase-js'

// --- IMPORTANT SETUP ---
// YOU MUST REPLACE THESE PLACEHOLDER VALUES WITH YOUR OWN SUPABASE PROJECT'S URL AND ANON KEY
// You can find these in your Supabase project dashboard under: Settings > API
const supabaseUrl = "https://qzlxlxowkwtxpdxfdrql.supabase.co"; // Replace this with your Project URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bHhseG93a3d0eHBkeGZkcnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTc5MjcsImV4cCI6MjA3ODAzMzkyN30.QZ_q3viNApucBIcFA31aXRQjT_kmdbdVaGer-JbJ2Tk"; // Replace this with your anon public key


// This is a check to remind you to replace the default credentials.
// FIX: Export isUsingDefaultCreds to be used in other components.
export const isUsingDefaultCreds = supabaseUrl === "https://qzlxlxowkwtxpdxfdrql.supabase.co";

if (isUsingDefaultCreds) {
    console.warn(`%cWARNING: You are using default Supabase credentials.`, `color: orange; font-weight: bold; font-size: 14px;`);
    console.warn(`Please follow the setup instructions in DEVELOPER_GUIDE.md to connect to your own Supabase project.`);
}


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided. Check src/services/supabaseClient.ts");
}

// NOTE TO DEVELOPER:
// If you see an error like "Could not find table '...' in the schema cache",
// it is almost always caused by one of these three issues:
// 1. You have not replaced the placeholder Supabase credentials at the top of this file with YOUR OWN.
// 2. You have not successfully run the full database setup script from DEVELOPER_GUIDE.md in YOUR project.
// 3. You have just run the script and/or updated credentials and need to do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) of the application in your browser.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)