import { ProtectedRoutes } from "@/routes/Protected";
import { AuthRoutes } from "@/routes/Auth";
import { PublicRoutes } from "@/routes/Public";
import { Box } from "@chakra-ui/react";
import { Routes } from "react-router";

function App() {
  return (
    <Box bg="#0C001A">
      <Routes>
        {PublicRoutes}
        {AuthRoutes}
        {ProtectedRoutes}
      </Routes>
    </Box>
  );
}

export default App;
