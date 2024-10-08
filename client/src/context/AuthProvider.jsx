import React, { createContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext(); 

const AuthProvider = ({ children }) => {
  // Initialize auth state with user, roles, and accessToken
  const [auth, setAuth] = useState({ user: null, roles: [], accessToken: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // Default export
export { AuthProvider }; // Named export
