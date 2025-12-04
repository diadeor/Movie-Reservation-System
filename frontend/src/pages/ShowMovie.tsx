import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dates from "@/components/Dates";

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

const ShowMovie = () => {
  const { id } = useParams();
  const singleMovieUrl = `http://localhost:5000/api/movies/${id}`;
  const getShowsUrl = `http://localhost:5000/api/shows/movie/${id}`;
  const getReq = useFetch();
  const [movie, setMovie] = useState<Movie>();
  const [shows, setShows] = useState<Show[]>();
  const [selectedDate, setSelectedDate] = useState(dates[0].value);
  const [filteredShows, setFilteredShows] = useState<Show[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getReq(singleMovieUrl);
      if (data.success && !error) setMovie(data.movie);

      const {
        data: { shows },
        error: err,
      } = await getReq(getShowsUrl);
      if (shows && !err) setShows(shows);
    };
    fetchData();
  }, []);

  const details = movie && [
    {
      title: "Director",
      value: movie.director,
    },
    {
      title: "Actors",
      value: movie.cast,
    },
    {
      title: "Released",
      value: movie.released,
    },
    {
      title: "Runtime",
      value: `${(+movie.runtime.split(" ")[0] / 60).toFixed(0)} hours ${(
        +movie.runtime.split(" ")[0] % 60
      ).toFixed(0)} mins`,
    },
  ];

  useEffect(() => {
    const showsTemp = shows?.filter((show) => show.date === selectedDate);
    setFilteredShows(showsTemp);
  }, [selectedDate, shows]);
  return (
    movie && (
      <div className="movie-container p-10 flex flex-col gap-5 text-white bg-white/20">
        <div className="movie-details flex flex-row flex-wrap justify-center gap-5 overflow-hidden">
          <img src={movie.poster} alt="" className="rounded-3xl flex-1 w-full max-w-60" />
          <div className="right font-poppins flex-1 min-w-70 w-full">
            <p className="font-bold text-xl bg-white/50 text-black inline px-3 uppercase">
              {movie.title}
            </p>
            <p className="uppercase tracking-wide font-jetbrains font-semibold mb-5 mt-2">
              {movie.genre}
            </p>
            <p className="mb-5">{movie.plot}</p>
            <table>
              <tbody>
                {details &&
                  details.map((item, index) => {
                    return (
                      <tr className="" key={index}>
                        <td className="font-jetbrains">{item.title}: </td>
                        <td className="pl-3 font-bold">{item.value}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="uppercase font-black tracking-wider text-xl mt-5 text-center">shows</p>
        <ul className="date flex flex-row items-center justify-center gap-2">
          {dates.map((date, index) => {
            const { day, month, value } = date;
            return (
              <li
                className={`cursor-pointer flex flex-col items-center justify-center bg-white/30 rounded-full w-15 h-15 border-2 text-sm font-jetbrains ${
                  selectedDate === value ? "bg-white/70" : ""
                }`}
                key={index}
                onClick={() => setSelectedDate(value)}
              >
                <span className={`font-bold ${!month && "uppercase"}`}>{day}</span>
                {month && <span className="uppercase">{month}</span>}
              </li>
            );
          })}
        </ul>
        <hr className="border border-white/40 rounded-full" />
        <ul className="time flex flex-row">
          {filteredShows &&
            filteredShows.map((show, index) => {
              const time = show.time.slice(0, 2);
              const am = +time / 12 > 1 ? "pm" : "am";
              const updatedTime = `${+time % 12}:${show.time.slice(3, 5)}`;

              return (
                <Link to={`/shows/${show.id}`}>
                  <li
                    key={index}
                    className="font-jetbrains uppercase bg-white/20 p-10 font-bold text-2xl rounded-md backdrop-blur-sm"
                  >
                    {updatedTime}&nbsp;
                    {am}
                  </li>
                </Link>
              );
            })}
          {filteredShows?.length === 0 && (
            <p className="text-center border-2 rounded-tr-4xl rounded-bl-4xl rounded-md w-full py-10 text-xl font-semibold text-red-300">
              No shows !!!
            </p>
          )}
        </ul>
      </div>
    )
  );
};

export default ShowMovie;
