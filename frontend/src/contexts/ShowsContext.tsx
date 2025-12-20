import { useContext, useState, useEffect, createContext, type ReactElement } from "react";
import useFetch from "@/hooks/useFetch";

export const ShowContext: any = createContext("");

export const useShowContext: any = () => useContext(ShowContext);

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

const ShowProvider = ({ children }: { children: ReactElement }) => {
  const [shows, setShows] = useState<Show[]>();
  const [movies, setMovies] = useState<Movie[]>();
  const getRequest = useFetch();
  const baseUrl = "http://localhost:5000/api";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req1 = getRequest(`${baseUrl}/movies`);
        const req2 = getRequest(`${baseUrl}/shows`);

        // Parallel request
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
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <ShowContext.Provider value={{ movies, shows }}>{!loading && children}</ShowContext.Provider>
  );
};

export default ShowProvider;
