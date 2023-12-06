import { useContext, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { UserContext } from "../contexts/UserAuthContext";

export const useAuthRequired = (navFunc: NavigateFunction): void => {
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn()) {
      navFunc("/forbidden");
    }
  }, [navFunc, isLoggedIn]);
};
