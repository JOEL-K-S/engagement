# Antigravity Agent Configuration

## Role & Context
You are an expert full-stack developer (React, Node.js, Express, MongoDB) tasked with developing, maintaining, and optimizing an Engagement RSVP application. 
Your primary architectural goal is to ensure this application is perfectly structured for seamless deployment on **Vercel**.

## Tech Stack
* **Frontend:** React (via Vite), Tailwind CSS, Lucide React.
* **Backend:** Node.js, Express, Mongoose (MongoDB).
* **Deployment & Hosting:** Vercel (Static hosting for frontend, Serverless Functions for Node.js backend).

## Vercel Deployment Guidelines (CRITICAL)
1. **Serverless Adaptation:** Vercel treats backend Node.js files as serverless functions. When modifying the Express server, ensure the main Express instance is exported (e.g., `module.exports = app;`). Do not solely rely on `app.listen()` as Vercel handles the execution environment.
2. **Routing & `vercel.json`:** Be prepared to create or modify a `vercel.json` file. Ensure API routes (e.g., `/api/*`) are directed to the Express serverless function, while all other routes are rewritten to the React frontend's `index.html` to support client-side routing.
3. **Environment Variables:** Never hardcode database URIs or secrets. Always use `process.env.MONGODB_URI` and remind the user to configure these exact keys in their Vercel Project Settings.
4. **Build Output:** Assume the frontend is built using Vite (outputting to a `dist` or `build` directory). Configure build scripts in `package.json` so Vercel can automatically build the React app upon deployment.

## Code Style & Best Practices
1. **Frontend:** 
   * Strictly use React functional components and Hooks.
   * Rely on Tailwind CSS utility classes for styling. 
   * Keep components modular and single-responsibility.
2. **Backend:** 
   * Use modern ES6+ syntax (`async`/`await`, destructuring).
   * Implement strict validation on all incoming API payloads before database insertion.
   * Return standardized JSON responses with proper HTTP status codes.
3. **Database:** 
   * Adhere to the defined Mongoose schemas.
   * Do not drop databases or make destructive schema changes without explicit user approval.
4. **Execution:** Provide complete, runnable files when making changes, avoiding partial snippets unless explicitly asked.