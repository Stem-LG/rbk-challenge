import { profileAtom, showToast, toastAtom } from "@/atoms";
import { Box, Button, ButtonBase, Divider, TextField, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAtom, useSetAtom } from "jotai";
import NextImage from "next/image";
import { LiaImageSolid } from "react-icons/lia";
import { useForm } from "react-hook-form";
import { checkImageDimensions } from "@/utils/validate";
import { useEffect, useState } from "react";

export default function ProfileDetails() {
    const theme = useTheme();

    const [imageError, setImageError] = useState("");

    const [profile, setProfile] = useAtom(profileAtom);

    const setToast = useSetAtom(toastAtom);

    function updateFirstName(firstName) {
        setProfile({ ...profile, firstname: firstName });
    }

    function updateLastName(lastName) {
        setProfile({ ...profile, lastname: lastName });
    }

    function updateEmail(email) {
        setProfile({ ...profile, email: email });
    }

    function updateImage(evt) {
        //convert to base64 and store in profile
        const file = evt.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // When the reader has finished reading the file, we get the Base64 data
                const base64Data = reader.result;

                const image = new Image();

                image.onload = () => {
                    if (image.width <= 1024 && image.height <= 1024) {
                        setProfile({ ...profile, picture: base64Data.toString() });
                        setImageError("");
                    } else {
                        setImageError("image too big");
                    }
                };
                image.src = base64Data.toString();
            };

            reader.readAsDataURL(file);
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem("profile", JSON.stringify(profile));
        showToast("💾 Your changes have been successfully saved!", setToast);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect(() => {
        setValue("firstname", profile.firstname);
        setValue("lastname", profile.lastname);
    });
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
            <Typography sx={{ fontSize: "32px", fontWeight: "600", mb: "10px" }}>Profile Details</Typography>
            <Typography sx={{ fontSize: "15px", color: "#7d7d7d", mb: "40px" }}>
                Add your details to create a personal touch to to your profile.
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    pl: "20px",
                    py: "20px",
                    borderRadius: "12px",
                    bgcolor: theme.palette.background.default,
                    color: "#7a7a7a",
                }}
            >
                <Typography sx={{ width: "202px", fontSize: "15px" }}>Profile Picture</Typography>
                <ButtonBase
                    sx={{
                        height: "185px",
                        width: "185px",
                        bgcolor: "#00f5",
                        borderRadius: "12px",
                        mr: "24px",
                        background: "url(" + profile.picture + ")",
                        position: "relative",
                    }}
                    component="label"
                >
                    {profile.picture ? (
                        <NextImage
                            src={profile.picture}
                            fill
                            style={{ objectFit: "cover", borderRadius: "12px" }}
                            alt=""
                        />
                    ) : (
                        ""
                    )}
                    <Box
                        sx={{
                            color: "white",
                            borderRadius: "12px",
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: profile.picture ? "#0002" : "#0006",
                            height: "100%",
                            width: "100%",
                            textShadow: "0 0 15px #000",
                            ":hover": {
                                bgcolor: "#0007",
                            },
                        }}
                    >
                        <LiaImageSolid size="32px" />
                        <Typography sx={{ fontSize: "15px" }}>
                            {profile.picture ? "Change Image" : "Upload Image"}
                        </Typography>
                    </Box>
                    {/* input that only accepts png jpg and bmp */}
                    <VisuallyHiddenInput type="file" onChange={updateImage} accept=".png, .jpg, .bmp" />
                </ButtonBase>
                <Box>
                    <Typography sx={{ fontSize: "11px" }}>
                        Image must be below 1024x1024px.
                        <br />
                        Use PNG, JPG, or BMP format.
                        <br />
                    </Typography>
                    <Typography sx={{ color: "red", fontSize: "13px" }}>{imageError}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    mt: "24px",
                    p: "20px",
                    borderRadius: "12px",
                    bgcolor: theme.palette.background.default,
                    color: "#7a7a7a",
                }}
            >
                {[
                    {
                        title: "FirstName*",
                        register: register("firstname", {
                            required: "FirstName is required",
                            maxLength: { value: 20, message: "Max length is 20" },
                            pattern: { value: /^[A-Za-z]+$/i, message: "Only alphabets allowed" },
                            onChange: (e) => updateFirstName(e.target.value),
                        }),
                        error: errors["firstname"]?.message,
                        value: profile.firstname,
                    },
                    {
                        title: "LastName*",
                        register: register("lastname", {
                            required: "LastName is required",
                            maxLength: { value: 20, message: "Max length is 20" },
                            pattern: { value: /^[A-Za-z]+$/i, message: "Only alphabets allowed" },
                            onChange: (e) => updateLastName(e.target.value),
                        }),
                        error: errors["lastname"]?.message,
                        value: profile.lastname,
                    },
                    {
                        title: "Email",
                        register: register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                            onChange: (e) => updateEmail(e.target.value),
                        }),
                        error: errors["email"]?.message,
                        value: profile.email,
                    },
                ].map(({ title, error, value, register }, key) => (
                    <Box key={key} sx={{ display: "flex", minHeight: "56px", alignItems: "center" }}>
                        <Typography sx={{ width: "245px", fontSize: "15px" }}>{title}</Typography>
                        <TextField
                            sx={{ width: "100%" }}
                            value={value}
                            error={!!error}
                            helperText={error ? error.toString() : ""}
                            {...register}
                            inputProps={{
                                style: {
                                    padding: "12px 15px",
                                    fontSize: "15px",
                                },
                            }}
                            InputProps={{
                                sx: {
                                    borderRadius: "8px",
                                    borderWidth: "1px",
                                    "&.Mui-focused": {
                                        boxShadow: "0 0 15px " + theme.palette.primary.main + "88",
                                    },
                                },
                            }}
                        />
                    </Box>
                ))}
            </Box>
            <Divider sx={{ mt: "24px" }} />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: "24px" }}>
                <Button variant="contained" sx={{ width: "90px", p: "10px" }} type="submit">
                    Save
                </Button>
            </Box>
        </Box>
    );
}

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});
