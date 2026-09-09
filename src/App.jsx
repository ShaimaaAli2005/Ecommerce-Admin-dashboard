import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ProductList from "./pages/products/ProductsList";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

         
          <Route path="/login" element={<Login />} />

        
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Sidebar />
                <Dashboard />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Sidebar />
                <Dashboard />
              </>
            }
          />

     
          <Route
            path="/products"
            element={
              <>
                <Navbar />
                <Sidebar />
                <ProductList />
              </>
            }
          />

       
          <Route
            path="/test"
            element={
              <>
                <Navbar />
                <Sidebar />
              </>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

