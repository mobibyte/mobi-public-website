import type { Project } from "@/types";

export function convertForm(project: Project) {
    return {
        title: project.title,
        description: project.description,
        url: project.url,
        tech_stack: project.tech_stack,
        display: project.display,
        bg_color: project.bg_color,
        image: project.image
    }
}