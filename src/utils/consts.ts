import { AiFillStar } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { PiGithubLogoFill, PiYoutubeLogoFill } from "react-icons/pi";

export const platforms = [
    {
        Icon: PiGithubLogoFill,
        name: "Github",
        color: "black",
        startsWith: "https://www.github.com/",
    },
    {
        Icon: PiYoutubeLogoFill,
        name: "Youtube",
        color: "#ef383a",
        startsWith: "https://www.youtube.com/",
    },
    {
        Icon: FaLinkedin,
        name: "Linkedin",
        color: "#2d69ff",
        startsWith: "https://www.linkedin.com/in/",
    },
    {
        Icon: AiFillStar,
        name: "Custom",
        color: "#282828",
        startsWith: "",
    },]