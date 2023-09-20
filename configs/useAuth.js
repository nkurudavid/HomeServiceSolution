// useAuth.js
import { useEffect, useState } from "react";
import { isAuthenticated } from "./authService"; // Import the authService

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const isAuthenticatedUser = await isAuthenticated();
      setAuthenticated(isAuthenticatedUser);
    }

    checkAuthentication();
  }, []);

  return authenticated;
};

export default useAuth;
