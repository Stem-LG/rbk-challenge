import { Preview } from "@/sections/phone_preview";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export default function PreviewPage() {
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
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        height: "356px",
                        width: "100%",
                        bgcolor: "primary.main",
                        borderRadius: " 0 0 35px 35px",
                        position: "absolute",
                    }}
                ></Box>
                <Preview />
            </Box>
        </>
    );
}
