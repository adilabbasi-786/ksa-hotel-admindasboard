import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <AuthContext.Provider value={{ token: token, setToken: setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};
