import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";

const AllProduct = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  // -------------------------------
  // Build category list (no useMemo)
  // -------------------------------
  const categoriesSet = new Set();
  (data || []).forEach((p) => {
    if (p?.category) categoriesSet.add(p.category);
  });
  const categories = ["All", ...Array.from(categoriesSet)];

  // ------------------------------------
  // Filtering + Sorting (no useMemo)
  // ------------------------------------
  let products = Array.isArray(data) ? [...data] : [];

  // Filter by category
  if (category !== "All") {
    products = products.filter((p) => p.category === category);
  }

  // Search filter
  if (search.trim()) {
    const q = search.toLowerCase();
    products = products.filter((p) =>
      (p?.name || "").toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sort === "price-asc") {
    products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  } else if (sort === "price-desc") {
    products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  } else if (sort === "qty-desc") {
    products.sort((a, b) => (b.quantity ?? 0) - (a.quantity ?? 0));
  }

  return (
    <Container>
      <div className="py-6 md:py-10 space-y-8">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            All Products
          </h1>
          <p className="text-gray-300 mt-2">Browse the complete catalog</p>
        </div>

        {/* Filters */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-red-400/40 p-4 md:p-6 text-white">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-red-300/40 focus:outline-red-300 placeholder:text-gray-200/70"
              type="text"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/20 border border-red-300/40 text-white focus:outline-red-300"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/20 border border-red-300/40 text-white focus:outline-red-300"
            >
              <option value="latest" className="text-black">
                Latest
              </option>
              <option value="price-asc" className="text-black">
                Price: Low to High
              </option>
              <option value="price-desc" className="text-black">
                Price: High to Low
              </option>
              <option value="qty-desc" className="text-black">
                Stock: High to Low
              </option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p?._id ?? p?.id ?? `${p?.name}-${p?.price}`}
              className="flex items-center gap-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-purple-400/30 transition text-white"
            >
              {/* Bigger Image */}
              <div className="w-40 h-40 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={p?.image}
                  alt={p?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xl font-semibold">{p?.name}</h3>
                  <p className="text-sm text-gray-300">{p?.category}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-red-300 font-bold text-lg">
                    ${p?.price}
                  </span>
                  <span className="text-gray-300 text-sm">
                    Stock: {p?.quantity}
                  </span>
                </div>

                <Link
                  to={`/product/${p?._id}`}
                  className="
                w-full py-3 text-center rounded-xl
                bg-gradient-to-r from-purple-600/40 to-pink-600/40
                border border-purple-300/30
                text-white font-semibold backdrop-blur-xl
                hover:from-purple-600/60 hover:to-pink-600/60
                hover:shadow-lg hover:shadow-purple-500/30
                transition-all
              "
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center text-white/80 py-12">
              No products found
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AllProduct;
