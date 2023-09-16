import TopAppBar from "@/components/appbar";
import PhonePreview from "@/sections/phone_preview";
import ProfileDetails from "@/sections/profile_details";
import { Box } from "@mui/material";

export default function Home() {
    return (
        <>
            <TopAppBar selectedId={1} />
            <Box sx={{ display: "flex", px: "24px", gap: "24px" }}>
                <PhonePreview />
                <Box sx={{ width: "100%" }}>
                    <ProfileDetails />
                </Box>
            </Box>
        </>
    );
}
