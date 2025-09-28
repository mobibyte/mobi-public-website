import { Route } from "react-router";
import { Profile } from "@/pages";
import { CreateProjectPage } from "@/pages/Projects/Routes/CreateProjectPage";
import { UpdateProjectPage } from "@/pages/Projects/Routes/UpdateProjectPage";
import { ResetForm } from "@/pages/Auth/ResetPassword";
import { MainLayout } from "@/components/Layout";
import { ProtectedRoutes as Provider } from "@/providers/ProtectedRoutes";
import { CreateEvent } from "@/pages/Events/routes/CreateEvent";
import { UpdateEvent } from "@/pages/Events/routes/UpdateEvent";

export const ProtectedRoutes = (
    <Route element={<Provider />}>
        <Route element={<MainLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="project/add" element={<CreateProjectPage />} />
            <Route
                path="project/edit/:project_id"
                element={<UpdateProjectPage />}
            />
            <Route path="/reset-password" element={<ResetForm />} />
            <Route path="event/add" element={<CreateEvent />} />
            <Route path="event/edit/:event_id" element={<UpdateEvent />} />
        </Route>
    </Route>
);
