import { theme } from "@/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/global.css";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { linksAtom, profileAtom, toastAtom } from "@/atoms";
import NotificationToast from "@/components/toast";

export default function App({ Component, pageProps }: AppProps) {
    const setLinks = useSetAtom(linksAtom);
    const setProfile = useSetAtom(profileAtom);
    const [toastValue, _] = useAtom(toastAtom);

    useEffect(() => {
        setLinks(JSON.parse(localStorage.getItem("links") || "[]"));
        setProfile(JSON.parse(localStorage.getItem("profile") || "{}"));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: "background.default",
                    minHeight: "100svh",
                }}
            >
                <CssBaseline />
                <Component {...pageProps} />
                {toastValue ? <NotificationToast message={toastValue} /> : ""}
            </Box>
        </ThemeProvider>
    );
}
