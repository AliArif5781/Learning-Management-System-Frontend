import { useAppSelector } from "@/app/hook";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (user.role !== "Admin") {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
