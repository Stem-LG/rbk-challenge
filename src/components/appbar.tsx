import { AppBar, Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { PiLinkBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";

export default function TopAppBar({ selectedId }) {
    return (
        <>
            <AppBar
                sx={{
                    mt: "24px",
                    m: "24px",
                    width: "calc(100dvw - 48px)",
                }}
            >
                <Toolbar sx={{ borderRadius: "12px", height: "80px", justifyContent: "space-between" }}>
                    <Logo />
                    <NavButtons selectedId={selectedId} />
                    <Button
                        href="/preview"
                        variant="outlined"
                        sx={{ borderWidth: "2px", borderRadius: "8px", width: "112px", p: "10px" }}
                    >
                        Preview
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ height: "128px" }} />
        </>
    );
}

function Logo() {
    return (
        <>
            <Box sx={{ width: "112px", display: "flex", alignItems: "center", gap: "5px" }}>
                <Image src="/logo.svg" width={28} height={28} alt="" />
                <Typography sx={{ fontWeight: "600", fontSize: "24px" }}>devlinks</Typography>
            </Box>
        </>
    );
}

function NavButtons({ selectedId }) {
    const theme = useTheme();

    return (
        <Box sx={{ display: "flex", gap: "16px" }}>
            {[
                { name: "Links", Icon: PiLinkBold, url: "/links" },
                { name: "Profile Details", Icon: CgProfile, url: "/details" },
            ].map(({ name, Icon, url }, i) => (
                <Button
                    key={i}
                    variant={selectedId == i ? "contained" : "text"}
                    sx={{
                        minWidth: "112px",
                        py: "9px",
                        textTransform: "capitalize",
                        backgroundColor: selectedId == i ? theme.palette.primary.main + "22" : "transparent",
                        boxShadow: "none",
                        borderRadius: "8px",
                    }}
                    href={selectedId == i ? undefined : url}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "5px",
                            color: selectedId == i ? theme.palette.primary.main : "#7c7c7c",
                        }}
                    >
                        <Icon size="24px" />
                        <Typography fontSize="16px" sx={{}}>
                            {name}
                        </Typography>
                    </Box>
                </Button>
            ))}
        </Box>
    );
}
