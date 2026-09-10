
import AdminLayout from "./layouts/AdminLayout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import React from "react";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ProductList from "./pages/products/ProductsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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
            <Route path="/products" element={<ProductList />} />
          </Route>

           {/* Keep unknown routes inside the admin area */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
        </AuthProvider>
  );
}

export default App;
