import { useContext, useState, useEffect, createContext, type ReactElement } from "react";
import useFetch from "@/hooks/useFetch";

export const ShowContext: any = createContext("");

export const useShowContext: any = () => useContext(ShowContext);

type Movie = {
  title: string;
  poster: string;
  cast: string;
  genre: string;
  language: string;
  plot: string;
  runtime: string;
  year: string;
  director: string;
  released: string;
};
type Show = { id: number; date: string; time: string };

const ShowProvider = ({ children }: { children: ReactElement }) => {
  const [shows, setShows] = useState<Show[]>();
  const [movies, setMovies] = useState<Movie[]>();
  const getRequest = useFetch();
  const baseUrl = "http://localhost:5000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { movies },
          error,
        } = await getRequest(`${baseUrl}/movies/active`);
        const {
          data: { shows },
          error: err,
        } = await getRequest(`${baseUrl}/shows`);

        console.log(movies);
        if (!error && movies) setMovies(movies);
        if (!err && shows) setShows(shows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <ShowContext.Provider value={{ movies, shows }}>{children}</ShowContext.Provider>;
};

export default ShowProvider;
