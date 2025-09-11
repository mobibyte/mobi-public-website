import { projects } from "@/data/projects";
import {
  Stack,
  IconButton,
  ButtonGroup,
  Heading,
  Pagination,
  Grid,
} from "@chakra-ui/react";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./Home/ProjectCard";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export function Projects() {
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

  const visibleProjects = projects.slice(startRange, endRange);
  return (
    <>
      <Stack
        gap={12}
        width={"100%"}
        px={{ base: 4, md: 32 }}
        py={32}
        position={"relative"}
        minHeight={"dvh"}
      >
        <Heading
          fontSize={48}
          className="space-grotesk-500"
          textAlign={"center"}
          lineHeight={1}
          zIndex={2}
        >
          Community Projects
        </Heading>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap="6"
          flex={"grow"}
        >
          {visibleProjects.map((project, index) => (
            <Reveal delay={150}>
              <ProjectCard key={project.title + index} project={project} />
            </Reveal>
          ))}
        </Grid>
      </Stack>
      <Pagination.Root
        count={projects.length}
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
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
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
    </>
  );
}
