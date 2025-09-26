import { ProtectedRoutes } from "@/routes/Protected";
import { AuthRoutes } from "@/routes/Auth";
import { PublicRoutes } from "@/routes/Public";
import { Layout } from "./components/Layout";
import { Routes } from "react-router";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          {PublicRoutes}
          {AuthRoutes}
          {ProtectedRoutes}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
