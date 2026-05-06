import { Navigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}