import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#633bfe"
        },
        background: {
            default: "#fafafa",
            paper: "#fff"
        }
    }
    , components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "transparent",
                    color: "#000"
                },


            },
            defaultProps: {
                elevation: 0
            }
        }
        , MuiToolbar: {
            styleOverrides: {

                root: {
                    backgroundColor: "#fff",
                }
            },

        },
        MuiButton: {
            defaultProps: {
                style: {
                    borderRadius: "8px",
                }
            }
        }
    }
})