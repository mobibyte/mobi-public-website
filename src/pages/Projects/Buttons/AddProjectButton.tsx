import { Button } from "@chakra-ui/react";
import { Link } from "react-router";

export function AddProjectButton() {
  return (
    <Button mx={"auto"} alignSelf={"end"} asChild>
      <Link to="/projects/add">Add New Project</Link>
    </Button>
  );
}
