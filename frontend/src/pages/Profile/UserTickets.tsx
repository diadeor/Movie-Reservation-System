import { useShowContext, type Movie, type Show, type Ticket } from "@/contexts/ShowsContext";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Tickets } from "lucide-react";

const UserTickets = ({ userId }: { userId: number }) => {
  const [tickets, setTickets] = useState<Ticket[]>();
  const { movies, shows } = useShowContext();
  const ticketsReq = useFetch();

  useEffect(() => {
    (async () => {
      const ticketsUrl = `http://localhost:5000/api/tickets/user/${userId}`;
      const { data, error } = await ticketsReq(ticketsUrl);
      if (!error) setTickets(data.tickets);
    })();
  }, []);

  return (
    <div className="area flex flex-col gap-3 p-5 pr-3 rounded-md m-0.5 bg-orange-950 max-h-200 flex-1">
      <p className="title flex flex-row gap-2 items-center uppercase tracking-wider text-md font-bold">
        <Tickets size={`1.25em`} />
        Tickets
      </p>
      <ul className="flex flex-col overflow-y-scroll gap-2 styled-scrollbar">
        {tickets &&
          tickets.map((ticket, index) => {
            // console.log(ticket);
            const { show, seats, grand_total, id } = ticket;
            // const
            const givenShow: Show = shows.find((item: Show) => item.id === show);
            const { movie_id, time, date } = givenShow;
            const givenMovie: Movie = movies.find((item: Movie) => item.id === movie_id);
            const { title, language } = givenMovie;

            return (
              <li className="flex flex-col bg-[#681d0c] p-2.5 gap-1 rounded-md" key={index}>
                <div className="first-row font-bold flex flex-row gap-2 items-center">
                  <p className="font-normal">#{id}</p>
                  <p className="font-bold flex-3/6 uppercase tracking-wide text-lg">{title}</p>
                  <p className="flex-2/6 text-orange-200">{date}</p>
                  <p className="flex-1/6 text-orange-200">{time.slice(0, 5)}</p>
                </div>
                <div className="second-row flex flex-row items-center gap-2">
                  <div className="first text-center p-0.5 flex-1 border-r border-orange-400">
                    <p className="text-orange-400 text-sm">Seats</p>
                    <div className="seating flex flex-row gap-1 uppercase">
                      {seats.map((seat) => (
                        <p className="p-0.5 rounded-md">{seat}</p>
                      ))}
                    </div>
                  </div>
                  <div className="first text-center p-0.5 flex-1">
                    <p className="text-orange-400 text-sm">Language</p>
                    <p className="p-0.5 rounded-md uppercase">{language}</p>
                  </div>
                  <div className="first text-center p-0.5 border-l flex-1 border-orange-400">
                    <p className="text-orange-400 text-sm">Price</p>
                    <p className="p-0.5 rounded-md">{grand_total}</p>
                  </div>
                </div>
                <div className="last-row flex flex-row gap-2">
                  <div className="first text-center bg-amber-700 hover:bg-amber-600 hover:scale-95 cursor-pointer mt-1 transition-all p-1.5 rounded-md flex-1 flex flex-row items-center justify-center">
                    <p className="text-orange-100 tracking-wide ">Download Ticket</p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserTickets;
