import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import DateAndTime from "../DateAndTime";
import { type Show, type Movie, useShowContext } from "@/contexts/ShowsContext";
import InputLabel from "../InputLabel";
import { Button } from "../ui/button";
import usePut from "@/hooks/usePut";

const EditShows = ({ showInfo, setCurrentTab }: { showInfo: Show; setCurrentTab: any }) => {
  const { movies } = useShowContext();
  const [date, setDate] = useState(new Date(showInfo.date));
  const [time, setTime] = useState(showInfo.time);
  const [price, setPrice] = useState(showInfo.price);
  const [status, setStatus] = useState(showInfo.status);
  const editShowUrl = `http://localhost:5000/api/shows/update/${showInfo.id}`;
  const editShowReq = usePut(editShowUrl);
  const [message, setMessage] = useState("");
  const [bg, setBg] = useState("bg-green-600");

  const movie: Movie = movies.find((movie: Movie) => showInfo?.movie_id === movie.id);

  const handlePriceChange = (e: any) => setPrice(e.target.value);
  const showObj = {
    date: date.toLocaleDateString("en-ca"),
    time,
    price,
    status,
  };

  const editShow = async () => {
    try {
      const { data, error } = await editShowReq(showObj);
      console.log(data);
      if (error) {
        setMessage(error);
        setBg("bg-red-600");
      } else {
        setMessage(data.message);
        setBg("bg-green-600");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative tab-admin flex flex-col h-full w-full p-2 px-4 rounded-md bg-orange-950 font-poppins text-orange-200">
      <div className="top min-h-10 mb-2 items-center font-macondo flex flex-row justify-between">
        <p className="title flex flex-row gap-1 items-center uppercase tracking-wider text-xl font-bold">
          <ChevronLeft className="w-8 h-8 cursor-pointer" onClick={() => setCurrentTab("shows")} />
          Edit Show
        </p>
      </div>
      <hr className="border border-orange-600 rounded-full mb-2" />
      {message && (
        <p className={`mb-2 ${bg} text-center text-white rounded-lg font-bold p-0.5`}>{message}</p>
      )}
      <div className="show-info flex flex-col gap-5 h-full">
        {movie && (
          <div className="movie grid grid-cols-[auto_1fr] fr grid-rows-4">
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
        <DateAndTime date={date} setDate={setDate} time={time} setTime={setTime} theme="orange" />
        <InputLabel
          type="number"
          name="price"
          placeholder="200"
          label="Price"
          bg="bg-orange-900"
          border="border-orange-800"
          onChange={handlePriceChange}
          defaultValue={showInfo.price}
        />
        <div className="select flex flex-col gap-1">
          <label htmlFor="" className="font-bold">
            Status
          </label>
          <select
            name="status"
            defaultValue={showInfo.status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-orange-900 p-2 rounded-md outline-none focus:bg-orange-700"
          >
            <option value="upcoming">Upcoming</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <Button
          type="submit"
          variant={`secondary`}
          className={`h-11  w-full bg-orange-700 text-white font-bold text-md hover:bg-orange-500 shadow-lg shadow-amber-600/50 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-900 focus:ring-orange-500 
            }`}
          onClick={editShow}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditShows;
