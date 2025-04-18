import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../api/useAuth";

export const AdminRoute = () => {
  const { isLoading, status } = useAuth();
  const user = useSelector((state) => state.user.currentUser);
  console.log(status);
  console.log(user);
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (status === "success" && user.role) {
    return user?.role === "ADMIN" ? (
      <Outlet />
    ) : (
      <Navigate to="/forbidden" replace />
    );
  } else if (status === "error") {
    return <Navigate to="/forbidden" />;
  }
};
