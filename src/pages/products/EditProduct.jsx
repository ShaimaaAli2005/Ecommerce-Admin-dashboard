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
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Side Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6 border border-gray-200">
                    
                    {/* 1. Header (Icon + Title & Description) -> جنب بعض */}
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 rounded-2xl p-3 shrink-0">
                            <FontAwesomeIcon icon={faImage} className="text-2xl text-[#17233C]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#17233C]">Product Gallery</h2>
                            <p className="text-gray-500 text-sm mt-0.5">Keep existing images, add new ones, or remove selected assets.</p>
                        </div>
                    </div>

                    {/* 2. Image Container -> هتنزل تحت الكلام وتملى العرض */}
                    <div className="bg-gray-50 rounded-2xl shadow-inner flex items-center justify-center h-80 overflow-hidden border border-gray-100">
                        <img 
                           src={product.image[0]} 
                           alt={product.name} 
                           className="object-cover w-full h-full rounded-xl"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}