🎟️ Event Booking System (MERN Stack)

A full-stack Event Booking System built using the MERN stack with Stripe payment integration, role-based access control, and real-world booking workflows similar to Eventbrite and Ticketmaster.

🚀 Features
👤 User Features

User registration and login (JWT authentication)

Browse available events

Select number of tickets

Secure payments via Stripe Checkout

Booking confirmation and cancellation handling

View booking history (My Bookings)

Logout functionality

🛠️ Admin Features

Admin-only dashboard

Create new events

Update event details (price, date, ticket availability)

Delete events

Role-based access control (Admin vs User)

💳 Payment & Inventory Management

Stripe Checkout integration

Secure Stripe Webhooks

Automatic ticket reduction after successful payment

Booking records created only after payment confirmation

Protection against over-booking

🧱 Tech Stack
Frontend

React (Vite)

React Router

Context API (Authentication)

Fetch API

Basic CSS / Inline styling

Backend

Node.js

Express.js

MongoDB & Mongoose

JWT Authentication

Stripe API

Stripe CLI (Webhooks)

🗂️ Project Structure
Event Management System/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.jsx
│   └── main.jsx
│
└── README.md

🔐 Authentication & Authorization

JWT-based authentication

Tokens stored securely in localStorage

Protected routes using ProtectedRoute

Admin-only routes using AdminRoute

Backend role validation using middleware

💳 Stripe Payment Flow

User selects an event and number of tickets

Backend creates a Stripe Checkout session

User is redirected to Stripe Checkout

Stripe sends a webhook on successful payment

Backend:

Reduces available tickets

Creates a booking record

User is redirected to Success or Cancel page

Important:
Ticket reduction and booking creation are handled only through Stripe Webhooks for maximum security.

⚙️ Environment Variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_********
STRIPE_WEBHOOK_SECRET=whsec_********

▶️ Running the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Stripe Webhook Listener
stripe listen --forward-to localhost:5000/api/webhook/stripe

🧪 Stripe Test Card

Card Number: 4242 4242 4242 4242

Expiry Date: Any future date

CVV: Any 3 digits

🧠 Key Learnings

JWT authentication and role-based access control

Secure Stripe payment integration

Stripe webhook handling

Server-side inventory management

Clean MERN architecture

Real-world error handling and debugging