import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye, faChevronLeft, faChevronRight, faTag, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import placeholderImg from '../../assets/images/placeholder.png';

export default function ProductDetailes({ products }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const product = products?.find((p) => p._id.toString() === id);

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = product?.images || [];

    // Auto slide optional
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    if (!product) {
        return <div className="p-6 text-center text-xl font-bold text-gray-700">This product doesn't found</div>;
    }

    return (
        <div className="min-h-screen pb-12" style={{ backgroundColor: '#F7F5F0' }}>
            {/* Back Title Header */}
            <div className="bg-[#17233C] shadow-sm rounded-3xl p-8 mb-8 max-w-7xl mx-auto mt-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="cursor-pointer font-medium text-sm text-gray-300 flex items-center mb-4 gap-2 transition hover:text-[#E89A5B]"
                >
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </button>
                
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-2xl">
                        <FontAwesomeIcon icon={faEye} className="text-xl text-[#F7F5F0]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#F7F5F0]">{product.name}</h1>
                        <p className="text-gray-300/70 text-sm mt-0.5">Product details overview</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Side: Image Card + Title Underneath + Thumbnails */}
                <div className="space-y-4">
                    {/* Big Image Card matching the reference design */}
                    <div className="bg-white rounded-3xl shadow-sm h-[380px] relative overflow-hidden border border-gray-200">
                        
                        {/* Featured Badge (if applicable) */}
                        {product.isFeatured && (
                            <span className="absolute top-4 left-4 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 z-20 shadow-sm">
                                <FontAwesomeIcon icon={faStar} /> Featured
                            </span>
                        )}

                        {images.length > 1 && (
                            <>
                                {/* Previous Button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                                    }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center z-20 cursor-pointer transition shadow"
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
                                </button>
                                
                                {/* Next Button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center z-20 cursor-pointer transition shadow"
                                >
                                    <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                                </button>

                                {/* Dots Indicator Inside Image Card */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                                    {images.map((_, index) => (
                                        <span 
                                            key={index} 
                                            className={`h-1.5 rounded-full transition-all ${currentIndex === index ? 'w-6 bg-amber-500' : 'w-1.5 bg-white/60'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Main Image */}
                        <img 
                            src={typeof images[currentIndex] === 'string' ? images[currentIndex] : images[currentIndex]?.url || product.images || placeholderImg} 
                            alt={product.name} 
                            className="object-cover w-full h-full"
                            onError={(e) => {
                                e.target.src = placeholderImg;
                            }}
                        />
                    </div>
                    
                    {/* Title Text Underneath Image Card (like "caar (Undated 22)") */}
                    <div className="px-2">
                        <h3 className="text-lg font-bold text-gray-800">{product.name} ({product.subtitle || 'Overview'})</h3>
                    </div>

                    {/* Small Thumbnails Grid */}
                    <div className="grid grid-cols-4 gap-3">
                        {images.map((img, index) => {
                            const imgSrc = typeof img===String ? img : img?.url 
                            return(
                            <button 
                                key={index}
                                type="button"
                                onClick={() => setCurrentIndex(index)}
                                className={`rounded-2xl overflow-hidden h-20 bg-white border-2 transition cursor-pointer ${
                                    currentIndex === index ? 'border-[#E89A5B] shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                                }`}
                            >
                                <img
                                    src={imgSrc}
                                    alt={`${product.name} thumbnail ${index}`}
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        e.target.src = placeholderImg;
                                    }}
                                />
                            </button>
)})}
                    </div>
                </div>

                {/* Right Side: Product Details Cards */}
                <div className="space-y-4">
                    {/* Overview Card */}
                    <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#E89A5B]">Overview</span>
                        <h2 className="text-xl font-bold text-gray-800 mt-1">{product.name}</h2>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{product.description || product.shortDescription}</p>
                    </div>

                    {/* Price & Discount Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Price</span>
                            <p className="text-2xl font-bold text-[#E89A5B] mt-1">${product.price}</p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Discount</span>
                            <p className="text-2xl font-bold text-gray-800 mt-1">${product.discountPrice || 0}</p>
                        </div>
                    </div>

                    {/* Stock & SKU Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Stock</span>
                            <p className="text-xl font-bold text-gray-800 mt-1">{product.stock}</p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">SKU</span>
                            <p className="text-xl font-bold text-gray-800 mt-1">{product.sku || 'WH-001'}</p>
                        </div>
                    </div>

                    {/* Tags Card */}
                    <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1 mb-2">
                            <FontAwesomeIcon icon={faTag} /> Tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {product.tags && product.tags.length > 0 ? (
                                product.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">
                                        {tag}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm">No tags available</span>
                            )}
                        </div>
                    </div>

                    {/* Category & Brand Footer Card */}
                    <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Category</span>
                            <p className="text-sm font-bold text-gray-800 mt-1 capitalize">{product.category}</p>
                        </div>
                        {product.brand && (
                            <div className="text-right">
                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Brand</span>
                                <p className="text-sm font-bold text-gray-800 mt-1">{product.brand}</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}