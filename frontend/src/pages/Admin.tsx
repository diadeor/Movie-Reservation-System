import AddMovie from "@/components/Admin/AddMovies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Users from "./Admin/Users";
import Movies from "./Admin/Movies";
import Shows from "./Admin/Shows";
import Tickets from "./Admin/Tickets";
import { Clapperboard, Popcorn, Tickets as TicketIcon, UsersRound } from "lucide-react";
import AddShow from "@/components/Admin/AddShows";
import { useEffect, useState } from "react";
import { type Show } from "@/contexts/ShowsContext";
import EditShows from "@/components/Admin/EditShows";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Admin = () => {
  const [count, setCount] = useState(5);
  const adminTabs = [
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
  const [editInfo, setEditInfo] = useState<Show>();
  const { user } = useAuthContext();
  const { name, role } = user;
  const isAdmin = user ? (role === "admin" ? true : false) : false;
  const nav = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      const countInterval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      if (count <= 0) {
        nav("/profile");
        clearInterval(countInterval);
      }
    }
  }, [user, count]);
  return (
    <>
      {isAdmin && (
        <div className="flex flex-col items-center admin-container w-full h-[calc(100svh-160px)] font-poppins max-w-6xl text-orange-200">
          <div className="top-row w-full flex flex-row items-center justify-between mb-4 px-2">
            <p className="text-2xl font-bold bg-clip-text bg-linear-to-r text-transparent from-red-500 to-yellow-500">
              Howdy, {name.split(" ")[0]}
            </p>
            <Link to={`/profile`}>Go to Profile {`>`}</Link>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="items-center h-full w-full"
          >
            <TabsList className="bg-orange-950 p-1.5">
              {adminTabs.map((tab, index) => {
                return (
                  <TabsTrigger value={tab.title.toLowerCase()} key={index}>
                    <tab.icon /> {tab.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <div className="tab-content w-full h-full flex text-white overflow-hidden z-0">
              {adminTabs.map((el, index) => {
                return (
                  <TabsContent value={el.title.toLowerCase()} key={index} className="z-0">
                    <div className="relative tab-admin flex flex-col h-full w-full p-2 px-3 rounded-md bg-orange-950 font-poppins">
                      <div className="top min-h-10 mb-2 items-center font-macondo flex flex-row justify-between">
                        <p className="title flex flex-row gap-2 items-center uppercase tracking-wider text-xl font-bold">
                          <el.icon />
                          {el.title}
                        </p>
                        {el.title === "Movies" && <AddMovie />}
                        {el.title === "Shows" && <AddShow />}
                      </div>
                      <hr className="border border-orange-600 rounded-full mb-2" />
                      <ul className="flex flex-col gap-2 font-poppins overflow-auto h-full styled-scrollbar">
                        <el.content setTab={setActiveTab} edit={setEditInfo} />
                      </ul>
                    </div>
                  </TabsContent>
                );
              })}
              <TabsContent value={`edit-show`} className="z-0">
                {editInfo && <EditShows showInfo={editInfo} setCurrentTab={setActiveTab} />}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
      {!isAdmin && <p>You are unauthorized to access this page. Redirecting...</p>}
    </>
  );
};

export default Admin;
