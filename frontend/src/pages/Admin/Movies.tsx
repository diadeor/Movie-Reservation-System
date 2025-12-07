import { useShowContext, type Movie } from "@/contexts/ShowsContext";

const Movies = () => {
  const { movies } = useShowContext();
  return (
    movies &&
    movies.map((movie: Movie, index: number) => {
      const { title, genre, poster, released, director, runtime, cast, status } = movie;
      const castList = cast.split(", ");
      const year = new Date(released).getFullYear();
      return (
        <li className="bg-white/20 p-3 rounded-md flex flex-row gap-3" key={index}>
          <div className="first-column">
            <img src={poster} alt="" className="min-w-20 w-20 rounded-md" />
          </div>
          <div className="mid flex flex-col w-full  text-sm">
            <div className="info flex flex-row items-center justify-between">
              <div className="left">
                <p className="title font-semibold text-lg text-lime-500">
                  {title} ({year})
                </p>
                <p className="genre ">{genre}</p>
                <p className="cast mb-3">
                  {castList[0]}, {castList[1]}
                </p>
              </div>
              <select
                className="outline-0 font-semibold bg-blue-500 py-2 px-3 rounded-md"
                defaultValue={status}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="two flex flex-row gap-2 w-full font-jetbrains">
              <p className="direct flex flex-col bg-white/20 p-2 grow rounded-md flex-1">
                <span className="text-lime-500">Director</span>{" "}
                <span className="font-bold">{director}</span>
              </p>
              <p className="direct flex flex-col bg-white/20 p-2 grow rounded-md flex-1">
                <span className="text-lime-500">Duration</span>{" "}
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
