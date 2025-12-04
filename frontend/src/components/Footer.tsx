import logo from "@/assets/sg_colored.svg";

const Footer = () => {
  return (
    <footer className=" mt-5 flex flex-row flex-wrap p-5 bg-blue-800/20 border-t-2 border-white/30 text-white w-full justify-center">
      <img src={logo} alt="" className="logo w-25" />
    </footer>
  );
};

export default Footer;
