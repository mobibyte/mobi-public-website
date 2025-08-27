import type { Officer } from "@/types";

export const officers: Officer[] = [
    {
        name: "Preston Nguyen",
        role: "President",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
        links: [
            "https://github.com/johndoe",
            "https://linkedin.com/in/johndoe",
            "https://instagram.com/johndoe",
        ],
    },
    {
        name: "First Last",
        role: "Vice President",
        image: "https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg",
        links: [
            "https://github.com/janesmith",
            "https://linkedin.com/in/janesmith",
            "https://instagram.com/janesmith",
        ],
    },
    {
        name: "David Cai",
        role: "Treasurer",
        image: "https://avatars.githubusercontent.com/u/43160344?v=4",
        links: [
            "https://github.com/davidxcai",
            "https://www.linkedin.com/in/davidxiencai/",
            "https://www.davidxcai.dev",
        ],
    },
];

export default officers;
