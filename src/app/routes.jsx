import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLogin from "../features/auth/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import Properties from "../pages/admin/Properties";
import Inquiries from "../pages/admin/Inquiries";
import AdminLayout from "../components/layout/AdminLayout";
import AdminRoute from "../guards/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/login" replace />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "inquiries",
        element: <Inquiries />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/admin/login" replace />,
  },
]);
