import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { useShowContext, type Show, type Movie, type User } from "@/contexts/ShowsContext";

type Ticket = {
  id: number;
  discount: number;
  grand_total: number;
  number_of_seats: number;
  seats: string[];
  show: number;
  status: string;
  total: number;
  user: number;
};

const Tickets = () => {
  const [tickets, setTickets] = useState();
  const url = `http://localhost:5000/api/tickets/`;
  const getTickets = useFetch();
  const { shows, movies, users } = useShowContext();

  useEffect(() => {
    try {
      (async () => {
        const { data, error } = await getTickets(url);
        if (!error) {
          setTickets(data.tickets);
        } else {
          console.log(error);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    tickets &&
    Object.keys(tickets).map((key, index) => {
      const current: Ticket[] = tickets[+key];
      const showInfo: Show[] = shows.filter((item: Show) => item.id === +key);
      const { date, time, price, movie_id } = showInfo[0];
      const movieInfo: Movie[] = movies.filter((item: Movie) => item.id === movie_id);
      const { title, language } = movieInfo[0];

      return (
        <li className="flex flex-col gap-2 p-3 bg-[#681d0c] rounded-md" key={index}>
          <p className="col-1 font-bold uppercase tracking-wider">
            {title} - {language}
          </p>
          <p className="direct flex flex-row justify-around bg-orange-950 p-2 rounded-md flex-1">
            <span className="date flex flex-col">
              <span className="text-yellow-500 text-center">Date</span>{" "}
              <span className="font-bold">{date}</span>
            </span>
            <span className="date flex flex-col">
              <span className="text-yellow-500 text-center">Time</span>
              <span className="font-bold">{time}</span>
            </span>
            <span className="date flex flex-col w-20">
              <span className="text-yellow-500 text-center">Price</span>{" "}
              <span className="font-bold text-center">Rs. {price}</span>
            </span>
          </p>
          <ul className="flex flex-col bg-orange-950 p-2 rounded-md gap-1">
            <li
              className="flex font-bold text-center flex-row p-1 pt-0 rounded-md bg-orange-950"
              key={`title`}
            >
              <p className="flex-1/8">ID</p>
              <p className="flex-3/8">Name</p>
              <p className="flex-2/8">Status</p>
              <p className="flex-2/8">Seats</p>
            </li>
            {current.map((element, index) => {
              const { id, status, seats, total, discount, grand_total } = element;
              const seatsDisjointed = seats.join(", ");
              const { name } = users.filter((user: User) => user.id === element.user)[0];

              return (
                <li
                  className="flex text-center flex-col gap-2 p-2 bg-orange-900 rounded-sm"
                  key={index}
                >
                  <div className="flex flex-row">
                    <p className="flex-1/10 font-bold "># {id}</p>
                    <p className="flex-4/10">{name}</p>
                    <p className="flex-2/10">{status}</p>
                    <p className="flex-3/10">[{seatsDisjointed}]</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <span className="amt grow flex flex-col w-20 bg-orange-800 rounded-sm ">
                      <span className="text-yellow-500 text-center">Amt.</span>{" "}
                      <span className="font-bold text-center">Rs. {total}</span>
                    </span>
                    <span className="dis grow flex flex-col w-20 bg-orange-800 rounded-sm ">
                      <span className="text-yellow-500 text-center">Discount</span>{" "}
                      <span className="font-bold text-center">{discount}</span>
                    </span>
                    <span className="total grow flex flex-col w-20 bg-orange-800 rounded-sm ">
                      <span className="text-yellow-500 text-center">Total</span>{" "}
                      <span className="font-bold text-center">Rs. {grand_total}</span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      );
      //
      // console.log(showInfo);

      // console.log(ticket);
      // const { id, show, status, seats, grand_total, total, discount, user } = ticket;

      // console.log(showInfo);

      // return (
      //   <li className="flex flex-col gap-2 p-3 bg-[#681d0c] rounded-md" key={index}>
      //     <p className="col-1 font-bold text-center">{title}</p>
      //     <div className="col-2 flex flex-row gap-2">
      //       <p className="direct flex flex-col bg-orange-950 p-1 pl-3 rounded-md flex-1">
      //         <span className="text-yellow-500">Date</span>{" "}
      //         <span className="font-bold">{date}</span>
      //       </p>
      //       <p className="direct flex flex-col bg-orange-950 p-1 pl-3 rounded-md flex-1">
      //         <span className="text-yellow-500">Time</span>{" "}
      //         <span className="font-bold">{time}</span>
      //       </p>
      //       <p className="direct flex flex-col bg-orange-950 p-1 pl-3 rounded-md flex-1">
      //         <span className="text-yellow-500">Price</span>{" "}
      //         <span className="font-bold">{price}</span>
      //       </p>
      //     </div>
      //     <div className="tickets bg-orange-950 p-2 pl-3 rounded-md flex flex-row gap-2">
      //       <p>{user} -</p>
      //       <p>{seats.join(", ")} - </p>
      //       <p>Rs. {grand_total} - </p>
      //       <p>{status} - </p>
      //     </div>
      //   </li>
      // );
    })
  );
};

export default Tickets;
