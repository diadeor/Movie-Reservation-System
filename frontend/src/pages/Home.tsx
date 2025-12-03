import banner from "@/assets/banner.png";
import Movie from "@/components/Movie";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster: string;
  runtime: string;
};

const Home = () => {
  const getMoviesUrl = "http://localhost:5000/api/movies/active";
  const getMoviesReq = useFetch();
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data, error } = await getMoviesReq(getMoviesUrl);
        if (data.success && !error) {
          setMovies(data.movies);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);
  const DateItem = ({ day, month }: { day: string; month?: string }) => {
    return (
      <li className="flex flex-col items-center justify-center bg-white/30 rounded-full w-13 h-13 border-2 text-xs">
        <span className={`font-bold ${!month && "uppercase"}`}>{day}</span>
        {month && <span className="uppercase">{month}</span>}
      </li>
    );
  };
  return (
    <div className="home px-5 max-w-6xl w-full flex flex-col gap-5 text-white font-macondo">
      <img src={banner} alt="" className="rounded-md mt-5" />
      <div className="now-showing mt-5 flex flex-col">
        <div className="flex flex-row flex-wrap items-center justify-between mb-5">
          <p className=" text-xl uppercase">Now Showing</p>
          <ul className="dates flex flex-row gap-2">
            <DateItem day="today" />
            <DateItem day="tomm" />
            <DateItem day="1" month="dec" />
            <DateItem day="2" month="dec" />
            <DateItem day="3" month="dec" />
          </ul>
        </div>
        <ul className="shows grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 font-poppins w-full">
          {movies &&
            movies.map((item, index) => {
              const runtime = +item.runtime.split(" ")[0];
              const hours = (runtime / 60).toFixed(0);
              const minutes = runtime % 60;

              return (
                <li className="movie flex flex-col flex-1 items-center" key={index}>
                  <img
                    src={item.poster}
                    alt=""
                    className="flex-1 w-full rounded-tl-4xl rounded-md"
                  />
                  <p className="font-semibold mt-2 uppercase">{item.title}</p>
                  <p className="font-jetbrains text-sm text-white/80">{`${hours} hours ${
                    minutes ? `${minutes} mins` : ""
                  }`}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
