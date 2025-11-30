import NavBar from "./components/Navigation";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="main-container bg-blue-900 w-full min-h-svh flex flex-col items-center">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
