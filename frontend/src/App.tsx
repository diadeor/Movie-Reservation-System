import Footer from "./components/Footer";
import NavBar from "./components/Navigation";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowMovie from "./pages/ShowMovie";
import BookShow from "./pages/BookShow";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <Router>
      <div className="main-container bg-blue-900 w-full min-h-svh flex flex-col items-center">
        <NavBar />
        <div className="body-container px-5 pt-5 max-w-6xl w-full min-h-[calc(100svh-90px)] flex flex-col gap-5 text-white font-poppins">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<ShowMovie />} />
            <Route path="/shows/:id" element={<BookShow />} />
            <Route path="/tickets" element={<BookShow />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
