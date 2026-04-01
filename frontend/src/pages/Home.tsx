import banner from "@/assets/banner.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShowContext, type Movie, type Show } from "@/contexts/ShowsContext";
import DateComponent, { dates } from "@/components/Dates";
import { Info } from "lucide-react";

const Home = () => {
  const { movies, shows } = useShowContext();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>();
  const [selectedDate, setSelectedDate] = useState(dates[0].value);

  useEffect(() => {
    const tempShows = shows.filter((item: Show) => {
      const showDateTimeStamp = new Date(item.date).getTime();
      const selectedDateTimeStamp = new Date(selectedDate).getTime();
      const showExists = showDateTimeStamp === selectedDateTimeStamp;
      // console.log(today);
      return showExists ? true : false;
    });
    const movieIdOnly = tempShows.map((item: Show) => item.movie_id);
    const tempMovies = movies.filter((item: Movie) => movieIdOnly.includes(item.id));

    setFilteredMovies(tempMovies);
  }, [selectedDate]);

  return (
    <>
      <img src={banner} alt="" className="rounded-md" />
      <hr className="rounded-full border border-orange-700" />
      <div className="now-showing flex flex-col">
        <div className="flex flex-row flex-wrap items-center justify-between mb-5">
          <p className=" text-xl uppercase">Now Showing</p>
          <DateComponent size="small" currentDate={selectedDate} setCurrentDate={setSelectedDate} />
        </div>
        <ul className="shows grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 font-poppins w-full">
          {filteredMovies &&
            filteredMovies.map((item: Movie, index: number) => {
              const { id, title, runtime, poster } = item;
              return (
                <Link to={`/movie/${id}`} key={index}>
                  <li className="movie flex flex-col items-center">
                    <img src={poster} alt="" className=" w-full rounded- rounded-md" />
                    <p className="font-semibold mt-2 uppercase">{title}</p>
                    <p className="font-jetbrains text-sm text-white/80">{runtime}</p>
                  </li>
                </Link>
              );
            })}
          {filteredMovies?.length === 0 && (
            <p
              className="border-2 gap-2 h-50 w-full flex flex-row items-center justify-center
            rounded-md border-orange-700 text-orange-600 text-xl col-span-full"
            >
              <Info />
              No shows for this date
            </p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Home;
