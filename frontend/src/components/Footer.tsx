import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-5 w-full bg-orange-900/30 border-t-2 border-orange-700 text-orange-200 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 flex-wrap p-10 gap-10 w-full max-w-6xl">
        <div className="logo flex flex-col items-center">
          <img src={logo} alt="" className="logo w-30" />
          <p className="font-bold tracking-wider text-xl">CineReserve</p>
        </div>
        <div className="stay flex flex-col gap-2 items-center">
          <p className=" text-sm tracking-wide">STAY IN TOUCH</p>
          <Link to={`mailto:cinereserve@gmail.com`}>
            <Button variant={`default`} className="cursor-pointer bg-[#681d0c]">
              <Mail />
              cinereserve@gmail.com
            </Button>
          </Link>
          <Link to={`tel:+977-9801010101`}>
            <Button variant={`default`} className="cursor-pointer bg-[#681d0c]">
              <Phone />
              +977-9801010101
            </Button>
          </Link>
        </div>
        <div className="stay flex flex-col gap-2 items-center">
          <p className=" text-sm tracking-wide">ABOUT</p>
          <ul className=" list-disc list-inside text-white">
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>
      <p className="text-white text-sm w-full bg-neutral-800 text-center">
        &copy; 2026 CineReserve
      </p>
    </footer>
  );
};

export default Footer;
