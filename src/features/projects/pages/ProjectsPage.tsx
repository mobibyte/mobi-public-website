import { Heading, SimpleGrid } from "@chakra-ui/react";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "../components/ProjectCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useGetAllProjects } from "../hooks";
import { PaginationControls } from "../components/PaginationControls";
import { useGetUserLikes } from "@/features/profile/hooks";
import { useSession } from "@/features/auth/hooks";

const DEFAULT_PAGE = 1;

export function ProjectsPage() {
    const { data: userLikes } = useGetUserLikes();
    const { data: projects, isError, error } = useGetAllProjects();
    const { data: session } = useSession();
    const isSignedIn = !!session;

    const pageSize = 9; // 9 Projects per page
    const [page, setPage] = useState(DEFAULT_PAGE);

    const { pageNumber } = useParams();

    useEffect(() => {
        setPage(Number(pageNumber) || 1);
        window.requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }, [pageNumber]);

    const startRange = (page - 1) * pageSize;
    const endRange = startRange + pageSize;

    const visibleProjects = projects.slice(startRange, endRange);

    return (
        <>
            <Heading
                fontSize={48}
                className="space-grotesk-500"
                textAlign={"center"}
                lineHeight={1}
                zIndex={2}
            >
                Community Projects
            </Heading>
            {isError && <h1>Error loading projects: {error.message}</h1>}
            <Reveal delay={150}>
                <SimpleGrid
                    columns={{ base: 1, sm: 2, lg: 3 }}
                    gap={6}
                    mt={{ base: 4, lg: 12 }}
                >
                    {visibleProjects?.map((project) => (
                        <ProjectCard
                            project={project}
                            key={project.id}
                            isSignedIn={isSignedIn}
                            userLikes={userLikes}
                        />
                    ))}
                </SimpleGrid>
            </Reveal>

            {projects && projects.length > pageSize && (
                <PaginationControls projects={projects} />
            )}
        </>
    );
}
