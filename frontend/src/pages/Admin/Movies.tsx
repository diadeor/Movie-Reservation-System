import { useShowContext, type Movie } from "@/contexts/ShowsContext";

const Movies = () => {
  const { movies } = useShowContext();

  return (
    movies &&
    movies.map((movie: Movie, index: number) => {
      const { title, genre, poster, released, director, runtime, cast, status } = movie;
      const castList = cast.split(", ");
      const year = new Date(released).getFullYear();
      const color = status === "active" ? "text-green-300" : "text-rose-300";
      return (
        <li className="bg-[#681d0c] p-3 rounded-md flex flex-row gap-3" key={index}>
          <div className="first-column">
            <img src={poster} alt="" className="min-w-20 w-20 rounded-md" />
          </div>
          <div className="mid relative flex flex-col w-full  text-sm">
            {/* <Trash2
              className="absolute top-0 right-0 cursor-pointer transition-all hover:scale-115 hover:text-rose-400"
              size={`1.2em`}
              onClick={() => removeMovie(imdbID)}
            /> */}
            <div className="info flex flex-row items-center justify-between">
              <div className="left">
                <p className="title font-semibold text-lg text-yellow-500">
                  {title} ({year})
                </p>
                <p className="genre ">{genre}</p>
                <p className="cast mb-3">
                  {castList[0]}, {castList[1]}
                </p>
              </div>
              <p className={`uppercase font-bold ${color} flex flex-row items-center gap-1.5`}>
                <span
                  className={`animate-pulse animation-duration-1000 h-1.5 w-1.5 rounded-full ${status === "active" ? "bg-green-500" : "bg-rose-600"}`}
                ></span>
                {status}{" "}
              </p>
            </div>
            <div className="two flex flex-row gap-2 w-full font-jetbrains">
              <p className="direct flex flex-col bg-orange-950 p-2 grow rounded-md flex-1">
                <span className="text-yellow-500">Director</span>{" "}
                <span className="font-bold">{director}</span>
              </p>
              <p className="direct flex flex-col bg-orange-950 p-2 grow rounded-md flex-1">
                <span className="text-yellow-500">Duration</span>{" "}
                <span className="font-bold">{runtime}</span>
              </p>
            </div>
          </div>
        </li>
      );
    })
  );
};

export default Movies;
