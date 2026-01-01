import { useAppSelector } from "@/app/hook";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading.getPRofileLoading || loading.logoutLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (user) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
