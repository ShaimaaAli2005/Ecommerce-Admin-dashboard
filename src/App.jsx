
import { useState } from "react";
import ProductDetailes from "./pages/products/ProductDetailes"
import ProductList from "./pages/products/ProductsList"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ProductList from "./pages/products/ProductsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App(){

  const [products, setProducts] = useState([
        { id: 1, name: 'Vintage Brown Leather Watch', price: 150, category: 'Watches', rating: 4.5, 
            image: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500'
            ]
         },
{ id: 2, name: 'Smartwatch', price: 230, category: 'Watches', rating: 2.5, 
    image: [
    'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500' ,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ]
},
{ id: 3, name: 'Black Steel Chronograph', price: 190, category: 'Accessories', rating: 3.2, 
    image: [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500' ,
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500'
    ]
},
{ id: 4, name: 'Ford Mustang GT', price: 120, category: 'Cars', rating: 3.2,
     image:[
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500' ,
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=500'
     ]  
    },
{ id: 5, name: 'Porsche Spider', price: 120, category: 'Cars', rating: 3,
     image: [
         'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500' ,
         'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=500'
     ]
    },
{ id: 6, name: 'Golden Diamond Necklace', price: 450, category: 'Accessories', rating: 5,
     image:[
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' ,
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'
     ] 
    },
{ id: 7, name: 'Classic Tan Belt', price: 95, category: 'Accessories', rating: 4, 
    image:[
       'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500' ,
       'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'
    ] 
},
{ id: 8, name: 'Designer Leather Wallet', price: 60, category: 'Accessories', rating: 4.2, 
    image: 
    [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500'
    ] 
},
{ id: 9, name: 'Lamborghini Aventador', price: 500, category: 'Cars', rating: 4.9, 
    image: 
    [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=500',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500'
    ]
},
{ id: 10, name: 'BMW M4 Coupe', price: 280, category: 'Cars', rating: 4.6,
     image:
     [
       'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500' ,
       'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500'
     ]
},
{ id: 11, name: 'BMW M4 Coupe', price: 75, category: 'Cars', rating: 4.4,
     image:
     [
      'https://images.unsplash.com/photo-1611591475271-1d521d8b9288?w=500' ,
       'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500'
     ]
},
{ id: 12, name: 'Aston Martin Vantage', price: 420, category: 'Cars', rating: 4.9, 
    image: 
    [
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500', 
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500'
    ]
},
{ id: 13, name: 'Elegant Diamond Earrings', price: 195, category: 'Accessories', rating: 4.8,
     image:
     [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500'
     ]
},
{ id: 14, name: 'Modern Sunglasses', price: 90, category: 'Accessories', rating: 4.3,
     image:
     [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500' ,
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500'
     ]
}

    ]);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>

          {/* دي صفحة المنتجات هتظهر لما تدخلي على الصفحة الرئيسية */}
          <Route path="/" element={<ProductList products={products}/>} />
          
          {/* دي صفحة تسجيل الدخول */}
          <Route path="/login" element={<Login />} />

          {/*product detailes page*/}
          <Route path="/products/:id" element={<ProductDetailes products={products}/>}/>
          {/* صفحة تسجيل الدخول */}
          <Route path="/login" element={<Login />} />
          {/* الصفحة الرئيسية للـ Dashboard */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/users" element={<Users />} /> */}
          {/* صفحة المنتجات على مسار منفصل */}
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}}

export default App;
