🛍️ ShopWave — Indian Dropshipping E-Commerce Platform
Show Image Show Image Show Image Show Image
A production-ready dropshipping e-commerce platform built with the MERN stack. Products are sourced from Indian wholesale supplier Deodap with automatic profit margin tracking in the admin dashboard.
🌐 Live Demo: https://shopwave-ecommerce-two.vercel.app

🚀 Features
🛒 Customer Features

Browse products with category filters and search
Product detail pages with reviews and ratings
Add to cart with quantity management
Secure checkout with shipping address
Order history and tracking
User profile management

👑 Admin Features

Profit Dashboard — see cost, selling price and profit per product
Supplier Management — store supplier name, cost price and product link
Product CRUD — add, edit, delete products with supplier info
Order Management — update order status (pending → shipped → delivered)
User Management — view and manage all users

🔐 Security

JWT Authentication with secure token storage
Role-based access control (Admin / User)
Password hashing with bcryptjs
Protected routes on frontend and backend


💰 Dropshipping Model
Supplier (Deodap) → You (ShopWave) → Customer
     ₹150          +  ₹249 profit  =   ₹399
Products are sourced from Deodap.in (Indian wholesale supplier). Admin can track:

Cost Price — what you pay the supplier
Selling Price — what customer pays
Profit — automatically calculated per product


🧰 Tech Stack
LayerTechnologyFrontendReact 18, Tailwind CSS, React RouterBackendNode.js, Express.jsDatabaseMongoDB + MongooseAuthJWT + bcryptjsStateReact Context APIDeploymentVercel (Frontend) + Render (Backend) + MongoDB Atlas (DB)

📁 Project Structure
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

🛍️ Products (from Deodap)
ProductCostSelling PriceProfitSteel Water Bottle 900ml₹150₹399₹249Mini Handheld Fan₹120₹299₹179Kitchen Weighing Scale 10kg₹250₹599₹349USB Juicer Blender 380ml₹350₹849₹499RGB Keyboard & Mouse Combo₹450₹1099₹649Bluetooth Soundbar Speaker₹550₹1299₹749Chronograph Wrist Watch₹300₹799₹499Adjustable Inline Skates₹700₹1699₹999

⚙️ Getting Started Locally
Prerequisites

Node.js >= 18
MongoDB (local or Atlas)

1. Clone the repo
bashgit clone https://github.com/Maaanishhh/shopwave-ecommerce.git
cd shopwave-ecommerce
2. Backend Setup
bashcd backend
npm install
Create backend/.env:
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopwave
JWT_SECRET=shopwave_secret_key_123
CLIENT_URL=http://localhost:3000
NODE_ENV=development
bashnode seed.js    # Load sample products
npm run dev     # Start backend
3. Frontend Setup
bashcd frontend
npm install
npm start
4. One Command (from root)
bashnpm install
npm start

🔑 Demo Credentials
RoleEmailPasswordAdminadmin@shopwave.comadmin123Usermanish@gmail.commanish123

📸 Pages
PageDescription/Homepage with hero + featured products/productsProduct listing with filters & search/products/:idProduct detail with reviews/cartCart with quantity management/checkoutCheckout with shipping address/login /signupAuth pages/adminAdmin dashboard (admin only)/admin/productsProduct management with profit tracking/admin/ordersOrder management/admin/usersUser management

🌐 Deployment
ServicePlatformURLFrontendVercelhttps://shopwave-ecommerce-two.vercel.appBackendRenderhttps://shopwave-ecommerce-rcqn.onrender.comDatabaseMongoDB AtlasCloud hosted

📄 License
MIT © 2024 ShopWave
