import { useContext, useState, useEffect, createContext, type ReactElement } from "react";
import useFetch from "@/hooks/useFetch";
import { useAuthContext } from "./AuthContext";

export type Movie = {
  imdbID: string;
  id: string;
  title: string;
  poster: string;
  cast: string;
  genre: string;
  language: "english" | "nepali" | "hindi";
  plot: string;
  runtime: string;
  year: number;
  director: string;
  released: string;
  status: "active" | "inactive";
};
export type Show = {
  id: string;
  date: Date;
  movie_id: string;
  price: number;
  status: "upcoming" | "expired" | "cancelled";
};

export type User = {
  email: string;
  name: string;
  role: "customer" | "admin";
  id: string;
};

export type Ticket = {
  id: string;
  total_amount: number;
  show_id: string;
  user_id: string;
  status: "unpaid" | "paid" | "refunded" | "cancelled" | "attended" | "absent";
};

export type Seat = {
  id: string;
  show_id: string;
  seat_number: string;
  status: "available" | "locked" | "booked";
  locked_until: Date;
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

        const isAdmin = Boolean(user?.role === "admin");
        const requests = [req1, req2];

        if (isAdmin) requests.push(getRequest(`${baseUrl}/users`));

        const results = await Promise.all(requests);

        const [movieRes, showRes, userRes] = results;

        if (movieRes?.data?.movies) setMovies(movieRes.data.movies);
        if (showRes?.data?.shows) setShows(showRes.data.shows);
        if (userRes?.data?.users) setUsers(userRes.data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <ShowContext.Provider value={{ movies, shows, users }}>
      {!loading && children}
    </ShowContext.Provider>
  );
};

export default ShowProvider;
