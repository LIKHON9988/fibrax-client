import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import ProductDataRow from "../../../components/Dashboard/TableRows/ProductDataRow";

const ManageOrders = () => {
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/manage-products/${user?.email}`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        {/* HEADER + SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-purple-200">
            Manage Orders
          </h2>

          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full md:w-72
              px-4 py-2
              rounded-xl
              bg-white/10
              backdrop-blur-xl
              border border-purple-300/20
              text-gray-200
              placeholder-gray-400
              focus:outline-none
              focus:ring-2 focus:ring-purple-400/40
            "
          />
        </div>

        {/* TABLE WRAPPER */}
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="
            inline-block min-w-full
            rounded-2xl
            overflow-hidden
            bg-white/5
            backdrop-blur-2xl
            border border-purple-300/20
            shadow-xl
          "
          >
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-white/10 backdrop-blur-xl">
                  {[
                    "Image",
                    "Name",

                    "Price",
                    "Payment mode",
                    "Delete",
                    "Update",
                  ].map((head, i) => (
                    <th
                      key={i}
                      className="
                        px-5 py-3
                        border-b border-purple-300/20
                        text-left text-sm
                        uppercase font-medium
                        text-purple-200
                      "
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <ProductDataRow
                    key={product._id}
                    product={product}
                    search={search}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
