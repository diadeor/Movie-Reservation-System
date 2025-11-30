import { DialogDemo } from "@/components/Admin/AddMovies";
import axios from "axios";
import { useEffect, useState } from "react";

type Movie = {
  title: string;
  genres: { id: number; name: string };
  poster_path: string;
  overview: string;
  runtime: number;
};

const Movies = () => {
  const [movies, setMovies] = useState<any>();
  const url = "https://www.omdbapi.com/?i=tt1375666&apikey=f9c86c81";
  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(url);
      setMovies(data);
      console.log(data);
    };
    getMovie();
  }, []);
  return (
    <li className="bg-white/20 p-3 rounded-md flex flex-row gap-3">
      {movies && (
        <>
          <div className="first-column">
            <img src={movies.Poster} alt="" className="min-w-20 w-20 rounded-md" />
          </div>
          <div className="mid flex flex-col w-full">
            <p className="title font-semibold text-lg text-yellow-500">
              {movies.Title} ( {movies.Released} )
            </p>
            <p className="genre text-sm mb-3">{movies.Genre}</p>
            <div className="two flex flex-row gap-2 w-full font-jetbrains">
              <p className="direct flex flex-col bg-white/20 p-2 grow rounded-md flex-1">
                <span>Director</span> <span className="font-bold">{movies.Director}</span>
              </p>
              <p className="direct flex flex-col bg-white/20 p-2 grow rounded-md flex-1">
                <span>Duration</span> <span className="font-bold">{movies.Runtime}</span>
              </p>
            </div>
            <p className="cast p-2 flex flex-col items-center bg-white/20 rounded-md mt-2">
              <span>Cast</span> <span className="font-bold">{movies.Actors}</span>
            </p>
          </div>
        </>
      )}
    </li>
  );
};

export default Movies;
