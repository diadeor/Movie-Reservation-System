import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import DateAndTime from "../DateAndTime";
import { type Show, type Movie, useShowContext } from "@/contexts/ShowsContext";
import { Input } from "../ui/input";

const EditShows = ({ showInfo, setCurrentTab }: { showInfo: Show; setCurrentTab: any }) => {
  const { movies } = useShowContext();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("07:00:00");

  const movie: Movie = movies.find((movie: Movie) => showInfo?.movie_id === movie.id);

  return (
    <div className="relative tab-admin flex flex-col h-full w-full p-2 px-4 rounded-md bg-orange-900 font-poppins">
      <div className="top min-h-10 mb-2 items-center font-macondo flex flex-row justify-between">
        <p className="title flex flex-row gap-1 items-center uppercase tracking-wider text-xl font-bold">
          <ChevronLeft className="w-8 h-8 cursor-pointer" onClick={() => setCurrentTab("shows")} />
          Edit Show
        </p>
      </div>

      <hr className="border border-orange-800 rounded-full mb-2" />
      {movie && (
        <div className="movie mb-5 grid grid-cols-[auto_1fr] fr grid-rows-4">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-20 row-span-full rounded-md mr-3"
          />
          <p className=" flex items-center font-bold text-lg">{movie.title}</p>
          <p className=" flex items-center">{movie.genre}</p>
          <p className=" flex items-center uppercase tracking-wider">{movie.language}</p>
          <p>{movie.runtime}</p>
        </div>
      )}
      <DateAndTime
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        timeClass="bg-orange-800 text-white border-orange-700"
        dateClass="bg-orange-800 border-orange-700 text-white focus:bg-black"
      />
      <Input className="mt-3 border-orange-700 bg-orange-800" />
    </div>
  );
};

export default EditShows;
