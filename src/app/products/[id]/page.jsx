"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import ClipLoader from "react-spinners/ClipLoader";


export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data.product);
        setSimilar(data.similarProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#2563eb" size={60} /> 
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Product not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1 flex flex-col justify-between">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-500 mb-2">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-green-600 font-bold text-3xl mb-4">
              ${product.price.toFixed(2)}
            </p>
            <button
              className="w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Similar Products
          </h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {similar.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
