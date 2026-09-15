<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faPlus,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
=======

import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

import placeholderImg from '../../assets/images/placeholder.png';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faFilter, faBox, faPlus, faStar, faArrowTrendUp, faCubes} from '@fortawesome/free-solid-svg-icons'

>>>>>>> origin/develop
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

export default function ProductList({products,onDelete,onAdd}) {

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    
    const [page, setPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(6);

    const navigate = useNavigate()
    const handleAddClick = () => {
    navigate('/products/add');
};


<<<<<<< HEAD
  // Filtration logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  const numOfPage = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[#F7F5F0] dark:bg-[#111827] transition-colors duration-300">

      {/* Title page */}
      <div className="bg-[#17233C] shadow-sm rounded-3xl p-8 mb-8 max-w-7xl mx-auto mt-6">

        <div className="flex flex-col gap-6 relative lg:flex-row lg:items-center lg:justify-between z-10">

          <div className="flex items-center gap-5">

            <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl">
              <FontAwesomeIcon
                icon={faBox}
                className="text-2xl text-[#17233C] dark:text-white p-3"
              />
            </div>

            <div>
              <p className="text-xs mt-0.5 text-[#E89A5B] uppercase tracking-[0.35em]">
                Product Dashboard
              </p>

              <h1 className="text-3xl font-bold text-[#F7F5F0]">
                Products
              </h1>
=======

    // filteration
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()); //true or false
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentProducts = filteredProducts.slice(startIndex,endIndex) 

    const numOfPage = Math.ceil(filteredProducts.length / itemsPerPage)
    
    const totalProducts = currentProducts.length
    
    const featuredProducts = filteredProducts.filter(p=>p.isFeatured).length
    


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
            {/* new updates*/}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4 mb-5">

             {/*total*/}
            <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            style={{opacity:1,transform:"none"}}>
             {/*icon box*/}   
            <div className="mb-3 h-10 w-10 inline-flex items-center justify-center rounded-xl border dark:border-slate-800 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-300">
                <FontAwesomeIcon icon={faBox}/>
            </div>
             <p className="text-2xl font-bold dark:text-white text-slate-900">{totalProducts}</p>
             <p className="text-xs mt-0.5 dark:text-slate-500 text-slate-500">Total</p>
            </div>

               {/*featured*/}
            <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            style={{opacity:1,transform:"none"}}>

             {/*icon star*/}   
            <div className="mb-3 h-10 w-10 inline-flex items-center justify-center rounded-xl border dark:border-slate-800 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-300">
                <FontAwesomeIcon icon={faStar}/>
            </div>
             <p className="text-2xl dark:text-white text-slate-900 font-bold">{featuredProducts}</p>
             <p className="text-xs mt-0.5 dark:text-slate-500 text-slate-500">featured</p>
>>>>>>> origin/develop
            </div>

<<<<<<< HEAD
          <button
            className="flex cursor-pointer items-center gap-2.5 border rounded-2xl p-3 text-sm font-bold tracking-wide text-white shadow-md shadow-orange-200 bg-[#E89A5B] hover:bg-[#d48849] hover:shadow-orange-300 transition-all"
            onClick={handleAddClick}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Product
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 relative">

        {/* Search Input Container */}
        <div className="relative w-full md:w-1/3">

          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-[#7B8190] dark:text-gray-400"
            />
          </span>

          <input
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full py-2 pl-9 pr-4 bg-white dark:bg-[#1F2937] outline-none transition rounded-[10px] border border-[#E5E7EB] dark:border-gray-700 text-[#1F2937] dark:text-white placeholder:text-gray-400 font-sans"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="relative inline-block">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 font-medium transition cursor-pointer flex items-center gap-2 rounded-[10px] border border-[#E5E7EB] dark:border-gray-600 text-white font-sans bg-[#17233C]"
          >
            {selectedCategory === "all"
              ? "Filter"
              : selectedCategory}

            {selectedCategory === "all" && (
              <FontAwesomeIcon icon={faFilter} />
            )}
          </button>

          {isOpen && (
            <div className="absolute left-0 md:right-0 md:left-auto mt-2 w-40 bg-white dark:bg-[#1F2937] shadow-lg rounded-xl border border-[#E5E7EB] dark:border-gray-700 overflow-hidden z-50">

              {["all", "Watches", "Accessories", "Cars"].map(
                (cat) => (
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
                )
              )}
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
            onClick={() =>
              setPage((prev) => Math.max(prev - 1, 1))
            }
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
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, numOfPage)
              )
            }
            disabled={page >= numOfPage}
            className="px-4 py-2 text-white font-medium transition cursor-pointer bg-[#17233C] hover:bg-[#E89A5B] rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
=======

               {/*In Stock*/}
            <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            style={{opacity:1,transform:"none"}}>
             {/*icon*/}   
            <div className="mb-3 h-10 w-10 inline-flex items-center justify-center rounded-xl border dark:border-slate-800 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-300">
                <FontAwesomeIcon icon={faArrowTrendUp}/>
            </div>
             <p className="text-2xl dark:text-white text-slate-900 font-bold">0</p>
             <p className="text-xs mt-0.5 dark:text-slate-500 text-slate-500">In Stock</p>
            </div>

               {/*Out of Stock*/}
            <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            style={{opacity:1,transform:"none"}}>
             {/*icon*/}   
            <div className="mb-3 h-10 w-10 inline-flex items-center justify-center rounded-xl border dark:border-slate-800 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-300">
                <FontAwesomeIcon icon={faCubes}/>
            </div>
             <p className="text-2xl dark:text-white text-slate-900 font-bold">0</p>
             <p className="text-xs mt-0.5 dark:text-slate-500 text-slate-500">Out of Stock</p>
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

                {/* Category Filter Dropdown */}
                <div className="relative inline-block">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 font-medium transition cursor-pointer flex items-center gap-2"
                        style={{
                            borderRadius: '10px',
                            border: '1px solid #E5E7EB',
                            color: '#FFFF',
                            fontFamily: 'Inter, sans-serif',
                            backgroundColor:'#17233C'
                        }}
                        
                    >
                        {selectedCategory === 'all' ? 'Filter': selectedCategory}

                       {selectedCategory==='all'?  <FontAwesomeIcon icon={faFilter}/>:null}
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border border-[#E5E7EB] overflow-hidden z-10">
                            {['all', 'Watches', 'Accessories', 'Cars'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsOpen(false);
                                        
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm transition hover:bg-gray-100 cursor-pointer"
                                    style={{
                                        color: selectedCategory === cat ? '#E89A5B' : '#1F2937',
                                        fontWeight: selectedCategory === cat ? 'bold' : 'normal'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>


           {/* Cards Grid */}
            {loading ? (
                <div className="text-center py-12" style={{ color: '#7B8190' }}>Loading...</div>
            ) : currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onDelete={onDelete} onAdd={onAdd}/>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-[#E5E7EB]" style={{ color: '#7B8190' }}>
                    No results for this search
                </div>
            )}

             
            {/* Pagination */}
            
            <div className="flex justify-between items-center mt-8">
        
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                        background: 'transparent',
                        border: '1px solid #17233C',
                        color: '#17233C',
                        borderRadius: '10px',
                    }}
                >
                    previous
                </button>
             <span className="font-medium" style={{ color: '#7B8190' }}>
                    page: {page} of {numOfPage || 1}
                </span>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page >= numOfPage}
                    className="px-4 py-2 text-white font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                        backgroundColor: '#17233C',
                        borderRadius: '10px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#E89A5B'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#17233C'}
                >
                    next
                </button>

            </div>
        </div> 
    );
>>>>>>> origin/develop
}