import {
    IconButton,
    ButtonGroup,
    Heading,
    Pagination,
    Grid,
} from "@chakra-ui/react";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useGetAllProjects } from "@/hooks/useProjects";
import { ProjectSkeleton } from "./ProjectSkeleton";

export function Projects() {
    const { data: projects, isPending, isError, error } = useGetAllProjects();

    const pageSize = 9; // 9 Projects per page
    const [page, setPage] = useState(1);

    const { pageNumber } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setPage(Number(pageNumber) || 1);
        window.requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }, [pageNumber]);

    const handlePageChange = (e: { page: number }) => {
        navigate(`/projects/page/${e.page}`);
    };

    const startRange = (page - 1) * pageSize;
    const endRange = startRange + pageSize;

    const visibleProjects = projects?.slice(startRange, endRange);

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
                <Grid
                    templateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap="6"
                    flex={"grow"}
                >
                    {isPending
                        ? Array.from({ length: 9 }, (_, i) => (
                              <ProjectSkeleton key={i} />
                          ))
                        : visibleProjects?.map((project) => (
                              <ProjectCard project={project} key={project.id} />
                          ))}
                </Grid>
            </Reveal>

            {projects && projects.length > pageSize && (
                <Pagination.Root
                    count={projects?.length}
                    pageSize={pageSize}
                    page={page}
                    onPageChange={handlePageChange}
                    mx={"auto"}
                    alignSelf={"end"}
                >
                    <ButtonGroup variant="ghost" size="sm">
                        <Pagination.PrevTrigger asChild>
                            <IconButton>
                                <IconChevronLeft />
                            </IconButton>
                        </Pagination.PrevTrigger>

                        <Pagination.Items
                            render={(page) => (
                                <IconButton
                                    variant={{
                                        base: "ghost",
                                        _selected: "outline",
                                    }}
                                >
                                    {page.value}
                                </IconButton>
                            )}
                        />

                        <Pagination.NextTrigger asChild>
                            <IconButton>
                                <IconChevronRight />
                            </IconButton>
                        </Pagination.NextTrigger>
                    </ButtonGroup>
                </Pagination.Root>
            )}
        </>
    );
}
