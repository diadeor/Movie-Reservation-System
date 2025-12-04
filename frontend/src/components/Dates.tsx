export const getDate = (i: number) => {
  return String(new Date(new Date().setDate(new Date().getDate() + i)).toLocaleDateString("en-ca"));
};
export const getMonth = (i: number) => {
  return String(new Date(getDate(i)).toLocaleDateString("en-ca", { month: "short" }));
};

const dates = [
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

export default dates;
