import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import Typography from "./typography";

export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            black: {
                100: "#0a0909",
                200: "#050504",
                300: "#0f0e0d",
                400: "#141212",
                500: "#191716",
                600: "#474545",
                700: "#757473",
                800: "#a3a2a2",
                900: "#d1d1d0",
            },
            yellow: {
                100: "#fff7d7",
                200: "#fef0ae",
                300: "#fee886",
                400: "#fde15d",
                500: "#fdd935",
                600: "#caae2a",
                700: "#988220",
                800: "#655715",
                900: "#332b0b"
            },
            white: {
                100: "#2d2d2c",
                200: "#5a5a58",
                300: "#868883",
                400: "#b3b5af",
                500: "#e0e2db",
                600: "#e6e8e2",
                700: "#eceee9",
                800: "#f3f3f1",
                900: "#f9f9f8",
            },
            blue: {
                100: "#0c0a1c",
                200: "#181538",
                300: "#251f53",
                400: "#312a6f",
                500: "#3d348b",
                600: "#645da2",
                700: "#8b85b9",
                800: "#b1aed1",
                900: "#d8d6e8",
            },
            grey: {
                100: "#262521",
                200: "#4c4942",
                300: "#726e62",
                400: "#989283",
                500: "#beb7a4",
                600: "#cbc5b6",
                700: "#d8d4c8",
                800: "#e5e2db",
                900: "#f2f1ed",
            },
        }
        : {
            black: {
                100: "#d1d1d0",
                200: "#a3a2a2",
                300: "#757473",
                400: "#474545",
                500: "#191716",
                600: "#141212",
                700: "#0f0e0d",
                800: "#0a0909",
                900: "#050504"
            },
            yellow: {
                100: "#332b0b",
                200: "#655715",
                300: "#988220",
                400: "#caae2a",
                500: "#fdd935",
                600: "#fde15d",
                700: "#fee886",
                800: "#fef0ae",
                900: "#fff7d7",
            },
            white: {
                100: "#f9f9f8",
                200: "#f3f3f1",
                300: "#eceee9",
                400: "#e6e8e2",
                500: "#e0e2db",
                600: "#b3b5af",
                700: "#868883",
                800: "#5a5a58",
                900: "#2d2d2c"
            },
            blue: {
                100: "#d8d6e8",
                200: "#b1aed1",
                300: "#8b85b9",
                400: "#645da2",
                500: "#3d348b",
                600: "#312a6f",
                700: "#251f53",
                800: "#181538",
                900: "#0c0a1c"
            },
            grey: {
                100: "#f2f1ed",
                200: "#e5e2db",
                300: "#d8d4c8",
                400: "#cbc5b6",
                500: "#beb7a4",
                600: "#989283",
                700: "#726e62",
                800: "#4c4942",
                900: "#262521"
            },
        }
    )
});

const themeTypography = Typography(`'Public Sans', sans-serif`);

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536
            }
        },
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.yellow[500],
                    },
                    secondary: {
                        main: colors.black[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.white[100],
                    },

                }
                : {
                    primary: {
                        main: colors.black[500],
                    },
                    secondary: {
                        main: colors.yellow[600],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.white[200],
                    }
                }
            ),
        },
        typography: themeTypography,
    }
}

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};