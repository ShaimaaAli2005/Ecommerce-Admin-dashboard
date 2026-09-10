import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

import placeholderImg from '../../assets/images/placeholder.png';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faFilter} from '@fortawesome/free-solid-svg-icons'

import ProductCard from "./ProductCard";

export default function ProductList() {

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    
    const [page, setPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(4);



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

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen" style={{ backgroundColor: '#F7F5F0' }}>
            {/* Title page */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold" style={{ color: '#17233C', fontFamily: 'Poppins, sans-serif' }}>
                    Products
                </h1>
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
                       <span className="filter-btn">
                        {selectedCategory === 'all' ? 'Filter': selectedCategory}
                       </span>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
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
}