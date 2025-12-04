export const getDate = (i: number) => {
  return String(new Date(new Date().setDate(new Date().getDate() + i)).toLocaleDateString("en-ca"));
};
export const getMonth = (i: number) => {
  return String(new Date(getDate(i)).toLocaleDateString("en-ca", { month: "short" }));
};

export const dates = [
  {
    day: "today",
    month: null,
    value: getDate(0),
  },
  {
    day: "tomm",
    month: null,
    value: getDate(1),
  },
  {
    day: String(new Date(getDate(2)).getDate()),
    month: getMonth(2),
    value: getDate(2),
  },
  {
    day: String(new Date(getDate(3)).getDate()),
    month: getMonth(3),
    value: getDate(3),
  },
  {
    day: String(new Date(getDate(4)).getDate()),
    month: getMonth(4),
    value: getDate(4),
  },
];

const DateComponent = ({
  currentDate,
  setCurrentDate,
}: {
  currentDate: string;
  setCurrentDate: any;
}) => {
  return (
    <ul className="date flex flex-row items-center justify-center gap-2">
      {dates.map((date, index) => {
        const { day, month, value } = date;
        return (
          <li
            className={`cursor-pointer flex flex-col items-center justify-center bg-white/30 rounded-full w-15 h-15 border-2 text-sm font-jetbrains ${
              currentDate === value ? "bg-white/70" : ""
            }`}
            key={index}
            onClick={() => setCurrentDate(value)}
          >
            <span className={`font-bold ${!month && "uppercase"}`}>{day}</span>
            {month && <span className="uppercase">{month}</span>}
          </li>
        );
      })}
    </ul>
  );
};

export default DateComponent;
