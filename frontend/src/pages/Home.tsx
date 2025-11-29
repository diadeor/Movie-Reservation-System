import banner from "@/assets/banner.png";
import Movie from "@/components/Movie";

const Home = () => {
  const DateItem = ({ day, month }: { day: string; month?: string }) => {
    return (
      <li className="flex flex-col items-center justify-center bg-white/30 rounded-full w-13 h-13 border-2 text-xs">
        <span className={`font-bold ${!month && "uppercase"}`}>{day}</span>
        {month && <span className="uppercase">{month}</span>}
      </li>
    );
  };
  return (
    <div className="home px-5 max-w-6xl w-full flex flex-col gap-5 text-white font-macond">
      <img src={banner} alt="" className="rounded-md mt-5" />
      <div className="now-showing mt-5 flex flex-col">
        <div className="flex flex-row flex-wrap items-center justify-between">
          <p className=" text-xl uppercase">Now Showing</p>
          <ul className="dates flex flex-row gap-2">
            <DateItem day="today" />
            <DateItem day="tomm" />
            <DateItem day="1" month="dec" />
            <DateItem day="2" month="dec" />
            <DateItem day="3" month="dec" />
          </ul>
        </div>
        <div className="shows flex flex-row flex-wrap">
          <Movie />
        </div>
      </div>
    </div>
  );
};

export default Home;
