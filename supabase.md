Job Tracker App Backend Technical Specification - Supabase Auth
Overview
This specification outlines the implementation of user authentication for a job tracker web application built with a Next.js frontend. The authentication system will use Supabase Auth to handle signup, login, logout, and session management, integrating with the existing frontend in app/actions/auth.ts. The application will be hosted on Vercel, and this spec focuses solely on authentication, deferring other functionalities (e.g., database tables, profile management, job management, file storage) to subsequent phases. The authentication system will support email/password-based login, with provisions for future OAuth integration (e.g., Google).
Objectives

Set up Supabase Auth to manage user authentication securely.
Implement API routes for signup, login, logout, and session checking.
Integrate with the Next.js frontend, updating app/actions/auth.ts to use Supabase Auth.
Ensure secure session management with HTTP-only cookies.
Deploy the authentication system on Vercel with serverless functions.
Prepare for future integration with Supabase tables (e.g., User table) and other app features.

General Instructions for AI Code Editor

Follow a modular structure, placing authentication-related files in pages/api/auth/ and utility functions in lib/.
Use TypeScript for type safety, aligning with the existing Next.js frontend.
Implement error handling for all API routes, returning appropriate HTTP status codes (e.g., 200, 400, 401) and user-friendly messages.
Secure sensitive data (e.g., Supabase keys) using Vercel environment variables.
Ensure API routes are protected and sessions are managed securely with HTTP-only cookies.
Configure Vercel for seamless deployment of the Next.js app and serverless functions.
Document each component with comments explaining its purpose and key logic.
Avoid generating actual code; follow these detailed instructions to create the necessary files and functionality.
Focus solely on Supabase Auth setup and integration, avoiding database, storage, or other features unless explicitly required for authentication.

Functional Requirements - Implementation Steps
Step 1: Project Setup

Objective: Initialize the project structure, configure Supabase, and set up the development environment for authentication.
Instructions:
Create a new Supabase project in the Supabase dashboard, enabling the Auth module (database and storage setup deferred).
Ensure the existing Next.js project (with TypeScript) is ready, with the frontend structure including app/actions/auth.ts for authentication actions.
Install dependencies:
supabase-js (Supabase client for interacting with Auth).
@supabase/auth-helpers-nextjs (Supabase Auth helpers for Next.js to manage sessions).
@vercel/node (Vercel serverless functions support).

Set up Supabase client:
Create lib/supabase.ts to initialize the Supabase client with the public URL and anon key from the Supabase dashboard.
Example configuration: Initialize with createClient using SUPABASE_URL and SUPABASE_ANON_KEY.

Configure Supabase Auth helpers:
Create lib/supabase-auth.ts to set up @supabase/auth-helpers-nextjs for Next.js, enabling session management with cookie-based authentication.

Configure environment variables:
In Vercel’s dashboard, add:
SUPABASE_URL: The Supabase project URL (e.g., https://<project-id>.supabase.co).
SUPABASE_ANON_KEY: The public anon key from the Supabase dashboard.
SUPABASE_SERVICE_ROLE_KEY: The service role key (for server-side operations, kept secret).

Create a .env.local file locally with the same variables, ensuring it’s excluded from Git via .gitignore.


Set up Vercel deployment:
Create a vercel.json file to configure serverless functions, specifying Node.js runtime and memory limits (e.g., 512MB for auth routes).
Ensure the Next.js app is deployable with vercel deploy, setting the build command to next build and output directory to .next.

Step 2: Supabase Auth Configuration

Objective: Configure Supabase Auth in the dashboard to support email/password authentication and prepare for future OAuth.
Instructions:
In the Supabase dashboard, navigate to the Authentication section:
Enable the email provider for signup and login.
Set email confirmation to “required” to ensure users verify their email addresses before accessing the app.
Configure SMTP settings for email confirmations (e.g., use Supabase’s default SMTP or integrate with a service like SendGrid).
Set a secure site URL (e.g., https://<your-vercel-domain>/dashboard) for redirect after email confirmation.


Configure security settings:
Set a minimum password length (e.g., 8 characters).
Enable “Prevent anonymous sign-ins” to require authentication for all app access.


Placeholder for OAuth (deferred):
Note in README.md that OAuth providers (e.g., Google) can be enabled later by adding provider configurations in the Supabase dashboard.


Test Auth configuration:
Use the Supabase dashboard’s Auth section to manually trigger a test signup and confirm the email is sent and verified.


Document Auth configuration in README.md, including:
Steps to enable email provider and SMTP.
Security settings (password length, email confirmation).
Placeholder for OAuth setup.

Step 3: User Authentication Implementation

Objective: Implement API routes for signup, login, logout, and session checking, integrating with app/actions/auth.ts.
Instructions:
Create an API route in pages/api/auth/[...supabase].ts using @supabase/auth-helpers-nextjs to handle authentication operations:
Signup (POST /api/auth/signup):
Accept request body with email, password, name, and confirmPassword.
Validate inputs using Zod, matching the schema in app/actions/auth.ts (e.g., email format, password length ≥8, password matches confirmPassword).
Call Supabase Auth’s signUp method with email, password, and options: { data: { name } } to store the user’s name.
On success, set a session cookie using Supabase Auth’s session management.
Return a 200 status with { user: { id, email, name } } and redirect to /dashboard.
On error (e.g., email already exists), return a 400 status with a user-friendly message (e.g., “Email already registered”).

Login (POST /api/auth/login):
Accept request body with email and password.
Validate with Zod, ensuring valid email and non-empty password.
Call Supabase Auth’s signInWithPassword method with email and password.
On success, set a session cookie and return a 200 status with { user: { id, email, name } }, redirecting to /dashboard.
On error (e.g., invalid credentials), return a 401 status with “Invalid email or password”.

Logout (POST /api/auth/logout):
Call Supabase Auth’s signOut method to invalidate the session.
Delete the session cookie.
Return a 200 status with { message: "Logged out" } and redirect to /login.

Check Auth (GET /api/auth/session):
Verify the session cookie using Supabase Auth’s getSession method.
Return a 200 status with { user: { id, email, name }, isAuthenticated: true } if the session is valid, or { isAuthenticated: false } if not.

Secure API routes:
Use Supabase’s createRouteHandlerClient in pages/api/auth/[...supabase].ts to initialize the Supabase client with Vercel’s cookies for session management.
Store session tokens in HTTP-only cookies with:
7-day expiry (matching auth.ts configuration).
Secure flag enabled in production (HTTPS only).
SameSite: Strict to prevent CSRF attacks.

Validate user authentication for protected routes (e.g., /api/auth/session) using getSession.

Update app/actions/auth.ts to call these API routes:
Replace dummy logic with HTTP requests to /api/auth/signup, /api/auth/login, /api/auth/logout, and /api/auth/session.
Preserve existing redirect behavior:
Signup/Login: Redirect to /dashboard on success, stay on /signup or /login with error message on failure.
Logout: Redirect to /login.

Use fetch or a library like axios to make API calls, passing JSON payloads (e.g., { email, password }).
Handle API responses, extracting user data or error messages for display.

Test API routes:
Verify signup creates a user in Supabase Auth and sends a confirmation email.
Confirm login succeeds with valid credentials and fails with invalid ones.
Ensure logout clears the session cookie and redirects correctly.
Test session checking returns correct authentication status.

Step 4: Frontend Integration

Objective: Ensure the Next.js frontend integrates seamlessly with Supabase Auth, updating app/actions/auth.ts and related UI components.
Instructions:
Update app/actions/auth.ts to integrate with the new API routes:
Signup Action: Call POST /api/auth/signup with email, password, name, confirmPassword. On success, redirect to /dashboard using Next.js redirect. On error, return an error message for display (e.g., in app/signup/page.tsx).
Login Action: Call POST /api/auth/login with email, password. On success, redirect to /dashboard. On error, return an error message for app/login/page.tsx.
Logout Action: Call POST /api/auth/logout. On success, redirect to /login.
Check Auth Action: Call GET /api/auth/session to verify user authentication status, used in protected routes (e.g., app/dashboard/page.tsx).


Update frontend UI components:
Ensure app/signup/page.tsx and app/login/page.tsx forms submit to the updated auth.ts actions, displaying error messages from API responses.
Protect dashboard routes (e.g., app/dashboard/page.tsx) by calling the Check Auth action and redirecting to /login if isAuthenticated: false.


Secure frontend:
Avoid storing session tokens in client-side storage (e.g., localStorage); rely on HTTP-only cookies managed by Supabase Auth.
Use Next.js middleware (e.g., middleware.ts) to check authentication status for protected routes, calling /api/auth/session and redirecting to /login if unauthorized.


Test frontend integration:
Verify form submissions in app/signup/page.tsx and app/login/page.tsx trigger the correct API calls and handle redirects.
Confirm protected routes (e.g., /dashboard) are inaccessible without authentication.
Ensure error messages display correctly on failed signup/login attempts.

Security Requirements

Authentication: Use Supabase Auth with HTTP-only, secure cookies (as in auth.ts). Validate sessions on all API routes using getSession.
API Keys: Store Supabase keys (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY) in Vercel environment variables, never in client-side code.
HTTPS: Ensure Vercel enforces HTTPS for all requests to secure cookie transmission.
Cookies: Set session cookies with:
HttpOnly to prevent JavaScript access.
Secure flag for HTTPS-only transmission.


Error Handling: Return generic error messages to clients (e.g., “Invalid credentials”) and log detailed errors server-side for debugging.
Rate Limiting: Apply rate limits to auth routes (e.g., 10 requests/minute per IP) using Vercel’s vercel-rate-limiter to prevent brute-force attacks.

Testing Requirements

Unit Tests:
Test API routes (/api/auth/signup, /api/auth/login, /api/auth/logout, /api/auth/session) using a testing framework (e.g., Jest).
Mock Supabase Auth client to avoid hitting live services.
Verify correct status codes (200, 400, 401) and error messages.


Integration Tests:
Test end-to-end flows: signup → email confirmation → login → logout.
Verify session cookies are set and cleared correctly.


Note that database tables and other features are deferred to future phases.


Inline Comments:
Add comments in pages/api/auth/[...supabase].ts explaining each route’s purpose, inputs, and key logic (e.g., session cookie handling, Supabase Auth calls).
Comment lib/supabase.ts and lib/supabase-auth.ts to clarify initialization and configuration.


Supabase Dashboard:
Document Auth settings (e.g., email provider, SMTP) in the Supabase dashboard notes.

