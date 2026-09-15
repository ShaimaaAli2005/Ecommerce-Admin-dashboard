import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBox, faImage, faPlus, faXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import placeholderImg from '../../assets/images/placeholder.png';
import { createProduct } from "../../api/productApi";

export default function AddProduct({ onAdd }) {
    const navigate = useNavigate();
    
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [imagePreviews, setImagePreviews] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        shortDescription: "",
        description: "",
        price: 0,
        discountPrice: 0,
        stock: 0,
        sku: "",
        images: [],
        category: "electronics", 
        subcategory: "electronics",
        brand: "",
        featured: false,
        isActive: true
    });

    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0) {
            alert("Please upload at least one product image (Required).");
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('shortDescription', formData.shortDescription);
        data.append('description', formData.description);
        data.append('price', Number(formData.price));
        data.append('discountPrice', Number(formData.discountPrice || 0));
        data.append('stock', Number(formData.stock));
        data.append('sku', formData.sku);
        data.append('category', formData.category);
        data.append('subcategory', formData.subcategory);
        data.append('brand', formData.brand);

        tags.forEach((tag, index) => {
            data.append(`tags[${index}]`, tag);
        });

        data.append('featured', Boolean(formData.featured));
        data.append('isActive', Boolean(formData.isActive));

        Array.from(fileInputRef.current.files).forEach((file) => {
            data.append('images', file); 
        });
 
        try {
            await createProduct(data);
            if (onAdd) onAdd();
            navigate("/products");
        } catch (error) {
            console.error("SERVER RESPONSE DATA:", error.response?.data);
            alert("Error: " + JSON.stringify(error.response?.data || error.message));
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setImagePreviews(prev => {
            const updatedImgs = prev.filter((_, index) => index !== indexToRemove);
            setFormData(form => ({ ...form, images: updatedImgs })); // تصحيح الخطأ من image إلى images
            return updatedImgs;
        });
    };
    
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImageUrls = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => {
                const updatedImgs = [...prev, ...newImageUrls];
                setFormData(form => ({ ...form, images: updatedImgs }));
                return updatedImgs;
            });
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const addTag = () => {
        if (newTag.trim() !== "") {
            setTags([...tags, newTag.startsWith('#') ? newTag : `#${newTag}`]);
            setNewTag("");
        }
    };

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
                    <div className="bg-gray-200 rounded-2xl">
                        <FontAwesomeIcon icon={faBox} className="text-2xl text-[#17233C] p-3" />
                    </div>
                    
                    <div>
                        <p className="text-xs mt-0.5 text-[#E89A5B] uppercase tracking-[0.35em]">Create Product</p>    
                        <h1 className="text-3xl font-bold text-[#F7F5F0]">Launch a polished product entry</h1>
                        <p className="text-gray-300/70 text-sm mt-0.5 text-[#F7F5F0]">Add products with validation, image previews, multi-upload support, and smooth UX.</p>
                    </div>
                </div>
            </div>
            
            {/* Main Content Form */}
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-3xl">
                
                {/* Left Side Card (Gallery) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6 border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 rounded-2xl p-3 shrink-0">
                            <FontAwesomeIcon icon={faImage} className="text-2xl text-[#17233C]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#17233C]">Product Gallery<span className="text-red-500">*</span></h2>
                            <p className="text-gray-500 text-sm mt-0.5">Keep existing images, add new ones, or remove selected assets.</p>
                        </div>
                    </div>

                    <div className="space-y-4 mt-6 mb-10">
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {imagePreviews.length > 0 ? (
                                imagePreviews.map((imgSrc, index) => (
                                    <article key={index} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                                        <div className="h-52 w-full overflow-hidden bg-slate-100">
                                            <img src={imgSrc} alt="Product Preview" className="object-contain w-full h-full" />
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute bg-black/40 hover:bg-black/60 z-10 top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-white">
                                            <FontAwesomeIcon icon={faTrashCan}/> 
                                        </button>
                                        <div className="px-5 py-3 text-xs font-semibold text-[#17233C] uppercase tracking-[0.25em] bg-white border-t border-slate-100">
                                            image {index + 1}
                                        </div>
                                    </article>
                                ))   
                            ) : (
                                <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                                    <div className="h-52 w-full overflow-hidden bg-slate-100">
                                        <img src={placeholderImg} alt="Product Preview" className="object-contain w-full h-full" />
                                    </div>
                                    <div className="px-5 py-3 text-xs font-semibold text-[#17233C] uppercase tracking-[0.25em] bg-white border-t border-slate-100">
                                        image not found
                                    </div>
                                </article>
                            )}
                        </div>
                       
                        <input 
                            type="file"
                            ref={fileInputRef} 
                            onChange={handleImageChange}
                            multiple
                            accept="image/*" 
                            className="hidden"
                        />

                        <div 
                            className="border-2 border-dashed border-gray-400 bg-gray-50/30 rounded-3xl p-6 text-center cursor-pointer hover:bg-indigo-50/50 transition duration-300 flex flex-col items-center justify-center"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <div className="text-[#17233C] text-2xl mb-2">
                                <FontAwesomeIcon icon={faImage} />
                            </div>
                            <h3 className="font-bold text-[#17233C] text-sm">Upload image</h3>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP • multiple files supported</p>
                        </div>

                         <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
                            <span className="text-emerald-500 text-sm mt-0.5">✨</span>
                            <div>
                                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Senior UX</h4>
                                <p className="text-xs text-emerald-700/80 mt-0.5">Edit without losing the existing product story, while still adding fresh media.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Card (Inputs) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6 border border-gray-200">
                    <div className="grid gap-5">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Product Name<span className="text-red-500">*</span></span>
                            <input 
                                required
                                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Short Description<span className="text-red-500">*</span></span>
                            <input 
                                required
                                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                value={formData.shortDescription} 
                                onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Description<span className="text-red-500">*</span></span>
                            <textarea 
                                required
                                rows="5" 
                                className="w-full rounded-2xl px-5 py-4 outline-none border border-slate-200"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                        </label>

                        <div className="grid gap-5 md:grid-cols-2">
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Price<span className="text-red-500">*</span></span>
                                <input 
                                    required
                                    type="number" 
                                    className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} 
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Discount Price</span>
                                <input 
                                    type="number" 
                                    className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                    value={formData.discountPrice}
                                    onChange={(e) => setFormData({...formData, discountPrice: Number(e.target.value)})} 
                                />
                            </label>
                        </div>   

                        <div className="grid gap-5 md:grid-cols-2">
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Stock<span className="text-red-500">*</span></span>
                                <input 
                                    required
                                    type="number" 
                                    className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                    value={formData.stock}
                                    onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} 
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">SKU</span>
                                <input 
                                    className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                    value={formData.sku}
                                    onChange={(e) => setFormData({...formData, sku: e.target.value})} 
                                />
                            </label>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Category<span className="text-red-500">*</span></span>
                                <select 
                                    required
                                    className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                >
                                    <option value="all">All Categories</option>
                                    <option value="electronics">electronics</option>
                                    <option value="phones">phones</option>
                                    <option value="fashion">fashion</option>
                                    <option value="home">home</option>
                                    <option value="beauty">beauty</option>
                                    <option value="sports">sports</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Subcategory</span>
                                <input 
                                    className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                    value={formData.subcategory}
                                    onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                                />
                            </label>
                        </div>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Brand</span>
                            <input 
                                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                value={formData.brand}
                                onChange={(e) => setFormData({...formData, brand: e.target.value})} 
                            />
                        </label>

                        {/* Tags section */}
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Tags</span>
                                <div className="flex gap-3">
                                    <input 
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        placeholder="Type a tag and press +" 
                                        className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200 bg-white"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={addTag}
                                        className="cursor-pointer inline-flex h-14 w-16 shrink-0 items-center justify-center rounded-2xl transition shadow-sm bg-[#E89A5B] hover:bg-[#edb78b] text-[#F7F5F0]"
                                    >
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                </div>
                            </label>

                            <div className="flex-wrap flex gap-2 pt-3">
                                {tags.map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#0f172a] text-sm font-medium text-white px-4 py-2"
                                    >
                                        {tag}
                                        <button 
                                            type="button" 
                                            onClick={() => removeTag(index)}
                                            className="text-gray-400 hover:text-red-400 cursor-pointer transition"
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 cursor-pointer transition hover:border-[#E89A5B] hover:shadow-sm">
                                <input 
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                                    className="accent-[#17233C] cursor-pointer"
                                /> Featured
                            </label>
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 cursor-pointer transition hover:border-[#E89A5B] hover:shadow-sm">
                                <input 
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                                    className="accent-[#17233C] cursor-pointer"
                                /> Active
                            </label>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
                            <button 
                                className="inline-flex justify-center items-center rounded-2xl border text-sm gap-2 px-6 py-3 font-semibold tracking-wide overflow-hidden border-slate-200 text-white bg-[#0f172a] relative cursor-pointer"
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>

                            <button 
                                className="inline-flex justify-center items-center rounded-2xl border text-sm gap-2 px-6 py-3 font-semibold tracking-wide overflow-hidden border-slate-200 text-white bg-[#E89A5B] hover:bg-[#edb78b] relative cursor-pointer"
                                type="submit"
                            >
                                Create product
                            </button>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
}