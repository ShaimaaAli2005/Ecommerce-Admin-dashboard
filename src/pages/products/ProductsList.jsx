
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { getProducts } from "../../api/productApi";
import placeholderImg from '../../assets/images/placeholder.png';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch,faSliders, faBox, faPlus, faStar, faArrowTrendUp, faCubes} from '@fortawesome/free-solid-svg-icons'

import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

export default function ProductList({onDelete,onAdd}) {

    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
 

    const navigate = useNavigate()
    const handleAddClick = () => {
    navigate('/products/add');
};

    // filteration
    const fetchFilteredProducts = async () => {
        try {
            setLoading(true);
            
            // تجهيز الـ params اللي هتروح للـ API زي ما الـ Documentation طالبة
            const params = {
                page: page,
                limit: 10, // عدد العناصر في الصفحة
            };

            // لو المستخدم كتب كلمة سيرش، بنضيفها للـ params
            if (searchQuery.trim() !== "") {
                params.search = searchQuery; //
            }

       
            if (selectedCategory !== "all") {
                params.category = selectedCategory;
            }

            const response = await getProducts(params); 
           
            setProducts(response.products || []); 
            setTotalPages(response.totalPages || 1);
            setTotalItems(response.totalProducts || 0);

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFilteredProducts();
    }, [page, selectedCategory, searchQuery]);
    // const filteredProducts = products.filter((product) => {
    //     const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()); //true or false
    //     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    //     return matchesSearch && matchesCategory;
    // });
    // const startIndex = (page - 1) * itemsPerPage
    // const endIndex = startIndex + itemsPerPage
    // const currentProducts = fetchFilteredProducts.slice(startIndex,endIndex) 

    // const numOfPage = Math.ceil(fetchFilteredProducts.length / itemsPerPage)
    
    const totalProducts = totalItems;
    const featuredProducts = products.filter(p => p.featured).length;
    const inStock = products.filter((product)=>Number(product.stock)>0).length
    const outOfStock = products.filter((product)=>Number(product.stock)===0).length


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
            </div>


               {/*In Stock*/}
            <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            style={{opacity:1,transform:"none"}}>
             {/*icon*/}   
            <div className="mb-3 h-10 w-10 inline-flex items-center justify-center rounded-xl border dark:border-slate-800 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-300">
                <FontAwesomeIcon icon={faArrowTrendUp}/>
            </div>
             <p className="text-2xl dark:text-white text-slate-900 font-bold">{inStock}</p>
             <p className="text-xs mt-0.5 dark:text-slate-500 text-slate-500">In Stock</p>
            </div>

               {/*Out of Stock*/}
            <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            style={{opacity:1,transform:"none"}}>
             {/*icon*/}   
            <div className="mb-3 h-10 w-10 inline-flex items-center justify-center rounded-xl border dark:border-slate-800 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-300">
                <FontAwesomeIcon icon={faCubes}/>
            </div>
             <p className="text-2xl dark:text-white text-slate-900 font-bold">{outOfStock}</p>
             <p className="text-xs mt-0.5 dark:text-slate-500 text-slate-500">Out of Stock</p>
            </div>

            </div>
         
            {/* Search & Filter Bar */}
           <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-5 mb-6">
            <div className="flex flex-col gap-3 sm:flex-row items-center">
                
            {/* Search Input */}
             <div className="relative flex-1 w-full">
               <span className="absolute  flex items-center py-3 px-2 ">
                   <FontAwesomeIcon icon={faSearch} style={{ color: '#7B8190' }} />
                </span> 

                <input 
                    type="text"
                    value={searchQuery}
                    placeholder="Search..."
                    onChange={(e) => {setSearchQuery(e.target.value) ,setPage(1)}}
                    className="w-full  h-12 rounded-xl  py-2 bg-white outline-none transition"
                    style={{
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                        color: '#1F2937',
                        fontFamily: 'Inter, sans-serif',
                        paddingLeft:'33px'
                    }}
                />
             </div>
          
            {/* Filter Toggle Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex h-12 w-full md:w-auto gap-2 items-center justify-center rounded-xl px-5 text-sm font-semibold border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faSliders} />
                        Filters
                    </button>

                    {/* Search Button */}
                    <button 
                        onClick={() => fetchFilteredProducts()}
                       className="flex h-12 w-full md:w-auto gap-2 items-center justify-center rounded-xl px-6 text-sm font-semibold bg-[#1F2937] text-white hover:bg-[#E89A5B] transition cursor-pointer whitespace-nowrap"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                        Search
                    </button>
                </div>

                {isOpen && (
                    <div className="mt-4 pt-4 border-t border-slate-200 grid gap-4 sm:grid-cols-2 transition-all duration-300">
                        
                        {/* Category Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center text-xs tracking-wider uppercase gap-2 font-semibold text-slate-500">
                                Category
                            </label>
                            <select 
                                value={selectedCategory}
                                onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none cursor-pointer"
                            >
                                <option value="all">All Categories</option>
                                <option value="electronics">electronics</option>
                                <option value="phones">phones</option>
                                <option value="fashion">fashion</option>
                                <option value="home">home</option>
                                <option value="beauty">beauty</option>
                                <option value="sports">sports</option>
                            </select>
                        </div>

                        {/* Subcategory Input */}
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center text-xs tracking-wider uppercase gap-2 font-semibold text-slate-500">
                                Subcategory
                            </label>
                            <input 
                                placeholder="e.g. smartphones" 
                                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none"
                            />
                        </div>

                    </div>
                )}
            
           </div>
           


           {/* Cards Grid */}
            {loading ? (
                <div className="text-center py-12" style={{ color: '#7B8190' }}>Loading...</div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} onDelete={onDelete} onAdd={onAdd}/>
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
                  page: {page} of {totalPages || 1}
                </span>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page >= totalPages}
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