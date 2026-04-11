import InputLabel from "@/components/InputLabel";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { type User } from "@/contexts/ShowsContext";
import { LogOut } from "lucide-react";
import usePost from "@/hooks/useSendRequest";

const Overview = ({
  user,
  setUser,
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const { name: userName, email: userEmail } = user;
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const updateUserUrl = `http://localhost:5000/api/users/edit`;
  const logOutReq = useFetch();
  const updateUserReq = usePost(updateUserUrl, "put");
  const [message, setMessage] = useState<string>("");
  const userLogOut = async () => {
    try {
      const logOutUrl = `http://localhost:5000/api/auth/sign-out`;
      const { error } = await logOutReq(logOutUrl);
      if (!error) setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      const { data, error } = await updateUserReq({ name, email });
      if (!error) {
        setMessage(data.message);
        setUser(data.user);
      }
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
          onClick={() => updateUser()}
          disabled={name === userName && email === userEmail ? true : false}
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
      {message && (
        <p className="text-center bg-green-600/60 rounded-full p-1 font-bold text-green-200">
          {message}
        </p>
      )}
    </>
  );
};

export default Overview;
