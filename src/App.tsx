import { Routes, Route } from "react-router";
import { Profile, NotFound, Events, Contact } from "@/pages";
import { Home as HomePage } from "@/pages/Home/Home";
import { ProtectedRoutes } from "@/providers/ProtectedRoutes";
import { AuthRoutes } from "@/providers/AuthRoutes";
import { LoginForm, RegisterForm } from "@/forms";
import { Box } from "@chakra-ui/react";
import { StarsBackground } from "./assets/Stars";
import { Layout } from "@components/Layout";

// TODO:
// need to properly route authentication
// need a main container that is view port height

function App() {
    return (
        <Box bg="#0C001A">
            <StarsBackground />
            <Layout>
                <Routes>
                    {/* Public */}
                    <Route index element={<HomePage />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/*" element={<NotFound />} />

                    {/* Auth */}
                    <Route path="/" element={<AuthRoutes />}>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<RegisterForm />} />
                    </Route>

                    {/* Protected */}
                    <Route element={<ProtectedRoutes />}>
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Routes>
            </Layout>
        </Box>
    );
}

export default App;
