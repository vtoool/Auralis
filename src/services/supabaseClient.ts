
import { createClient } from '@supabase/supabase-js'

// --- IMPORTANT ---
// The Supabase credentials have been hardcoded here to resolve a setup issue.
// For production environments, it is strongly recommended to move these
// back to environment variables (e.g., a .env file) to keep them secure.
const supabaseUrl = "https://qzlxlxowkwtxpdxfdrql.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bHhseG93a3d0eHBkeGZkcnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTc5MjcsImV4cCI6MjA3ODAzMzkyN30.QZ_q3viNApucBIcFA31aXRQjT_kmdbdVaGer-JbJ2Tk";

// NOTE TO DEVELOPER:
// If you see an error like "Could not find table '...' in the schema cache",
// it is almost always caused by one of these issues:
// 1. You have not successfully run the full database setup script from DEVELOPER_GUIDE.md in YOUR project.
// 2. You have just run the script and need to do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) of the application in your browser.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)