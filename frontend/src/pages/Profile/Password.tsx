import InputLabel from "@/components/InputLabel";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="area flex flex-col gap-3 p-5 rounded-md m-0.5 bg-orange-950">
      <InputLabel
        type={showPassword ? "text" : "password"}
        name="current"
        placeholder="••••••••"
        label="Current Password"
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
      <InputLabel
        type={showPassword ? "text" : "password"}
        name="new"
        placeholder="••••••••"
        label="New Password"
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
      <InputLabel
        type={showPassword ? "text" : "password"}
        name="confirm"
        placeholder="••••••••"
        label="Confirm New Password"
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
      <Button
        type="submit"
        variant={`secondary`}
        className={`h-11 bg-amber-600 mt-2 text-white font-bold text-md hover:bg-amber-500 shadow-lg shadow-amber-600/50 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-900 focus:ring-orange-500`}
        // onClick={(e) => handleUser(e)}
        disabled
      >
        {"Change Password"}
      </Button>
    </div>
  );
};

export default Password;
