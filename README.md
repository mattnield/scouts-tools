# Scouts Tools

This project is designed to replace a .NET web application that provided infomrmation about chief scout award progress for any given unit. It was built to make better use of OAuth and individual user premissions so tha anyone can use the application for any section.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## State Management

### 1. Centralized State Management

We are using React Context to manage global state across the application, specifically for:
- Sections (e.g., the list of sections available).
- Selected Section (the currently selected section).

Why Context?
- It’s lightweight and sufficient for this use case since the state is relatively simple and doesn’t require advanced features like middleware or time-travel debugging (as with Redux).

### 2. Server-Side Cookie Management

We decided to store sensitive or persistent data (like the selected section’s ID) in HTTP-only cookies on the server:
- Why cookies?
  - It’s secure (HTTP-only cookies can’t be accessed client-side).
  - It persists state across sessions and page reloads without relying on client-side storage.
- Where? Cookies are set and accessed in API routes or middleware, not directly in React components.

### 3. API Routes for Data Fetching

All interactions with external APIs (e.g., fetching section data or members) go through Next.js API routes:
- Why API routes?
- Centralizes data fetching logic.
- Allows for preprocessing, validation, and secure access to external APIs.
- Keeps the client-side code clean and focused on rendering UI.

### 4. Client-Side Responsibilities

The client (React components) focuses on:
- Rendering the UI based on the global state from the context.
- Triggering API calls (via fetch) to reload or update data when necessary.

### Key Components in State Management
1. ApplicationContext:
  - Manages global state for sections and the selected section.
	- Provides helper methods like reloadSections() and setSelectedSection().
2. Middleware and API Routes:
	- Middleware validates and processes cookies.
	- API routes fetch and preprocess external data (e.g., section lists or members).
3. HTTP-only Cookies:
	-	Used to persist the selected section (selectedSectionId).
	-	Managed exclusively on the server to ensure security.

### State Management Workflow
1. Sections:
	-	Sections are fetched and stored in the context via an API route (/api/sections).
	-	The client retrieves sections from the context and renders them (e.g., in a dropdown).
2. Selected Section:
	-	The selected section is persisted in cookies and stored in the context.
	-	On page load, the context checks the cookie to set the selected section.
3. Fetching Additional Data:
	-	For additional data (e.g., members or badges), API routes process requests using the selected section and fetch the necessary information from external APIs.

### Best Practice Alignment
-	Server-Side State Management:
-	Cookies and API routes handle persistent and sensitive state.
-	Client-Side State Management:
-	React Context focuses on lightweight state, driven by data from the API.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
