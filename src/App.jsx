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
<<<<<<< HEAD
import UsersPage  from './pages/users/UsersPage.jsx';
=======
import AddProduct from "./pages/products/AddProduct.jsx";
import Settings from "./pages/Settings.jsx";
>>>>>>> 24247de387af8aabe98fa4152b84a17816302a07

import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
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

<<<<<<< HEAD
            {/* All admin pages share the same Navbar + Sidebar layout */}
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductList products={products}/>} />
            <Route path="/products/:id" element={<ProductDetailes products={products}/>}/>
            <Route path="/products/edit/:id" element={<EditProduct products={products} setProducts={setProducts}/>}/>
             <Route path="/users" element={<UsersPage />} />
=======
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />
>>>>>>> 24247de387af8aabe98fa4152b84a17816302a07

                <Route
                  path="/products"
                  element={<ProductList />}
                />

                <Route
                  path="/products/:id"
                  element={<ProductDetailes />}
                />

                <Route
                  path="/products/edit/:id"
                  element={<EditProduct />}
                />

                <Route
                  path="/products/add"
                  element={<AddProduct />}
                />

                <Route
                  path="/settings"
                  element={<Settings />}
                />

              </Route>
            </Route>

            {/* Unknown routes */}
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;