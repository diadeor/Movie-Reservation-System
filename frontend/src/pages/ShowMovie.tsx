import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DateComponent, { dates } from "@/components/Dates";
import { useShowContext, type Movie, type Show } from "@/contexts/ShowsContext";

const ShowMovie = () => {
  const { id } = useParams();
  const { movies, shows } = useShowContext();
  const [movie, setMovie] = useState<Movie>();
  const [selectedDate, setSelectedDate] = useState(dates[0].value);
  const [filteredShows, setFilteredShows] = useState<Show[]>();

  useEffect(() => {
    movies && setMovie(movies.find((item: Movie) => item.imdbID === id));
    const movieSpecificShows: Show[] = shows.filter((show: Show) => show.movie_id === id);
    for (let show of movieSpecificShows) {
      const { date } = show;
      const movieTime = new Date(date);
      const currentTime = new Date();
      const isMovieValid = movieTime > currentTime;
      if (isMovieValid) {
        const validDate = movieTime.toLocaleDateString("en-ca");
        setSelectedDate(validDate);
      }
      break;
    }
  }, []);

  const details = movie && [
    { title: "Director", value: movie.director },
    { title: "Actors", value: movie.cast },
    { title: "Released", value: movie.released },
    { title: "Runtime", value: movie.runtime },
  ];

  useEffect(() => {
    const showsTemp = shows?.filter(
      (show: Show) =>
        new Date(show.date).toLocaleDateString("en-ca") === selectedDate && show.movie_id === id,
    );
    setFilteredShows(showsTemp);
  }, [selectedDate, shows]);
  return (
    movie && (
      <>
        <div className="movie-details flex flex-row flex-wrap justify-center gap-5 overflow-hidden md:py-5">
          <img src={movie.poster} alt="" className="rounded-3xl flex-1 w-full max-w-60 h-full" />
          <div className="right font-poppins flex-1 min-w-70 w-full">
            <p className="font-bold text-xl bg-orange-800 text-white inline px-5 uppercase rounded-xs rounded-tl-xl rounded-br-xl">
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
                    const { title, value } = item;
                    return (
                      <tr className="" key={index}>
                        <td className="font-jetbrains">{title}: </td>
                        <td className="pl-3 font-bold">{value}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="uppercase font-black tracking-wider text-xl mt-5 text-center">shows</p>
        <DateComponent size="large" currentDate={selectedDate} setCurrentDate={setSelectedDate} />
        <hr className="border border-orange-800 rounded-full" />
        <ul className="time flex flex-row">
          {filteredShows &&
            filteredShows.map((show, index) => {
              const { date } = show;
              const time = new Date(date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <Link to={`/shows/${show.id}`} key={index}>
                  <li
                    key={index}
                    className="font-jetbrains uppercase bg-orange-900 p-10 font-bold text-2xl rounded-md backdrop-blur-sm"
                  >
                    {time}
                  </li>
                </Link>
              );
            })}
          {filteredShows?.length === 0 && (
            <p className="text-center border-2 border-red-400 rounded-tr-4xl rounded-bl-4xl rounded-md w-full py-10 text-xl font-semibold text-red-400">
              No shows !!!
            </p>
          )}
        </ul>
      </>
    )
  );
};

export default ShowMovie;
