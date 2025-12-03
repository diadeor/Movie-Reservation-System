import axios from "axios";
import { useEffect, useState } from "react";

type Movie = {
  title: string;
  genre: string;
  poster: string;
  plot: string;
  year: number;
  cast: string;
  director: string;
  runtime: number;
};

const Movies = () => {
  const url = "http://localhost:5000/api/movies";
  const [movies, setMovies] = useState<Movie[]>();
  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(url);
      if (data.success) setMovies(data.movies);
    };
    getMovie();
  }, []);
  return (
    movies &&
    movies.map((movie, index) => {
      const { title, genre, poster, year, director, runtime, cast } = movie;
      const castList = cast.split(", ");
      return (
        <li className="bg-white/20 p-3 rounded-md flex flex-row gap-3" key={index}>
          <div className="first-column">
            <img src={poster} alt="" className="min-w-20 w-20 rounded-md" />
          </div>
          <div className="mid flex flex-col w-full">
            <p className="title font-semibold text-lg text-lime-500">
              {title} ({year})
            </p>
            <p className="genre text-sm ">{genre}</p>
            <p className="cast mb-3 text-sm font-macondo">
              [ {castList[0]}, {castList[1]} ]
            </p>
            <div className="two flex flex-row gap-2 w-full font-jetbrains">
              <p className="direct flex flex-col bg-white/20 p-2 grow rounded-md flex-1">
                <span className="text-lime-500">Director</span>{" "}
                <span className="font-bold">{director}</span>
              </p>
              <p className="direct flex flex-col bg-white/20 p-2 grow rounded-md flex-1">
                <span className="text-lime-500">Duration</span>{" "}
                <span className="font-bold">{runtime}</span>
              </p>
            </div>
          </div>
        </li>
      );
    })
  );
};

export default Movies;
