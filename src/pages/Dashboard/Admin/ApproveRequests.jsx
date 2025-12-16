import React from "react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import ApproveData from "../../../components/Dashboard/TableRows/ApproveData";

const ApproveRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: requests = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["manager-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/manager-requests`);
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  console.log(requests);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8 md:py-12 space-y-6">
        {/* Glass Table Wrapper */}
        <div className="rounded-2xl bg-white/1 backdrop-blur-xl border border-red-400/40 shadow-lg overflow-x-auto">
          <table className="min-w-full text-white text-center">
            <thead>
              <tr className="bg-white/10 backdrop-blur-xl">
                <th className="px-6 py-4  text-sm font-semibold  uppercase border-b border-white/20">
                  Email
                </th>

                <th className="px-6 py-4  text-sm font-semibold uppercase border-b border-white/20">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {requests.map((request) => (
                <ApproveData
                  refetch={refetch}
                  key={request._id}
                  request={request}
                ></ApproveData>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproveRequests;
