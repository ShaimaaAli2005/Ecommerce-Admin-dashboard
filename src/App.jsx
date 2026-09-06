

import ProductList from "./pages/products/ProductsList"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";


function App(){
  return(
    <BrowserRouter>
    <div>
        <Routes>
          {/* دي صفحة المنتجات هتظهر لما تدخلي على الصفحة الرئيسية */}
          <Route path="/" element={<ProductList />} />
          
          {/* دي صفحة تسجيل الدخول */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      </BrowserRouter>
  )

 }

export default App;
