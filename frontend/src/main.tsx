import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ShowProvider from "./contexts/ShowsContext.tsx";

const root = document.getElementById("root");

createRoot(root!).render(
  <ShowProvider>
    <App />
  </ShowProvider>,
);
