import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../../assets/images/placeholder.png";

import {
  faEye,
  faPencil,
  faSliders,
  faTrashCan,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image
      : [placeholderImg];

  return (
    <div
      className="
        group
        relative
        w-full
        min-w-0
        bg-white
        dark:bg-[#1F2937]
        p-4
        flex
        flex-col
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        border
        border-[#E5E7EB]
        dark:border-gray-700
        rounded-2xl
      "
    >
      {/* ================= IMAGE ================= */}
      <div
        className="
          relative
          w-full
          h-44
          sm:h-48
          lg:h-52
          mb-4
          overflow-hidden
          rounded-xl
          bg-[#F7F5F0]
          dark:bg-[#111827]
          border
          border-[#E5E7EB]
          dark:border-gray-700
          flex
          items-center
          justify-center
        "
      >
        {/* Previous */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              );
            }}
            className="
              absolute
              left-2
              top-1/2
              -translate-y-1/2
              z-20
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              text-white
              bg-black/40
              hover:bg-[#E89A5B]
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
        )}

        {/* Next */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              setCurrentImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              );
            }}
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              z-20
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              text-white
              bg-black/40
              hover:bg-[#E89A5B]
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        )}

        {/* Image */}
        <img
          src={images[currentImageIndex]}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
          onError={(e) => {
            e.currentTarget.src = placeholderImg;
          }}
        />

        {/* Image Counter */}
        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-2
              right-2
              px-2
              py-1
              rounded-md
              bg-black/50
              text-white
              text-[10px]
              font-medium
            "
          >
            {currentImageIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {/* ================= PRODUCT INFO ================= */}
      <div className="flex-1">
        {/* Category */}
        <span
          className="
            inline-block
            text-xs
            px-2.5
            py-1
            rounded-md
            font-medium
            bg-gray-100
            dark:bg-gray-700
            text-[#7B8190]
            dark:text-gray-300
          "
        >
          {product.category}
        </span>

        {/* Product Name */}
        <h3
          className="
            font-semibold
            text-lg
            mt-2
            mb-1
            text-[#1F2937]
            dark:text-white
            font-['Poppins']
            line-clamp-1
          "
        >
          {product.name}
        </h3>
      </div>

      {/* ================= PRICE & RATING ================= */}
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          {/* Price */}
          <span className="font-bold text-lg text-[#E89A5B]">
            ${product.price}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-amber-500 text-sm">⭐</span>

            <span
              className="
                text-xs
                font-semibold
                text-[#7B8190]
                dark:text-gray-300
              "
            >
              {product.rating || "4.5"}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center flex-wrap gap-1.5 pb-4">
          <span
            className="
              rounded-lg
              border
              border-slate-200
              dark:border-slate-700
              bg-slate-100
              dark:bg-slate-800
              px-2.5
              py-1
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            updated
          </span>

          <span
            className="
              rounded-lg
              border
              border-slate-200
              dark:border-slate-700
              bg-slate-100
              dark:bg-slate-800
              px-2.5
              py-1
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            pro
          </span>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div
        className="
          border-t
          border-[#E5E7EB]
          dark:border-gray-700
          pt-3
          mt-auto
          flex
          flex-wrap
          gap-2
        "
      >
        {/* View */}
        <button
          type="button"
          onClick={() => navigate(`/products/${product._id}`)}
          className="
            flex
            items-center
            justify-center
            gap-1.5
            rounded-xl
            border
            border-[#E5E7EB]
            dark:border-gray-600
            px-3
            py-2
            text-xs
            font-semibold
            text-[#1F2937]
            dark:text-gray-200
            hover:bg-[#17233C]
            hover:text-white
            hover:border-[#17233C]
            transition
            cursor-pointer
          "
        >
          <FontAwesomeIcon icon={faEye} />
          View
        </button>

        {/* Edit */}
        <button
          type="button"
          onClick={() => navigate(`/products/edit/${product._id}`)}
          className="
            flex
            items-center
            justify-center
            gap-1.5
            rounded-xl
            border
            border-[#E5E7EB]
            dark:border-gray-600
            px-3
            py-2
            text-xs
            font-semibold
            text-[#1F2937]
            dark:text-gray-200
            hover:bg-[#17233C]
            hover:text-white
            hover:border-[#17233C]
            transition
            cursor-pointer
          "
        >
          <FontAwesomeIcon icon={faPencil} />
          Edit
        </button>

        {/* Quick Edit */}
        <button
          type="button"
          className="
            flex
            items-center
            justify-center
            gap-1.5
            rounded-xl
            border
            border-[#E5E7EB]
            dark:border-gray-600
            px-3
            py-2
            text-xs
            font-semibold
            text-[#1F2937]
            dark:text-gray-200
            hover:bg-[#17233C]
            hover:text-white
            hover:border-[#17233C]
            transition
            cursor-pointer
          "
        >
          <FontAwesomeIcon icon={faSliders} />
          Quick Edit
        </button>

        {/* Delete */}
        <button
          type="button"
          className="
            ml-auto
            flex
            items-center
            justify-center
            gap-1.5
            rounded-xl
            border
            border-rose-200
            dark:border-rose-900
            px-3
            py-2
            bg-rose-50
            dark:bg-rose-950/40
            text-rose-600
            dark:text-rose-400
            text-xs
            font-semibold
            hover:bg-red-500
            hover:text-white
            hover:border-red-500
            transition
            cursor-pointer
          "
        >
          <FontAwesomeIcon icon={faTrashCan} />
          Delete
        </button>
      </div>
    </div>
  );
}