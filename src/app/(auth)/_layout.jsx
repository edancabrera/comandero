import { Slot } from "expo-router";
import { LoginProvider } from "../../context/LoginContext";

export default function LoginLayout () {
    return (
        <LoginProvider>
            <Slot />
        </LoginProvider>
    )
}