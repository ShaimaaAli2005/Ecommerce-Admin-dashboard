 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../../assets/images/placeholder.png";
import { 
  faEye, 
  faPencil, 
  faSliders, 
  faTrashCan, 
  faCircleChevronLeft, 
  faCircleChevronRight 
} from '@fortawesome/free-solid-svg-icons';


 export default function ProductCard({product}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
     return(
                        <div 
                            className="bg-white p-4 flex flex-col justify-between shadow-sm transition hover:shadow-md group relative"
                            style={{ borderRadius: '16px', border: '1px solid #E5E7EB' }}
                        >
                            {/* Product Image Container */}
                            <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-red-50 flex items-center justify-center border border-[#E5E7EB] relative">

                                {/* Previous Button */}
                                <button 
                                  
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentImageIndex((prev) => (prev===0? product.image.length -1: prev-1))
                                  }}
                                  className="absolute left-2 top-1/2 text-white -translate-y-1/2  text-lg bg-black/40 hover:bg-black/60 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
                                >
                                 <FontAwesomeIcon icon={faCircleChevronLeft} />
                                </button>
                               
                             {/* Next Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentImageIndex((prev)=>(prev===(product.image.length -1)?0 : prev + 1 ))
                                  }}
                                  className="absolute right-2 top-1/2 text-white -translate-y-1/2  text-lg bg-black/40 hover:bg-black/60 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
                                 
                                >
                                 <FontAwesomeIcon icon={faCircleChevronRight} />
                                 
                                </button>
                                {/* Product Image */}
                                <img 
                                    src={product.image[currentImageIndex]} 
                                    alt={product.name} 
                                    className="object-cover w-full h-full transition-transform group-hover:scale-150 duration-300" 
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
                            <div className="mt-4  flex flex-col gap-3">

                                <div className="flex items-center justify-between">
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
                                 
                                <div className="flex items-center flex-wrap gap-1.5 pb-5">
                                    <span className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs
                                    text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 ">
                                       updated 
                                    </span>
                                    <span className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs
                                    text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 ">
                                       pro 
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-[#E5E7EB] mt-auto flex flex-wrap gap-2">
                               <button className="flex items-center gap-1.5 rounded-xl border px-4 py-2 mt-3
                               text-xs font-semibold cursor-pointer hover:bg-[#1F2937] hover:text-white"
                               onClick={()=>navigate(`/products/${product.id}`)}
                               >
                                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                                   View
                               </button>

                                 <button className="flex items-center gap-1.5 rounded-xl border px-4 py-2 mt-3
                               text-xs font-semibold cursor-pointer hover:bg-[#1F2937] hover:text-white"
                               onClick={()=>navigate(`/products/edit/${product.id}`)}
                               >
                                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                                   Edit
                               </button>

                                 <button className="flex items-center gap-1.5 rounded-xl border px-4 py-2 mt-3
                               text-xs font-semibold cursor-pointer hover:bg-[#1F2937] hover:text-white">
                                <FontAwesomeIcon icon={faSliders}></FontAwesomeIcon>
                                   Qick Edit
                               </button>

                                 <button className="ml-auto flex items-center gap-1.5 rounded-xl border border-rose-200 
                                 px-4 py-2 mt-3 bg-rose-50 text-xs font-semibold cursor-pointer hover:bg-red-500 hover:text-white">
                                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                                   Delete
                               </button>
                            </div>
                     </div>
     )
 }