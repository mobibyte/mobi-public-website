import { Routes, Route } from "react-router";
import {
  Profile,
  NotFound,
  Events,
  Contact,
  Officers,
  Projects,
} from "@/pages";
import { ResetForm } from "./pages/ResetPassword";
import { ForgotForm } from "./pages/ForgotPassword";
import { Home as HomePage } from "@/pages/Home/Home";
import { ProtectedRoutes } from "@/providers/ProtectedRoutes";
import { AuthRoutes } from "@/providers/AuthRoutes";
import { LoginForm, RegisterForm } from "@/forms";
import { Box } from "@chakra-ui/react";
import { CreateProjectPage } from "./pages/Projects/Routes/CreateProjectPage";
import { UpdateProjectPage } from "./pages/Projects/Routes/UpdateProjectPage";

import { Layout } from "@components/Layout";

// TODO:
// need to properly route authentication
// need a main container that is view port height

function App() {
  return (
    <Box bg="#0C001A">
      <Layout>
        <Routes>
          {/* Public */}
          <Route index element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/projects">
            <Route index element={<Projects />} />
            <Route path="add" element={<CreateProjectPage />} />
            <Route path="edit/:project_id" element={<UpdateProjectPage />} />
          </Route>
          <Route path="/projects/page/:pageNumber" element={<Projects />} />
          <Route path="/*" element={<NotFound />} />

          {/* Auth */}
          <Route path="/" element={<AuthRoutes />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotForm />} />
          </Route>

          {/* Protected */}
          <Route element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetForm />} />
          </Route>
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;
