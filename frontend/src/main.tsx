import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ShowProvider from "./contexts/ShowsContext.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";

const root = document.getElementById("root");

createRoot(root!).render(
  <AuthProvider>
    <ShowProvider>
      <App />
    </ShowProvider>
  </AuthProvider>,
);
