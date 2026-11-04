
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eventsphere_user")) || null;
    } catch {
      return null;
    }
  });

  const register = (userData) => {
    const users = JSON.parse(
      localStorage.getItem("eventsphere_users") || "[]"
    );

    const existingUser = users.find(
      (item) => item.email === userData.email
    );

    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    localStorage.setItem(
      "eventsphere_users",
      JSON.stringify([...users, newUser])
    );

    return { success: true, message: "Registration successful" };
  };

  const login = (email, password) => {
    const users = JSON.parse(
      localStorage.getItem("eventsphere_users") || "[]"
    );

    const existingUser = users.find(
      (item) => item.email === email && item.password === password
    );

    if (!existingUser) {
      return { success: false, message: "Invalid email or password" };
    }

    const loggedInUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    setUser(loggedInUser);
    localStorage.setItem("eventsphere_user", JSON.stringify(loggedInUser));

    return { success: true, message: "Login successful" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eventsphere_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
