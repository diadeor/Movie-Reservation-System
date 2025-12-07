// import { useState } from "react";
import AddMovie from "@/components/Admin/AddMovies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Users from "./Admin/Users";
import Movies from "./Admin/Movies";
import Shows from "./Admin/Shows";
import Tickets from "./Admin/Tickets";
import { Clapperboard, Popcorn, Tickets as TicketIcon, UsersRound } from "lucide-react";
import AddShow from "@/components/Admin/AddShows";
import { useState } from "react";

const Admin = () => {
  const tabs = [
    {
      title: "Users",
      icon: UsersRound,
      content: Users,
    },
    {
      title: "Movies",
      icon: Clapperboard,
      content: Movies,
    },
    {
      title: "Shows",
      icon: Popcorn,
      content: Shows,
    },
    {
      title: "Tickets",
      icon: TicketIcon,
      content: Tickets,
    },
  ];
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="flex admin-container w-full h-[calc(100svh-70px)] p-5 font-poppins max-w-6xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="items-center h-full w-full">
        <TabsList className="bg-blue-700">
          {tabs.map((tab, index) => {
            return (
              <TabsTrigger value={tab.title.toLowerCase()} key={index}>
                <tab.icon /> {tab.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="tab-content w-full h-full flex text-white overflow-hidden z-0">
          {tabs.map((el, index) => {
            return (
              <TabsContent value={el.title.toLowerCase()} key={index} className="z-0">
                <div className="relative tab-admin flex flex-col h-full w-full p-2 px-3 rounded-md bg-blue-800 font-poppins">
                  <div className="top min-h-10 mb-2 items-center font-macondo flex flex-row justify-between">
                    <p className="title flex flex-row gap-2 items-center uppercase tracking-wider text-xl font-bold">
                      <el.icon />
                      {el.title}
                    </p>
                    {el.title === "Movies" && <AddMovie />}
                    {el.title === "Shows" && <AddShow />}
                  </div>
                  <ul className="flex flex-col gap-2 font-poppins overflow-auto h-full styled-scrollbar">
                    <el.content setTab={setActiveTab} />
                  </ul>
                </div>
              </TabsContent>
            );
          })}
          <TabsContent value={`edit-show`} className="z-0">
            <div className="relative tab-admin flex flex-col h-full w-full p-2 px-3 rounded-md bg-blue-800 font-poppins">
              <div className="top min-h-10 mb-2 items-center font-macondo flex flex-row justify-between">
                <p className="title flex flex-row gap-2 items-center uppercase tracking-wider text-xl font-bold">
                  Edit Show #
                </p>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Admin;
