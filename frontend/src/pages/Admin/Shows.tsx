import { type Show, type Movie, useShowContext } from "@/contexts/ShowsContext";

const Shows = ({ setTab, edit }: { setTab?: any; edit: any }) => {
  const { shows, movies } = useShowContext();

  return (
    shows &&
    shows.map((show: Show, index: number) => {
      const { movie_id, available_seats, status, date, time, price } = show;
      const filled = (((50 - available_seats.length) / 50) * 100).toFixed(0);
      const movie = movies.find((movie: Movie) => movie.id === movie_id);
      const { title, poster } = movie;
      return (
        <li
          className="bg-[#681d0c] p-3 rounded-md flex flex-row gap-3 font-poppins hover:scale-97 transition"
          key={index}
          onClick={() => {
            setTab("edit-show");
            edit(show);
          }}
        >
          <div className="first-column">
            <img src={poster} alt="" className="w-25 rounded-md" />
          </div>
          <div className="mid flex flex-col w-full">
            <p className="font-semibold text-lg">{title}</p>
            <div className="two flex flex-row gap-2 w-full font-jetbrains">
              <p className="direct flex flex-col bg-orange-950 p-2 grow  rounded-md flex-1">
                <span className="text-yellow-500 ">Date</span>{" "}
                <span className="font-bold text-nowrap">{date}</span>
              </p>
              <p className="direct flex flex-col bg-orange-950 p-2 grow rounded-md flex-1">
                <span className="text-yellow-500">Time</span>{" "}
                <span className="font-bold">{time.slice(0, 5)}</span>
              </p>
              <p className="direct flex flex-col bg-orange-950 p-2 grow rounded-md flex-1">
                <span className="text-yellow-500">Price</span>{" "}
                <span className="font-bold">Rs.{price}</span>
              </p>
            </div>
            <div className="flex flex-row gap-2 w-full">
              <p className="status flex-1 bg-orange-950 p-2 mt-2 rounded-md font-bold font-jetbrains uppercase">
                {status}
              </p>
              <p className="status flex-1 bg-orange-950 p-2 mt-2 rounded-md font-bold font-jetbrains uppercase">
                {filled}% filled
              </p>
            </div>
          </div>
        </li>
      );
    })
  );
};

export default Shows;
