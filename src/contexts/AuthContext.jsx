// contexts/AuthContext.js (example)
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    // Check token/localStorage for role, e.g., decode JWT
    const token = localStorage.getItem('token');
    if (token) {
      // Decode and set role, e.g., setUserRole(decoded.role);
    }
  }, []);
  return <AuthContext.Provider value={{ userRole }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);