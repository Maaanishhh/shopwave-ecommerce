# 🛍️ ShopWave — Indian Dropshipping E-Commerce Platform

![ShopWave](https://img.shields.io/badge/Stack-MERN-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Live-brightgreen) ![Currency](https://img.shields.io/badge/Currency-INR-orange)

A production-ready **dropshipping e-commerce platform** built with the MERN stack. Products are sourced from Indian wholesale supplier **Deodap** with automatic profit margin tracking in the admin dashboard.

🌐 **Live Demo:** [https://shopwave-ecommerce-two.vercel.app](https://shopwave-ecommerce-two.vercel.app)

---

## 🚀 Features

### 🛒 Customer Features
- Browse products with category filters and search
- Product detail pages with reviews and ratings
- Add to cart with quantity management
- Secure checkout with shipping address
- Order history and tracking
- User profile management

### 👑 Admin Features
- **Profit Dashboard** — see cost, selling price and profit per product
- **Supplier Management** — store supplier name, cost price and product link
- **Product CRUD** — add, edit, delete products with supplier info
- **Order Management** — update order status (pending → shipped → delivered)
- **User Management** — view and manage all users

### 🔐 Security
- JWT Authentication with secure token storage
- Role-based access control (Admin / User)
- Password hashing with bcryptjs
- Protected routes on frontend and backend

---

## 💰 Dropshipping Model

```
Supplier (Deodap) → You (ShopWave) → Customer
     ₹150          +  ₹249 profit  =   ₹399
```

Products are sourced from **Deodap.in** (Indian wholesale supplier). Admin can track:
- **Cost Price** — what you pay the supplier
- **Selling Price** — what customer pays
- **Profit** — automatically calculated per product

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| State | React Context API |
| Deployment | Vercel (Frontend) + Render (Backend) + MongoDB Atlas (DB) |

---

## 📁 Project Structure

```
shopwave/
├── frontend/               # React app
│   ├── src/
│   │   ├── components/     # Navbar, Footer, ProductCard
│   │   ├── pages/          # All page components
│   │   ├── context/        # Auth & Cart context
│   │   └── utils/          # Axios config
│   └── package.json
│
├── backend/                # Express API
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas
│   ├── middleware/         # Auth middleware
│   ├── seed.js             # Sample data with Deodap products
│   └── server.js
│
└── README.md
```

---

## 🛍️ Products (from Deodap)

| Product | Cost | Selling Price | Profit |
|---------|------|--------------|--------|
| Steel Water Bottle 900ml | ₹150 | ₹399 | ₹249 |
| Mini Handheld Fan | ₹120 | ₹299 | ₹179 |
| Kitchen Weighing Scale 10kg | ₹250 | ₹599 | ₹349 |
| USB Juicer Blender 380ml | ₹350 | ₹849 | ₹499 |
| RGB Keyboard & Mouse Combo | ₹450 | ₹1099 | ₹649 |
| Bluetooth Soundbar Speaker | ₹550 | ₹1299 | ₹749 |
| Chronograph Wrist Watch | ₹300 | ₹799 | ₹499 |
| Adjustable Inline Skates | ₹700 | ₹1699 | ₹999 |

---

## ⚙️ Getting Started Locally

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/Maaanishhh/shopwave-ecommerce.git
cd shopwave-ecommerce
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopwave
JWT_SECRET=shopwave_secret_key_123
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

```bash
node seed.js    # Load sample products
npm run dev     # Start backend
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. One Command (from root)
```bash
npm install
npm start
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shopwave.com | admin123 |
| User | manish@gmail.com | manish123 |

---

## 📸 Pages

| Page | Description |
|------|-------------|
| `/` | Homepage with hero + featured products |
| `/products` | Product listing with filters & search |
| `/products/:id` | Product detail with reviews |
| `/cart` | Cart with quantity management |
| `/checkout` | Checkout with shipping address |
| `/login` `/signup` | Auth pages |
| `/admin` | Admin dashboard (admin only) |
| `/admin/products` | Product management with profit tracking |
| `/admin/orders` | Order management |
| `/admin/users` | User management |

---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://shopwave-ecommerce-two.vercel.app |
| Backend | Render | https://shopwave-ecommerce-rcqn.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

---

## 📄 License

MIT © 2024 ShopWave
