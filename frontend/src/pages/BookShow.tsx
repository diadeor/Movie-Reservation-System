import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useShowContext, type Movie, type Show, type Seat } from "@/contexts/ShowsContext";
import { CircleDollarSign, X, Frown } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePost from "@/hooks/useSendRequest";
import useFetch from "@/hooks/useFetch";

const BookShow = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { movies, shows } = useShowContext();
  const nav = useNavigate();
  const show: Show = shows.find((show: Show) => show.id === id);
  const movie = movies.find((movie: Movie) => movie.imdbID === show.movie_id);
  const movieTime = new Date(show.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [unavailable, setUnavailable] = useState<string[]>([]);

  const seatUrl = `http://localhost:5000/api/seats/${show.id}`;
  const seatReq = useFetch();

  const checkUrl = `http://localhost:5000/api/seats/check/${show.id}`;

  const seatLockUrl = "http://localhost:5000/api/seats/lock";
  const seatLockReq = usePost(seatLockUrl);

  const partitionClass =
    "bg-orange-950 p-1 px-3 flex-1 rounded-sm justify-center items-center flex";

  useEffect(() => {
    !user && nav("/login");
    const getSeats = async () => {
      try {
        const { data, error } = await seatReq(seatUrl);
        // console.log(data);
        if (!error) setSeats(data.seats);
      } catch (error) {
        console.log(error);
      }
    };
    getSeats();
  }, []);

  const addSeat = async (seat_num: string) => {
    const alreadyExists = selectedSeats.includes(seat_num);
    if (!alreadyExists) {
      setSelectedSeats([...selectedSeats, seat_num]);

      const { data, error } = await seatReq(checkUrl);

      if (!error) {
        const { seats }: { seats: Seat[] } = data;
        setSeats(seats);
        const seat: Seat = seats.filter((seat) => seat.seat_number === seat_num)[0];
        if (seat.status != "available")
          setSelectedSeats((prev) => prev.filter((item) => item != seat_num));
      }
    } else {
      setSelectedSeats((prev) => prev.filter((item) => item != seat_num));
    }
  };

  const handlePayNow = async () => {
    try {
      if (!show && !movie) return;
      const { data, error } = await seatLockReq({ seats: selectedSeats, show: show.id });
      if (!error) {
        const { unavailable, updatedSeats } = data;
        if (unavailable) {
          setUnavailable(unavailable);
          setSelectedSeats((prev) => prev.filter((item) => !unavailable.includes(item)));
          setSeats(updatedSeats);
        } else {
          setSelectedSeats([]);
          setSeats(updatedSeats);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    user && (
      <div className="flex flex-col items-center gap-5 w-full h-full">
        {unavailable.length != 0 && (
          <div className="z-10 absolute top-1/2 left-1/2 w-10/12 min-h-40 justify-center max-w-150 transform -translate-x-1/2 -translate-y-1/2 bg-orange-900/60 backdrop-blur-md p-5 rounded-xl flex flex-col items-center">
            <X
              className="absolute top-3 right-3 hover:scale-120 transition-all cursor-pointer"
              size={`1.5em`}
              onClick={() => setUnavailable([])}
            />
            <Frown size={`3em`} color="orange" />
            <p className="tracking-wider text-xl font-bold">Sorry</p>
            <p className="">{`These seats were just taken:`}</p>
            <ul className="flex flex-row gap-1 mt-3">
              {unavailable.map((item) => (
                <li className="bg-[#ccc] border-2 py-1 px-3 min-w-11 text-center text-black p-0.5 rounded-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className=" text-2xl text-transparent bg-clip-text bg-linear-to-r from-red-500 to-yellow-500 font-semibold font-macondo tracking-widest uppercase">
          Book your seats
        </p>
        {movie && (
          <div className="show-details flex flex-row w-full max-w-150 bg-orange-900 p-3 rounded-md gap-3">
            <img src={movie.poster} alt={movie.title} className="w-20 rounded-md h-full" />
            <div className="right-show font-bold flex flex-col w-full gap-1">
              <p className="text-xl">{movie.title}</p>
              <div className="flex flex-row gap-1">
                <p className={partitionClass}>{movie.runtime}</p>
                <p className={partitionClass}>{movieTime}</p>
              </div>
              <p className={`${partitionClass} `}>
                {show?.date &&
                  new Date(show.date).toLocaleDateString("en-ca", {
                    month: "short",
                    year: "numeric",
                    day: "2-digit",
                    weekday: "long",
                  })}
              </p>
            </div>
          </div>
        )}
        <hr className="border w-full border-orange-900 rounded-full max-w-220" />
        <div className="seats-container flex flex-col gap-5 max-w-220 w-full">
          <p className="text-lg screen border-2 rounded-t-full border-orange-900 w-full h-10 grow rounded-md bg-orange-900/50 flex items-center justify-center  uppercase tracking-wider font-bold">
            Screen
          </p>
          {show && (
            <div className="seats grid grid-cols-10 w-full overflow-x-auto gap-2 text-white">
              {seats.map((seat, index) => {
                const { seat_number, status } = seat;
                let isSelected = selectedSeats.includes(seat_number);
                const isAvailable = status === "available" ? true : false;
                const isLocked = status === "locked" ? true : false;
                const bg = isSelected
                  ? "bg-green-600 text-white"
                  : isAvailable
                    ? "bg-[#ccc]"
                    : isLocked
                      ? "bg-yellow-500"
                      : "bg-red-800";
                return (
                  <Button
                    variant="secondary"
                    className={`uppercase ${bg} rounded-sm cursor-pointer transition-all hover:scale-95 hover:${bg}`}
                    onClick={() => addSeat(seat_number)}
                    key={index}
                    disabled={isAvailable ? false : true}
                  >
                    {seat_number}
                  </Button>
                  // <Armchair className={`uppercase ${bg} rounded-sm cursor-pointer transition-all hover:scale-95 hover:${bg}`}/>
                );
              })}
            </div>
          )}
          <hr className="border w-full border-white/40 rounded-full" />

          <div className="info text-black grid grid-cols-2 md:grid-cols-4 flex-wrap gap-2 text-center font-semibold uppercase tracking-wider">
            <p className="bg-[#ccc] p-2 flex-1 rounded-full">Available</p>
            <p className="bg-red-800 text-white p-2 flex-1  rounded-full">Sold</p>
            <p className="bg-green-600 text-white p-2 flex-1  rounded-full ">Selected</p>
            <p className="bg-yellow-500 p-2 flex-1  rounded-full">Booked</p>
          </div>
        </div>
        {show && (
          <div className="bottom absolute bottom-5 bg-orange-900 w-9/10 max-w-220 p-5 text-white flex-row flex items-center justify-between rounded-xl">
            <p className="total font-jetbrains font-bold text-xl">
              Rs.{show.price * selectedSeats.length}
            </p>
            <Button variant={"secondary"} className=" border-2" onClick={handlePayNow}>
              Pay Now <CircleDollarSign />
            </Button>
          </div>
        )}
      </div>
    )
  );
};

export default BookShow;
