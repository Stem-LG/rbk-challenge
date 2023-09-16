import { Preview } from "@/sections/phone_preview";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { FaLinkedin } from "react-icons/fa";
import { PiGithubLogoFill, PiYoutubeLogoFill } from "react-icons/pi";

export default function PreviewPage() {
    let links = [
        {
            Icon: PiGithubLogoFill,
            name: "Github",
            url: "#",
            color: "black",
        },
        {
            Icon: PiYoutubeLogoFill,
            name: "Youtube",
            url: "#",
            color: "#ef383a",
        },
        {
            Icon: FaLinkedin,
            name: "Linkedin",
            url: "#",
            color: "#2d69ff",
        },
    ];

    return (
        <>
            <AppBar
                sx={{
                    mt: "24px",
                    m: "24px",
                    width: "calc(100dvw - 48px)",
                }}
            >
                <Toolbar
                    sx={{
                        borderRadius: "12px",
                        height: "80px",
                        justifyContent: "space-between",
                        ".MuiButton-root": {
                            p: "10px 25px",
                        },
                    }}
                >
                    <Button href="/links" variant="outlined" sx={{ borderWidth: "2px", borderRadius: "8px" }}>
                        Back to Editor
                    </Button>
                    <Button variant="contained" sx={{ borderWidth: "2px", borderRadius: "8px" }}>
                        Share Link
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    height: "356px",
                    width: "100%",
                    bgcolor: "primary.main",
                    borderRadius: " 0 0 35px 35px",
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "fixed",
                    top: "206px",
                    width: "100%",
                }}
            >
                <Box sx={{ width: "350px", height: "570px", bgcolor: "white", px: "56px", pt: "44px", pb: "48px", boxShadow:"0 0 15px #0003", borderRadius:"24px" }}>
                    <Preview  />
                </Box>
            </Box>
        </>
    );
}