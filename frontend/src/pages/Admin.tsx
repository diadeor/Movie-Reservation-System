// import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Users from "./Admin/Users";
import Movies from "./Admin/Movies";
import Shows from "./Admin/Shows";
import Tickets from "./Admin/Tickets";
import { CirclePlus, Clapperboard, Popcorn, Tickets as TicketIcon, UsersRound } from "lucide-react";

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
  return (
    <div className="flex admin-container w-full h-[calc(100svh-70px)] p-5 font-poppins">
      <Tabs defaultValue="users" className="items-center h-full w-full">
        <TabsList className="bg-blue-700">
          {tabs.map((tab, index) => {
            return (
              <TabsTrigger value={tab.title.toLowerCase()} key={index}>
                <tab.icon /> {tab.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="tab-content w-full h-full flex text-white">
          {tabs.map((el, index) => {
            return (
              <TabsContent value={el.title.toLowerCase()} key={index}>
                <div className="tab-admin flex flex-col h-full w-full p-2 px-3 rounded-md bg-blue-800 font-poppins">
                  <div className="top  min-h-10 mb-2 items-center font-macondo flex flex-row justify-between">
                    <p className="title flex flex-row gap-2 items-center uppercase tracking-wider text-xl font-bold">
                      <el.icon />
                      {el.title}
                    </p>
                    <button className="flex flex-row items-center gap-2 bg-white/20 p-1 px-4 rounded-md hover:scale-105 transition duration-300 cursor-pointer">
                      <span className="font-semibold text-lg font-poppins">New</span>
                      <CirclePlus />
                    </button>
                  </div>

                  <ul className="flex flex-col gap-2 font-poppins">
                    <el.content />
                  </ul>
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
};

export default Admin;
