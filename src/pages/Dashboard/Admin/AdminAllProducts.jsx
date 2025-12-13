import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import { Link } from "react-router";

const AdminAllProducts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-all-products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const products = Array.isArray(data) ? data : [];

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10">
      <div
        className="
        bg-white/5 
        backdrop-blur-2xl 
        border border-purple-300/20 
        rounded-3xl 
        shadow-2xl shadow-purple-900/20
        overflow-hidden
      "
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-200">
            {/* TABLE HEAD */}
            <thead>
              <tr className="bg-purple-500/10 border-b border-purple-300/20">
                {[
                  "Image",
                  "Name",
                  "Category",
                  "Price",
                  "Quantity",
                  "Details",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-purple-200"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {products.map((p) => (
                <tr
                  key={p?._id ?? p?.id}
                  className="
                    border-b border-purple-300/10 
                    hover:bg-purple-500/10 
                    transition
                  "
                >
                  {/* IMAGE */}
                  <td className="px-6 py-4">
                    <img
                      src={p?.image}
                      alt={p?.name}
                      className="h-10 w-14 rounded-lg object-cover border border-purple-300/20"
                    />
                  </td>

                  {/* NAME */}
                  <td className="px-6 py-4 font-medium text-gray-100">
                    {p?.name}
                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-4 text-gray-300">{p?.category}</td>

                  {/* PRICE */}
                  <td className="px-6 py-4 text-purple-200 font-semibold">
                    ${p?.price}
                  </td>

                  {/* QUANTITY */}
                  <td className="px-6 py-4 text-gray-300">{p?.quantity}</td>

                  {/* DETAILS BUTTON */}
                  <td className="px-6 py-4">
                    <Link
                      to={`/product/${p?._id ?? p?.id}`}
                      className="
                        inline-flex items-center justify-center
                        px-4 py-1.5
                        rounded-full
                        bg-purple-500/20
                        border border-purple-400/30
                        text-purple-200
                        text-xs font-semibold
                        hover:bg-purple-500/30
                        transition
                      "
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAllProducts;
