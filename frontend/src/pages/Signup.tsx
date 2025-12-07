import { Button } from "@/components/ui/button";
import { useRef } from "react";
import usePost from "@/hooks/usePost";
import InputLabel from "@/components/InputLabel";
import { Link } from "react-router-dom";

export default function SignUp() {
  const form = useRef<HTMLFormElement>(null);
  const signUpUrl = "http://localhost:5000/api/auth/sign-up";
  const signUpReq = usePost(signUpUrl);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!form.current) return;
    const formData = new FormData(form.current);
    const obj = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const { data, error } = await signUpReq(obj);
    console.log(data, error);
  };
  return (
    <div className="w-full max-w-md bg-white/30 p-5 rounded-lg flex flex-col font-poppins items-center">
      <p className="flex flex-col items-center font-bold">
        <span className="text-lg">SignUp to</span>{" "}
        <span className="text-2xl text-yellow-500">CineReserve</span>
      </p>
      <form
        action=""
        className="flex flex-col gap-5 w-full"
        ref={form}
        onSubmit={(e) => handleLogin(e)}
      >
        <InputLabel type="text" name="name" placeholder="" label="Name" />
        <InputLabel type="text" name="email" placeholder="" label="Email" />
        <InputLabel type="password" name="password" placeholder="" label="Password" />
        <Button variant={`secondary`} className="h-11">
          {" "}
          Sign Up
        </Button>
        <p>
          Already have an account ?{" "}
          <Link to={`/login`}>
            <span>Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
