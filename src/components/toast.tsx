import { Box, Typography } from "@mui/material";

export default function NotificationToast({ message }) {
    return (
        <Box sx={{position:"fixed", width:"100vw",display:"flex",justifyContent:"center",top:"calc(100svh - 100px)"}}>
            <Box sx={{padding:"20px",bgcolor:"#333", borderRadius:"15px"}}>
                <Typography sx={{color:"white"}}>{message}</Typography>
            </Box>
        </Box>
    );
}
