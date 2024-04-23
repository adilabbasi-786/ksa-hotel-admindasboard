import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Signout = () => {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
  }, []);
  return (
    <div>
      <p>hhhh</p>
    </div>
  );
};

export default Signout;
