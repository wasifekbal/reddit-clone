import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import { Button } from "./button";
import { Checkbox } from "./checkbox";

export const theme = extendTheme({
    colors: {
        brand: {
            100: "#FF3c00",
        },
    },
    fonts: {
        body: "Open Sans, sans-serif",
    },
    styles: {
        global: () => ({
            body: {
                bg: "gray.200",
            },
        }),
    },
    components: {
        Button: Button,
        Checkbox: Checkbox,
    },
});
