
import {atom} from "jotai";

export const linksAtom =  atom([]);

export const profileAtom = atom({
    picture:"",
    firstname:"",
    lastname:"",
    email:"",
});

export const toastAtom = atom("");

export function showToast(message: string, setToast) {
    setToast(message);
    setTimeout(() => {
        setToast("");
    }, 3000);
}