# Previous Question Paper Repository

A full-stack web application to store, search, and manage previous examination question papers.

## Technologies Used
- React.js
- Node.js
- Express.js
- MongoDB

## Features
- Add question papers with subject, year, semester, regulation, and exam type.
- Store PDF links for question papers.
- View and search question papers.
- Filter papers by year and semester.
- Delete question papers.

## Requirements
- Node.js and npm
- MongoDB connection URI

## How to Run

### Backend
1. Open a terminal in the project folder.
2. Run:
   `cd server`
3. Install dependencies:
   `npm install`
4. Create a `.env` file inside the `server` folder and add:
   `MONGO_URI=your_mongodb_connection_uri`
5. Start the server:
   `node server.js`

### Frontend
1. Open another terminal.
2. Run:
   `cd client`
3. Install dependencies:
   `npm install`
4. Start React:
   `npm run dev`

Open the local URL shown in the frontend terminal.

## Project Purpose
This project provides a simple platform for organizing and accessing previous examination question papers.
