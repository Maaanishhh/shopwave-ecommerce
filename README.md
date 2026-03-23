# 🛍️ ShopWave — Full-Stack E-Commerce Platform

A production-ready e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

![ShopWave](https://img.shields.io/badge/Stack-MERN-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 🚀 Features

- 🔐 **JWT Authentication** — Secure login & signup with hashed passwords
- 🛒 **Shopping Cart** — Add, remove, update quantities with persistent state
- 💳 **Stripe Checkout** — Real payment integration with order confirmation
- 📦 **Product Management** — Category filtering, search, and sorting
- 🧑‍💼 **Admin Dashboard** — Manage products, orders, and users
- 📱 **Fully Responsive** — Mobile-first design with Tailwind CSS
- 🌐 **REST API** — Clean, documented API with Express

---

## 🧰 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Tailwind CSS, Axios     |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB + Mongoose                |
| Auth       | JWT + bcryptjs                    |
| Payments   | Stripe                            |
| State      | React Context API                 |

---

## 📁 Project Structure

```
shopwave/
├── frontend/               # React app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── context/        # Auth & Cart context
│   │   └── utils/          # Axios config, helpers
│   └── package.json
│
├── backend/                # Express API
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas
│   ├── middleware/         # Auth middleware
│   └── server.js
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- Stripe account (for payments)

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/shopwave.git
cd shopwave
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # Fill in your secrets
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables

Create `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopwave
JWT_SECRET=your_super_secret_key
STRIPE_SECRET_KEY=sk_test_...
```

Create `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_KEY=pk_test_...
```

---

## 📸 Pages

| Page | Description |
|------|-------------|
| `/` | Homepage with hero + featured products |
| `/products` | Product listing with filters & search |
| `/products/:id` | Product detail with reviews |
| `/cart` | Cart with quantity management |
| `/checkout` | Stripe-powered checkout |
| `/login` `/signup` | Auth pages |
| `/admin` | Admin dashboard (admin role only) |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT © 2024 ShopWave
