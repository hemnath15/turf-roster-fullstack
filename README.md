# Turf Roster — Full Stack

Mobile-first private turf attendance app for a group of friends.

## Stack
- React + TypeScript + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication + bcrypt password hashing
- Responsive CSS + PWA-ready frontend structure

## Run locally
1. Install Node 20+ and MongoDB (local or Atlas).
2. Copy `server/.env.example` to `server/.env` and set `MONGO_URI` and `JWT_SECRET`.
3. Run `npm install` in the root, then `npm run install:all`.
4. Run `npm run dev`.
5. Frontend: http://localhost:5173
6. API: http://localhost:5000/api/health

First registered account becomes admin. Admin can create sessions and add friends. Members can sign in and update their own attendance.


## Android APK

The project is prepared for Capacitor packaging. See `MOBILE-ANDROID.md` for the complete Android release workflow. The APK is a native Android app container, not a PWA.
