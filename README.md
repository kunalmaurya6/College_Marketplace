# ApanaMart 🎓🛒

 <img width="542" height="165" alt="logo" src="https://github.com/user-attachments/assets/ee9a3fd6-7e3a-4905-bbb4-4edd3f991af6" />

ApanaMart is a MERN-stack marketplace for college students to buy, sell, save, and chat about pre-owned campus essentials such as books, electronics, fashion items, home decor, and other useful products.

## Features

- Student authentication with JWT, HTTP-only cookie support, and local token storage
- Product browsing with approved and available listings
- Seller dashboard for adding, editing, deleting, and marking products as sold
- Product image uploads through Cloudinary
- Admin review flow for approving, rejecting, filtering, and deleting listings
- Cart and favorites support for buyers
- Real-time private chat with Socket.IO
- Protected user, seller, and admin routes

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS, Socket.IO Client |
| Backend | Node.js, Express 5, MongoDB, Mongoose, Socket.IO |
| Auth & Validation | JWT, bcrypt, Joi |
| Uploads | Multer, Cloudinary |
| Deployment Config | Vercel |

## Project Structure

```text
College_Marketplace/
├── backend/
│   ├── index.js
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── utils/
│   └── vite.config.js
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB database connection string
- Cloudinary account for product image uploads


## Installation

Clone the repository and install dependencies for both apps:

```bash
git clone https://github.com/kunalmaurya6/College_Marketplace.git
cd College_Marketplace

cd backend
npm install

cd ../frontend
npm install
```

## Running Locally

Start the backend API:

```bash
cd backend
npm start
```

The backend uses the `PORT` value from `backend/.env`, for example `http://localhost:5000`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

The Vite app runs at `http://localhost:5173`. The backend CORS configuration is currently set up for this local frontend URL.

## Available Scripts

Backend:

```bash
npm start
npm run vercel-start
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
