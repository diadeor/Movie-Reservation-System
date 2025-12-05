import { Button } from "@/components/ui/button";
import { useShowContext, type Movie, type Show } from "@/contexts/ShowsContext";
import { CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BookShow = () => {
  const { id } = useParams();
  const showId = id ? +id : 0;
  const { movies, shows } = useShowContext();
  const [show, setShow] = useState<Show>();
  const [movie, setMovie] = useState<Movie>();
  const totalSeats = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "a10",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "b9",
    "b10",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
    "c9",
    "c10",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "d9",
    "d10",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "e9",
    "e10",
  ];
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (shows && movies) {
      const selectedShow = shows.find((show: Show) => show.id === showId);
      console.log(selectedShow);
      setShow(selectedShow);
      setMovie(movies.find((movie: Movie) => movie.id === selectedShow.movie_id));
    }
  }, [shows]);
  const addSeat = (seat: string) => {
    const alreadyExists = selectedSeats.includes(seat);
    const seatAvailable = show?.available_seats.includes(seat);
    if (!alreadyExists && seatAvailable) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="show-book relative flex flex-col items-center bg-white/20 w-full max-w-6xl p-5 min-h-[calc(100svh-70px)] gap-5">
      <p className=" text-xl text-white font-semibold font-macondo tracking-widest uppercase">
        Book your seats
      </p>
      {movie && (
        <div className="show-details flex flex-row w-full max-w-150 bg-white/20 p-3 rounded-md gap-3 text-white">
          <img src={movie.poster} alt={movie.title} className="w-20 rounded-md h-full" />
          <div className="right-show font-bold flex flex-col w-full gap-1">
            <p className="text-lg bg-white/20 p-1 px-3 flex-1 rounded-sm">{movie.title}</p>
            <p className=" bg-white/20 p-1 px-3 flex-1 rounded-sm">{movie.runtime}</p>
            <p className=" bg-white/20 p-1 px-3 flex-1 rounded-sm">{show?.time}</p>
          </div>
        </div>
      )}
      <hr className="border w-full border-white/40 rounded-full" />
      <div className="seats-container flex flex-col gap-5 max-w-220 w-full">
        <p className="screen border-3 border-white/50 w-full h-40 grow rounded-md bg-white/20 flex items-center justify-center text-white uppercase tracking-wider font-bold">
          Screen
        </p>
        {show && (
          <div className="seats grid grid-cols-10 w-full overflow-x-auto gap-1 text-white">
            {totalSeats.map((seat, index) => {
              const isAvailable = show.available_seats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              return (
                <Button
                  variant="secondary"
                  className={`uppercase ${
                    isAvailable
                      ? isSelected
                        ? "bg-yellow-500 hover:bg-yellow-500/80"
                        : ""
                      : "bg-red-800 text-white "
                  }`}
                  onClick={() => addSeat(seat)}
                  key={index}
                  disabled={isAvailable ? false : true}
                >
                  {seat}
                </Button>
              );
            })}
          </div>
        )}
        <hr className="border w-full border-white/40 rounded-full" />

        <div className="info text-black grid grid-cols-2 flex-wrap gap-2 text-center font-semibold uppercase tracking-wider">
          <p className="bg-white p-2 flex-1 rounded-full">Available</p>
          <p className="bg-red-800 text-white p-2 flex-1  rounded-full">Sold</p>
          <p className="bg-green-600 text-white p-2 flex-1  rounded-full ">Reserved</p>
          <p className="bg-yellow-500 p-2 flex-1  rounded-full">Your Seat</p>
        </div>
      </div>
      {show && (
        <div className="bottom absolute bottom-5 bg-blue-500 w-9/10 p-5 left-[calc(5%)] text-white flex-row flex items-center justify-between rounded-xl">
          <p className="total font-jetbrains font-bold text-xl">
            Rs.{show.price * selectedSeats.length}
          </p>
          <Link to={`/tickets`}>
            <Button variant={"secondary"} className=" border-2">
              Pay Now <CircleDollarSign />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookShow;
