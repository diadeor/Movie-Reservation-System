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
  size,
}: {
  currentDate: string;
  setCurrentDate: any;
  size: "small" | "large";
}) => {
  const width = size === "large" ? "w-15 h-15 text-sm" : "w-12 h-12 text-xs";
  return (
    <ul className="date flex flex-row items-center justify-center gap-2">
      {dates.map((date, index) => {
        const { day, month, value } = date;
        return (
          <li
            className={`cursor-pointer flex flex-col items-center justify-center rounded-full ${width}  font-jetbrains ${
              currentDate === value ? "bg-orange-700" : "bg-orange-900"
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
