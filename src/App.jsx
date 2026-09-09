import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ProductList from "./pages/products/ProductsList.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login has its own layout */}
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
