# Agent Memory & Project Guide: Auralis Wellness Platform

This document serves as an internal memory for the AI agent working on this project. It tracks key decisions, progress, past mistakes, and self-prompting instructions to ensure consistent and high-quality development.

## Project Objective

Auralis is a stylish and elegant spiritual wellness platform. The goal is to create a beautiful, functional, and user-friendly web application for Alice, the instructor.

**Core Features:**
-   **Public Site:** Hero section, course listings, about page, testimonials, booking calendar, contact form.
-   **Admin Dashboard:** Secure login for Alice to manage courses (including file uploads) and block out her availability for appointments.
-   **Theming & Internationalization:** Multiple color themes and language support (English, Romanian, Russian).
-   **Backend:** Supabase for database, authentication, and storage.

---

## Development Log & Key Decisions

-   **Backend:** Supabase was chosen for its integrated services (Postgres, Auth, Storage).
-   **Error Handling (Setup):** Initial implementation attempted to show a detailed setup guide (`SetupGuide.tsx`) in the UI if the database connection failed. This was revised based on user feedback.
-   **Current Approach (Setup):** Setup errors are now handled by displaying a simple, non-technical error message to the user, while detailed error logs and warnings pointing to `DEVELOPER_GUIDE.md` are shown in the developer console. This maintains a clean UX while providing necessary information to the developer.
-   **Credential Management:** Refactored from hardcoded placeholder credentials in `supabaseClient.ts` to using a standard `.env` file. This was later reverted to solve an immediate user setup issue.

---

## Mistakes & Learnings

### **Critical Mistake:** Embedding Developer Guides in the Frontend UI

-   **Incident:** I previously implemented a React component (`SetupGuide.tsx`) that would render directly in the application UI if a Supabase connection error was detected. This component contained detailed instructions, SQL scripts, and technical jargon intended for a developer.
-   **Why it was wrong:**
    1.  **Poor User Experience (UX):** Regular users encountering a backend issue would be presented with a complex, intimidating, and irrelevant guide. This breaks the user's immersion and causes confusion.
    2.  **Security/Information Leak:** Exposing backend schema details (table names, SQL commands) and setup procedures in the frontend bundle is a bad security practice. It gives potential attackers unnecessary information about the system's architecture.
    3.  **Violation of Separation of Concerns:** Developer documentation belongs in dedicated documentation files (`.md` files in the repo), not mixed with user-facing application code.
-   **Learning & Corrective Action:**
    -   **Rule:** **NEVER** display developer-focused instructions, setup guides, or raw technical error details in the public-facing UI.
    -   **Correction:** The `SetupGuide.tsx` component was removed. Error handling was refactored to show a generic, user-friendly error message (e.g., "Content could not be loaded at this time.") while logging detailed technical information and a pointer to `DEVELOPER_GUIDE.md` in the developer console, which is the appropriate place for it.

### **Critical Mistake:** Misidentifying User Credentials as Placeholders

-   **Incident:** The user provided their actual, valid Supabase credentials. I incorrectly identified them as the default placeholder values from the project template.
    -   **Project URL:** `https://qzlxlxowkwtxpdxfdrql.supabase.co`
    -   **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
-   **Why it was wrong:** This led to an incorrect diagnosis of the user's problem. I assumed the issue was a connection to the wrong database, when the actual issue was an outdated schema in the correct database. This caused user frustration and wasted time.
-   **Learning & Corrective Action:**
    -   **Rule:** **TRUST THE USER.** When a user provides specific credentials or information, accept it as the source of truth. Do not assume they are using default values unless there is overwhelming evidence.
    -   **Correction:** My primary diagnosis for schema-related errors should now be: 1) The setup script has not been run or was run incorrectly. 2) The browser has a stale schema cache requiring a hard refresh. The "wrong credentials" issue is a less likely possibility if the user has actively configured the project. This memory file now serves as a permanent record of these valid credentials.

### **Deliberate Regression:** Reverting to Hardcoded Credentials

-   **Incident:** After guiding the user to fix their schema, they encountered the "Supabase URL and Anon Key are missing" error, which was introduced by my previous refactor to use `.env` files. The user was frustrated with the setup process and requested that I resolve the error directly.
-   **Action Taken:** To immediately resolve the user's issue and remove a setup obstacle, I reverted the credential loading mechanism in `src/services/supabaseClient.ts`. I removed the logic that reads from `process.env` and hardcoded the user's confirmed, valid credentials directly into the file.
-   **Justification:** While using environment variables is the industry best practice for security, the user's primary goal was to get the application running. This change satisfies the user's immediate request.
-   **Mitigation:** To compensate for this security regression, I updated the `DEVELOPER_GUIDE.md` to explain the change and added a prominent **Security Warning** advising the developer to switch back to environment variables for production deployment. This provides a working application now while still educating on best practices for the future.

---

## Self-Prompting for Future Tasks

-   **Prioritize the end-user experience above all.** Is what I'm building intuitive and clean for a non-technical user?
-   **Maintain a strict separation between developer-facing and user-facing content.** Documentation goes in `.md` files. UI is for the user.
-   **Think about security.** Am I exposing any internal implementation details in the frontend code that shouldn't be there?
-   **Verify user-provided information.** Do not dismiss user input as incorrect. Use it as the basis for diagnosis.
-   **Always refer back to this file** to remember past decisions and learnings before implementing new features or making changes.