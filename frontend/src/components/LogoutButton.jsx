// LogoutButton.jsx Prueba de boton.
import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function LogoutButton() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    console.log("Logout button clicked"); 
    logout();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
