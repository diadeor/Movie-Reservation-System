import InputLabel from "@/components/InputLabel";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { type User } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

const Overview = ({
  user,
  setUser,
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const logOutUrl = `http://localhost:5000/api/auth/sign-out`;
  const logOutReq = useFetch();
  const userLogOut = async () => {
    try {
      const { data, error } = await logOutReq(logOutUrl);
      console.log(data, error);
      if (!error) setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="area flex flex-col gap-3 p-5 rounded-md m-0.5 bg-orange-950">
        <InputLabel
          type="text"
          name="name"
          defaultValue={name}
          onChange={(e: any) => setName(e.target.value)}
          label="Name"
          req={true}
        />
        <InputLabel
          type="text"
          name="email"
          defaultValue={email}
          onChange={(e: any) => setEmail(e.target.value)}
          label="Email Address"
          req={true}
        />
        <Button
          type="submit"
          variant={`secondary`}
          className={`h-11 bg-amber-600 mt-2 text-white font-bold text-md hover:bg-amber-500 shadow-lg shadow-amber-600/50 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-900 focus:ring-orange-500`}
          // onClick={(e) => handleUser(e)}
          disabled
        >
          {"Save"}
        </Button>
      </div>
      <Button
        type="submit"
        variant={`secondary`}
        className={`h-11 m-0.5 bg-amber-900 text-white font-bold text-md hover:bg-amber-800 shadow-lg shadow-amber-800/50 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-900 focus:ring-orange-800`}
        onClick={() => userLogOut()}
      >
        Log Out
        <LogOut />
      </Button>
    </>
  );
};

export default Overview;
