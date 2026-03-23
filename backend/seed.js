const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const users = [
  { name: 'Admin User', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
  { name: 'Manish Sharma', email: 'Manish@gmail.com', password: 'manish123' },
];

const products = [
  {
    name: 'Premium Stainless Steel Sports Water Bottle 900ml',
    description: 'Premium stainless steel sports water bottle with flip top lid. Keeps drinks cold for 24 hours and hot for 12 hours. Leak-proof design, perfect for gym, sports and outdoor activities. Capacity: 900ml.',
    price: 399,
    originalPrice: 599,
    supplierPrice: 150,
    supplierName: 'Deodap',
    supplierLink: 'https://deodap.in/products/customized-premium-stainless-steel-sports-water-bottle-with-flip-top-lid-900-ml',
    category: 'Home',
    brand: 'Deodap',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80'],
    stock: 100,
    featured: true,
    rating: 4.3,
    numReviews: 56,
    tags: ['water bottle', 'sports', 'steel'],
  },
  {
    name: 'Portable Mini Handheld Fan for Personal Cooling',
    description: 'Compact and lightweight portable mini handheld fan for personal cooling on the go. USB rechargeable with long battery life. Perfect for travel, office, outdoor use. 3 speed settings.',
    price: 299,
    originalPrice: 499,
    supplierPrice: 120,
    supplierName: 'Deodap',
    supplierLink: 'https://deodap.in/products/portable-mini-handheld-fan-for-personal-cooling-1-pc',
    category: 'Home',
    brand: 'Deodap',
    images: ['https://images.unsplash.com/photo-1718815416565-c65944a5ec14?w=600&q=80'],
    stock: 150,
    featured: true,
    rating: 4.1,
    numReviews: 89,
    tags: ['fan', 'portable', 'cooling'],
  },
  {
    name: 'Electronic Kitchen Digital Weighing Scale 10kg',
    description: 'Multipurpose digital kitchen weighing scale with LCD display. Measures up to 10kg with high accuracy. Ideal for cooking, baking and nutrition tracking. Tare function included. Runs on AAA batteries.',
    price: 599,
    originalPrice: 999,
    supplierPrice: 250,
    supplierName: 'Deodap',
    supplierLink: 'https://deodap.in/products/generic-electronic-kitchen-digital-weighing-scale-multipurpose-white-10-kg',
    category: 'Home',
    brand: 'Deodap',
    images: ['https://images.unsplash.com/photo-1609612030262-f86022fba69b?w=600&q=80'],
    stock: 80,
    featured: false,
    rating: 4.4,
    numReviews: 112,
    tags: ['kitchen', 'weighing scale', 'cooking'],
  },
  {
    name: 'Portable USB Electric Juicer Blender Mixer 380ml',
    description: 'Portable USB rechargeable electric juicer blender for fresh juices and smoothies on the go. 380ml capacity with powerful motor and stainless steel blades. Easy to clean, travel-friendly design.',
    price: 849,
    originalPrice: 1299,
    supplierPrice: 350,
    supplierName: 'Deodap',
    supplierLink: 'https://deodap.in/products/portable-usb-electric-juicer-blender-mixer-protein-shaker-380ml',
    category: 'Home',
    brand: 'Deodap',
    images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80'],
    stock: 60,
    featured: true,
    rating: 4.2,
    numReviews: 74,
    tags: ['juicer', 'blender', 'portable', 'kitchen'],
  },
  {
    name: '104 Key Colorful Lighting Keyboard & Mouse Combo',
    description: 'Full-size 104 key keyboard with colorful RGB backlight and optical mouse combo set. Ergonomic design with quiet keys, plug and play USB connection. Compatible with Windows, Mac and Linux.',
    price: 1099,
    originalPrice: 1799,
    supplierPrice: 450,
    supplierName: 'Deodap',
    supplierLink: 'https://deodap.in/products/13582_colorful_keyboard_n_mouse_set',
    category: 'Electronics',
    brand: 'Deodap',
    images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80'],
    stock: 45,
    featured: true,
    rating: 4.5,
    numReviews: 203,
    tags: ['keyboard', 'mouse', 'computer', 'rgb'],
  },
  {
    name: 'Wireless Bluetooth Soundbar Speaker with Mobile Stand',
    description: 'Wireless Bluetooth soundbar speaker with built-in mobile stand. Supports Bluetooth, USB, SD card and AUX connectivity. Deep bass with clear treble, perfect for home and outdoor use. Rechargeable battery.',
    price: 1299,
    originalPrice: 2199,
    supplierPrice: 550,
    supplierName: 'Deodap',
    supplierLink: 'https://deodap.in/products/wireless-bluetooth-soundbar-speaker-with-mobile-stand-multi-connectivity-mix-color',
    category: 'Electronics',
    brand: 'Deodap',
   images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80'],
    stock: 35,
    featured: true,
    rating: 4.3,
    numReviews: 167,
    tags: ['speaker', 'bluetooth', 'soundbar', 'wireless'],
  },
  {
    name: 'Chronograph Style Analog Wrist Watch - Black Dial',
    description: 'Stylish chronograph style analog wrist watch with multi-function black dial and black silicone strap. Water resistant, scratch resistant mineral glass. Suitable for casual and formal occasions.',
    price: 799,
    originalPrice: 1499,
    supplierPrice: 300,
    supplierName: 'Deodap',
    supplierLink: 'https://deodap.in/products/chronograph-style-analog-wrist-watch-with-multi-function-black-dial-and-black-silicone-strap',
    category: 'Fashion',
    brand: 'Deodap',
   images: ['https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&q=80'],
    stock: 70,
    featured: false,
    rating: 4.0,
    numReviews: 93,
    tags: ['watch', 'analog', 'chronograph', 'fashion'],
  },
  {
    name: 'Professional Adjustable Inline Skates for Kids & Adults',
    description: 'Professional adjustable inline skates suitable for both kids and adults. Durable frame with high grip wheels and comfortable padded boot. Adjustable size fits multiple shoe sizes. Includes protective gear bag.',
    price: 1699,
    originalPrice: 2999,
    supplierPrice: 700,
    supplierName: 'Deodap',
    supplierLink: 'https://deodap.in/products/professional-adjustable-inline-skates-for-kids-and-adults-1-pair',
    category: 'Sports',
    brand: 'Deodap',
   images: ['https://images.unsplash.com/photo-1624232402274-278ff3ab0f7c?w=600&q=80'],
    stock: 25,
    featured: true,
    rating: 4.6,
    numReviews: 48,
    tags: ['skates', 'inline skates', 'sports', 'kids'],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await User.deleteMany();
  await Product.deleteMany();

  const createdUsers = await User.create(users);
  console.log(`✅ ${createdUsers.length} users created`);

  const createdProducts = await Product.create(products);
  console.log(`✅ ${createdProducts.length} products created`);

  console.log('\n🌱 Seed data inserted successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin Login:  admin@shopwave.com  /  admin123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n💰 Profit Summary:');
  createdProducts.forEach(p => {
    const profit = p.price - p.supplierPrice;
    console.log(`  ${p.name.substring(0, 40).padEnd(40)} ₹${profit} profit`);
  });
  
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
