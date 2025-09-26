import { ProtectedRoutes } from "@/routes/Protected";
import { AuthRoutes } from "@/routes/Auth";
import { PublicRoutes } from "@/routes/Public";
import { Toaster } from "@/components/ui/toaster";
import { Routes } from "react-router";
import { GalaxyBg } from "@/assets/background/GalaxyBg";

function App() {
  return (
    <>
      <GalaxyBg />
      <Routes>
        {PublicRoutes}
        {AuthRoutes}
        {ProtectedRoutes}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
