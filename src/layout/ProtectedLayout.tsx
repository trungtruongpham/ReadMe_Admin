import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// ...

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user?.token) {
    return <Navigate to="/" />;
  }

  return <div>{outlet}</div>;
};
