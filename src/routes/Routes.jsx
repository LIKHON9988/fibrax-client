import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import ManageProducts from "../pages/Dashboard/Maneger/ManageProducts";
import ManageOrders from "../pages/Dashboard/Maneger/ManageOrders";

import { createBrowserRouter } from "react-router";
import AllProduct from "../pages/AllProduct/AllProduct";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contuct from "../pages/Contuct/Contuct";
import AddProduct from "../pages/Dashboard/Maneger/AddProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import AdminAllProducts from "../pages/Dashboard/Admin/AdminAllProducts";
import AllOrders from "../pages/Dashboard/Admin/AllOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/paymentSuccessful",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/allProducts",
        element: <AllProduct></AllProduct>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contuct></Contuct>,
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
            <AdminAllProducts></AdminAllProducts>
          </PrivateRoute>
        ),
      },

      {
        path: "manage-products",
        element: (
          <PrivateRoute>
            <ManageProducts></ManageProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "All-orders",
        element: (
          <PrivateRoute>
            <AllOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
    ],
  },
]);
