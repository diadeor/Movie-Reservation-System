import { Button } from "@/components/ui/button";
import { CirclePlus, CircleCheck } from "lucide-react";
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

import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { useRef, useState } from "react";

type MovieFetch = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

const AddMovie = () => {
  const apiKey = "f9c86c81";
  const input = useRef<HTMLInputElement>(null);
  const searchMovies = useFetch();
  const [movieList, setMovieList] = useState<MovieFetch[]>();
  const [selected, setSelected] = useState<MovieFetch>();

  const searchMovie = async () => {
    if (!input.current) return;
    const searchString = input.current.value;
    const search = searchString.split(" ").join("+");
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${search}`;
    try {
      const { data, error } = await searchMovies(url);
      if (!error) {
        setMovieList(data.Search);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addMovie = async () => {};
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
          <DialogTitle>Add New Movie</DialogTitle>
          <DialogDescription>Search for a movie here to add</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <div className="flex flex-row gap-2">
            <Input placeholder="Search for a movie..." ref={input} />
            <Button variant="secondary" onClick={searchMovie}>
              Search
            </Button>
          </div>
          <div className="show-movies font-poppins rounded-md h-100 items-center justify-center flex flex-col overflow-hidden">
            {!movieList && <p className="font-semibold">Not searched yet</p>}
            <ul className="flex flex-row gap-2 w-full h-full overflow-auto">
              {movieList &&
                movieList.map((el, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setSelected(el)}
                      className="relative w-60 aspect-square flex flex-col items-center"
                    >
                      {selected?.imdbID === el.imdbID && (
                        <CircleCheck fill="blue" className="absolute top-2 left-2 text-white" />
                      )}
                      <img
                        src={el.Poster}
                        alt={`${el.Title}, ${el.Year}`}
                        className="h-full aspect-auto rounded-md text-center font-semibold"
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={addMovie} disabled={selected ? false : true}>
            {selected ? `Add ${selected?.Title} (${selected?.Year})` : "Select a movie to add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovie;
