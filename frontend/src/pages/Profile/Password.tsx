import InputLabel from "@/components/InputLabel";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import usePost from "@/hooks/useSendRequest";

const Password = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });
  const [message, setMessage] = useState("");
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const changePassUrl = "http://localhost:5000/api/auth/change";
  const changePassReq = usePost(changePassUrl);
  // const
  const changePassword = async () => {
    try {
      const { current, newPass } = passwords;
      console.log(current, newPass);
      const { data, error } = await changePassReq({ current, newPassword: newPass });
      if (!error) setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="area flex flex-col gap-3 p-5 rounded-md m-0.5 bg-orange-950">
      <InputLabel
        type={showPassword["current"] ? "text" : "password"}
        name="current"
        placeholder="••••••••"
        defaultValue={passwords["current"]}
        onChange={(e: any) => setPasswords({ ...passwords, current: e.target.value })}
        label="Current Password"
        req={true}
      >
        <button
          className="absolute p-2 inset-y-0 right-0"
          type="button"
          onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
        >
          {showPassword["current"] ? <EyeOff className=" w-5 h-5" /> : <Eye className=" w-5 h-5" />}
        </button>
      </InputLabel>
      <InputLabel
        type={showPassword["newPass"] ? "text" : "password"}
        name="new"
        placeholder="••••••••"
        defaultValue={passwords["newPass"]}
        onChange={(e: any) => setPasswords({ ...passwords, newPass: e.target.value })}
        label="New Password"
        req={true}
      >
        <button
          className="absolute p-2 inset-y-0 right-0"
          type="button"
          onClick={() => setShowPassword({ ...showPassword, newPass: !showPassword["newPass"] })}
        >
          {showPassword["newPass"] ? <EyeOff className=" w-5 h-5" /> : <Eye className=" w-5 h-5" />}
        </button>
      </InputLabel>
      <InputLabel
        type={showPassword["confirm"] ? "text" : "password"}
        name="confirm"
        placeholder="••••••••"
        defaultValue={passwords["confirm"]}
        onChange={(e: any) => setPasswords({ ...passwords, confirm: e.target.value })}
        label="Confirm New Password"
        req={true}
      >
        <button
          className="absolute p-2 inset-y-0 right-0"
          type="button"
          onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword["confirm"] })}
        >
          {showPassword["confirm"] ? <EyeOff className=" w-5 h-5" /> : <Eye className=" w-5 h-5" />}
        </button>
      </InputLabel>
      <Button
        type="submit"
        variant={`secondary`}
        className={`h-11 bg-amber-600 mt-2 text-white font-bold text-md hover:bg-amber-500 shadow-lg shadow-amber-600/50 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-900 focus:ring-orange-500`}
        onClick={() => changePassword()}
        disabled={
          passwords["current"] &&
          passwords["newPass"] &&
          passwords["confirm"] &&
          passwords["newPass"] === passwords["confirm"]
            ? false
            : true
        }
      >
        {"Change Password"}
      </Button>
      {message && (
        <p className="text-center bg-green-600/60 rounded-full p-1 font-bold text-green-200">
          {message}
        </p>
      )}
    </div>
  );
};

export default Password;
