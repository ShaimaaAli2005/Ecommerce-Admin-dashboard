import { useState } from "react";
import AdminLayout from "./layouts/AdminLayout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import React from "react";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ProductList from "./pages/products/ProductsList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductCard from "./pages/products/ProductCard.jsx";
import ProductDetailes from "./pages/products/ProductDetailes.jsx";
import EditProduct from "./pages/products/EditProduct.jsx";
import AddProduct from "./pages/products/AddProduct.jsx";


function App(){

const [products, setProducts] = useState([
    { 
        id: 1, 
        name: 'Vintage Brown Leather Watch', 
        brand: 'Fossil',
        price: 150, 
        category: 'Watches', 
        rating: 4.5, 
        image: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500'
        ],
        short_description: 'Classic vintage leather watch with a timeless design.',
        description: 'Elevate your everyday look with this vintage brown leather watch. Featuring a durable stainless steel case, precise quartz movement, and a genuine leather strap that softens gracefully over time.'
    },
    { 
        id: 2, 
        name: 'Smartwatch', 
        brand: 'Apple',
        price: 230, 
        category: 'Watches', 
        rating: 2.5, 
        image: [
            'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
        ],
        short_description: 'Feature-packed smartwatch for fitness and notifications.',
        description: 'Stay connected on the go with this advanced smartwatch. Tracks your daily workouts, heart rate, sleep patterns, and delivers seamless smartphone notifications right to your wrist.'
    },
    { 
        id: 3, 
        name: 'Black Steel Chronograph', 
        brand: 'Citizen',
        price: 190, 
        category: 'Accessories', 
        rating: 3.2, 
        image: [
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500'
        ],
        short_description: 'Bold black steel chronograph with modern sporty aesthetics.',
        description: 'Make a bold statement with this black steel chronograph. Designed for durability and precision, it features multiple sub-dials, a scratch-resistant mineral crystal, and a sleek dark metal finish.'
    },
    { 
        id: 4, 
        name: 'Ford Mustang GT', 
        brand: 'Ford',
        price: 120, 
        category: 'Cars', 
        rating: 3.2,
        image: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500',
            'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=500'
        ],
        short_description: 'Die-cast model or rental experience of the iconic muscle car.',
        description: 'Experience the raw power and iconic heritage of American muscle. The Ford Mustang GT combines aggressive styling with thrilling performance and an unforgettable engine roar.'
    },
    { 
        id: 5, 
        name: 'Porsche Spider', 
        brand: 'Porsche',
        price: 120, 
        category: 'Cars', 
        rating: 3,
        image: [
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500',
            'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=500'
        ],
        short_description: 'Sleek open-top sports car engineered for pure speed.',
        description: 'The Porsche Spider delivers breathtaking open-top driving dynamics. Crafted with aerodynamic precision, lightweight materials, and world-class german engineering.'
    },
    { 
        id: 6, 
        name: 'Golden Diamond Necklace', 
        brand: 'Cartier',
        price: 450, 
        category: 'Accessories', 
        rating: 5,
        image: [
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'
        ], 
        short_description: 'Exquisite gold necklace adorned with sparkling diamonds.',
        description: 'Add a touch of absolute luxury to your evening attire with this golden diamond necklace. Expertly crafted in high-grade gold and set with brilliant-cut diamonds that catch the light from every angle.'
    },
    { 
        id: 7, 
        name: 'Classic Tan Belt', 
        brand: 'Levi\'s',
        price: 95, 
        category: 'Accessories', 
        rating: 4, 
        image: [
            'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500',
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'
        ],
        short_description: 'Versatile genuine leather tan belt for daily wear.',
        description: 'A wardrobe essential, this classic tan belt pairs effortlessly with both casual jeans and formal trousers. Made from durable full-grain leather with a sturdy metal buckle.'
    },
    { 
        id: 8, 
        name: 'Designer Leather Wallet', 
        brand: 'Gucci',
        price: 60, 
        category: 'Accessories', 
        rating: 4.2, 
        image: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
            'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500'
        ],
        short_description: 'Slim designer leather wallet with multiple card slots.',
        description: 'Keep your cards and cash secure in style. This designer leather wallet features a slim profile that fits comfortably in your pocket while offering ample storage space.'
    },
    { 
        id: 9, 
        name: 'Lamborghini Aventador', 
        brand: 'Lamborghini',
        price: 500, 
        category: 'Cars', 
        rating: 4.9, 
        image: [
            'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=500',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500'
        ],
        short_description: 'High-performance supercar with striking exotic design.',
        description: 'The Lamborghini Aventador is the ultimate definition of an exotic supercar. Boasting a V12 engine, scissor doors, and aggressive aerodynamic lines designed to dominate the road.'
    },
    { 
        id: 10, 
        name: 'BMW M4 Coupe', 
        brand: 'BMW',
        price: 280, 
        category: 'Cars', 
        rating: 4.6,
        image: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500'
        ],
        short_description: 'High-performance luxury sports coupe with aggressive styling.',
        description: 'Combining everyday practicality with track-ready capability, the BMW M4 Coupe delivers sharp handling, twin-turbo power, and a driver-focused luxury cockpit.'
    },
    { 
        id: 11, 
        name: 'BMW M4 Coupe', 
        brand: 'BMW',
        price: 75, 
        category: 'Cars', 
        rating: 4.4,
        image: [
            'https://images.unsplash.com/photo-1611591475271-1d521d8b9288?w=500',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500'
        ],
        short_description: 'Compact performance edition of the iconic German coupe.',
        description: 'An alternative trim variant of the BMW M4 Coupe, offering distinct alloy wheels, custom interior finishes, and dynamic suspension tuning for an exhilarating ride.'
    },
    { 
        id: 12, 
        name: 'Aston Martin Vantage', 
        brand: 'Aston Martin',
        price: 420, 
        category: 'Cars', 
        rating: 4.9, 
        image: [
            'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500'
        ],
        short_description: 'British luxury sports car known for raw elegance and agility.',
        description: 'The Aston Martin Vantage blends predatory styling with supreme British craftsmanship. Powered by a potent engine, it offers an unmatched blend of luxury, comfort, and racetrack performance.'
    },
    { 
        id: 13, 
        name: 'Elegant Diamond Earrings', 
        brand: 'Tiffany & Co.',
        price: 195, 
        category: 'Accessories', 
        rating: 4.8,
        image: [
            'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500',
            'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500'
        ],
        short_description: 'Dazzling diamond earrings designed for special occasions.',
        description: 'Catch every eye with these elegant diamond earrings. Featuring brilliant stones securely set in precious metal, they provide a subtle yet breathtaking sparkle to complement any outfit.'
    },
    { 
        id: 14, 
        name: 'Modern Sunglasses', 
        brand: 'Ray-Ban',
        price: 90, 
        category: 'Accessories', 
        rating: 4.3,
        image: [
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
            'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500'
        ],
        short_description: 'Stylish modern sunglasses with full UV protection.',
        description: 'Protect your eyes while looking effortlessly cool. These modern sunglasses feature polarized lenses to reduce glare, lightweight frames for all-day comfort, and UV400 protection.'
    }
]);

const handleUpdateProduct = (updatedProduct)=>{
    setProducts(products.map(p=> p.id === updatedProduct.id? updatedProduct: p))
}

const handleAddedProduct = (AddedProduct)=>{
    setProducts((prevProducts)=>[...prevProducts, AddedProduct])
}

const handleDeleteProduct = (id)=>{
    alert("Delete this product?")
    setProducts(products.filter(p=>p.id !== id))
}

return (
        <AuthProvider>
               <BrowserRouter>
      <div>
        <Routes>
          {/* صفحة تسجيل الدخول */}
          <Route path="/login" element={<Login />} />

            {/* All admin pages share the same Navbar + Sidebar layout */}
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductList products={products} onDelete={handleDeleteProduct}/>} />
            <Route path="/products/:id" element={<ProductDetailes products={products}/>}/>
            <Route path="/products/edit/:id" element={<EditProduct products={products} setProducts={setProducts} onUpdate={handleUpdateProduct}/>}/>
            <Route path="/products/add/" element={<AddProduct products={products} setProducts={setProducts} onAdd={handleAddedProduct}/>}/>
          </Route>

           {/* Keep unknown routes inside the admin area */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
        </AuthProvider>


  )
}

export default App;
