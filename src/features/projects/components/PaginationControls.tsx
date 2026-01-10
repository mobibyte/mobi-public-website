import { IconButton, ButtonGroup, Pagination } from "@chakra-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import type { Project } from "../types";
import { useBreakpointValue } from "@chakra-ui/react";

export function PaginationControls({ projects }: { projects: Project[] }) {
    const DEFAULT_PAGE = 1;

    const pageSize =
        useBreakpointValue({
            base: 8,
            sm: 8,
            md: 8,
            lg: 9,
        }) ?? 9; // 9 Projects per page
    const [page, setPage] = useState(DEFAULT_PAGE);

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

    return (
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
    );
}
