"use client";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${product._id || product.id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-xl w-full max-w-xs mx-auto"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          ${product.price.toFixed(2)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="text-gray-600 text-sm line-clamp-3">
          {product.description?.length > 100
            ? product.description.slice(0, 100) + "..."
            : product.description}
        </p>
      </div>
    </div>
  );
}
