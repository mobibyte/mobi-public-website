import { useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ThemeButton() {
    // Placeholder for theme toggle functionality
    const [dark, setDark] = useState(true);
    const toggleTheme = () => {
        setDark(!dark);
        console.log("Theme toggled to", dark ? "light" : "dark");
    };
    return dark ? (
        <IconSun onClick={toggleTheme} />
    ) : (
        <IconMoon onClick={toggleTheme} />
    );
}
