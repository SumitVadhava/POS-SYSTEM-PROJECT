import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, component: Component }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />; // Redirect to login page
  }

  return <Component />; // Render the protected component
};

export default ProtectedRoute;