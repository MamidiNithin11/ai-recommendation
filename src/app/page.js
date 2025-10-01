"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col justify-center items-center px-6 py-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-6xl md:text-7xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">
          Welcome to ShopEase
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Discover amazing products, exclusive deals, and fast delivery.  
          Start shopping now!
        </p>

        <button
          onClick={() => router.push("/products")}
          className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-white font-bold py-4 px-12 rounded-full shadow-2xl hover:scale-105 transition transform duration-500 text-lg"
        >
          Explore Products
        </button>
      </section>

      {/* Hero Image */}
      <div className="mt-16 w-full max-w-5xl">
        <img
          src="https://images.unsplash.com/photo-1606813908255-1dc3f3c73887?auto=format&fit=crop&w=1400&q=80"
          alt="Hero banner"
          className="w-full rounded-3xl shadow-2xl object-cover"
        />
      </div>
    </main>
  );
}
