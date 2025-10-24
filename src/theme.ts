import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    // Custom theme
    tokens: {
      colors: {
        brand: {
          500: { value: "#5c7cfa" },
        },
        mobi: {
          purple: {
            900: { value: "#0C001A" },
          },
          pink: {
            900: { value: "#FF00AA" },
          },
          blue: {
            900: { value: "#0084FF" },
            800: { value: "#0054C3" },
          },
        },
        socialMedia: {
          instagram: { value: "#C13584" },
          discord: { value: "#7289da" },
        },
      },
    },

    // 2) semantic tokens that components & globals can reference
    semanticTokens: {
      colors: {
        bg: {
          default: { value: "{colors.mobi.purple.900}" },
          _dark: { value: "{colors.mobi.purple.900}" },
          canvas: {
            value: {
              base: "{colors.mobi.purple.900}",
              _dark: "{colors.mobi.purple.900}",
            },
          },
        },
        fg: {
          default: { value: "#1a1a1a" },
          _dark: { value: "#f5f5f5" },
        },
        // optional: muted surfaces (cards/menus often reference this)
        muted: {
          default: { value: "#f9f9f9" },
          _dark: { value: "#1e1e1e" },
        },
        accent: {
          default: { value: "#3182ce" },
          _dark: { value: "#63b3ed" },
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
