import { useState } from "react";
import { FaBarsStaggered, FaRegUser, FaXmark } from "react-icons/fa6";
import { IoFilmOutline, IoHomeOutline, IoPaperPlaneOutline } from "react-icons/io5";

import logo from "../assets/sg_colored.svg";
import type { IconType } from "react-icons";

const Menu = () => {
  const MenuItem = ({ title, Icon }: { title: string; Icon: IconType }) => {
    return (
      <li className="flex flex-row items-center gap-2">
        <Icon />
        {title}
      </li>
    );
  };

  return (
    <>
      <MenuItem title="Home" Icon={IoHomeOutline} />
      <MenuItem title="Movie" Icon={IoFilmOutline} />
      <MenuItem title="Contact Us" Icon={IoPaperPlaneOutline} />
    </>
  );
};

const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex flex-row px-5 py-2 bg-blue-800/20 border-b-2 border-white/30 text-white w-full justify-center ">
      <div className="inner-men flex flex-row items-center justify-between w-full max-w-6xl">
        <FaBarsStaggered
          size={`1.5em`}
          onClick={toggleMenu}
          className="cursor-pointer transition hover:scale-105 sm:hidden"
        />
        <div
          className={`full-menu w-full h-svh absolute top-0 left-0 bg-blue-900 ${
            menuIsOpen ? "flex" : "hidden"
          } flex-col items-center justify-center`}
        >
          <FaXmark
            className="absolute top-5 left-5 cursor-pointer transition hover:scale-105 "
            size={`2em`}
            onClick={toggleMenu}
          />
          <ul className="mobile-menu border flex flex-col items-center">
            <Menu />
          </ul>
        </div>
        <img src={logo} alt="" className="w-13 aspect-square cursor-pointer" />
        <ul className="menu-items sm:flex flex-row gap-5 font-bold hidden  grow justify-center text-nowrap">
          <Menu />
        </ul>
        <p className="p-3 px-4 bg-blue-600 rounded-sm cursor-pointer transition hover:scale-105 flex flex-row items-center gap-2 font-bold">
          <FaRegUser size={`1em`} />
          Login
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
