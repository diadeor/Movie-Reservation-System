import { Button } from "@/components/ui/button";
import { CirclePlus, ChevronDown } from "lucide-react";
import { useState } from "react";
import usePost from "@/hooks/useSendRequest";
import { Input } from "../ui/input";
import DateAndTime from "../DateAndTime";
import { useShowContext, type Movie } from "@/contexts/ShowsContext";

const AddShow = () => {
  const { movies } = useShowContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSelectMenu, setShowSelectMenu] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const addShowUrl = "http://localhost:5000/api/shows/add";
  const addShowReq = usePost(addShowUrl);
  const [message, setMessage] = useState("");
  const today = new Date().toLocaleDateString("en-ca");
  const [date, setDate] = useState<string>(today);
  const [time, setTime] = useState<string>("07:30:00");
  const [showDetails, setShowDetails] = useState({ price: 0, movie_id: "" });

  // Check whether the given time is valid or not
  const extraTimeToAdd = 1000 * 60 * 60 * 1; // One hour in milliseconds
  const isDateValid = new Date().getTime() + extraTimeToAdd < new Date(`${date}T${time}`).getTime();

  const addShow = async () => {
    try {
      const newTime = new Date(`${date}T${time ? time : "00:00:00"}`).toISOString();
      const { data, error } = await addShowReq({ ...showDetails, date: newTime });
      error ? setMessage(error) : data.success ? setMessage(data.message) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const chooseMovie = (current: Movie) => {
    setShowDetails({ ...showDetails, movie_id: current.imdbID });
    setSelectedMovie(current);
  };
  return (
    <div>
      <button
        onClick={() => setDialogOpen((prev) => !prev)}
        className="flex flex-row items-center gap-2 bg-white/20 p-1 px-4 rounded-md hover:scale-105 transition duration-300 cursor-pointer"
      >
        <span className="font-semibold text-lg font-poppins">New</span>
        <CirclePlus />
      </button>
      {dialogOpen && (
        <div className="fixed flex flex-col font-poppins text-black gap-2 w-10/12 max-w-150 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border bg-white rounded-md p-5 z-10">
          <p className="title font-bold text-center ">Add a show</p>
          {message && (
            <p className="font-bold bg-orange-800 text-white rounded-md p-1 text-center">
              {message}
            </p>
          )}
          <div
            onClick={() => setShowSelectMenu((prev) => !prev)}
            className="select-component relative top-0 cursor-pointer flex flex-row justify-between border text-black rounded-md h-20 pl-2 items-center font-poppins tracking-wide"
          >
            {selectedMovie ? (
              <div className="flex flex-row gap-3">
                <img src={selectedMovie.poster} className="h-15 rounded-sm" />
                <div className="right flex flex-col">
                  <p className="flex flex-row">
                    <span className="font-semibold">{selectedMovie.title}</span>&nbsp;(
                    <span>{selectedMovie.year}</span>)
                  </p>
                  <p className="text-xs">{selectedMovie.genre}</p>
                  <p className="text-xs">{selectedMovie.runtime}</p>
                </div>
              </div>
            ) : (
              <p>Select a movie</p>
            )}
            <ChevronDown className="mr-2" size={`1em`} />
            {showSelectMenu && (
              <ul className="movies z-10 absolute top-20 max-h-73 overflow-y-scroll bg-white p-1 flex flex-col gap-1 rounded-md border w-full left-0">
                {movies &&
                  movies.map((item: Movie, index: number) => {
                    const { title, year, poster, runtime } = item;
                    return (
                      <li
                        className="flex flex-row items-center transition gap-3 hover:bg-gray-300 p-1 rounded-md hover:scale-95"
                        key={index}
                        onClick={() => chooseMovie(item)}
                      >
                        <img src={poster} className="h-15 rounded-sm" />
                        <div className="right flex flex-col">
                          <p className="flex flex-row">
                            <span className="font-semibold">{title}</span>&nbsp;(
                            <span>{year}</span>)
                          </p>
                          <p className="text-sm">{runtime}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
          <DateAndTime date={date} setDate={setDate} time={time} setTime={setTime} />

          <div className="price">
            <label htmlFor="" className="text-slate-700 font-bold pl-1">
              Price
            </label>
            <Input
              type="number"
              placeholder="Price per seat"
              min={0}
              value={showDetails.price}
              onChange={(e) => setShowDetails({ ...showDetails, price: +e.target.value })}
            />
          </div>
          <div className="buttons flex flex-row justify-end items-center w-full gap-2 mt-2">
            <Button
              type="button"
              variant={`outline`}
              onClick={() => setDialogOpen(false)}
              className="grow"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={`default`}
              onClick={addShow}
              className="grow"
              disabled={showDetails.price && showDetails.movie_id && isDateValid ? false : true}
            >
              Add Show
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddShow;
