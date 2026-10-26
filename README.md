# Previous Question Paper Repository

A full-stack web application for storing, viewing, searching, and managing previous question papers.

## Technologies Used

- Frontend: React.js and Vite
- Backend: Node.js and Express.js
- Database: MongoDB Atlas
- HTTP requests: Axios

## Features

- Add question papers with subject, year, semester, regulation, exam type, and PDF link
- View saved question papers
- Filter question papers by year and semester
- Delete question papers

## Project Structure

- `client/` – React frontend
- `server/` – Express backend and API routes
- `.gitignore` – Excludes dependencies and environment files from Git

## Prerequisites

Install Node.js and npm, and configure a MongoDB Atlas database.

## How to Run the Project

### 1. Start the backend

Open a terminal:

```bash
cd server
npm install
```

Create a `server/.env` file containing your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

Keep the actual connection string private. Then start the backend:

```bash
node server.js
```

### 2. Start the frontend

Open a second terminal from the project root:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## Deployment

The frontend is deployed on Vercel, and the backend is deployed on Render. The application uses MongoDB Atlas for database storage.

## Security

Environment files and `node_modules` should not be committed to GitHub. Never publish database credentials or secrets.
