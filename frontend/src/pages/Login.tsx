import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import usePost from "@/hooks/usePost";
import InputLabel from "@/components/InputLabel";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Login() {
  const form = useRef<HTMLFormElement>(null);
  const { user, setUser } = useAuthContext();
  const loginUrl = "http://localhost:5000/api/auth/sign-in";
  const loginReq = usePost(loginUrl);
  const nav = useNavigate();

  useEffect(() => {
    user && nav("/admin");
  }, [user]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!form.current) return;
    const formData = new FormData(form.current);
    const creds = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const { data, error } = await loginReq(creds);
    if (data && data.success && !error) {
      setUser(data.user);
      nav("/admin");
    }
  };
  return (
    <div className="w-full max-w-md bg-white/30 p-5 rounded-lg flex flex-col font-poppins items-center">
      {/* <img src={logo} alt="" className="w-20 border" /> */}
      <p className="flex flex-col items-center font-bold">
        <span className="text-lg">Login to</span>{" "}
        <span className="text-2xl text-yellow-500">CineReserve</span>
      </p>
      <form
        action=""
        className="flex flex-col gap-5 w-full"
        ref={form}
        onSubmit={(e) => handleLogin(e)}
      >
        <InputLabel type="text" name="email" placeholder="" label="Email" />
        <InputLabel type="password" name="password" placeholder="" label="Password" />
        <p>Forgot Password ?</p>
        <Button variant={`secondary`} className="h-11">
          {" "}
          Sign In
        </Button>
        <p>
          Don't have an account ?{" "}
          <Link to={`/sign-up`}>
            <span>SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
