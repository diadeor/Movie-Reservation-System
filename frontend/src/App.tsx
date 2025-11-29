import NavBar from "./components/Navigation";
import Home from "./pages/Home";

function App() {
  return (
    <div className="main-container bg-blue-900 w-full min-h-svh flex flex-col items-center">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
