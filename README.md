# TaskFlow – Frontend

This repository contains the **frontend (React + Vite)** for our TaskFlow project.

Repo URL:  
https://github.com/varshithpulluri18/taskflow-frontend.git

---

1.Clone the project
Open a terminal and run:
git clone https://github.com/varshithpulluri18/taskflow-frontend.git
cd taskflow-frontend 
2. Install dependencies
From inside the project folder (where package.json is):
npm install
3. Run the frontend
Start the Vite dev server with:
npm run dev
4. What you can see on the frontend
Once the app is running, you can navigate through:
Login / Signup
Dashboard – TaskFlow overview, My upcoming tasks, Recent activity
My Tasks – add tasks, set due dates, mark complete
Calendar – month/week/day views, tasks with due dates show up on their dates
Teams / Team Board – simple Kanban-style columns
Notifications – notifications page wired to axios
Right now, some data may be mock/empty until the backend is fully connected, but the UI and routing are ready.
5. Important note about login (dev fallback)

Right now, the backend is still being finished.

The frontend already uses **axios** to call these auth endpoints:

- `POST /auth/login`
- `POST /auth/signup`
- `GET /auth/me`
- `POST /auth/logout`

However, to make sure everyone can still see all the pages (Dashboard, Tasks, Calendar, Teams, Notifications) even if the backend is not running, we added a small dev fallback in `AuthContext`.

What this means for you:

- When you try to Login or Sign up:
  - If the backend is running and responds correctly → we use the real user from the backend.
  - If the backend is not running or returns an error, the app will log you in as a demo user instead.
- In both cases, you will be able to:
  - Access dashboard, tasks, calendar, teams, notifications.
  - Click around and see the full UI

So even without the backend, you can still open the app, log in with any email/password, and explore all the screens.  
Once the backend teammate finishes their APIs, the same login flow will automatically start using real data.
