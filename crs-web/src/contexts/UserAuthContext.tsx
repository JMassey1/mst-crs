import { ReactNode, createContext } from "react";
import api from "../api/api";
import { useLocalStorage } from "../hooks/useLocalStorage";

type UserContextProps = {
  auth_token: string;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextProps>({
  auth_token: "",
  login: async () => false,
  logout: () => {},
  isLoggedIn: () => false,
});

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [authToken, setAuthToken] = useLocalStorage<string>("authToken", "");

  const login = async (username: string, password: string): Promise<boolean> => {
    return api
      .post("auth-token/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          setAuthToken(response.data.token);
          return true;
        } else {
          console.error(`Login failed with status ${response.status}`);
          return false;
        }
      })
      .catch((error) => {
        console.error(`Login failed with status ${error}`);
        return false;
      });
  };

  const logout = () => {
    setAuthToken("");
  };

  const isLoggedIn = (): boolean => {
    return authToken !== "";
  };

  return <UserContext.Provider value={{ auth_token: authToken, login: login, logout: logout, isLoggedIn: isLoggedIn }}>{children}</UserContext.Provider>;
};
