import React, { useState, useEffect } from "react";
import { fetchCookie } from "./utils"; // Ensure this is the correct import
import { jwtDecode } from "jwt-decode";
const ProtectedRoute = ({ element: Element, allowedRole }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRole = async () => {
      try {
        const tokenn=await fetchCookie("token");
        const decoded=jwtDecode(tokenn);
        setUserRole(decoded.role);
        console.log(decoded);
      } catch (error) {
        console.error("Error fetching role:", error);
      } finally {
        setLoading(false);
      }
    };
    getRole();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching
  }
  if (userRole === allowedRole) {
    return <Element />;
  }
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Unauthorized</h1>
      <p>You are not authorized to access this page.</p>
    </div>
  );
};
export default ProtectedRoute;
