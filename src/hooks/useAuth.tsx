import { createContext, useMemo, useContext, ReactNode } from "react";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  token: string;
  expiration: Date;
  refreshToken: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (data: UserData) => void;
  logout: () => void;
}

interface AuthContextProps {
  children: ReactNode;
  user: UserData;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = (
  props: AuthContextProps
) => {
  const [user, setUser] = useLocalStorage("user", props.user);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: UserData) => {
    setUser(data);
    navigate("/home/dashboard");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};
