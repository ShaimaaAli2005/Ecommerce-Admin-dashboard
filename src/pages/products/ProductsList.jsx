import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/products?page=${page}&search=${search}`
      );

      const productsData = Array.isArray(response.data)
        ? response.data
        : response.data.products ||
          response.data.data ||
          [];

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  // Filtering
  const filteredProducts = products.filter((product) => {
    const productName = product.name || "";
    const productCategory = product.category || "";

    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      productCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const numOfPage = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  // Reset page when searching/filtering
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[#F7F5F0] dark:bg-[#111827] transition-colors duration-300">

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#17233C] dark:text-white font-['Poppins']">
          Products
        </h1>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">

        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8190]">
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
              key={product.id}
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
          No results for this search
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">

        {/* Previous */}
        <button
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
          Page: {page} of {numOfPage || 1}
        </span>

        {/* Next */}
        <button
          onClick={() =>
            setPage((prev) => prev + 1)
          }
          disabled={
            numOfPage === 0 ||
            page >= numOfPage
          }
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
    </div>
  );
}