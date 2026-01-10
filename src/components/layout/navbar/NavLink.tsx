import { NavLink as Link } from "react-router";
import { Link as ChakraLink } from "@chakra-ui/react";
import { blue } from "@/styles/colors";

type NavLinkProps = {
    to: string;
    label?: string;
};

export function NavLink({ to, label }: NavLinkProps) {
    return (
        <ChakraLink
            asChild
            variant={"plain"}
            aria-current={"page"}
            transition={"color 0.2s ease"}
            _currentPage={{
                color: blue,
                fontWeight: "semibold",
            }}
            _hover={{
                textDecoration: "none",
                color: blue,
            }}
        >
            <Link to={to}>{label}</Link>
        </ChakraLink>
    );
}
