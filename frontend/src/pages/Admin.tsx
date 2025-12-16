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
    <div className="flex flex-col items-center admin-container w-full h-[calc(100svh-110px)] font-poppins max-w-6xl text-orange-200">
      <p className="text-2xl font-bold mb-5 bg-clip-text bg-linear-to-r text-transparent from-red-500 to-yellow-500">
        Howdy, Admin
      </p>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="items-center h-full w-full">
        <TabsList className="bg-orange-900">
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
                <div className="relative tab-admin flex flex-col h-full w-full p-2 px-3 rounded-md bg-orange-900 font-poppins">
                  <div className="top min-h-10 mb-2 items-center font-macondo flex flex-row justify-between">
                    <p className="title flex flex-row gap-2 items-center uppercase tracking-wider text-xl font-bold">
                      <el.icon />
                      {el.title}
                    </p>
                    {el.title === "Movies" && <AddMovie />}
                    {el.title === "Shows" && <AddShow />}
                  </div>
                  <hr className="border border-orange-800 rounded-full mb-2" />
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
