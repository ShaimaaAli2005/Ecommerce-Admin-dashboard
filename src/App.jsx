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

import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Pages */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Products */}
                <Route path="/products" element={<ProductList products={products} />} />
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/products/:id" element={<ProductDetailes products={products} />} />
                <Route path="/products/edit/:id" element={<EditProduct products={products} setProducts={setProducts} />} />
                
                {/* Users & Settings */}
                <Route path="/users" element={<UsersPage />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Unknown routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;