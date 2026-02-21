import { useState } from "react";
import { FaBarsStaggered, FaRegUser } from "react-icons/fa6";
import { House, Clapperboard, Phone, X, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthContext } from "@/contexts/AuthContext";

const Menu = () => {
  const menus = [
    {
      title: "Home",
      icon: House,
    },
    {
      title: "Movie",
      icon: Clapperboard,
    },
    {
      title: "Contact Us",
      icon: Phone,
    },
  ];

  return (
    <>
      {menus.map((el, index) => {
        return (
          <li className="flex flex-row items-center gap-2" key={index}>
            <el.icon size={`20px`} />
            <span className="">{el.title}</span>
          </li>
        );
      })}
    </>
  );
};

const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { user } = useAuthContext();
  const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex flex-row px-5 py-2 border-b border-orange-900 text-white w-full justify-center ">
      <div className="inner-menu flex flex-row items-center justify-between w-full max-w-6xl">
        <FaBarsStaggered
          size={`1.5em`}
          onClick={toggleMenu}
          className="cursor-pointer transition hover:scale-105 sm:hidden text-orange-700"
        />
        <div
          className={`z-10 full-menu w-full h-svh absolute top-0 left-0 bg-blue-900 ${
            menuIsOpen ? "flex" : "hidden"
          } flex-col items-center justify-center`}
        >
          <X
            className="absolute top-5 left-5 cursor-pointer transition hover:scale-105 "
            size={`2em`}
            onClick={toggleMenu}
          />
          <ul className="mobile-menu border flex flex-col items-center">
            <Menu />
          </ul>
        </div>
        <Link to={`/`}>
          <img src={logo} alt="" className="w-15 aspect-auto cursor-pointer" />
        </Link>
        <ul className="menu-items sm:flex flex-row gap-5 font-bold hidden  grow justify-center text-nowrap">
          <Menu />
        </ul>
        {!user && (
          <Link to={`/login`}>
            <button className="p-2 px-4 bg-amber-600 rounded-sm cursor-pointer transition hover:scale-105 flex flex-row items-center gap-2 font-bold">
              <FaRegUser size={`1em`} />
              Login
            </button>
          </Link>
        )}
        {user && (
          <Link to={`/admin`}>
            <UserRound size={`1.8em`} className="text-orange-700" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
