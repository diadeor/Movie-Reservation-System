import { useContext, createContext, useState, type ReactElement, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const AuthContext: any = createContext("");

export const useAuthContext: any = () => useContext(AuthContext);

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const fetchUserUrl = "http://localhost:5000/api/users/me";
  const [loading, setLoading] = useState(true);
  const fetchUserReq = useFetch();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await fetchUserReq(fetchUserUrl);
        if (data && data.success && !error) {
          setUser(data.user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>{!loading && children}</AuthContext.Provider>
  );
};

export default AuthProvider;
