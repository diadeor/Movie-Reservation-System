import Footer from "./components/Footer";
import NavBar from "./components/Navigation";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowMovie from "./pages/ShowMovie";
import BookShow from "./pages/BookShow";

function App() {
  return (
    <Router>
      <div className="main-container bg-blue-900 w-full min-h-svh flex flex-col items-center">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<ShowMovie />} />
          <Route path="/shows/:id" element={<BookShow />} />
          <Route path="/tickets" element={<BookShow />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
