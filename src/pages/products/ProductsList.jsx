import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

import placeholderImg from '../../assets/images/placeholder.png';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faFilter} from '@fortawesome/free-solid-svg-icons'


export default function ProductList() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Vintage Brown Leather Watch', price: 150, category: 'Watches', rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
{ id: 2, name: 'Rose Gold Smartwatch', price: 230, category: 'Watches', rating: 2.5, image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500' },
{ id: 3, name: 'Black Steel Chronograph', price: 190, category: 'Watches', rating: 3.2, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500' },
{ id: 4, name: 'Ford Mustang GT', price: 120, category: 'Cars', rating: 3.2, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500' },
{ id: 5, name: 'Porsche Spider', price: 120, category: 'Cars', rating: 3, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500' },
{ id: 6, name: 'Golden Diamond Necklace', price: 450, category: 'Accessories', rating: 5, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' },
{ id: 7, name: 'Classic Tan Belt', price: 95, category: 'Accessories', rating: 4, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500' },
{ id: 8, name: 'Designer Leather Wallet', price: 60, category: 'Accessories', rating: 4.2, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500' },
{ id: 9, name: 'Lamborghini Aventador', price: 500, category: 'Cars', rating: 4.9, image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=500' },
{ id: 10, name: 'BMW M4 Coupe', price: 280, category: 'Cars', rating: 4.6, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500' },
{ id: 11, name: 'Crystal Pearl Bracelet', price: 75, category: 'Accessories', rating: 4.4, image: 'https://images.unsplash.com/photo-1611591475271-1d521d8b9288?w=500' },
{ id: 12, name: 'Aston Martin Vantage', price: 420, category: 'Cars', rating: 4.9, image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500' },
{ id: 13, name: 'Elegant Diamond Earrings', price: 195, category: 'Accessories', rating: 4.8, image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500' },
{ id: 14, name: 'Modern Sunglasses', price: 90, category: 'Accessories', rating: 4.3, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500' }

    ]);

   
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    
    const [page, setPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(4);
   

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/products?page=${page}&search=${search}`);
            const productsData = Array.isArray(response.data) 
                ? response.data 
                : response.data.products || response.data.data || [];
            
            if (productsData.length > 0) {
                setProducts(productsData);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search]);


    // filteration
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()); //true or false
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentProducts = filteredProducts.slice(startIndex,endIndex) 

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
                        <div 
                            key={product.id} 
                            className="bg-white p-4 flex flex-col justify-between shadow-sm transition hover:shadow-md"
                            style={{ borderRadius: '16px', border: '1px solid #E5E7EB' }}
                        >
                            {/* Product Image */}
                            <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center border border-[#E5E7EB]">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="object-cover w-full h-full" 
                                    onError={(e) => { e.target.src = placeholderImg; }}
                                />
                            </div>

                            {/* Product Details */}
                            <div>
                                <span className="text-xs px-2 py-1 bg-gray-100 rounded-md font-medium" style={{ color: '#7B8190' }}>
                                    {product.category}
                                </span>
                                <h3 className="font-semibold text-lg mt-2 mb-1" style={{ color: '#1F2937', fontFamily: 'Poppins, sans-serif' }}>
                                    {product.name}
                                </h3>
                            </div>

                            {/* Price & Rating Footer */}
                            <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                                <span className="font-bold text-lg" style={{ color: '#E89A5B' }}>
                                    ${product.price}
                                </span>
                                
                                <div className="flex items-center gap-1">
                                    <span className="text-amber-500 text-sm">⭐</span>
                                    <span className="text-xs font-semibold" style={{ color: '#7B8190' }}>
                                        {product.rating || '4.5'}
                                    </span>
                                </div>
                            </div>
                        </div>
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
                <span className="font-medium" style={{ color: '#7B8190' }}>page: {page}</span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 text-white font-medium transition cursor-pointer"
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