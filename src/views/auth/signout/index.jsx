import { useAuth } from "AuthContext";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Signout = () => {
  const history = useHistory();

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  history.push("/");

  return null;
};

export default Signout;
