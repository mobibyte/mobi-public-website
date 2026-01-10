import { NavLink as Link } from "react-router";
import { Link as ChakraLink } from "@chakra-ui/react";

type NavLinkProps = {
    to: string;
    label: string;
};

export function NavLink({ to, label }: NavLinkProps) {
    return (
        <ChakraLink
            asChild
            _hover={{ textDecoration: "none", bg: "gray.100" }}
            _active={{
                color: "blue.500",
                fontWeight: "semibold",
            }}
        >
            <Link to={to}>{label}</Link>
        </ChakraLink>
    );
}
