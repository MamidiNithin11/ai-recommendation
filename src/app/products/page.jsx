"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

 if (loading)
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#2563eb" size={60} /> 
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Products
      </h1>

      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => router.push(`/products/${product._id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover"
              />
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                <span className="font-medium">Category:</span> {product.category}
              </p>
              <p className="text-gray-600 text-sm">
                {product.description.length > 80
                  ? product.description.slice(0, 80) + "..."
                  : product.description}
              </p>

              <button
                onClick={() => router.push(`/products/${product._id}`)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
