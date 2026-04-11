import { Button } from "@/components/ui/button";
import { CirclePlus, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/useSendRequest";
import { Input } from "../ui/input";
import DateAndTime from "../DateAndTime";

type MovieFew = {
  id: number;
  title: string;
  poster: string;
  year: number;
  cast: string;
};
// type Show = {
//   date: Date;
//   time: string;
//   price: number;
//   movieId: undefined | string | number;
// };

const AddShow = () => {
  const [movieList, setMovieList] = useState<MovieFew[]>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSelectMenu, setShowSelectMenu] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieFew>();
  const fetchMovieUrl = "http://localhost:5000/api/movies/admin";
  const addShowUrl = "http://localhost:5000/api/shows/add";
  const fetchMovieReq = useFetch();
  const addShowReq = usePost(addShowUrl);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("07:30:00");
  const [show, setShow] = useState({
    date: date.toLocaleDateString("en-ca"),
    time,
    price: 0,
    movie_id: 0,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data: movies } = await fetchMovieReq(fetchMovieUrl);
        if (movies.success) setMovieList(movies.movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    setShow({ ...show, date: date.toLocaleDateString("en-ca"), time });
  }, [date, time]);

  const addShow = async () => {
    const { data, error } = await addShowReq({ show });
    if (error) {
      setMessage(error);
    } else {
      if (data.success) setMessage(data.message);
    }
  };

  const dateIsValid =
    new Date(show.date).getTime() >= new Date(new Date().toLocaleDateString("en-ca")).getTime();

  const chooseMovie = (current: MovieFew) => {
    setShow({ ...show, movie_id: current.id });
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
            {!selectedMovie && <p>Select a movie</p>}
            {selectedMovie && (
              <div className="flex flex-row gap-3">
                <img src={selectedMovie.poster} className="h-15 rounded-sm" />
                <p className="flex flex-row">
                  <span className="font-semibold">{selectedMovie.title}</span>&nbsp;(
                  <span>{selectedMovie.year}</span>)
                </p>
              </div>
            )}
            <ChevronDown className="mr-2" size={`1em`} />
            {showSelectMenu && (
              <ul className="movies z-10 absolute top-20 max-h-73 overflow-y-scroll bg-white p-1 flex flex-col gap-1 rounded-md border w-full left-0">
                {movieList &&
                  movieList.map((item, index) => {
                    return (
                      <li
                        className="flex flex-row items-center transition gap-3 hover:bg-gray-300 p-1 rounded-md hover:scale-95"
                        key={index}
                        onClick={() => chooseMovie(item)}
                      >
                        <img src={item.poster} className="h-15 rounded-sm" />
                        <p className="flex flex-row">
                          <span className="font-semibold">{item.title}</span>&nbsp;(
                          <span>{item.year}</span>)
                        </p>
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
              value={show.price}
              onChange={(e) => setShow({ ...show, price: +e.target.value })}
            />
          </div>
          <div className="buttons flex flex-row justify-end items-center w-full gap-2 mt-2">
            <Button
              type="button"
              variant={`outline`}
              onClick={() => setDialogOpen(false)}
              className="grow "
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={`default`}
              onClick={addShow}
              className="grow"
              disabled={
                show.date && show.time && show.price && show.movie_id && dateIsValid ? false : true
              }
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
