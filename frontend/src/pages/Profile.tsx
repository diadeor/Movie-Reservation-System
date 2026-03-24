import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { PanelsTopLeft, Key, Tickets } from "lucide-react";
import Overview from "./Profile/Overview";
import UserTickets from "./Profile/UserTickets";
import Password from "./Profile/Password";

const Profile = () => {
  const { user, setUser } = useAuthContext();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user) {
      nav("/login");
    }
    if (user && activeTab === "tickets") {
    }
  }, [user, activeTab]);

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
            <TabsList className="bg-orange-950 p-1.5">
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
                <Overview user={user} setUser={setUser} />
              </TabsContent>
              <TabsContent value="password" className="flex flex-col gap-2">
                <Password />
              </TabsContent>
              <TabsContent value="tickets" className="flex flex-col gap-2">
                <UserTickets userId={user.id} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    )
  );
};

export default Profile;
