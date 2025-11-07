import { createClient } from '@supabase/supabase-js'

// In a real-world application with a build step (like Vite or Create React App),
// these credentials would be stored in environment variables (e.g., .env file)
// and accessed via `import.meta.env.VITE_SUPABASE_URL`.
// Since this project runs directly in the browser without a build step,
// the values are hardcoded here for simplicity.

const supabaseUrl = "https://qzlxlxowkwtxpdxfdrql.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bHhseG93a3d0eHBkeGZkcnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTc5MjcsImV4cCI6MjA3ODAzMzkyN30.QZ_q3viNApucBIcFA31aXRQjT_kmdbdVaGer-JbJ2Tk";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided.");
}

// NOTE TO DEVELOPER:
// If you see an error like "Could not find table '...' in the schema cache",
// it usually means one of two things:
// 1. You have not run the database setup script from DEVELOPER_GUIDE.md.
// 2. You have just run the script and need to do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
//    of the application in your browser to clear the old schema cache.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)