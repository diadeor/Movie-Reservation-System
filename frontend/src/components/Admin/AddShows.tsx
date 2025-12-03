import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";
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
    available_seats: ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"],
    sold_seats: [],
    status: "upcoming",
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex flex-row items-center gap-2 bg-white/20 p-1 px-4 rounded-md hover:scale-105 transition duration-300 cursor-pointer">
          <span className="font-semibold text-lg font-poppins">New</span>
          <CirclePlus />
        </button>
      </DialogTrigger>
      <DialogContent className="w-10/12">
        <DialogHeader>
          <DialogTitle>Add New Show</DialogTitle>
          <DialogDescription>Fill up the details to add a show</DialogDescription>
          {message && <p className="font-semibold bg-yellow-500 p-1 rounded-full">{message}</p>}
        </DialogHeader>
        <div className="grid gap-2">
          <div className=" gap-3 show-movies font-poppins rounded-md items-center justify-center flex flex-col overflow-hidden">
            <Select onValueChange={(id) => setShow({ ...show, movie_id: +id })}>
              <SelectTrigger className="w-full min-h-20 max-h-20">
                <SelectValue placeholder="Select a movie" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Movies</SelectLabel>
                  {movieList &&
                    movieList.map((item, index) => {
                      const cast = item.cast.split(", ");
                      return (
                        <SelectItem value={String(item.id)} className="flex flex-row" key={index}>
                          <img src={item.poster} className="w-10 rounded-sm" />
                          <div className="right flex flex-col">
                            <p className="flex flex-row">
                              <span className="font-semibold">{item.title}</span>&nbsp;(
                              <span>{item.year}</span>)
                            </p>

                            <p className="cast">{`${cast[0]}, ${cast[1]}`}</p>
                          </div>
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <DateAndTime date={date} setDate={setDate} time={time} setTime={setTime} />
            <Input
              type="number"
              placeholder="Price per seat"
              min={0}
              value={show.price}
              onChange={(e) => setShow({ ...show, price: +e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={addShow}
            disabled={
              show.date && show.time && show.price && show.movie_id && dateIsValid ? false : true
            }
          >
            Add Show
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddShow;
