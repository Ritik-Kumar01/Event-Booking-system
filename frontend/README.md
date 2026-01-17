
🎟️ Event Booking System (MERN Stack)

A full-stack Event Booking System built using the MERN stack with Stripe payment integration, role-based access control, and real-world booking workflows similar to Eventbrite and Ticketmaster.

🚀 Features
👤 User Features

User registration & login (JWT authentication)

Browse available events

Select number of tickets

Secure payment using Stripe Checkout

Booking confirmation & cancellation handling

View My Bookings (booking history)

Logout functionality

🛠️ Admin Features

Admin-only dashboard

Create new events

Update event price, date & ticket availability

Delete events

Role-based access control (Admin vs User)

💳 Payment & Inventory

Stripe Checkout integration

Secure Stripe Webhooks

Automatic ticket count reduction after successful payment

Booking records saved only after payment confirmation

Protection against over-booking

🧱 Tech Stack
Frontend

React (Vite)

React Router

Context API (Auth Context)

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
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── bookingController.js
│   │   └── webhookController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── webhookRoutes.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Booking.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── Success.jsx
│   │   │   └── Cancel.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   └── App.jsx
│   │
│   └── main.jsx
│
└── README.md

🔐 Authentication & Authorization

JWT-based authentication

Tokens stored securely in localStorage

Protected routes using ProtectedRoute

Admin-only routes using AdminRoute

Backend role checks using middleware

💳 Stripe Payment Flow

User selects event & number of tickets

Backend creates Stripe Checkout Session

User redirected to Stripe Checkout

Stripe sends webhook on payment success

Backend:

Reduces available tickets

Creates booking record

User redirected to success or cancel page

Important:
Ticket reduction and booking creation are handled only via Stripe Webhooks for security.

⚙️ Environment Variables

Create a .env file in backend/:

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

🧪 Test Card for Stripe
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits

🧠 Key Learnings

JWT authentication & role-based access

Secure Stripe payment integration

Stripe webhook handling

Inventory management using server-side events

Clean MERN architecture

Real-world error handling & debugging