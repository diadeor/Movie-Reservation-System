import { useContext, useState, useEffect, createContext, type ReactElement } from "react";
import useFetch from "@/hooks/useFetch";
import { useAuthContext } from "./AuthContext";

export type Movie = {
  id: number;
  title: string;
  poster: string;
  cast: string;
  genre: string;
  language: string;
  plot: string;
  runtime: string;
  year: number;
  director: string;
  released: string;
  status: string;
};
export type Show = {
  id: number;
  date: string;
  time: string;
  movie_id: number;
  price: number;
  available_seats: string[];
  reserved_seats: string[];
  status: string;
};

export type User = {
  email: string;
  name: string;
  role: string;
  id: number;
};

export type Ticket = {
  id: number;
  discount: number;
  grand_total: number;
  number_of_seats: number;
  seats: string[];
  show: number;
  status: string;
  total: number;
  user: number;
};

export const ShowContext: any = createContext("");

export const useShowContext: any = () => useContext(ShowContext);

const ShowProvider = ({ children }: { children: ReactElement }) => {
  const [shows, setShows] = useState<Show[]>();
  const [movies, setMovies] = useState<Movie[]>();
  const [users, setUsers] = useState<User[]>();
  const getRequest = useFetch();
  const baseUrl = "http://localhost:5000/api";
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req1 = getRequest(`${baseUrl}/movies`);
        const req2 = getRequest(`${baseUrl}/shows`);
        // const req3 = getRequest(`${baseUrl}/users`);

        // Parallel request
        if (user) {
          const [
            {
              data: { movies },
              error,
            },
            {
              data: { shows },
              error: err,
            },
            // {
            //   data: { users },
            //   error: userErr,
            // },
          ] = await Promise.all([req1, req2]);
          if (!error && movies) setMovies(movies);
          if (!err && shows) setShows(shows);
          // if (!userErr && users) setUsers(users);
        } else {
          const [
            {
              data: { movies },
              error,
            },
            {
              data: { shows },
              error: err,
            },
          ] = await Promise.all([req1, req2]);
          if (!error && movies) setMovies(movies);
          if (!err && shows) setShows(shows);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <ShowContext.Provider value={{ movies, shows }}>{!loading && children}</ShowContext.Provider>
  );
};

export default ShowProvider;
