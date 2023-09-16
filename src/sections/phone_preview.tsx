import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import { FiArrowRight } from "react-icons/fi";
import { useAtomValue } from "jotai";
import { linksAtom, profileAtom } from "@/atoms";
import { platforms } from "@/utils/consts";
import { AiFillStar } from "react-icons/ai";

export default function PhonePreview() {
    return (
        <Box
            sx={{
                height: "800px",
                borderRadius: "12px",
                px: "128px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            <Preview frame />
        </Box>
    );
}

export function Preview({ frame = false }) {
    const links = useAtomValue(linksAtom);
    const profile = useAtomValue(profileAtom);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...(frame
                    ? {
                          backgroundImage: "url(/phone-mockup.svg)",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          height: "640px",
                          width: "310px",
                          px: "32px",
                          pt: "64px",
                      }
                    : {}),
            }}
        >
            <Avatar
                sx={{
                    ...(frame
                        ? {
                              width: "100px",
                              height: "100px",
                          }
                        : {
                              width: "110px",
                              height: "110px",
                          }),
                    border: "4px solid",
                    borderColor: "primary.main",
                }}
                src={profile.picture}
            />

            <Typography sx={{ mt: "26px", fontWeight: frame ? "500" : "600", fontSize: frame ? "20px" : "32px" }}>
                {profile.firstname || profile.lastname ? profile.firstname + " " + profile.lastname : "Default Name"}
            </Typography>
            <Typography sx={{ mt: "10px", color: "#7d7d7d", fontSize: frame ? "14px" : "15px", mb: "50px" }}>
                {profile.email}
            </Typography>

            <Box
                sx={{
                    overflowY: "scroll",
                    maxHeight: frame ? "280px" : "235px",
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {links.map(({ platform, url }, index) => {
                    const plat = platforms[platform];

                    console.log("index: ", platform);
                    let Icon = plat.Icon;
                    return (
                        <ButtonBase
                            href={url}
                            key={index}
                            sx={{
                                backgroundColor: plat.color,
                                width: "100%",
                                height: frame ? "44px" : "56px",
                                color: "white",
                                justifyContent: "space-between",
                                mb: "20px",
                                borderRadius: "10px",
                                px: "16px",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <Icon size={frame ? "14px" : "18px"} />
                                <Typography sx={{ fontSize: frame ? "12px" : "16px", fontWeight: "300" }}>
                                    {plat.name}
                                </Typography>
                            </Box>
                            <FiArrowRight />
                        </ButtonBase>
                    );
                })}
            </Box>
        </Box>
    );
}
