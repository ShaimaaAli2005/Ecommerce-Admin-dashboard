import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faPlus, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard";

export default function ProductList({ products = [], onDelete, onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/products/add");
  };

  // Filtration logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const numOfPage = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[#F7F5F0]">
      {/* Title page */}
      <div className="bg-[#17233C] shadow-sm rounded-3xl p-8 mb-8 max-w-7xl mx-auto mt-6">
        <div className="flex flex-col gap-6 relative lg:flex-row lg:items-center lg:justify-between z-10">
          <div className="flex items-center gap-5">
            <div className="bg-gray-200 rounded-2xl">
              <FontAwesomeIcon icon={faBox} className="text-2xl text-[#17233C] p-3" />
            </div>

            <div>
              <p className="text-xs mt-0.5 text-[#E89A5B] uppercase tracking-[0.35em]">
                Product Dashboard
              </p>
              <h1 className="text-3xl font-bold text-[#F7F5F0]">Products</h1>
            </div>
          </div>

          <button
            className="flex cursor-pointer items-center gap-2.5 border rounded-2xl p-3 text-sm font-bold tracking-wide text-white shadow-md shadow-orange-200 bg-[#E89A5B] hover:bg-[#d48849] hover:shadow-orange-300 transition-all"
            onClick={handleAddClick}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Product
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 relative">
        {/* Search Input Container */}
        <div className="relative w-full md:w-1/3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-[#7B8190]" />
          </span>
          <input
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full py-2 pl-9 pr-4 bg-white outline-none transition rounded-[10px] border border-[#E5E7EB] text-[#1F2937] font-sans"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="relative inline-block">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 font-medium transition cursor-pointer flex items-center gap-2 rounded-[10px] border border-[#E5E7EB] text-white font-sans bg-[#17233C]"
          >
            {selectedCategory === "all" ? "Filter" : selectedCategory}
            {selectedCategory === "all" && <FontAwesomeIcon icon={faFilter} />}
          </button>

          {isOpen && (
            <div className="absolute left-0 md:right-0 md:left-auto mt-2 w-40 bg-white dark:bg-[#1F2937] shadow-lg rounded-xl border border-[#E5E7EB] dark:border-gray-700 overflow-hidden z-50">
              {["all", "Watches", "Accessories", "Cars"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsOpen(false);
                    setPage(1);
                  }}
                  className="w-full text-left px-4 py-2 text-sm transition hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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

      {/* Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-[#7B8190] dark:text-gray-400">
          Loading...
        </div>
      ) : currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              onDelete={onDelete}
              onAdd={onAdd}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB] dark:border-gray-700 text-[#7B8190] dark:text-gray-400">
          No products found
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-[10px] border border-[#17233C] dark:border-gray-500 text-[#17233C] dark:text-gray-200 hover:bg-[#17233C] hover:text-white dark:hover:bg-gray-700"
          >
            Previous
          </button>

          <span className="font-medium text-[#7B8190] dark:text-gray-400">
            Page {page} of {numOfPage || 1}
          </span>

          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(prev + 1, numOfPage))}
            disabled={page >= numOfPage}
            className="px-4 py-2 text-white font-medium transition cursor-pointer bg-[#17233C] hover:bg-[#E89A5B] rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}