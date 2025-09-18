// src/data/products.js
// Simple products array. Images use the public/ folder path: /images/newimg/yourfile.jpg
// Put your images in public/images/newimg/ so these paths work without bundler imports.

const products = [
  {
    id: 1,
    name: "Main Door Handle",
    model: "LX/MD-01",
    image: "/images/newimgs/md1.jpg",
    hoverImage: "/images/newimgs/md1.jpg",
    description: "Durable main door handle with elegant finish.",
    fullDescription:
      "Elegant and durable main door handle made from high-grade stainless steel with corrosion resistant plating. Suitable for both residential and commercial doors.",
    category: "Main Door Handle",
    colors: ["R.Gold-Corian"],
    sizes: ["96mm", "160mm"],
    inStock: true,
  },
  {
    id: 2,
    name: "Main Door Handle",
    model: "LX/MD-03",
    image: "/images/newimgs/md3.jpg",
    hoverImage: "/images/newimgs/md3.jpg",
    description: "Polished satin finish handle set.",
    fullDescription:
      "Hand-polished satin finish with ergonomic grip. Ideal for modern interior and main doors.",
    category: "Main Door Handle",
    colors: ["Gold-Corian"],
    sizes: ["96mm", "160mm"],
    inStock: true,
  },
  {
    id: 3,
    name: "Main Door Handle",
    model: "LX/MD-04",
    image: "/images/newimgs/md4.jpg",
    hoverImage: "/images/newimgs/md4.jpg",
    description: "Heavy duty mortise lock for security doors.",
    fullDescription:
      "Robust mortise lock with 3-point locking option. High durability, recommended for commercial applications.",
    category: "Main Door Handle",
    colors: ["Black-Corian"],
     sizes: ["96mm", "160mm"],
    inStock: true,
  },
  {
    id: 4,
    name: "Main Door Handle",
    model: "LX/MD-05",
    image: "/images/newimgs/md5.jpg",
    hoverImage: "/images/newimgs/md5-1.jpg",
    description: "Minimal slim cabinet handle.",
    fullDescription:
      "Low-profile design suitable for kitchen cabinets and wardrobes. Available in multiple finishes.",
    category: "Main Door Handle",
    colors: ["AB-Gold", "Black-R.Gold","Black-Gold"],
    sizes: ["10", "6","10"],
    inStock: true,
  },
  {
    id: 5,
    name: "Door Stopper - Magnetic",
    model: "DS/M-05",
    image: "/images/newimg/stopper1.jpg",
    hoverImage: "/images/newimg/stopper1-2.jpg",
    description: "Magnetic floor-mounted door stopper.",
    fullDescription:
      "Strong neodymium magnet ensures door stays open when required. Rust-resistant coating.",
    category: "Accessories",
    colors: ["Black"],
    sizes: ["Standard"],
    inStock: true,
  },
  {
    id: 6,
    name: "Hinge - Heavy Duty",
    model: "HG/HD-09",
    image: "/images/newimg/hinge1.jpg",
    hoverImage: "/images/newimg/hinge1-2.jpg",
    description: "Concealed heavy duty hinge for main doors.",
    fullDescription:
      "High-load bearing concealed hinge with adjustable tension. Perfect for wooden main doors.",
    category: "Door Hardware",
    colors: ["Steel"],
    sizes: ["Standard"],
    inStock: true,
  },
];

export default products;
