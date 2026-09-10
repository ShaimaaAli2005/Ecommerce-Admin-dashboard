import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBox, faImage } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct({ products }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const product = products.find((p) => p.id.toString() === id);
    if (!product) {
        return <div className="p-6 text-center">this product doesn't found</div>;
    }

    return (
        <div className="min-h-screen pb-12" style={{ backgroundColor: '#F7F5F0' }}>
            {/* back Title Header */}
            <div className="bg-[#17233C] shadow-sm rounded-3xl p-8 mb-8 max-w-7xl mx-auto mt-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="cursor-pointer font-medium text-sm text-gray-300 flex items-center mb-4 gap-2 transition hover:text-[#E89A5B]"
                >
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </button>
                
                {/* title page */}
                <div className="flex items-center gap-4">
                    <div className="bg-gray-200 rounded-2xl">
                        <FontAwesomeIcon icon={faBox} className="text-2xl text-[#17233C] p-3" />
                    </div>
                    
                    <div>
                        <p className="text-xs mt-0.5 text-[#E89A5B] uppercase tracking-[0.35em]">edit product</p>    
                        <h1 className="text-3xl font-bold text-[#F7F5F0] detailes-t">Update and refine product entry</h1>
                        <p className="text-gray-300/70 text-sm mt-0.5 text-[#F7F5F0]">Review the current product data, add new images, remove existing ones, and save your updates safely.</p>
                    </div>
                </div>
            </div>
            
            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-blue-200">
                
                {/* Left Side Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6 border border-gray-200">
                    
                    {/* 1. Header (Icon + Title & Description) */}
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 rounded-2xl p-3 shrink-0">
                            <FontAwesomeIcon icon={faImage} className="text-2xl text-[#17233C]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#17233C]">Product Gallery</h2>
                            <p className="text-gray-500 text-sm mt-0.5">Keep existing images, add new ones, or remove selected assets.</p>
                        </div>
                    </div>

                    {/* 2. Image Container */}
                    <div className="space-y-4 mt-6 mb-10">
                        <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="h-52 bg-white w-full overflow-hidden bg-slate-100">
                        <img 
                           src={product.image[0]} 
                           alt={product.name} 
                           className="object-cover w-full h-full"
                        />
                         </div>
                        <div className="px-5 py-3 text-xs font-semibold text-[#17233C] uppercase tracking-[0.25em] bg-white border-t border-slate-100">
                            image 1
                        </div>
                         </article>
                   
                     {/*(Dashed Box) */}
                       <div className="border-2 border-dashed border-gray-400 bg-gray-50/30 rounded-3xl p-6 text-center cursor-pointer hover:bg-indigo-50/50 transition duration-300 flex flex-col items-center justify-center">
                           <div className="text-[#17233C] text-2xl mb-2">
                              <FontAwesomeIcon icon={faImage} />
                           </div>
                           <h3 className="font-bold text-[#17233C] text-sm">Add more images</h3>
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


             {/* Left Side Card */}
             <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6 border border-gray-200">

                <div className="grid gap-5">
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Product Name</span>
                    <input className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" value={product.name}></input>
                </label>

                 <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Short Description</span>
                    <input className="h-14 w-full rounded-2xl px-5 outline-none border border-slate-200" value={product.name}></input>
                </label>

                 <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
                    <textarea rows="5" className="w-full rounded-2xl px-5 py-4 outline-none border border-slate-200" value={product.name}>
                        A premium laptop with powerful performance, a high quality display, and a modern professional design.
                    </textarea>
                </label>

                <div className="grid gap-5 md:grid-cols-2">

                </div>

                </div>
                
             </div>
            </div>
        </div>
    );
}