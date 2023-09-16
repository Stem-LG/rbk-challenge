import TopAppBar from "@/components/appbar";
import LinkForm from "@/sections/link_form";
import PhonePreview from "@/sections/phone_preview";
import { Box } from "@mui/material";

export default function Home() {
    return (
        <>
            <TopAppBar selectedId={0}/>
            <Box sx={{ display: "flex", px: "24px", gap: "24px" }}>
                <PhonePreview />
                <Box sx={{ width: "100%" }}>
                    <LinkForm />
                </Box>
            </Box>
        </>
    );
}
