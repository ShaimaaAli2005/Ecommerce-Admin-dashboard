 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import {faArrowLeft,faEye,faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect,useState } from "react";

export default function ProductDetailes({products}){
     const navigate = useNavigate();
     const {id} = useParams();

     const product = products.find((p)=>p.id.toString() === id)

     const [selectedImage, setSelectedImage] = useState(0);
     const [currentIndex, setCurrentIndex] = useState(0);

     const images = product?.image || [];

     useEffect(()=>{
        if(images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev)=>(prev+1)%images.length)
        },3000)
        return () => clearInterval(interval)
     },[images.length])

     if(!product){
        return <div className="p-6 text-center">this product doesn't found</div>
     }
     return(
        <div className=" min-h-screen pb-12" style={{ backgroundColor: '#F7F5F0' }}>

            {/*back Title Header*/}
        <div className="bg-[#17233C] shadow-sm rounded-3xl p-8 mb-8">
            <button onClick={()=>navigate(-1)} 
            className="cursor-pointer font-medium text-sm text-gray-300 flex items-center mb-4 gap-2 transition hover:text-[#E89A5B]"
            >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
         {/*title page */}
            <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faEye} className="text-xl text-[#F7F5F0]" />
            <div>
                <h1 className="text-3xl font-bold text-[#F7F5F0] detailes-t">{product.name}</h1>
                <p className="text-gray-300/70 text-sm mt-0.5 text-[#F7F5F0]">product detailes overview</p>
            </div>
            </div>
        </div>

         {/*second sec*/}

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/*left side: img*/}
            <div className="space-y-4">
            {/*big img*/}
               <div className="bg-white rounded-2xl shadow-sm flex items-center justify-center h-96">
                    <img 
                        src={images[selectedImage]||product.image[0]} 
                        alt={product.name} 
                        className="object-cover w-full h-full rounded-xl"
                    />
                </div>
                
                      
           {/*small img*/}
           <div className="grid grid-cols-4 gap-3">
            {images.map((img,index)=>(
                <button 
                  key={index}
                  onClick={()=>setSelectedImage(index)}
                  className="rounded-3xl overflow-hidden"
                >
                <img
                  src={img}
                  alt={`${product.name} ${index}`}
                  className="object-cover w-full h-full rounded-xl cursor-pointer"
                />
                </button>
            ))}
            
           </div>

            <div className="bg-white rounded-2xl shadow-sm flex items-center justify-center h-96 relative">
                {/* Previous Button */}
                <button
                  onClick={(e)=>{
                    e.stopPropagation();
                    setCurrentIndex((prev)=>(prev===0?product.image.length -1:prev-1))
                  }}
                  className="absolute left-2 top-1/2 text-gray-400 -translate-y-1/2  text-lg w-10 h-10  flex items-center justify-center z-20 cursor-pointer"
                >
                <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {/* Next Button */}
                <button
                  onClick={(e)=>{
                    e.stopPropagation();
                    setCurrentIndex((prev)=>(prev===product.image.length -1?0:prev+1))
                  }}
                  className="absolute right-2 top-1/2 text-gray-400 -translate-y-1/2  text-lg  w-10 h-10 rounded-full flex items-center justify-center z-20 cursor-pointer"
                >
                <FontAwesomeIcon icon={faChevronRight} />
                </button>
              <img 
                   src={images[currentIndex]} 
                   alt={product.name} 
                   className="object-cover w-full h-full rounded-xl"
                />
                
            </div>
            </div>
     
          
         {/*right-side: detailes*/}
         <div className="space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-[#E89A5B]">
                        <span className="text-xs font-semibold uppercase tracking-wider">Overview</span>
                        <h2 className="text-xl font-bold text-gray-800 mt-1" style={{fontFamily:'Poppins'}}>{product.name}</h2>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">Classic Smartwatch - Ultimate Elegance & Performance Elevate your everyday style with this premium smartwatch.
                                                                  Designed with a sleek aesthetic and a comfortable strap, it combines timeless looks with modern smart features.
                                                                  Track your fitness goals, stay updated with notifications, and enjoy reliable all-day battery life. 
                                                                  The perfect companion for both work and casual wear.</p>
                     </div>

                     {/* Stats Grid */}
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                            <span className="text-xs text-gray-400 font-semibold uppercase">PRICE</span>
                            <p className="text-2xl font-bold text-[#E89A5B] mt-1">${product.price}</p>
                        </div>
                       <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                            <span className="text-xs text-gray-400 font-semibold uppercase">STOCK</span>
                            <p className="text-xl font-bold text-gray-800 mt-1">{product.stock || '41'}</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                            <span className="text-xs text-gray-400 font-semibold uppercase">Category</span>
                            <p className="text-xl font-bold text-gray-800 mt-1">{product.category}</p>
                        </div>
                    </div>
                </div>
         </div>

        </div>
        
         </div>
     )
}