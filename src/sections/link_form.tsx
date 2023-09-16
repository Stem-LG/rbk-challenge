import { Box, Button, Divider, InputAdornment, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import { PiEqualsLight, PiGithubLogoFill, PiLinkBold, PiYoutubeLogoFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useAtom, useSetAtom } from "jotai";
import { linksAtom, showToast, toastAtom } from "@/atoms";
import { platforms } from "@/utils/consts";
import { FieldErrors, FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function LinkForm() {
    const [links, setLinks] = useAtom(linksAtom);
    const setToast = useSetAtom(toastAtom);

    function addEmptyLink() {
        setLinks([...links, { platform: 0 }]);
    }

    function saveToLocalStorage() {
        localStorage.setItem("links", JSON.stringify(links));
        showToast("💾 Your changes have been successfully saved!", setToast);
    }

    const [draggedItem, setDraggedItem] = useState(null);

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
    };

    const handleDragOver = (e, targetItem) => {
        e.preventDefault();
        if (draggedItem === null) return;

        const updatedLinks = [...links];
        const draggedIndex = links.findIndex((item) => item === draggedItem);
        const targetIndex = links.findIndex((item) => item === targetItem);

        updatedLinks.splice(draggedIndex, 1);
        updatedLinks.splice(targetIndex, 0, draggedItem);

        setLinks(updatedLinks);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <Box
            sx={{
                height: "100%",
                minHeight: "320px",
                borderRadius: "12px",
                p: "40px",
                bgcolor: "white",
            }}
            component="form"
            onSubmit={handleSubmit(saveToLocalStorage)}
        >
            <Typography sx={{ fontSize: "32px", fontWeight: "600", mb: "10px" }}>Customize your links</Typography>
            <Typography sx={{ fontSize: "15px", color: "#7d7d7d", mb: "40px" }}>
                Add/edit/remove links below and then share all your profiles with the world!
            </Typography>
            <Button
                variant="outlined"
                sx={{
                    textTransform: "none",
                    width: "100%",
                    borderWidth: "2px",
                    fontSize: "16px",
                    mb: "24px",
                    "&:hover": {
                        borderWidth: "2px",
                    },
                    p: "10px",
                }}
                onClick={addEmptyLink}
            >
                + Add new link
            </Button>

            {links.map((link, key) => (
                <LinkBox
                    key={key}
                    index={key}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                    onDragStart={(e) => handleDragStart(e, link)}
                    onDragOver={(e) => handleDragOver(e, link)}
                    onDragEnd={handleDragEnd}
                />
            ))}
            <Divider />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: "24px" }}>
                <Button variant="contained" sx={{ width: "90px", p: "10px" }} type="submit">
                    Save
                </Button>
            </Box>
        </Box>
    );
}

function LinkBox({ index, register, unregister, errors, onDragStart, onDragOver, onDragEnd }: any) {
    const [links, setLinks] = useAtom(linksAtom);

    const [registerState, setRegisterState] = useState({
        platform: register(`links.${index}.platform`, {
            onChange: (e) => updateplatform(e.target.value),
        }),
        url: register(`links.${index}.url`, {
            required: {
                value: true,
                message: "Invalid Link",
            },
            onChange: (e) => updateLink(e.target.value),
            validate: (value: string) => {
                const urlPattern =
                    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

                let startsWith = platforms[links[index].platform].startsWith;

                if (startsWith) {
                    if (!value.startsWith(startsWith)) return "Invalid link";
                }

                return urlPattern.test(value) || "Invalid link";
            },
        }),
    });

    function removeLink() {
        setLinks((links) => {
            return links.filter((_, i) => i != index);
        });
    }

    useEffect(() => {
        unregister(`links.${index}.platform`);
        unregister(`links.${index}.url`);
        setRegisterState({
            platform: register(`links.${index}.platform`, {
                onChange: (e) => updateplatform(e.target.value),
            }),
            url: register(`links.${index}.url`, {
                required: {
                    value: true,
                    message: "Invalid Link",
                },
                onChange: (e) => updateLink(e.target.value),
                validate: (value: string) => {
                    const urlPattern =
                        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

                    let startsWith = platforms[links[index].platform].startsWith;

                    if (startsWith) {
                        if (!value.startsWith(startsWith)) return "Invalid link";
                    }

                    return urlPattern.test(value) || "Invalid link";
                },
            }),
        });
    }, [links]);

    function updateplatform(platformIndex) {
        setLinks(
            links.map((link, i) => {
                if (i == index) {
                    return { ...link, platform: platformIndex };
                }
                return link;
            })
        );
    }

    function updateLink(url) {
        setLinks(
            links.map((link, i) => {
                if (i == index) {
                    return { ...link, url };
                }
                return link;
            })
        );
    }

    const theme = useTheme();

    return (
        <Box
            sx={{ p: "20px", pt: "10px", borderRadius: "10px", bgcolor: theme.palette.background.default, mb: "24px" }}
            draggable={true}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px", color: "#7d7d7d" }}>
                    <PiEqualsLight size="20px" />
                    <Typography sx={{ fontWeight: "600", fontSize: "15px" }}>Link#{index + 1}</Typography>
                </Box>
                <Button sx={{ color: "#7d7d7d", p: "15px" }} onClick={removeLink}>
                    Remove
                </Button>
            </Box>

            <Typography sx={{ fontSize: "12px", mb: "5px", fontWeight: "500" }}>Platform</Typography>
            <TextField
                select
                sx={{
                    width: "100%",
                    ".MuiOutlinedInput-input": {
                        py: "13.5px",
                    },
                    mb: "13px",
                }}
                {...register(`links.${index}.platform`, {
                    onChange: (e) => updateplatform(e.target.value),
                })}
                value={links[index].platform || 0}
                defaultValue={0}
                InputProps={{
                    sx: {
                        borderRadius: "8px",
                    },
                }}
            >
                {platforms.map(({ Icon, name }, key) => (
                    <MenuItem key={key} value={key} sx={{ height: "48px" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Icon /> <Typography>{name}</Typography>
                        </Box>
                    </MenuItem>
                ))}
            </TextField>
            <Typography sx={{ fontSize: "12px", mb: "5px", fontWeight: "500" }}>Link</Typography>
            <TextField
                value={links[index].url}
                {...register(`links.${index}.url`, {
                    required: {
                        value: true,
                        message: "Invalid Link",
                    },
                    onChange: (e) => updateLink(e.target.value),
                    validate: (value: string) => {
                        const urlPattern =
                            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

                        let startsWith = platforms[links[index].platform].startsWith;

                        if (startsWith) {
                            if (!value.startsWith(startsWith)) return "Invalid link";
                        }

                        return urlPattern.test(value) || "Invalid link";
                    },
                })}
                error={errors["links"] ? !!errors["links"][index]?.url.message : false}
                helperText={errors["links"] ? errors["links"][index]?.url.message.toString() : ""}
                sx={{
                    width: "100%",
                    ".MuiOutlinedInput-input": {
                        py: "13.5px",
                    },
                }}
                InputProps={{
                    sx: {
                        borderRadius: "8px",
                        "&.Mui-focused": {
                            boxShadow: "0 0 15px " + theme.palette.primary.main + "88",
                        },
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            <PiLinkBold />
                        </InputAdornment>
                    ),
                }}
                placeholder="Enter your link here"
            />
        </Box>
    );
}
