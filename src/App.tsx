import { ProtectedRoutes } from "@/routes/Protected";
import { AuthRoutes } from "@/routes/Auth";
import { PublicRoutes } from "@/routes/Public";
import { Routes } from "react-router";

function App() {
  return (
    <Routes>
      {PublicRoutes}
      {AuthRoutes}
      {ProtectedRoutes}
    </Routes>
  );
}

export default App;
