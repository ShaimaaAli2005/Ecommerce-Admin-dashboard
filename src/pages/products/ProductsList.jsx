import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
<<<<<<< HEAD
=======

import placeholderImg from '../../assets/images/placeholder.png';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faFilter, faBox, faPlus} from '@fortawesome/free-solid-svg-icons'

>>>>>>> origin/develop
import ProductCard from "./ProductCard";
import { Navigate, useNavigate } from "react-router-dom";

<<<<<<< HEAD
export default function ProductList() {
  const [products, setProducts] = useState([]);
=======
export default function ProductList({products,onDelete,onAdd}) {
>>>>>>> origin/develop

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

<<<<<<< HEAD
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
=======
    const navigate = useNavigate()
    const handleAddClick = () => {
    navigate('/products/add');
};
>>>>>>> origin/develop

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // Get products without client-side page/search parameters.
        const response = await axiosInstance.get("/products");

        console.log("Products API response:", response.data);

<<<<<<< HEAD
        let productsData = [];
=======
    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen" style={{ backgroundColor: '#F7F5F0' }}>
            {/* Title page */}
           <div className="bg-[#17233C] shadow-sm rounded-3xl p-8 mb-8 max-w-7xl mx-auto mt-6">  
                        <div className="flex flex-col gap-6 relative lg:flex-row lg:items-center lg:justify-between z-10">
                            <div className="flex items-center gap-5">
                               <div className="bg-gray-200 rounded-2xl">
                                  <FontAwesomeIcon icon={faBox} className="text-2xl text-[#17233C] p-3"/>
                              </div>
                              
                              <div>
                                  <p className="text-xs mt-0.5 text-[#E89A5B] uppercase tracking-[0.35em]">Product Dashboard</p>    
                                  <h1 className="text-3xl font-bold text-[#F7F5F0]">Products</h1>
                              </div>
                            </div>
                              

                            <button 
                            className="flex cursor-pointer items-center gap-2.5 border rounded-2xl p-3 text-sm font-bold tracking-wide text-white shadow-md shadow-orange-200 bg-[#E89A5B] hover:bg-[#d48849] hover:shadow-orange-300 transition-all"
                            onClick={handleAddClick}>
                            <FontAwesomeIcon icon={faPlus}/> Add Product
                            </button>
                        </div>
            </div>
    
            {/* Search & Filter Bar */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <span className="absolute  flex items-center py-3 px-2 ">
                        <FontAwesomeIcon icon={faSearch} style={{ color: '#7B8190' }} />
                    </span>
                {/* Search Input */}
                <input 
                    type="text"
                    value={search}
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3  py-2 bg-white outline-none transition"
                    style={{
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                        color: '#1F2937',
                        fontFamily: 'Inter, sans-serif',
                        paddingLeft:'33px'
                    }}
                />
>>>>>>> origin/develop

        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (Array.isArray(response.data?.products)) {
          productsData = response.data.products;
        } else if (Array.isArray(response.data?.data)) {
          productsData = response.data.data;
        }

        // Normalize image so ProductCard always receives an array
        const normalizedProducts = productsData.map((product) => ({
          ...product,
          image: Array.isArray(product.image)
            ? product.image
            : product.image
              ? [product.image]
              : [],
        }));

        console.log("Products:", normalizedProducts);

<<<<<<< HEAD
        setProducts(normalizedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
=======
           {/* Cards Grid */}
            {loading ? (
                <div className="text-center py-12" style={{ color: '#7B8190' }}>Loading...</div>
            ) : currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onDelete={onDelete} onAdd={onAdd}/>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-[#E5E7EB]" style={{ color: '#7B8190' }}>
                    No results for this search
                </div>
            )}
>>>>>>> origin/develop

    fetchProducts();
  }, []);

  // Search + category filter
  const filteredProducts = products.filter((product) => {
    const productName = product.name || "";
    const productCategory = product.category || "";

    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      productCategory.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Total pages
  const numOfPage = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  // Current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  // Reset page when search/filter changes
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory]);

  // Prevent invalid page
  useEffect(() => {
    if (numOfPage > 0 && page > numOfPage) {
      setPage(numOfPage);
    }
  }, [page, numOfPage]);

  return (
    <div
      className="
        min-h-screen
        max-w-7xl
        mx-auto
        p-6
        bg-[#F7F5F0]
        dark:bg-[#111827]
        transition-colors
        duration-300
      "
    >
      {/* Title */}
      <div className="mb-6">
        <h1
          className="
            text-2xl
            font-bold
            text-[#17233C]
            dark:text-white
            font-['Poppins']
          "
        >
          Products
        </h1>

        <p className="mt-1 text-sm text-[#7B8190] dark:text-gray-400">
          Manage your products
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <span
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#7B8190]
            "
          >
            🔍
          </span>

          <input
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              py-2
              pl-10
              pr-3
              rounded-[10px]
              outline-none
              transition
              bg-white
              dark:bg-[#1F2937]
              text-[#1F2937]
              dark:text-white
              placeholder:text-[#7B8190]
              border
              border-[#E5E7EB]
              dark:border-gray-700
              focus:border-[#E89A5B]
            "
          />
        </div>
        

        {/* Filter */}
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="
              px-4
              py-2
              font-medium
              transition
              cursor-pointer
              flex
              items-center
              gap-2
              rounded-[10px]
              border
              border-[#17233C]
              bg-[#17233C]
              text-white
              hover:bg-[#E89A5B]
              hover:border-[#E89A5B]
            "
          >
            <span>
              {selectedCategory === "all"
                ? "Filter"
                : selectedCategory}
            </span>

            {selectedCategory === "all" && (
              <span>⚙️</span>
            )}
          </button>

          {isOpen && (
            <div
              className="
                absolute
                left-0
                mt-2
                w-40
                rounded-xl
                overflow-hidden
                z-50
                shadow-lg
                bg-white
                dark:bg-[#1F2937]
                border
                border-[#E5E7EB]
                dark:border-gray-700
              "
            >
              {[
                "all",
                "Watches",
                "Accessories",
                "Cars",
              ].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsOpen(false);
                    setPage(1);
                  }}
                  className="
                    w-full
                    text-left
                    px-4
                    py-2
                    text-sm
                    transition
                    cursor-pointer
                    hover:bg-gray-100
                    dark:hover:bg-gray-700
                  "
                >
                  <span
                    className={
                      selectedCategory === cat
                        ? "text-[#E89A5B] font-bold"
                        : "text-[#1F2937] dark:text-gray-200"
                    }
                  >
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <div className="text-center py-12 text-[#7B8190] dark:text-gray-400">
          Loading...
        </div>
      ) : currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div
          className="
            text-center
            py-12
            rounded-2xl
            border
            bg-white
            dark:bg-[#1F2937]
            border-[#E5E7EB]
            dark:border-gray-700
            text-[#7B8190]
            dark:text-gray-400
          "
        >
          {loading ? "Loading..." : "No products found"}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-between items-center mt-8">
          {/* Previous */}
          <button
            type="button"
            onClick={() =>
              setPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={page === 1}
            className="
              px-4
              py-2
              font-medium
              transition
              cursor-pointer
              disabled:cursor-not-allowed
              disabled:opacity-50
              rounded-[10px]
              border
              border-[#17233C]
              dark:border-gray-500
              text-[#17233C]
              dark:text-gray-200
              hover:bg-[#17233C]
              hover:text-white
              dark:hover:bg-gray-700
            "
          >
            Previous
          </button>

          {/* Page */}
          <span className="font-medium text-[#7B8190] dark:text-gray-400">
            Page {page} of {numOfPage || 1}
          </span>

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, numOfPage)
              )
            }
            disabled={page >= numOfPage}
            className="
              px-4
              py-2
              text-white
              font-medium
              transition
              cursor-pointer
              bg-[#17233C]
              hover:bg-[#E89A5B]
              rounded-[10px]
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}