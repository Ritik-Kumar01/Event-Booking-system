import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  setLoading(false);
}, []);

const login = async (email, password) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return false;
    }

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    return true; // ✅ IMPORTANT
  } catch (error) {
    alert("Server error");
    return false;
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
};


  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
