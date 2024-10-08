import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider"; // Ensure this path is correct

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext); // Get the auth state

  // Check if the user is authenticated
  if (!auth.accessToken) {
    console.log("User not authenticated");
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render the children (protected component)
};

export default ProtectedRoute;
