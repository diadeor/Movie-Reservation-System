import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import usePost from "@/hooks/usePost";
import InputLabel from "@/components/InputLabel";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { Eye, EyeOff, CircleAlert } from "lucide-react";

export default function Login() {
  const form = useRef<HTMLFormElement>(null);
  const { user, setUser } = useAuthContext();
  const loginUrl = "http://localhost:5000/api/auth/sign-in";
  const signUpUrl = "http://localhost:5000/api/auth/sign-up";
  const [tabIsLogin, setTabIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const loginSignUpRequest = tabIsLogin ? usePost(loginUrl) : usePost(signUpUrl);
  const nav = useNavigate();
  const [error, setError] = useState("");
  // let interval: number;

  useEffect(() => {
    user && nav("/admin");
  }, [user]);

  const handleUser = async (e: any) => {
    e.preventDefault();
    if (!form.current) return;
    const formData = new FormData(form.current);
    const creds = {
      name: formData.get("name") || "",
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (!tabIsLogin && !creds.name) {
      setError("Name is required");
    } else if (!creds.email) {
      setError("Email address is required");
    } else if (!creds.password) {
      setError("Password is required");
    } else {
      setError("");
      const { data, error: err } = await loginSignUpRequest(creds);
      if (data && data.success && !err) {
        const { role } = data.user;

        setUser(data.user);
        nav(role === "admin" ? "/admin" : "/profile");
      } else if (err) setError(err);
    }
  };
  return (
    <div className=" grow w-full h-full p-5 flex flex-col font-poppins items-center justify-center">
      <div className="actual-form w-full max-w-sm relative">
        <div className="mb-10">
          <p className="text-3xl mb-2 font-bold bg-clip-text bg-linear-to-r text-transparent from-red-500 to-yellow-500 ">
            {tabIsLogin ? "Welcome back" : "Create an account"}
          </p>
          <span>
            {tabIsLogin ? "Enter your details to login" : "Fill up the form to create your account"}
          </span>
        </div>
        <form action="" className="flex flex-col gap-5 w-full" ref={form}>
          {error && (
            <p className="absolute w-sm top-18 transition-all bg-red-800 p-1 rounded-full text-red-200 font-semibold flex flex-row items-center justify-center gap-2">
              <CircleAlert className="w-5 h-5" />
              {error}
            </p>
          )}
          {!tabIsLogin && (
            <InputLabel
              type="text"
              name="name"
              placeholder="John Doe"
              label="Full Name"
              req={true}
            />
          )}
          <InputLabel
            type="email"
            name="email"
            placeholder="john@doe.com"
            label="Email Address"
            req={true}
          />
          <InputLabel
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            label="Password"
            req={true}
          >
            <button
              className="absolute p-2 inset-y-0 right-0"
              type="button"
              onClick={() => setShowPassword((pass) => !pass)}
            >
              {showPassword ? <EyeOff className=" w-5 h-5" /> : <Eye className=" w-5 h-5" />}
            </button>
          </InputLabel>
          {tabIsLogin && <p className="text-right text-yellow-600">Forgot Password ?</p>}
          <Button
            type="submit"
            variant={`secondary`}
            className={`h-11 bg-amber-600 text-white font-bold text-md hover:bg-amber-500 shadow-lg shadow-amber-600/50 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-900 focus:ring-orange-500 ${
              !tabIsLogin && "mt-3"
            }`}
            onClick={(e) => handleUser(e)}
          >
            {tabIsLogin ? "Sign In" : "Sign Up"}
          </Button>
          <p className="mt-3 text-center">
            {tabIsLogin ? "Don't " : "Already"} have an account ?{" "}
            <span className="font-bold" onClick={() => setTabIsLogin((curr) => !curr)}>
              {tabIsLogin ? "SignUp" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
