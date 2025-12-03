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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { useRef, useState } from "react";
import usePost from "@/hooks/usePost";

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
  const addMovieUrl = `http://localhost:5000/api/movies/add`;
  const addMovieReq = usePost(addMovieUrl);
  const [language, setLanguage] = useState<string>("english");
  const [message, setMessage] = useState("Not searched yet !!");

  const searchMovie = async () => {
    setMessage("Searching...");
    if (!input.current) return;
    const searchString = input.current.value;
    const search = searchString.split(" ").join("+");
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${search}`;
    try {
      const { data, error } = await searchMovies(url);
      console.log({ data, search, error });
      if (!error) {
        setMovieList(data.Search);
      } else {
        setMessage(error);
        setMovieList(undefined);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addMovie = async () => {
    try {
      const { data } = await addMovieReq({ imdbID: selected?.imdbID, language });
      if (data.success) {
        setMovieList(undefined);
        setMessage(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
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
          <div className=" gap-3 show-movies font-poppins rounded-md h-80 items-center justify-center flex flex-col overflow-hidden">
            {!movieList && <p className="font-semibold">{message}</p>}
            <ul className="flex flex-row gap-1 w-full h-full overflow-auto">
              {movieList &&
                movieList.map((el, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setSelected(el)}
                      className="relative w-44 aspect-square flex flex-col items-center"
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
            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent defaultValue="english">
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="nepali">Nepali</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={addMovie} disabled={selected && language ? false : true}>
            {selected ? `Add ${selected?.Title} (${selected?.Year})` : "Select a movie to add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovie;
