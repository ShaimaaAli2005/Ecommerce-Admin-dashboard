import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import watchImg1 from '../../assets/images/61zjlboprl-ac-uf10001000-ql80.jpg';
import watchImg2 from '../../assets/images/background.jpg';
import watchImg3 from '../../assets/images/Best-Android-gear-so-far.jpg';
import car1 from '../../assets/images/campbell-3ZUsNJhi_Ik-unsplash.jpg';
import car2 from '../../assets/images/stefan-rodriguez-2AovfzYV3rc-unsplash (1).jpg';
import accessories1 from '../../assets/images/marissa-grootes-D4jRahaUaIc-unsplash.jpg';
import accessories2 from '../../assets/images/farah-samy-xU69-CkS67E-unsplash.jpg';

export default function ProductList() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Classic Leather Watch', price: 150, category: 'watches', rating: 4.5, image: watchImg1 },
        { id: 2, name: 'Modern Gold Watch', price: 230, category: 'watches', rating: 2.5, image: watchImg2 },
        { id: 3, name: 'Sport Chronograph', price: 190, category: 'watches', rating: 3.2, image: watchImg3 },
        { id: 4, name: 'Chevrolet', price: 120, category: 'cars', rating: 3.2, image: car1 },
        { id: 5, name: 'Ferrari', price: 120, category: 'cars', rating: 3, image: car2 },
        { id: 6, name: 'Luxury Diamond', price: 450, category: 'accessories', rating: 5, image: accessories1 },
        { id: 7, name: 'Casual Brown Leather', price: 95, category: 'accessories', rating: 4, image: accessories2 },
    ]);

    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);

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

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                {/* Search Input */}
                <input 
                    type="text"
                    value={search}
                    placeholder="search..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 bg-white outline-none transition"
                    style={{
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                        color: '#1F2937',
                        fontFamily: 'Inter, sans-serif'
                    }}
                />

                {/* Category Filter Dropdown */}
                <div className="relative inline-block">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 bg-white font-medium transition cursor-pointer flex items-center gap-2"
                        style={{
                            borderRadius: '10px',
                            border: '1px solid #E5E7EB',
                            color: '#17233C',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        <span>Filter</span>
                        <span className="text-xs"></span>
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border border-[#E5E7EB] overflow-hidden z-10">
                            {['all', 'watches', 'accessories', 'cars'].map((cat) => (
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
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-white p-4 flex flex-col justify-between shadow-sm transition hover:shadow-md"
                            style={{ borderRadius: '16px', border: '1px solid #E5E7EB' }}
                        >
                            {/* Product Image */}
                            <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center border border-[#E5E7EB]">
                                <img 
                                    src={product.image || watchImg1} 
                                    alt={product.name} 
                                    className="object-cover w-full h-full" 
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