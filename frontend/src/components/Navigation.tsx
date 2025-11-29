import { useState } from "react";
import { FaBarsStaggered, FaRegUser, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

import logo from "../assets/sg_colored.svg";

const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex flex-row items-center justify-between px-5 text-white bg-blue-800 py-1">
      <FaBarsStaggered
        size={`1.5em`}
        onClick={toggleMenu}
        className="cursor-pointer transition hover:scale-105"
      />
      <div
        className={`full-menu w-full h-svh absolute top-0 left-0 bg-blue-900 ${
          menuIsOpen ? "flex" : "hidden"
        } `}
      >
        <p>hi</p>
        <FaXmark
          className="absolute top-10 left-10 cursor-pointer transition hover:scale-105 "
          size={`2em`}
          onClick={toggleMenu}
        />
      </div>
      <img src={logo} alt="" className="w-13 aspect-square cursor-pointer" />
      <div className="right flex flex-row items-center gap-2">
        <p className="p-3 px-4 bg-blue-600 rounded-sm cursor-pointer transition hover:scale-105">
          <FaMagnifyingGlass size={`1em`} />
        </p>
        <p className="p-3 px-4 bg-blue-600 rounded-sm cursor-pointer transition hover:scale-105">
          <FaRegUser size={`1em`} />
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
