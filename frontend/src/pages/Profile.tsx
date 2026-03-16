import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import InputLabel from "@/components/InputLabel";
import { Button } from "@/components/ui/button";
import { LogOut, Eye, EyeOff, PanelsTopLeft, Key, Tickets } from "lucide-react";
import useFetch from "@/hooks/useFetch";

const Profile = () => {
  const { user, setUser } = useAuthContext();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showPassword, setShowPassword] = useState(false);
  const logOutUrl = `http://localhost:5000/api/auth/sign-out`;
  const logOutReq = useFetch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  console.log(name);

  useEffect(() => {
    if (!user) nav("/login");
  }, [user]);

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
    user && (
      <div className="flex flex-col items-center admin-container w-full h-[calc(100svh-160px)] font-poppins max-w-6xl text-orange-200">
        <p className="text-2xl font-bold mb-5 bg-clip-text bg-linear-to-r text-transparent from-red-500 to-yellow-500">
          Howdy, {user && user.name.split(" ")[0]}
        </p>
        <div className="flex h-svh w-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="items-center h-full w-full"
          >
            <TabsList className="bg-orange-950">
              <TabsTrigger value={`overview`}>
                <PanelsTopLeft />
                Overview
              </TabsTrigger>
              <TabsTrigger value={`password`}>
                <Key />
                Password
              </TabsTrigger>
              <TabsTrigger value={`tickets`}>
                <Tickets />
                My Tickets
              </TabsTrigger>
            </TabsList>
            <div className="tab-content w-full h-full flex text-white overflow-hidden z-0">
              <TabsContent value="overview" className="flex flex-col gap-2">
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
                  {"Log Out"}
                  <LogOut />
                </Button>
              </TabsContent>
              <TabsContent value="password" className="flex flex-col gap-2">
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
                      {showPassword ? (
                        <EyeOff className=" w-5 h-5" />
                      ) : (
                        <Eye className=" w-5 h-5" />
                      )}
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
                      {showPassword ? (
                        <EyeOff className=" w-5 h-5" />
                      ) : (
                        <Eye className=" w-5 h-5" />
                      )}
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
                      {showPassword ? (
                        <EyeOff className=" w-5 h-5" />
                      ) : (
                        <Eye className=" w-5 h-5" />
                      )}
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
              </TabsContent>
              <TabsContent value="tickets" className="flex flex-col gap-2">
                <div className="area flex flex-col gap-3 p-5 rounded-md m-0.5 bg-orange-950">
                  <p>hi there</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    )
  );
};

export default Profile;
