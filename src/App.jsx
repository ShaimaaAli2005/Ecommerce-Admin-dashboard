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
import Settings from "./pages/Settings.jsx";

import AdminLayout from "./layouts/AdminLayout.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* Login */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* Admin Dashboard */}
            <Route element={<AdminLayout />}>

              {/* Default Route */}
              <Route
                index
                element={<Dashboard />}
              />

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              {/* Products */}
              <Route
                path="/products"
                element={<ProductList />}
              />

              {/* Product Details */}
              <Route
                path="/products/:id"
                element={<ProductDetailes />}
              />

              {/* Edit Product */}
              <Route
                path="/products/edit/:id"
                element={<EditProduct />}
              />

              {/* Settings */}
              <Route
                path="/settings"
                element={<Settings />}
              />

            </Route>

           
            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;