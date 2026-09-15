import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ProductList from "./pages/products/ProductsList.jsx";
import ProductDetailes from "./pages/products/ProductDetailes.jsx";
import EditProduct from "./pages/products/EditProduct.jsx";
import UsersPage from "./pages/users/UsersPage.jsx";
import AddProduct from "./pages/products/AddProduct.jsx";
import Settings from "./pages/Settings.jsx";
import CartsList from "./pages/carts/CartsList.jsx";
import PageLoader from "./components/loader/PageLoader";
import Orders from "./pages/Orders/Orders.jsx";

import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useState,useEffect } from "react";
import { deleteProduct, getProducts } from "./api/productApi.js";

function App() {
  const [products, setProducts] = useState([]);

useEffect(()=>{
    const fetchAppProducts = async() =>{
        try{
          const data = await getProducts()
          if(data && data.products){
            setProducts(data.products)
          }

        }catch (error) {
        console.error("Error loading products from server:", error);
      }
    }
    fetchAppProducts()
},[])


const handleUpdateProduct = (updatedProduct)=>{
    setProducts(prevProducts => prevProducts.map(p=> p._id === updatedProduct._id? updatedProduct: p))
}

const handleAddedProduct = (AddedProduct)=>{
    setProducts((prevProducts)=>[...prevProducts, AddedProduct])
}

const handleDeleteProduct = async (productId)=>{
    try{
    if (!window.confirm("Are you sure you want to delete this product?")) {
        return; 
    }
    const idDelete = typeof productId === 'object' ? productId._id : productId
    await deleteProduct(idDelete)
    window.location.reload();
    }catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete the product. Please try again.");
    }
}

return (
 <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
      <div>
        <PageLoader>
        <Routes>
      
          <Route path="/login" element={<Login />} />

            {/* Protected Admin Pages */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Products */}
                <Route path="/products" element={<ProductList products={products} onDelete={handleDeleteProduct}/>} />
                <Route path="/products/add" element={<AddProduct products={products} setProducts={setProducts} onAdd={handleAddedProduct}/>}/>
                <Route path="/products/:id" element={<ProductDetailes products={products}/>}/>
                <Route path="/products/update/:id" element={<EditProduct products={products} setProducts={setProducts} onUpdate={handleUpdateProduct}/>}/>

               <Route path="/carts" element={<CartsList />} />
               <Route path="/orders" element={<Orders />} />
                {/* Users & Settings */}
                <Route path="/users" element={<UsersPage />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Unknown routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </PageLoader>
      </div>

        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;