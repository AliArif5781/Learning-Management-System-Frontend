import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "@/pages/Home";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import Dashboard from "@/pages/Dashboard";
import CoursesPage from "@/pages/CoursesPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import AdminRoute from "@/components/AdminRoute";
import CreateCourse from "@/pages/CreateCourse";
import ProfilePage from "@/pages/ProfilePage";
import UpdateUserProfile from "@/pages/UpdateUserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "dashboard",
            element: (
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            ),
          },
          {
            path: "create-course",
            element: (
              <AdminRoute>
                <CreateCourse />
              </AdminRoute>
            ),
          },
          {
            path: "courses",
            element: <CoursesPage />,
          },
          {
            path: "courses/:id",
            element: <CourseDetailPage />,
          },
          {
            path: "user-profile",
            element: <ProfilePage />,
          },
          {
            path: "update-profile",
            element: <UpdateUserProfile />,
          },
        ],
      },
    ],
  },

  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);
