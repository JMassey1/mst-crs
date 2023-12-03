import { ReactNode, createContext } from "react";
import api from "../api/api";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type User = {
  username: string;
  first_name: string;
  last_name: string;
  auth_token: string;
};

type UserContextProps = {
  user: User;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: () => boolean;
  getAuthHeader: () => { Authorization: string };
};

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextProps>({
  user: { username: "", first_name: "", last_name: "", auth_token: "" },
  login: async () => false,
  logout: () => {},
  isLoggedIn: () => false,
  getAuthHeader: () => ({ Authorization: "" }),
});

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useLocalStorage<User>("user", { username: "", first_name: "", last_name: "", auth_token: "" });

  const login = async (username: string, password: string): Promise<boolean> => {
    return api
      .post("auth/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          setUser({ username: username, first_name: response.data.first_name, last_name: response.data.last_name, auth_token: response.data.token });

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
    setUser({ username: "", first_name: "", last_name: "", auth_token: "" });
  };

  const isLoggedIn = (): boolean => {
    return user.auth_token !== "";
  };

  const getAuthHeader = () => {
    return { Authorization: `Token ${user.auth_token}` };
  };

  return <UserContext.Provider value={{ user: user, login: login, logout: logout, isLoggedIn: isLoggedIn, getAuthHeader: getAuthHeader }}>{children}</UserContext.Provider>;
};
