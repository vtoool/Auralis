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

---

## Self-Prompting for Future Tasks

-   **Prioritize the end-user experience above all.** Is what I'm building intuitive and clean for a non-technical user?
-   **Maintain a strict separation between developer-facing and user-facing content.** Documentation goes in `.md` files. UI is for the user.
-   **Think about security.** Am I exposing any internal implementation details in the frontend code that shouldn't be there?
-   **Always refer back to this file** to remember past decisions and learnings before implementing new features or making changes.
