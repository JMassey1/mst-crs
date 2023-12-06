import { ReactNode, createContext } from "react";
import { toast } from "react-toastify";
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
    const loginToast = toast.loading("Logging in...", { autoClose: false });
    return api
      .post("auth/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          setUser({ username: username, first_name: response.data.first_name, last_name: response.data.last_name, auth_token: response.data.token });
          toast.update(loginToast, { render: "Login successful!", type: "success", isLoading: false, autoClose: 1500 });
          return true;
        } else {
          toast.update(loginToast, { render: "Login failed...", type: "error", isLoading: false, autoClose: 1500 });
          return false;
        }
      })
      .catch((error) => {
        toast.update(loginToast, { render: error.response.data.non_field_errors[0], type: "error", isLoading: false, autoClose: 1500 });
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
