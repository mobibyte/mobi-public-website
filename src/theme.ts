
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    // Custom theme
    tokens: {
      colors: {
        brand: {
          500: { value: "#5c7cfa" },
        },
        appBg: { value: "#0C001A" }, 
      },
    },

    // 2) semantic tokens that components & globals can reference
    semanticTokens: {
      colors: {
        bg: {
          canvas: {
            value: { base: "{colors.white}", _dark: "{colors.appBg}" },
          },
        },
      },
    },
  },

  // 3) global CSS so the <body> actually uses your bg token
  globalCss: {
    "html, body": {
      bg: "bg.canvas",
      color: "fg", // uses Chakra’s default foreground token
      minHeight: "100%",
    },
  },
});

export const system = createSystem(defaultConfig, config);
