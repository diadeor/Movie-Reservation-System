import banner from "@/assets/banner.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useShowContext, type Movie } from "@/contexts/ShowsContext";
import DateComponent, { dates } from "@/components/Dates";

const Home = () => {
  const { movies } = useShowContext();
  const [selectedDate, setSelectedDate] = useState(dates[0].value);

  return (
    <div className="home px-5 max-w-6xl w-full flex flex-col gap-5 text-white font-macondo">
      <img src={banner} alt="" className="rounded-md mt-5" />
      <div className="now-showing mt-5 flex flex-col">
        <div className="flex flex-row flex-wrap items-center justify-between mb-5">
          <p className=" text-xl uppercase">Now Showing</p>
          <DateComponent currentDate={selectedDate} setCurrentDate={setSelectedDate} />
        </div>
        <ul className="shows grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 font-poppins w-full">
          {movies &&
            movies.map((item: Movie, index: number) => {
              const runtime = +item.runtime.split(" ")[0];
              const hours = (runtime / 60).toFixed(0);
              const minutes = runtime % 60;

              return (
                <Link to={`/movie/${item.id}`} key={index}>
                  <li className="movie flex flex-col items-center">
                    <img src={item.poster} alt="" className=" w-full rounded- rounded-md" />
                    <p className="font-semibold mt-2 uppercase">{item.title}</p>
                    <p className="font-jetbrains text-sm text-white/80">{`${hours} hours ${
                      minutes ? `${minutes} mins` : ""
                    }`}</p>
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
