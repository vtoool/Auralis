
import React, { useState } from 'react';

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-300"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-300 dark:border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left font-semibold text-lg text-brand-purple dark:text-brand-light-purple"
            >
                <span>{title}</span>
                <span className={`${isOpen ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="pb-4 prose max-w-none prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-headings:text-brand-dark dark:prose-headings:text-brand-light prose-strong:text-brand-dark dark:prose-strong:text-brand-light prose-a:text-brand-purple hover:prose-a:text-brand-purple-dark dark:prose-a:text-brand-gold">
                    {children}
                </div>
            </div>
        </div>
    );
}

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-800 dark:bg-black text-white p-4 rounded-md overflow-x-auto text-sm">
        <code>{children}</code>
    </pre>
);

const BackendGuide: React.FC = () => {
    return (
        <section id="backend-guide" className="py-20 bg-gray-50 dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-brand-purple dark:text-brand-light-purple">Developer Guide</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">How to connect the backend, payments, and deploy this site.</p>
                </div>
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    <Section title="1. Backend Setup with Supabase">
                        <p>Supabase is an open-source Firebase alternative that provides a PostgreSQL database, authentication, storage, and auto-generated APIs.</p>
                        
                        <h4>Step 1: Create a Supabase Project</h4>
                        <ol>
                            <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a> and sign up/log in.</li>
                            <li>Create a new project. Choose a strong database password and save it securely.</li>
                        </ol>

                        <h4>Step 2: Create Database Tables</h4>
                        <p>Navigate to the "Table Editor" in your Supabase project dashboard. Create the following tables:</p>
                        
                        <h5>`courses` table:</h5>
                        <ul>
                            <li><strong>id:</strong> <code>int8</code> (primary key, auto-incrementing)</li>
                            <li><strong>created_at:</strong> <code>timestamptz</code> (default: <code>now()</code>)</li>
                            <li><strong>title:</strong> <code>text</code></li>
                            <li><strong>description:</strong> <code>text</code></li>
                            <li><strong>type:</strong> <code>text</code> (e.g., 'Video Course')</li>
                            <li><strong>price:</strong> <code>numeric</code></li>
                            <li><strong>imageUrl:</strong> <code>text</code></li>
                            <li><strong>paddle_product_id:</strong> <code>text</code> (for payments)</li>
                        </ul>
                        <p><em>Turn off Row Level Security (RLS) for now for easy development. You should enable it for production.</em></p>

                        <h5>`appointments` table:</h5>
                        <ul>
                            <li><strong>id:</strong> <code>int8</code> (primary key, auto-incrementing)</li>
                            <li><strong>created_at:</strong> <code>timestamptz</code> (default: <code>now()</code>)</li>
                            <li><strong>name:</strong> <code>text</code></li>
                            <li><strong>email:</strong> <code>text</code></li>
                            <li><strong>date:</strong> <code>date</code></li>
                            <li><strong>time:</strong> <code>text</code></li>
                        </ul>

                        <h4>Step 3: Get API Keys</h4>
                        <p>Go to Project Settings > API. You will need the <strong>Project URL</strong> and the <strong><code>anon</code> public key</strong>.</p>

                        <h4>Step 4: Connect Frontend to Supabase</h4>
                        <p>First, install the Supabase client library:</p>
                        <CodeBlock>npm install @supabase/supabase-js</CodeBlock>
                        <p>Create a file `services/supabaseClient.ts`:</p>
                        <CodeBlock>{`import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
`}</CodeBlock>
                        <p>Now you can import `supabase` in your components (e.g., `Courses.tsx`, `Booking.tsx`) to fetch and insert data. Look for the <code>// TODO:</code> comments in the code.</p>
                    </Section>

                    <Section title="2. Payment Integration with Paddle">
                        <p>Paddle provides a complete payments infrastructure for SaaS businesses.</p>

                        <h4>Step 1: Setup Paddle</h4>
                        <ol>
                            <li>Create an account on <a href="https://paddle.com" target="_blank" rel="noopener noreferrer">Paddle</a>.</li>
                            <li>Go to your Catalog > Products and create products for each of your courses. Note the Product ID for each.</li>
                            <li>Go to Developer Tools > Authentication to get your <strong>Vendor ID</strong>.</li>
                        </ol>

                        <h4>Step 2: Integrate Paddle.js</h4>
                        <p>Add the Paddle.js script to your `index.html` head:</p>
                        <CodeBlock>{`<script src="https://cdn.paddle.com/paddle/paddle.js"></script>`}</CodeBlock>
                        
                        <p>Then, initialize Paddle in your `App.tsx` or a similar top-level component, ideally inside a `useEffect` hook:</p>
                        <CodeBlock>{`useEffect(() => {
  window.Paddle.Setup({ vendor: YOUR_VENDOR_ID });
}, []);`}</CodeBlock>
                        <p>Note: You'll need to add `window.Paddle` to your TypeScript declarations to avoid errors.</p>

                        <h4>Step 3: Trigger Checkout</h4>
                        <p>In `CourseCard.tsx`, update the `handleBuyNow` function to use the Paddle product ID you stored in your Supabase `courses` table.</p>
                        <CodeBlock>{`const handleBuyNow = (paddleId) => {
  window.Paddle.Checkout.open({
    product: paddleId,
    // You can also pass customer email, etc.
  });
};`}</CodeBlock>
                    </Section>

                    <Section title="3. Deployment with Vercel">
                        <p>Vercel is a platform for frontend developers, providing an excellent deployment experience.</p>
                        
                        <h4>Step 1: Push to a Git Provider</h4>
                        <p>Make sure your project is a Git repository and pushed to GitHub, GitLab, or Bitbucket.</p>
                        
                        <h4>Step 2: Import Project on Vercel</h4>
                        <ol>
                            <li>Log in to <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a> with your Git provider account.</li>
                            <li>Click "Add New..." > "Project".</li>
                            <li>Import the Git repository for this project.</li>
                        </ol>
                        
                        <h4>Step 3: Configure Environment Variables</h4>
                        <p>In the Vercel project settings, go to "Environment Variables". Add the keys you got from Supabase and Paddle. They must be prefixed with `VITE_` to be exposed to the browser.</p>
                        <ul>
                            <li><code>VITE_SUPABASE_URL</code>: Your Supabase Project URL.</li>
                            <li><code>VITE_SUPABASE_ANON_KEY</code>: Your Supabase `anon` public key.</li>
                            <li><code>VITE_PADDLE_VENDOR_ID</code>: Your Paddle Vendor ID.</li>
                        </ul>
                        <p>Update your code to use these variables (e.g., `process.env.VITE_SUPABASE_URL`).</p>
                        
                        <h4>Step 4: Deploy</h4>
                        <p>Vercel will automatically detect that this is a Vite/React project. Click "Deploy". Your site will be live in minutes!</p>
                    </Section>
                </div>
            </div>
        </section>
    );
};

export default BackendGuide;