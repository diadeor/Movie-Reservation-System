import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  role: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>();
  const url = "http://localhost:5000/api/users";
  const getUsers = useFetch(url);

  useEffect(() => {
    (async () => {
      const { data } = await getUsers();
      setUsers(data.users);
    })();
  }, []);

  return (
    <>
      {users?.map((el, index) => {
        return (
          <li className="bg-white/20 p-3 rounded-md flex flex-col" key={index}>
            <p className="name font-semibold tracking-wider">{el.name}</p>
            <p className="email text-sm">{el.email}</p>
          </li>
        );
      })}
    </>
  );
};

export default Users;
