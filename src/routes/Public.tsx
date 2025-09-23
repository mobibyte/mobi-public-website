import { Route } from "react-router";
import { Home as HomePage } from "@/pages/Home/Home";
import { NotFound, Events, Officers, Projects } from "@/pages";
import { MainLayout, FullWidthLayout } from "@components/Layout";

export const PublicRoutes = (
  <>
    <Route element={<FullWidthLayout />}>
      <Route index element={<HomePage />} />
    </Route>
    <Route element={<MainLayout />}>
      <Route path="/events" element={<Events />} />
      <Route path="/officers" element={<Officers />} />
      <Route path="/projects" element={<Projects />} />

      <Route path="/projects/page/:pageNumber" element={<Projects />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  </>
);
