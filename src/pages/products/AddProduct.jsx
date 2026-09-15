import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import {
  faArrowLeft,
  faBox,
  faImage,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
=======
import { faArrowLeft, faBox, faImage, faPlus, faXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
import placeholderImg from '../../assets/images/placeholder.png';

>>>>>>> origin/develop

export default function AddProduct({ onAdd }) {
  const navigate = useNavigate();

<<<<<<< HEAD
  const [tags, setTags] = useState(["#watch", "#car", "#accessories"]);
  const [newTag, setNewTag] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
=======
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        price: "",
        category: "Watches", 
        short_description: "",
        description: "",
        sku: "",
        stock:"",
        discount:"",
        rating: 0
})
>>>>>>> origin/develop

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "Watches",
    short_description: "",
    description: "",
    sku: "",
    rating: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
<<<<<<< HEAD
      ...formData,
      id: Date.now(),
      price: Number(formData.price),
      rating: Number(formData.rating) || 0,
      image:
        imagePreviews.length > 0
          ? imagePreviews
          : ["assets/images/placeholder.png"],
=======
        ...formData,
        id: Date.now(), 
        price: Number(formData.price),
        rating: Number(formData.rating) || 0,
        image: imagePreviews.length > 0 ? imagePreviews : placeholderImg
>>>>>>> origin/develop
    };

    if (typeof onAdd === "function") {
      onAdd(newProduct);
    }

    navigate("/products");
  };

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      const newImageUrls = files.map((file) =>
        URL.createObjectURL(file)
      );

      setImagePreviews(newImageUrls);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTag = () => {
    if (newTag.trim() !== "") {
      setTags([
        ...tags,
        newTag.startsWith("#") ? newTag : `#${newTag}`,
      ]);
      setNewTag("");
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-[#F7F5F0] dark:bg-[#111827] transition-colors duration-300">
      
      {/* Back Title Header */}
      <div className="bg-[#17233C] shadow-sm rounded-3xl p-8 mb-8 max-w-7xl mx-auto mt-6">
        
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer font-medium text-sm text-gray-300 flex items-center mb-4 gap-2 transition hover:text-[#E89A5B]"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>

        <div className="flex items-center gap-4">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl">
            <FontAwesomeIcon
              icon={faBox}
              className="text-2xl text-[#17233C] dark:text-white p-3"
            />
          </div>

<<<<<<< HEAD
          <div>
            <p className="text-xs mt-0.5 text-[#E89A5B] uppercase tracking-[0.35em]">
              edit product
            </p>

            <h1 className="text-3xl font-bold text-[#F7F5F0]">
              Update and refine product entry
            </h1>

            <p className="text-gray-300/70 text-sm mt-0.5 text-[#F7F5F0]">
              Review the current product data, add new images, remove
              existing ones, and save your updates safely.
            </p>
          </div>
=======
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
                        <p className="text-xs mt-0.5 text-[#E89A5B] uppercase tracking-[0.35em]">edit product</p>    
                        <h1 className="text-3xl font-bold text-[#F7F5F0]">Update and refine product entry</h1>
                        <p className="text-gray-300/70 text-sm mt-0.5 text-[#F7F5F0]">Review the current product data, add new images, remove existing ones, and save your updates safely.</p>
                    </div>
                </div>
            </div>
            
            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-3xl">
                
                {/* Left Side Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6 border border-gray-200">

                    {/*title */}
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 rounded-2xl p-3 shrink-0">
                            <FontAwesomeIcon icon={faImage} className="text-2xl text-[#17233C]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#17233C]">Product Gallery</h2>
                            <p className="text-gray-500 text-sm mt-0.5">Keep existing images, add new ones, or remove selected assets.</p>
                        </div>
                    </div>

                    <div className="space-y-4 mt-6 mb-10">

                        {/*imgs section*/}
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">

                            <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                            <div className="h-52 w-full overflow-hidden bg-slate-100">
                                <img 
                                   src={imagePreviews.length > 0 ? imagePreviews[0] : placeholderImg} 
                                   alt="Product Preview"
                                   className="object-contain w-full h-full"
                                />
                            </div>

                        <button type="button" className="absolute bg-black/40 hover:bg-black/60 z-10 top-3 right-3 flex h-9 w-9 flex items-center justify-center rounded-full text-white">
                          <FontAwesomeIcon icon={faTrashCan}/> 
                        </button>

                            <div className="px-5 py-3 text-xs font-semibold text-[#17233C] uppercase tracking-[0.25em] bg-white border-t border-slate-100">
                                image 1
                            </div>
                        </article>

                        </div>

                         <input 
                         type="file"
                         ref={fileInputRef} 
                         onChange={handleImageChange}
                         multiple
                         accept="image/*" 
                        className="hidden"/>

                        <div 
                        className="border-2 border-dashed border-gray-400 bg-gray-50/30 rounded-3xl p-6 text-center cursor-pointer hover:bg-indigo-50/50 transition duration-300 flex flex-col items-center justify-center"
                        onClick={() => fileInputRef.current.click()}>
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
                                <p className="text-xs text-emerald-700/80 mt-0.5">Optimized product creation experience with responsive design and smooth interactions.</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Right Side Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6 border border-gray-200">
                    <div className="grid gap-5">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Product Name</span>
                            <input 
                            className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                            value={formData.name} 
                            onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Short Description</span>
                            <input 
                            className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                            value={formData.short_description} 
                            onChange={(e)=>setFormData({...formData, short_description:e.target.value})}/>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
                            <textarea 
                                rows="5" 
                                className="w-full rounded-2xl px-5 py-4 outline-none border border-slate-200"
                                value={formData.description}
                                onChange={(e)=>setFormData({...formData,description:e.target.value})}
                            />
                        </label>

                        <div className="grid gap-5 md:grid-cols-2">
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Price</span>
                                <input 
                                type="number" 
                                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                value={formData.price}
                                onChange={(e)=>setFormData({...formData,price:e.target.value})} />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Discount Price</span>
                                <input 
                                type="number" 
                                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                value={formData.discount}
                                onChange={(e)=>setFormData({...formData,discount:e.target.value})} />
                            </label>
                         </div>   

                        <div className="grid gap-5 md:grid-cols-2">
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">SKU</span>
                                <input 
                                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                 value={formData.sku}
                                onChange={(e)=>setFormData({...formData,sku:e.target.value})} />
                            </label>
                            
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Stock</span>
                                <input 
                                type="number" 
                                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                value={formData.stock}
                                onChange={(e)=>setFormData({...formData,stock:e.target.value})} />
                            </label>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Category</span>
                                <select 
                                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                    <option value="Watches">Watches</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Cars">Cars</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-slate-700">Subcategory</span>
                                <input 
                                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                                 value={formData.category}
                                onChange={(e)=>setFormData({...formData,category:e.target.value})}/>
                            </label>
                        </div>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Brand</span>
                            <input 
                            className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" 
                            value={formData.brand}
                            onChange={(e)=>setFormData({...formData,brand:e.target.value})} />
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
                              className="accent-[#17233C] cursor-pointer"/>Featured
                            </label>
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 cursor-pointer transition hover:border-[#E89A5B] hover:shadow-sm">
                              <input 
                              type="checkbox"
                              className="accent-[#17233C] cursor-pointer"/>Active
                            </label>
                        </div>

                        {/*cancel , save btns */}
                        <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
                            <button 
                            className="inline-flex justify-center items-center rounded-2xl border text-sm gap-2 px-3 py-2 font-semibold tracking-wide overflow-hidden border-slate-200 text-white bg-[#0f172a] relative cursor-pointer"
                            type="button"
                            onClick={()=>navigate(-1)}>
                                Cancel
                            </button>

                            <button 
                            className="inline-flex justify-center items-center rounded-2xl border text-sm gap-2 px-3 py-2 font-semibold tracking-wide overflow-hidden border-slate-200 text-white bg-[#E89A5B] hover:bg-[#edb78b] relative cursor-pointer"
                            type="submit"
                            onClick={handleSubmit}>
                                Create product
                            </button>
                        </div>

                    </div>
                </div>

            </div>
>>>>>>> origin/develop
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-3xl">

        {/* Left Side Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm space-y-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">

          <div className="flex items-center gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 shrink-0">
              <FontAwesomeIcon
                icon={faImage}
                className="text-2xl text-[#17233C] dark:text-white"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#17233C] dark:text-white">
                Product Gallery
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                Keep existing images, add new ones, or remove selected assets.
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-6 mb-10">

            <article className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">

              <div className="h-52 w-full overflow-hidden bg-slate-100 dark:bg-gray-700">
                <img
                  src={
                    imagePreviews.length > 0
                      ? imagePreviews[0]
                      : "assets/images/placeholder.png"
                  }
                  alt="Product Preview"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="px-5 py-3 text-xs font-semibold text-[#17233C] dark:text-white uppercase tracking-[0.25em] bg-white dark:bg-gray-800 border-t border-slate-100 dark:border-gray-700">
                image 1
              </div>
            </article>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="hidden"
            />

            <div
              className="border-2 border-dashed border-gray-400 dark:border-gray-600 bg-gray-50/30 dark:bg-gray-700/30 rounded-3xl p-6 text-center cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-gray-700 transition duration-300 flex flex-col items-center justify-center"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="text-[#17233C] dark:text-white text-2xl mb-2">
                <FontAwesomeIcon icon={faImage} />
              </div>

              <h3 className="font-bold text-[#17233C] dark:text-white text-sm">
                Upload image
              </h3>

              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                PNG, JPG, WEBP • multiple files supported
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-4 flex items-start gap-3">

              <span className="text-emerald-500 text-sm mt-0.5">
                ✨
              </span>

              <div>
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                  Senior UX
                </h4>

                <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 mt-0.5">
                  Optimized product creation experience with responsive
                  design and smooth interactions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm space-y-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">

          <div className="grid gap-5">

            {/* Product Name */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200">
                Product Name
              </span>

              <input
                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-gray-400"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </label>

            {/* Short Description */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200">
                Short Description
              </span>

              <input
                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
                value={formData.short_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    short_description: e.target.value,
                  })
                }
              />
            </label>

            {/* Description */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200">
                Description
              </span>

              <textarea
                rows="5"
                className="w-full rounded-2xl px-5 py-4 outline-none border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
            </label>

            {/* Price + SKU */}
            <div className="grid gap-5 md:grid-cols-2">

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200">
                  Price
                </span>

                <input
                  type="number"
                  className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200">
                  SKU
                </span>

                <input
                  className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sku: e.target.value,
                    })
                  }
                />
              </label>

            </div>

            {/* Category + Subcategory */}
            <div className="grid gap-5 md:grid-cols-2">

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200">
                  Category
                </span>

                <select
                  className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="Watches">Watches</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Cars">Cars</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200">
                  Subcategory
                </span>

                <input
                  className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                />
              </label>

            </div>

            {/* Brand */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200">
                Brand
              </span>

              <input
                className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    brand: e.target.value,
                  })
                }
              />
            </label>

            {/* Tags section */}
            <div className="rounded-3xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 p-4">

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200">
                  Tags
                </span>

                <div className="flex gap-3">

                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Type a tag and press +"
                    className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={addTag}
                    className="cursor-pointer inline-flex h-14 w-16 shrink-0 items-center justify-center rounded-2xl transition shadow-sm bg-[#E89A5B] hover:bg-[#edb78b] text-[#F7F5F0]"
                  >
                    <FontAwesomeIcon icon={faPlus} />
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

            {/* Featured + Active */}
            <div className="flex flex-wrap gap-4">

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200 px-5 py-4 cursor-pointer transition hover:border-[#E89A5B] hover:shadow-sm">
                <input
                  type="checkbox"
                  className="accent-[#17233C] cursor-pointer"
                />
                Featured
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200 px-5 py-4 cursor-pointer transition hover:border-[#E89A5B] hover:shadow-sm">
                <input
                  type="checkbox"
                  className="accent-[#17233C] cursor-pointer"
                />
                Active
              </label>

            </div>

            {/* Cancel + Save buttons */}
            <div className="flex flex-wrap gap-3 border-t border-slate-200 dark:border-gray-700 pt-6">

              <button
                className="inline-flex justify-center items-center rounded-2xl border text-sm gap-2 px-3 py-2 font-semibold tracking-wide overflow-hidden border-slate-200 dark:border-gray-600 text-white bg-[#0f172a] relative cursor-pointer"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                className="inline-flex justify-center items-center rounded-2xl border text-sm gap-2 px-3 py-2 font-semibold tracking-wide overflow-hidden border-slate-200 dark:border-gray-600 text-white bg-[#E89A5B] hover:bg-[#edb78b] relative cursor-pointer"
                type="submit"
                onClick={handleSubmit}
              >
                Create product
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}